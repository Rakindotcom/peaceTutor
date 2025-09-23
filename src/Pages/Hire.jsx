import React, { useState, useMemo } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { GENDERS, CATEGORIES, GRADES, DISTRICTS, AREAS, VALIDATION_PATTERNS } from "../constants/formData";
import { validateForm, getFirebaseErrorMessage } from "../utils/validation";
import { sendHireRequestConfirmation } from "../utils/emailNotifications";
import { showToast, toastMessages } from "../utils/toast";
import FormField from "../Components/UI/FormField";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation rules
  const validationRules = {
    name: { required: true, minLength: 2 },
    phone: { required: true, pattern: VALIDATION_PATTERNS.phone },
    email: { required: true, pattern: VALIDATION_PATTERNS.email },
    gender: { required: true },
    district: { required: true },
    category: { required: true },
    grade: { required: true },
    subjects: { required: true, minLength: 3 },
    address: { required: true, minLength: 10 }
  };

  // Memoized options
  const genderOptions = useMemo(() =>
    GENDERS.map((g, i) => <option key={i} value={g}>{g}</option>), []
  );

  const categoryOptions = useMemo(() =>
    CATEGORIES.map((cat, i) => <option key={i} value={cat}>{cat}</option>), []
  );

  const gradeOptions = useMemo(() =>
    GRADES.map((g, i) => <option key={i} value={g}>{g}</option>), []
  );

  const districtOptions = useMemo(() =>
    DISTRICTS.map((d, i) => <option key={i} value={d}>{d}</option>), []
  );

  const areaOptions = useMemo(() =>
    AREAS.map((a, i) => <option key={i} value={a}>{a}</option>), []
  );

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
      const submissionData = Object.fromEntries(
        Object.entries(formData).map(([key, val]) => [key, val.trim()])
      );

      await addDoc(collection(db, "hireRequests"), {
        ...submissionData,
        timestamp: serverTimestamp()
      });

      // Send confirmation email
      await sendHireRequestConfirmation(submissionData.email, submissionData.name);

      showToast.success(toastMessages.hireRequestSuccess);

      // Reset form
      setFormData({
        name: "", phone: "", email: "", gender: "", district: "", area: "",
        category: "", grade: "", subjects: "", address: ""
      });
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
        <LoadingSpinner size="lg" message="Submitting your request..." />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-white to-gray-100 shadow-xl rounded-2xl mt-4 sm:mt-6 lg:mt-10">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-2">Hire a Tutor</h1>
        <p className="text-sm sm:text-base text-gray-600">Fill out the form below and we'll connect you with the perfect tutor</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" noValidate>
        <FormField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          error={errors.name}
        />

        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 017XXXXXXXX"
          required
          error={errors.phone}
          pattern="01[3-9][0-9]{8}"
        />

        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          required
          error={errors.email}
        />

        <FormField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={genderOptions}
          required
          error={errors.gender}
        />

        <FormField
          label="District"
          name="district"
          value={formData.district}
          onChange={handleChange}
          options={districtOptions}
          required
          error={errors.district}
        />

        <FormField
          label="Area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          options={areaOptions}
          error={errors.area}
        />

        <FormField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          required
          error={errors.category}
        />

        <FormField
          label="Class/Grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          options={gradeOptions}
          required
          error={errors.grade}
        />

        <div className="md:col-span-2">
          <FormField
            label="Subjects"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            placeholder="e.g. Math, Physics, English (separated by comma)"
            required
            error={errors.subjects}
          />
        </div>

        <div className="md:col-span-2">
          <FormField
            label="Full Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House number, road, area details"
            required
            error={errors.address}
            isTextarea
          />
        </div>

        <div className="md:col-span-2 text-center mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 sm:px-10 rounded-full transition-all transform hover:scale-105 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </button>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            We'll contact you within 24 hours to match you with the perfect tutor
          </p>
        </div>
      </form>


    </div>
  );
};

export default Hire;