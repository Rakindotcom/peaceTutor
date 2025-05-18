import React, { useState, useEffect, useMemo, useRef } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const FormField = ({ label, name, type = "text", value, onChange, placeholder, required, options }) => (
  <div>
    <label htmlFor={name} className="block mb-1 font-semibold">{label}*</label>
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

const Apply = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    district: "",
    area: "",
    university: "",
    department: "",
    year: "",
    experience: "",
    expectedSalary: "",
    preferredSubjects: "",
    address: "",
  });
  const [modal, setModal] = useState({ isOpen: false, message: "", status: "" });
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  const genders = ["Male", "Female", "Other"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"];
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
    "Mohakhali", "Gulshan 1", "Gulshan 2", "Lalbagh", "Kotwali", "Shahbagh", "Mirpur-10", "Mirpur-12",
    "Banani", "Shantinagar", "Tejgaon Industrial Area", "Segunbagicha", "Paltan", "Chawkbazar",
    "Kamrangirchar", "Kawran Bazar", "Khilgaon", "Moghbazar", "Bata", "Mugda", "Shahjadpur", "Nikunja",
    "Kafrul", "Moulvibazar", "Jatrabari", "Shyamoli", "Kazipara", "Banasree", "Mahakhali", "Mintu Road",
    "Khilgaon", "Puran Dhaka", "Rasa Mela", "Hazaribagh", "Muktijuddha Road", "Keraniganj", "Barabagh",
    "Tejgaon", "Shabagh", "Basila", "Mohammadpur", "Dhaka Cantonment", "Foy’s Lake", "Banani", "Noapara",
    "Goran", "Mirpur-14", "Gabtali", "Shampur", "Chittagong Road", "Ramna", "Motijheel", "Purbachal",
    "Siddheswari", "Kalabagan", "Gabtali","Kachukhet", "Dholairpar", "Laxmibazar", "Vashantek", "Taltola", "Chandrima Udyan", "Sadarghat", "Babu Bazar", "Kaptan Bazar",
    "Shagorika", "Patuakhali", "Tikatuli", "Shibpur", "Moulvibazar", "West Nakhalpara", "Chittagong Road",
    "Gopibagh", "Kallyanpur", "Mirpur-13", "Tajgaon", "Shamshernagar", "Dewanhat", "Sonargaon",
    "Gulshan-1", "Gulsan-2", "Pallabi", "Khamarbari", "Bagan Bazar", "Anwar Sardar Road", "Baridhara",
    "Rayerbazar", "Ekatali", "Shatinagar", "Rampura", "Chandpur", "Monipur", "Arambagh", "Aftabnagar",
    "Basundhara", "Mirpur-11", "Baitul Aman Housing", "Chhayanir", "Patuakhali", "Ramna Park", "Postogola",
    "Shewrapara", "Gulshan-2", "Reazuddin Bazar", "North Badda", "Majher Char", "Hazaribagh", "Biyabani",
    "Lakshmipur", "Chouddagram", "Tejgaon", "Rajabazar", "Satmasjid Road", "Mirpur-15", "Dhamrai",
    "Nalchity", "Kawran Bazar", "Maniknagar", "South Kamrangirchar", "Middle Baraipara", "Asad Gate",
    "Biggan Bhaban", "Mohammadpur-1", "Jatrabari", "Biswa Road", "Sheikh Mujib Road", "Mithapukur",
    "Shantinagar", "Barakhola", "Purana Paltan", "Awal Tower", "Bhanga Bazar", "Kalatali", "Thana Road",
    "Mirpur-6", "Shaheed Minar", "Bangla Bazar", "Kadamtala", "Meherpur", "Pabna", "Madhabdi",
    "Gulshan 1", "Barabari", "Kadirganj", "Khulna Road", "Khulshi", "Banarupa", "Chittagong University",
    "Gotalapara", "Naria", "Narinda", "Shabagh Market", "Fakirapool", "Sutrapur", "Kotwali Road",
    "Chandra", "Sanarpara", "Sadarghat Station", "Bokshi Bazar", "Malibagh", "Bogura", "Mollar Bagan",
    "Modhupur", "Shamshernagar", "Kallyanpur", "Narayanganj Road", "Bausi", "Daulatpur", "Maniknagar",
    "Demra Thana", "Dhanmondi-2", "Jorpatki", "Shahbagh", "Bashundhara R/A", "Shyamoli"
  ])];

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
      "name", "phone", "email", "gender", "district", "area", "university",
      "department", "year", "experience", "expectedSalary", "preferredSubjects", "address"
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

    const expectedSalaryNum = parseInt(formData.expectedSalary, 10);
    if (isNaN(expectedSalaryNum)) {
      setModal({ isOpen: true, message: "Expected Salary must be a number.", status: "error" });
      setIsLoading(false);
      return;
    }

    if (!db) {
      console.error("Firestore is not initialized.");
      setModal({ isOpen: true, message: "Database connection error.", status: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const submissionData = {
        ...formData,
        expectedSalary: expectedSalaryNum,
        timestamp: serverTimestamp()
      };
      await addDoc(collection(db, "tutorApplications"), submissionData);
      setModal({ isOpen: true, message: "Application Submitted Successfully!", status: "success" });

      setFormData({
        name: "", phone: "", email: "", gender: "", district: "", area: "",
        university: "", department: "", year: "", experience: "", expectedSalary: "",
        preferredSubjects: "", address: ""
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
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">Apply as a Tutor</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
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
          options={genders.map((g, i) => <option key={i} value={g}>{g}</option>)}
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
          label="Area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          options={areaOptions}
          required
        />
        <FormField
          label="University"
          name="university"
          value={formData.university}
          onChange={handleChange}
          placeholder="University Name"
          required
        />
        <FormField
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department Name"
          required
        />
        <FormField
          label="Academic Year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          options={years.map((y, i) => <option key={i} value={y}>{y}</option>)}
          required
        />
        <FormField
          label="Tutoring Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="e.g. 2 years, 5 students"
          required
        />
        <FormField
          label="Expected Salary (BDT/month)"
          name="expectedSalary"
          type="number"
          value={formData.expectedSalary}
          onChange={handleChange}
          placeholder="e.g. 5000"
          required
        />
        <div className="md:col-span-2">
          <FormField
            label="Preferred Subjects"
            name="preferredSubjects"
            value={formData.preferredSubjects}
            onChange={handleChange}
            placeholder="e.g. Math, Physics, Chemistry"
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
            className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-10 rounded-full transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Apply Now"}
          </button>
        </div>
      </form>

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" ref={modalRef}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {modal.status === "success" ? "Success" : "Error"}
            </h2>
            <p className="text-center mb-6">{modal.message}</p>
            <div className="text-center">
              <button
                onClick={closeModal}
                className="modal-close-button bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-all"
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

export default Apply;