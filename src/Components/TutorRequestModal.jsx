import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/toast';
import { notifyTutorRequest } from '../utils/notifications';
import LoadingSpinner from './UI/LoadingSpinner';

const TutorRequestModal = ({ tutor, onClose }) => {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    studentClass: '',
    subjects: '',
    preferredSchedule: '',
    location: '',
    phoneNumber: '',
    additionalRequirements: '',
    urgency: 'normal'
  });

  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8',
    'Class 9', 'Class 10', 'HSC - 1st Year', 'HSC- 2nd Year', 'Admission', 'IELTS'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        // Guardian Information
        guardianId: user.uid,
        guardianName: userData?.fullName || user.email,
        guardianEmail: user.email,
        guardianPhone: formData.phoneNumber,

        // Tutor Information
        tutorId: tutor.tutorId,
        tutorName: tutor.name,
        tutorEmail: tutor.email,
        tutorDocId: tutor.id,

        // Request Details
        studentName: formData.studentName,
        studentClass: formData.studentClass,
        subjects: formData.subjects,
        preferredSchedule: formData.preferredSchedule,
        location: formData.location,
        additionalRequirements: formData.additionalRequirements,
        urgency: formData.urgency,

        // System Fields
        status: 'pending',
        requestDate: new Date(),
        createdAt: new Date().toISOString(),

        // For admin tracking
        adminNotes: '',
        assignedDate: null,
        startDate: null,
        paymentDetails: {
          amount: null,
          paymentDate: null,
          remainingDues: null,
          paymentHistory: []
        }
      };

      await addDoc(collection(db, 'tutorRequests'), requestData);

      // Send notification to tutor
      await notifyTutorRequest(
        tutor.userId,
        userData?.fullName || user.email,
        formData.studentClass,
        formData.subjects
      );

      showToast.success('Tutor request submitted successfully! The tutor has been notified.');
      onClose();
    } catch (error) {
      console.error('Error submitting request:', error);
      showToast.error('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Request Tutor</h2>
              <p className="text-sm text-gray-600">
                Requesting: <span className="font-medium">{tutor.name}</span> (ID: {tutor.tutorId})
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter student's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Class <span className="text-red-500">*</span>
                </label>
                <select
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subjects <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Mathematics, Physics, Chemistry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="01XXXXXXXXX"
              />
              <p className="text-xs text-gray-500 mt-1">
                Only admin can see your phone number for privacy protection
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tutoring Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your area/location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Schedule
              </label>
              <textarea
                name="preferredSchedule"
                value={formData.preferredSchedule}
                onChange={handleChange}
                rows="2"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Monday, Wednesday, Friday - 4:00 PM to 6:00 PM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urgency Level
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="very_urgent">Very Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Requirements
              </label>
              <textarea
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any specific requirements or preferences..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {loading && <LoadingSpinner size="sm" className="mr-2" />}
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorRequestModal;