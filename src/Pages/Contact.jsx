import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { VALIDATION_PATTERNS } from "../constants/formData";
import { validateForm, getFirebaseErrorMessage } from "../utils/validation";
import { sendContactConfirmation } from "../utils/emailNotifications";
import { showToast, toastMessages } from "../utils/toast";
import FormField from "../Components/UI/FormField";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation rules
  const validationRules = {
    name: { required: true, minLength: 2 },
    email: { required: true, pattern: VALIDATION_PATTERNS.email },
    message: { required: true, minLength: 10 }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    const { isValid, errors: validationErrors } = validateForm(formData, validationRules);

    if (!isValid) {
      setErrors(validationErrors);
      showToast.error(toastMessages.validationError);
      setIsLoading(false);
      return;
    }

    if (!db || typeof addDoc !== "function") {
      console.error("Firestore not available.");
      showToast.error("Database connection error. Please try again later.");
      setIsLoading(false);
      return;
    }

    try {
      const submissionData = {
        ...Object.fromEntries(Object.entries(formData).map(([key, val]) => [key, val.trim()])),
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "contactMessages"), submissionData);

      // Send confirmation email
      await sendContactConfirmation(submissionData.email, submissionData.name);

      showToast.success(toastMessages.contactSuccess);

      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setErrors({});

    } catch (error) {
      console.error("Error adding document: ", error);
      const errorMessage = getFirebaseErrorMessage(error.code);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-8 mt-10">
        <LoadingSpinner size="lg" message="Sending your message..." />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-white rounded-2xl shadow-lg mt-4 sm:mt-6 lg:mt-10">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-2">
          Contact Peace Tutor Academy
        </h1>
        <p className="text-sm sm:text-base text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <FormField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            error={errors.name}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            error={errors.email}
          />
          <FormField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            required
            error={errors.message}
            isTextarea
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
            <p>📞 <a href="tel:+8801938679075" className="text-blue-600 hover:text-blue-800 hover:underline">01938-679075</a></p>
            <p>📞 <a href="tel:+8801783795850" className="text-blue-600 hover:text-blue-800 hover:underline">01783-795850</a></p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Email</h2>
            <p>📧 <a href="mailto:info@peacetutor.com" className="text-blue-600 hover:text-blue-800 hover:underline">info@peacetutor.com</a></p>
            <p>📧 <a href="mailto:support@peacetutor.com" className="text-blue-600 hover:text-blue-800 hover:underline">support@peacetutor.com</a></p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Business Hours</h2>
            <p>Saturday – Thursday: 9:00 AM – 8:00 PM</p>
            <p>Friday: Closed</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Contact;