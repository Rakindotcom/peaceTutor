import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * Get current user's role from Firestore
 * @returns {Promise<string|null>} User role or null if not found
 */
export const getCurrentUserRole = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;

    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};

/**
 * Get current user's data from Firestore
 * @returns {Promise<object|null>} User data or null if not found
 */
export const getCurrentUserData = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;

    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

/**
 * Check if current user has a specific role
 * @param {string} requiredRole - The role to check for
 * @returns {Promise<boolean>} True if user has the required role
 */
export const hasRole = async (requiredRole) => {
  const userRole = await getCurrentUserRole();
  return userRole === requiredRole;
};

/**
 * Check if current user is admin
 * @returns {Promise<boolean>} True if user is admin
 */
export const isAdmin = async () => {
  return await hasRole("admin");
};

/**
 * Check if current user is tutor
 * @returns {Promise<boolean>} True if user is tutor
 */
export const isTutor = async () => {
  return await hasRole("tutor");
};

/**
 * Check if current user is guardian
 * @returns {Promise<boolean>} True if user is guardian
 */
export const isGuardian = async () => {
  return await hasRole("guardian");
};

/**
 * Get dashboard route based on user role
 * @param {string} role - User role
 * @returns {string} Dashboard route
 */
export const getDashboardRoute = (role) => {
  switch (role) {
    case "admin":
      return "/admin";
    case "tutor":
      return "/tutor-dashboard";
    case "guardian":
      return "/guardian-dashboard";
    default:
      return "/";
  }
};