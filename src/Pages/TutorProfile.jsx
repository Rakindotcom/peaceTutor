import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import TutorProfileForm from '../Components/TutorProfileForm';
import LoadingSpinner from '../Components/UI/LoadingSpinner';

const TutorProfile = () => {
  const { user, userData, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userData?.role !== 'tutor') {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tutor Profile Management</h1>
          <p className="text-gray-600 mt-2">
            Create and manage your comprehensive tutor profile to attract more students.
          </p>
        </div>

        <TutorProfileForm />
      </div>
    </div>
  );
};

export default TutorProfile;