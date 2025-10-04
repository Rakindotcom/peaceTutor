import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Custom hook to manage authentication state
 * @returns {Object} Authentication state and user data
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setError(null);

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUser(currentUser);
            setUserData(userDoc.data());
          } else {
            setUser(currentUser);
            setUserData(null);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data");
          setUser(currentUser);
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    userData,
    isLoading,
    error,
    isAuthenticated: !!user,
    role: userData?.role || null,
    isActive: userData?.isActive || false
  };
};