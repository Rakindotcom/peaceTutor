import React, { useState, useEffect, useMemo, useRef } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Static arrays defined outside the component
const genders = ["Male", "Female", "Other"];
const categories = ["Bangla Medium", "English Medium", "English Version", "Arabic Medium", "Admission Test"];
const grades = [
  "Nursery", "KG", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII",
  "Class IX", "S.S.C", "HSC 1st year", "HSC 2nd year", "Honours 1st year", "Honours 2nd year",
  "Honours 3rd year", "Honours 4th year", "Masters", "Diploma in Engineering", "Engineering University Admission Test",
  "Medical College Admission Test", "Public University Admission Test", "Private University Admission Test",
  "School Admission Test", "O Level", "A Level (AS)", "A Level (A2)", "Dakhil", "Alim", "Fazil", "Kamil"
];
const districts = [
  "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh",
  "Comilla", "Narayanganj", "Gazipur", "Cox's Bazar", "Noakhali", "Jessore", "Bogra",
  "Moulvibazar", "Dinajpur", "Faridpur", "Kushtia", "Pabna", "Patuakhali", "Satkhira", "Sirajganj",
  "Tangail", "Jamalpur", "Feni", "Brahmanbaria", "Pirojpur", "Bhola", "Panchagarh", "Thakurgaon",
  "Naogaon", "Natore", "Joypurhat", "Lalmonirhat", "Kurigram", "Sherpur", "Netrakona", "Bagerhat",
  "Chuadanga", "Magura", "Jhenaidah", "Meherpur", "Habiganj", "Sunamganj", "Rangamati", "Khagrachari",
  "Bandarban", "Chandpur", "Lakshmipur", "Shariatpur", "Gopalganj", "Madaripur", "Manikganj",
  "Munshiganj", "Rajbari", "Nilphamari", "Gaibandha", "Kishoreganj", "Jhalokathi", "Barguna"
];
const areas = [...new Set([
  "Didn't Found Here", "Dhanmondi", "Uttara", "Mirpur", "Gulshan", "Banani", "Mohammadpur", "Bashundhara", "Motijheel",
  "Tejgaon", "Badda", "Rampura", "Farmgate", "Savar", "Keraniganj", "Wari", "Demra", "Khilgaon",
  "Ashulia", "Rayerbazar", "Moghbazar", "Khilkhet", "Bashabo", "Pallabi", "Jatrabari", "Baridhara",
  "Mohakhali", "Lalbagh", "Kotwali", "Shahbagh", "Mirpur-10", "Mirpur-12", "Shantinagar",
  "Tejgaon Industrial Area", "Segunbagicha", "Paltan", "Chawkbazar", "Kamrangirchar", "Kawran Bazar",
  "Mugda", "Shahjadpur", "Nikunja", "Kafrul", "Shyamoli", "Kazipara", "Banasree", "Mahakhali",
  "Mintu Road", "Puran Dhaka", "Hazaribagh", "Muktijuddha Road", "Barabagh", "Basila", "Dhaka Cantonment",
  "Foy’s Lake", "Noapara", "Goran", "Mirpur-14", "Gabtali", "Shampur", "Chittagong Road", "Ramna",
  "Purbachal", "Siddheswari", "Kalabagan", "Vashantek", "Taltola", "Chandrima Udyan", "Sadarghat",
  "Babu Bazar", "Kaptan Bazar", "Shagorika", "Tikatuli", "Shibpur", "West Nakhalpara", "Gopibagh",
  "Kallyanpur", "Mirpur-13", "Tajgaon", "Shamshernagar", "Dewanhat", "Sonargaon", "Khamarbari",
  "Bagan Bazar", "Anwar Sardar Road", "Ekatali", "Shatinagar", "Chandpur", "Monipur", "Arambagh",
  "Aftabnagar", "Mirpur-11", "Baitul Aman Housing", "Chhayanir", "Ramna Park", "Postogola", "Shewrapara",
  "Reazuddin Bazar", "North Badda", "Majher Char", "Biyabani", "Lakshmipur", "Chouddagram", "Rajabazar",
  "Satmasjid Road", "Mirpur-15", "Dhamrai", "Nalchity", "Maniknagar", "South Kamrangirchar",
  "Middle Baraipara", "Asad Gate", "Biggan Bhaban", "Mohammadpur-1", "Biswa Road", "Sheikh Mujib Road",
  "Mithapukur", "Barakhola", "Purana Paltan", "Awal Tower", "Bhanga Bazar", "Kalatali", "Thana Road",
  "Mirpur-6", "Shaheed Minar", "Bangla Bazar", "Kadamtala", "Meherpur", "Pabna", "Madhabdi", "Barabari",
  "Kadirganj", "Khulna Road", "Khulshi", "Banarupa", "Chittagong University", "Gotalapara", "Naria",
  "Narinda", "Shabagh Market", "Fakirapool", "Sutrapur", "Kotwali Road", "Chandra", "Sanarpara",
  "Sadarghat Station", "Bokshi Bazar", "Malibagh", "Bogura", "Mollar Bagan", "Modhupur", "Narayanganj Road",
  "Bausi", "Daulatpur", "Demra Thana", "Dhanmondi-2", "Jorpatki"
])];

const FormField = ({ label, name, type = "text", value, onChange, placeholder, required, options }) => (
  <div>
    <label htmlFor={name} className="block mb-1 font-semibold">{label}{required ? "*" : ""}</label>
    {options ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-3 mb-2"
        required={required}
      >
        <option value="">Select {label}</option>
        {options}
      </select>
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-lg p-3 mb-2"
        required={required}
        {...(name === "phone" ? { pattern: "01[3-9][0-9]{8}" } : {})}
      />
    )}
  </div>
);

const Hire = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    district: "",
    area: "",
    category: "",
    grade: "",
    subjects: "",
    address: "",
  });
  const [modal, setModal] = useState({ isOpen: false, message: "", status: "" });
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  const genderOptions = useMemo(() => genders.map((g, i) => (
    <option key={i} value={g}>{g}</option>
  )), []);
  const categoryOptions = useMemo(() => categories.map((cat, i) => (
    <option key={i} value={cat}>{cat}</option>
  )), []);
  const gradeOptions = useMemo(() => grades.map((g, i) => (
    <option key={i} value={g}>{g}</option>
  )), []);
  const districtOptions = useMemo(() => districts.map((d, i) => (
    <option key={i} value={d}>{d}</option>
  )), []);
  const areaOptions = useMemo(() => areas.map((a, i) => (
    <option key={i} value={a}>{a}</option>
  )), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requiredFields = [
      "name", "phone", "email", "gender", "district", "category", "grade", "subjects", "address"
    ];

    const isEmpty = requiredFields.some((field) => !formData[field].trim());
    if (isEmpty) {
      setModal({ isOpen: true, message: "Please fill in all required fields.", status: "error" });
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^01[3-9][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setModal({ isOpen: true, message: "Invalid phone number format.", status: "error" });
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setModal({ isOpen: true, message: "Invalid email format.", status: "error" });
      setIsLoading(false);
      return;
    }

    if (!db || typeof addDoc !== "function") {
      console.error("Firestore not available.");
      setModal({ isOpen: true, message: "Database connection error.", status: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const submissionData = Object.fromEntries(
        Object.entries(formData).map(([key, val]) => [key, val.trim()])
      );
      await addDoc(collection(db, "hireRequests"), {
        ...submissionData,
        timestamp: serverTimestamp()
      });
      setModal({ isOpen: true, message: "Request Submitted Successfully!", status: "success" });

      setFormData({
        name: "", phone: "", email: "", gender: "", district: "", area: "",
        category: "", grade: "", subjects: "", address: ""
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      const errorMessages = {
        "permission-denied": "You don't have permission to submit this form.",
        "unavailable": "Database is currently unavailable. Please try again later.",
        "deadline-exceeded": "Request timed out. Please check your connection.",
      };
      const errorMessage = errorMessages[error.code] || "Failed to submit. Please try again.";
      setModal({ isOpen: true, message: errorMessage, status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, message: "", status: "" });
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };

    const handleFocusTrap = (e) => {
      if (!modalRef.current || !modal.isOpen) return;
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (modal.isOpen) {
      window.addEventListener("keydown", handleEscape);
      window.addEventListener("keydown", handleFocusTrap);
      document.querySelector(".modal-close-button")?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("keydown", handleFocusTrap);
      document.body.style.overflow = "auto";
    };
  }, [modal.isOpen]);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-white to-gray-100 shadow-xl rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Hire a Tutor</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 017XXXXXXXX"
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          required
        />
        <FormField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={genderOptions}
          required
        />
        <FormField
          label="District"
          name="district"
          value={formData.district}
          onChange={handleChange}
          options={districtOptions}
          required
        />
        <FormField
          label="Area (Optional)"
          name="area"
          value={formData.area}
          onChange={handleChange}
          options={areaOptions}
          required={false}
        />
        <FormField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          required
        />
        <FormField
          label="Class"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          options={gradeOptions}
          required
        />
        <div className="md:col-span-2">
          <FormField
            label="Subjects (separated by comma)"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            placeholder="e.g. Math, Physics, English"
            required
          />
        </div>
        <div className="md:col-span-2">
          <FormField
            label="Full Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House, Road, Area details"
            required
          />
        </div>
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-full transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" ref={modalRef} role="alert" aria-live="assertive">
          <div className={`bg-white rounded-lg p-6 max-w-md w-full shadow-xl ${modal.status === "error" ? "border-2 border-red-500" : "border-2 border-green-500"}`}>
            <h2 className={`text-xl font-bold mb-4 ${modal.status === "error" ? "text-red-600" : "text-green-600"}`}>
              {modal.status === "success" ? "Success" : "Error"}
            </h2>
            <p className="text-gray-700 mb-6">{modal.message}</p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="modal-close-button bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
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

export default Hire;