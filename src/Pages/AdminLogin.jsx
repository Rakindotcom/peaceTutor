import React, { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { VALIDATION_PATTERNS } from "../constants/formData";
import { validateForm, getFirebaseErrorMessage } from "../utils/validation";
import { showToast, toastMessages } from "../utils/toast";
import FormField from "../Components/UI/FormField";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!formData.email) {
      showToast.error("Please enter your email address first");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      showToast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error);
      const errorMessage = getFirebaseErrorMessage(error.code);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Validation rules
  const validationRules = {
    email: { required: true, pattern: VALIDATION_PATTERNS.email },
    password: { required: true, minLength: 6 }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate form
    const { isValid, errors: validationErrors } = validateForm(formData, validationRules);

    if (!isValid) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Check if user has admin role in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.role !== "admin") {
          showToast.error("Access denied. This login is for administrators only.");
          await signOut(auth); // Sign out the user
          setIsLoading(false);
          return;
        }

        if (!userData.isActive) {
          showToast.error("Your admin account has been deactivated. Please contact support.");
          await signOut(auth);
          setIsLoading(false);
          return;
        }
      } else {
        showToast.error("Admin account not found. Please contact support.");
        await signOut(auth);
        setIsLoading(false);
        return;
      }

      showToast.success(toastMessages.loginSuccess);
      // Check if user came from post-tuition route, otherwise go to admin
      const from = new URLSearchParams(window.location.search).get('from');
      navigate(from === 'post-tuition' ? '/post-tuition' : '/admin');
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = getFirebaseErrorMessage(err.code);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-6 py-12 mt-10">
        <LoadingSpinner size="lg" message="Signing in..." />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg mt-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Login</h1>
        <p className="text-gray-600">Sign in to access your account</p>
      </div>



      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="admin@peacetutorbd.com"
          required
          error={errors.email}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          error={errors.password}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isLoading}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;