import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const FormField = ({ label, name, type = "text", value, onChange, placeholder, required, isTextarea = false }) => (
  <div>
    <label htmlFor={name} className="block font-semibold mb-1">{label}</label>
    {isTextarea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-3 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        required={required}
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [modal, setModal] = useState({ isOpen: false, message: "", status: "" });
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requiredFields = ["name", "email", "message"];
    const isEmpty = requiredFields.some((field) => !formData[field].trim());
    if (isEmpty) {
      setModal({ isOpen: true, message: "Please fill in all required fields.", status: "error" });
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setModal({ isOpen: true, message: "Invalid email format.", status: "error" });
      setIsLoading(false);
      return;
    }

    if (formData.message.trim().length < 10) {
      setModal({ isOpen: true, message: "Message must be at least 10 characters long.", status: "error" });
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
      const submissionData = {
        ...Object.fromEntries(Object.entries(formData).map(([key, val]) => [key, val.trim()])),
        timestamp: new Date().toISOString(),
      };
      await addDoc(collection(db, "contactMessages"), submissionData);
      setModal({ isOpen: true, message: "Message Sent Successfully!", status: "success" });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      const errorMessages = {
        "permission-denied": "You don't have permission to submit this form.",
        "unavailable": "Database is currently unavailable. Please try again later.",
        "deadline-exceeded": "Request timed out. Please check your connection.",
      };
      const errorMessage = errorMessages[error.code] || "Failed to send message. Please try again.";
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
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
        Contact Peace Tutor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
          <FormField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            required
            isTextarea
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Head Office</h2>
            <p>
              Peacetutorbd (4th Floor - Lift 4),<br />
              House No#83, Road No#23,<br />
              Gulshan-1, Dhaka, Bangladesh 1212
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Phone</h2>
            <p>📞 01938-679075</p>
            <p>📞 01783-795850</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Business Hours</h2>
            <p>Saturday – Thursday: 9:00 AM – 8:00 PM</p>
            <p>Friday: Closed</p>
          </div>
        </div>
      </div>

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

export default Contact;