import React, { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { VALIDATION_PATTERNS } from "../constants/formData";
import { validateForm, getFirebaseErrorMessage } from "../utils/validation";
import { showToast, toastMessages } from "../utils/toast";
import FormField from "../Components/UI/FormField";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

const Login = () => {
  const [activeTab, setActiveTab] = useState("tutor");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: "tutor", label: "Tutor", role: "tutor" },
    { id: "guardian", label: "Guardian", role: "guardian" }
  ];

  // Validation rules
  const getValidationRules = () => {
    const baseRules = {
      email: { required: true, pattern: VALIDATION_PATTERNS.email },
      password: { required: true, minLength: 6 }
    };

    if (isSignUp) {
      return {
        ...baseRules,
        confirmPassword: { required: true, minLength: 6 },
        fullName: { required: true, minLength: 2 },
        phone: { required: true, pattern: VALIDATION_PATTERNS.phone }
      };
    }

    return baseRules;
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phone: ""
    });
    setErrors({});
    setIsSignUp(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      showToast.error("Please enter your email address first");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      showToast.success("Password reset email sent! Check your inbox.");
      setShowForgotPassword(false);
    } catch (error) {
      console.error("Password reset error:", error);
      const errorMessage = getFirebaseErrorMessage(error.code);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    const validationRules = getValidationRules();
    const { isValid, errors: validationErrors } = validateForm(formData, validationRules);

    // Additional validation for sign up
    if (isSignUp && formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (!isValid || (isSignUp && formData.password !== formData.confirmPassword)) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // Sign up new user
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Save user data to Firestore with role
        try {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: formData.email,
            fullName: formData.fullName,
            phone: formData.phone,
            role: activeTab,
            createdAt: new Date().toISOString(),
            isActive: true
          });
          showToast.success("Account created successfully!");
        } catch (firestoreError) {
          console.error("Firestore error:", firestoreError);
          // Account was created in Auth but failed in Firestore
          showToast.warning("Account created but profile setup incomplete. You can still log in.");
        }
      } else {
        // Sign in existing user
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Check user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Verify user role matches selected tab
            if (userData.role !== activeTab) {
              showToast.error(`This account is registered as a ${userData.role}. Please select the correct tab.`);
              setIsLoading(false);
              return;
            }

            // Check if user is active
            if (!userData.isActive) {
              showToast.error("Your account has been deactivated. Please contact support.");
              setIsLoading(false);
              return;
            }
          } else {
            // For existing users without role data, create user document
            try {
              await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: formData.email,
                role: activeTab,
                createdAt: new Date().toISOString(),
                isActive: true
              });
            } catch (firestoreError) {
              console.error("Firestore error:", firestoreError);
              // Continue with login even if Firestore fails
              showToast.warning("Profile data unavailable, but you can still access the dashboard.");
            }
          }
        } catch (firestoreError) {
          console.error("Firestore read error:", firestoreError);
          // Continue with login even if Firestore fails
          showToast.warning("Profile data unavailable, but you can still access the dashboard.");
        }

        showToast.success(toastMessages.loginSuccess);
      }

      // Navigate based on role
      switch (activeTab) {
        case "tutor":
          navigate("/tutor-dashboard");
          break;
        case "guardian":
          navigate("/guardian-dashboard");
          break;
        default:
          navigate("/");
      }

    } catch (err) {
      console.error("Authentication error:", err);
      const errorMessage = getFirebaseErrorMessage(err.code);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-6 py-12 mt-10">
        <LoadingSpinner size="lg" message={isSignUp ? "Creating account..." : "Signing in..."} />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg mt-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          {isSignUp ? "Create Account" : "Login"}
        </h1>
        <p className="text-gray-600">
          {isSignUp ? "Sign up to get started" : "Sign in to access your account"}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-blue-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {isSignUp && (
          <>
            <FormField
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              error={errors.fullName}
            />

            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              error={errors.phone}
            />
          </>
        )}

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={`Enter your ${activeTab} email`}
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

        {isSignUp && (
          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            error={errors.confirmPassword}
          />
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isLoading
            ? (isSignUp ? "Creating Account..." : "Signing In...")
            : (isSignUp ? "Create Account" : "Sign In")
          }
        </button>

        {/* Forgot Password */}
        {!isSignUp && (
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
        )}
      </form>

      {/* Toggle between Sign In and Sign Up */}
      <div className="text-center mt-6">
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setErrors({});
            setFormData({
              email: "",
              password: "",
              confirmPassword: "",
              fullName: "",
              phone: ""
            });
          }}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"
          }
        </button>
      </div>
    </div>
  );
};

export default Login;