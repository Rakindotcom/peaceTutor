import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { showToast } from "../utils/toast";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

const TutorDashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.role !== "tutor") {
              showToast.error("Access denied. This dashboard is for tutors only.");
              navigate("/login");
              return;
            }
            setUser(currentUser);
            setUserData(data);
          } else {
            showToast.error("User data not found. Please contact support.");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          showToast.error("Error loading user data.");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      showToast.error("Error logging out");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tutor Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userData?.fullName || user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Students</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">Students currently enrolled</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-600">৳0</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Sessions</h3>
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
              <div className="text-blue-600 mb-2">📚</div>
              <h3 className="font-medium text-gray-900">View Available Jobs</h3>
              <p className="text-sm text-gray-500">Browse tuition opportunities</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
              <div className="text-green-600 mb-2">👥</div>
              <h3 className="font-medium text-gray-900">My Students</h3>
              <p className="text-sm text-gray-500">Manage current students</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
              <div className="text-purple-600 mb-2">📅</div>
              <h3 className="font-medium text-gray-900">Schedule</h3>
              <p className="text-sm text-gray-500">View your teaching schedule</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
              <div className="text-orange-600 mb-2">⚙️</div>
              <h3 className="font-medium text-gray-900">Profile Settings</h3>
              <p className="text-sm text-gray-500">Update your information</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity to display.</p>
            <p className="text-sm mt-2">Start applying for tuition jobs to see your activity here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;