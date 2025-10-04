import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";
import LoadingSpinner from "./UI/LoadingSpinner";

const ProtectedRoute = ({ children, requiredRole, redirectTo = "/login" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Check if user has required role
            if (requiredRole && userData.role !== requiredRole) {
              showToast.error(`Access denied. This area is for ${requiredRole}s only.`);
              navigate(redirectTo);
              return;
            }

            // Check if user is active
            if (!userData.isActive) {
              showToast.error("Your account has been deactivated. Please contact support.");
              navigate(redirectTo);
              return;
            }

            setIsAuthorized(true);
          } else {
            showToast.error("User data not found. Please contact support.");
            navigate(redirectTo);
          }
        } catch (error) {
          console.error("Error checking user authorization:", error);
          showToast.error("Error verifying access permissions.");
          navigate(redirectTo);
        }
      } else {
        navigate(redirectTo);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, requiredRole, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" message="Verifying access..." />
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default ProtectedRoute;