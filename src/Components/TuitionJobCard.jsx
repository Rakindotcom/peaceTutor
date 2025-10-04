import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/toast';
import { notifyTuitionApplication } from '../utils/notifications';
import LoadingSpinner from './UI/LoadingSpinner';

const TuitionJobCard = ({ job }) => {
  const { user, userData } = useAuth();
  const [applying, setApplying] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    if (date.toDate) {
      return date.toDate().toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'very_urgent':
        return 'bg-red-100 text-red-800';
      case 'urgent':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'very_urgent':
        return 'Very Urgent';
      case 'urgent':
        return 'Urgent';
      default:
        return 'Normal';
    }
  };

  const handleApply = async () => {
    if (!user || userData?.role !== 'tutor') {
      showToast.error('Only verified tutors can apply for tuitions');
      return;
    }

    setApplying(true);

    try {
      const applicationData = {
        // Job Information
        jobId: job.id,
        jobTitle: `${job.studentClass} - ${job.subjects}`,

        // Tutor Information
        tutorId: userData.tutorId || user.uid,
        tutorName: userData.fullName,
        tutorEmail: user.email,
        tutorPhone: userData.phone,

        // Guardian Information (from job post)
        guardianId: job.guardianId,
        guardianName: job.guardianName,
        guardianEmail: job.guardianEmail,

        // Application Details
        appliedAt: new Date(),
        status: 'pending',
        message: `I am interested in teaching ${job.subjects} to your ${job.studentClass} student. I have relevant experience and am available for the mentioned schedule.`,

        // System Fields
        createdAt: new Date().toISOString(),
        adminNotes: '',

        // Job Details for reference
        jobDetails: {
          studentClass: job.studentClass,
          subjects: job.subjects,
          location: job.location,
          salary: job.salary,
          schedule: job.schedule,
          urgency: job.urgency
        }
      };

      await addDoc(collection(db, 'tuitionApplications'), applicationData);

      // Send notification to guardian
      await notifyTuitionApplication(
        job.guardianId,
        userData.fullName,
        job.studentClass,
        job.subjects
      );

      showToast.success('Application submitted successfully! The guardian will be notified.');
    } catch (error) {
      console.error('Error submitting application:', error);
      showToast.error('Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {job.studentClass} - {job.subjects}
            </h3>
            <p className="text-sm text-gray-600">Posted by: {job.guardianName}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-green-600">৳{job.salary}</p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
        </div>

        {/* Urgency Badge */}
        <div className="mb-3">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(job.urgency)}`}>
            {getUrgencyText(job.urgency)}
          </span>
        </div>

        {/* Location */}
        <div className="mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{job.location}</span>
            {job.area && <span>, {job.area}</span>}
          </div>
        </div>

        {/* Student Details */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-700 w-20">Student:</span>
            <span className="text-gray-600">{job.studentName || 'Not specified'}</span>
          </div>

          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-700 w-20">Gender:</span>
            <span className="text-gray-600">{job.studentGender || 'Not specified'}</span>
          </div>

          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-700 w-20">Medium:</span>
            <span className="text-gray-600">{job.medium || 'Not specified'}</span>
          </div>
        </div>

        {/* Schedule */}
        {job.schedule && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Preferred Schedule:</p>
            <p className="text-sm text-gray-600">{job.schedule}</p>
          </div>
        )}

        {/* Tutor Preferences */}
        {job.tutorGenderPreference && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Tutor Preference:</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {job.tutorGenderPreference} Tutor Preferred
            </span>
          </div>
        )}

        {/* Additional Requirements */}
        {job.additionalRequirements && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Requirements:</p>
            <p className="text-sm text-gray-600 line-clamp-2">{job.additionalRequirements}</p>
          </div>
        )}

        {/* Posted Date */}
        <div className="mb-4">
          <p className="text-xs text-gray-500">
            Posted on: {formatDate(job.createdAt)}
          </p>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          disabled={applying}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {applying && <LoadingSpinner size="sm" className="mr-2" />}
          {applying ? 'Applying...' : 'Apply for this Tuition'}
        </button>
      </div>
    </div>
  );
};

export default TuitionJobCard;