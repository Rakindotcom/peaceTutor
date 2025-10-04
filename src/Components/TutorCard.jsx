import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/toast';
import TutorRequestModal from './TutorRequestModal';

const TutorCard = ({ tutor }) => {
  const { user } = useAuth();
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleRequestTutor = () => {
    if (!user) {
      showToast.error('Please login to request a tutor');
      return;
    }
    setShowRequestModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{tutor.name}</h3>
              <p className="text-sm text-blue-600 font-medium">ID: {tutor.tutorId}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">৳{tutor.expectedSalary}</p>
              <p className="text-xs text-gray-500">per month</p>
            </div>
          </div>

          {/* Location */}
          <div className="mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{tutor.location}, {tutor.city}</span>
            </div>
          </div>

          {/* Education */}
          <div className="mb-3">
            <p className="text-sm text-gray-700">
              <span className="font-medium">{tutor.degree}</span> from {tutor.instituteName}
            </p>
          </div>

          {/* Subjects */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Subjects:</p>
            <p className="text-sm text-gray-800 line-clamp-2">{tutor.preferredSubjects}</p>
          </div>

          {/* Classes */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Classes:</p>
            <div className="flex flex-wrap gap-1">
              {tutor.preferredClasses?.slice(0, 3).map((cls, index) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {cls}
                </span>
              ))}
              {tutor.preferredClasses?.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  +{tutor.preferredClasses.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Experience */}
          {tutor.totalExperience && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Experience:</p>
              <p className="text-sm text-gray-800 line-clamp-2">{tutor.totalExperience}</p>
            </div>
          )}

          {/* Availability */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Available:</p>
            <div className="flex flex-wrap gap-1">
              {tutor.availableDays?.slice(0, 4).map((day, index) => (
                <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {day}
                </span>
              ))}
              {tutor.availableDays?.length > 4 && (
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  +{tutor.availableDays.length - 4}
                </span>
              )}
            </div>
            {tutor.availableTimeFrom && tutor.availableTimeTo && (
              <p className="text-xs text-gray-500 mt-1">
                {tutor.availableTimeFrom} - {tutor.availableTimeTo}
              </p>
            )}
          </div>

          {/* Gender & Other Info */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <span>Gender: {tutor.gender}</span>
            {tutor.tutoringStyles?.length > 0 && (
              <span>{tutor.tutoringStyles[0]}</span>
            )}
          </div>

          {/* Request Button */}
          <button
            onClick={handleRequestTutor}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Request this Tutor
          </button>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <TutorRequestModal
          tutor={tutor}
          onClose={() => setShowRequestModal(false)}
        />
      )}
    </>
  );
};

export default TutorCard;