import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { showToast, toastMessages } from "../utils/toast";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import EmailManagement from "../Components/EmailManagement";

// Ensure Firestore rules allow reads for authenticated users and public writes:
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{collection=hireRequests|tutorApplications|contactMessages}/{doc} {
//       allow read: if request.auth != null; // Any authenticated user
//       allow write: if true; // Public writes for Apply.jsx, Hire.jsx, Contact.jsx
//     }
//   }
// }

const AdminDashboard = () => {
  const [hireRequests, setHireRequests] = useState([]);
  const [tutorApplications, setTutorApplications] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ isOpen: false, data: null, title: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("hire");
  const modalRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Auth Check
  useEffect(() => {
    if (!auth) {
      setError("Authentication service not initialized. Check firebase.js.");
      setAuthLoading(false);
      navigate("/admin-login");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin-login"); // Redirect to login if not logged in
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch data from Firestore
  useEffect(() => {
    if (authLoading || !db) {
      if (!authLoading) setIsLoading(false);
      if (!db) {
        setError("Database connection error. Check firebase.js.");
        setIsLoading(false);
      }
      return;
    }

    const collections = [
      {
        name: "hireRequests",
        setter: setHireRequests,
        searchFields: [
          "name",
          "email",
          "phone",
          "district",
          "area",
          "category",
          "grade",
          "subjects",
          "address",
        ],
      },
      {
        name: "tutorApplications",
        setter: setTutorApplications,
        searchFields: [
          "name",
          "email",
          "phone",
          "district",
          "area",
          "university",
          "department",
          "year",
          "experience",
          "expectedSalary",
          "preferredSubjects",
          "address",
        ],
      },
      {
        name: "contactMessages",
        setter: setContactMessages,
        searchFields: ["name", "email", "message"],
      },
    ];

    let loadedCollections = 0;
    const totalCollections = collections.length;

    const unsubscribes = collections.map(({ name, setter }) => {
      const q = query(collection(db, name), orderBy("timestamp", "desc"));
      return onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setter(data);
          loadedCollections++;
          if (loadedCollections === totalCollections) setIsLoading(false);
        },
        (err) => {
          console.error(`Error fetching ${name}: `, err);
          if (!error) setError("Failed to load data. Check Firestore rules or network.");
          setIsLoading(false);
        }
      );
    });

    return () => unsubscribes.forEach((unsub) => unsub());
  }, [authLoading, error]);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast.success(toastMessages.logoutSuccess);
      navigate("/admin-login");
    } catch (err) {
      console.error("Error signing out:", err);
      showToast.error("Failed to sign out. Please try again.");
    }
  };

  // Debounced search
  const handleSearch = (e) => {
    const value = e.target.value;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setSearchTerm(value.toLowerCase().trim());
    }, 300);
  };

  // Filter data based on search term
  const filterData = useCallback((data, searchFields) =>
    data.filter((item) =>
      searchFields.some((field) =>
        String(item[field] || "").toLowerCase().includes(searchTerm)
      )
    ), [searchTerm]);

  const filteredHireRequests = useMemo(
    () =>
      filterData(hireRequests, [
        "name",
        "email",
        "phone",
        "district",
        "area",
        "category",
        "grade",
        "subjects",
        "address",
      ]),
    [hireRequests, filterData]
  );
  const filteredTutorApplications = useMemo(
    () =>
      filterData(tutorApplications, [
        "name",
        "email",
        "phone",
        "district",
        "area",
        "university",
        "department",
        "year",
        "experience",
        "expectedSalary",
        "preferredSubjects",
        "address",
      ]),
    [tutorApplications, filterData]
  );
  const filteredContactMessages = useMemo(
    () => filterData(contactMessages, ["name", "email", "message"]),
    [contactMessages, filterData]
  );

  const openModal = (data, title) => {
    setModal({ isOpen: true, data, title });
  };

  const closeModal = () => {
    setModal({ isOpen: false, data: null, title: "" });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTabKeyDown = (e) => {
    const tabs = ["hire", "apply", "contact", "emails"];
    const currentIndex = tabs.indexOf(activeTab);
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    } else if (e.key === "ArrowRight" && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const formatTimestamp = (timestamp) => {
    try {
      if (!timestamp) return "N/A";
      if (timestamp.toDate)
        return timestamp
          .toDate()
          .toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
      return new Date(timestamp).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return "N/A";
    }
  };

  const renderTable = (data, title, fields, type) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{title}</h2>
      {data.length === 0 ? (
        <p className="text-gray-600">No {type} found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-sm">
            <caption className="sr-only">{title}</caption>
            <thead>
              <tr className="bg-gray-100">
                {fields.map((field) => (
                  <th key={field} className="p-3 text-left font-semibold">
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
                <th className="p-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t">
                  {fields.map((field) => (
                    <td key={field} className="p-3">
                      {field === "timestamp" ? formatTimestamp(item[field]) : item[field] || "N/A"}
                    </td>
                  ))}
                  <td className="p-3">
                    <button
                      onClick={() => openModal(item, `${type} Details`)}
                      className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition"
                      aria-label={`View details for ${item.name || "entry"}`}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg mt-10">
        <LoadingSpinner size="lg" message="Verifying access..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg mt-10">
      {/* Header and Logout */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg" role="alert">
          {error}
        </div>
      )}

      <div className="mb-8">
        <label htmlFor="search" className="block font-semibold mb-2">
          Search by Name, Email, or Other Fields
        </label>
        <input
          id="search"
          type="text"
          onChange={handleSearch}
          placeholder="Enter name, email, or other details..."
          className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search entries"
        />
      </div>

      <div className="mb-8">
        <div
          role="tablist"
          className="flex flex-col sm:flex-row border-b border-gray-200"
          onKeyDown={handleTabKeyDown}
        >
          {[
            { id: "hire", label: "Hire Requests" },
            { id: "apply", label: "Tutor Applications" },
            { id: "contact", label: "Contact Messages" },
            { id: "emails", label: "Email Management" },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-700"
                : "text-gray-600 hover:text-blue-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner size="lg" message="Loading dashboard data..." />
      ) : (
        <div role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
          {activeTab === "hire" &&
            renderTable(
              filteredHireRequests,
              "Hire Requests",
              ["name", "email", "phone", "district", "category", "grade", "timestamp"],
              "Hire Request"
            )}
          {activeTab === "apply" &&
            renderTable(
              filteredTutorApplications,
              "Tutor Applications",
              ["name", "email", "phone", "university", "experience", "timestamp"],
              "Tutor Application"
            )}
          {activeTab === "contact" &&
            renderTable(
              filteredContactMessages,
              "Contact Messages",
              ["name", "email", "message", "timestamp"],
              "Contact Message"
            )}
          {activeTab === "emails" && <EmailManagement />}
        </div>
      )}

      {modal.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          ref={modalRef}
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl">
            <h2 className="text-xl font-bold text-blue-700 mb-4">{modal.title}</h2>
            <div className="space-y-2">
              {modal.data &&
                Object.entries(modal.data).map(([key, value]) =>
                  key !== "id" && (
                    <p key={key}>
                      <strong className="capitalize">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </strong>{" "}
                      {key === "timestamp" ? formatTimestamp(value) : value || "N/A"}
                    </p>
                  )
                )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="modal-close-button bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                aria-label="Close modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;