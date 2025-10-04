import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { showToast } from '../utils/toast';
import { useAuth } from '../hooks/useAuth';

const PostTuition = () => {
  const { user, userData, isLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: '',
    studentClass: '',
    studentGender: '',
    subjects: '',
    medium: '',
    location: '',
    area: '',
    salary: '',
    schedule: '',
    tutorGenderPreference: '',
    urgency: 'normal',
    additionalRequirements: '',
    guardianPhone: ''
  });

  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8',
    'Class 9', 'Class 10', 'HSC - 1st Year', 'HSC- 2nd Year', 'Admission', 'IELTS'
  ];

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const tuitionData = {
        // Student Information
        studentName: formData.studentName,
        studentClass: formData.studentClass,
        studentGender: formData.studentGender,
        subjects: formData.subjects,
        medium: formData.medium,

        // Location Information
        location: formData.location,
        area: formData.area,

        // Tuition Details
        salary: formData.salary,
        schedule: formData.schedule,
        tutorGenderPreference: formData.tutorGenderPreference,
        urgency: formData.urgency,
        additionalRequirements: formData.additionalRequirements,

        // Guardian Information (phone only visible to admin)
        guardianId: user.uid,
        guardianName: userData?.fullName || user.email,
        guardianEmail: user.email,
        guardianPhone: formData.guardianPhone, // Only admin can see this

        // System Fields
        status: 'active',
        createdAt: serverTimestamp(),
        assignedTutor: null,
        assignedDate: null,
        startDate: null,

        // Payment tracking
        paymentDetails: {
          amount: null,
          paymentDate: null,
          remainingDues: null,
          paymentHistory: []
        },

        // Application tracking
        applications: [],
        applicationsCount: 0
      };

      await addDoc(collection(db, 'tuitionPosts'), tuitionData);

      showToast.success('Tuition posted successfully! Tutors will be able to see and apply for this opportunity.');
      navigate('/guardian-dashboard');
    } catch (error) {
      console.error('Error posting tuition:', error);
      showToast.error('Failed to post tuition. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a Tuition</h1>
          <p className="mt-2 text-gray-600">Find the perfect tutor for your student</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Information */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    id="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter student's name"
                  />
                </div>

                <div>
                  <label htmlFor="studentClass" className="block text-sm font-medium text-gray-700">
                    Student Class *
                  </label>
                  <select
                    name="studentClass"
                    id="studentClass"
                    required
                    value={formData.studentClass}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="studentGender" className="block text-sm font-medium text-gray-700">
                    Student Gender *
                  </label>
                  <select
                    name="studentGender"
                    id="studentGender"
                    required
                    value={formData.studentGender}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="medium" className="block text-sm font-medium text-gray-700">
                    Medium *
                  </label>
                  <select
                    name="medium"
                    id="medium"
                    required
                    value={formData.medium}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Medium</option>
                    <option value="Bangla Medium">Bangla Medium</option>
                    <option value="English Medium">English Medium</option>
                    <option value="English Version">English Version</option>
                    <option value="Madrasa Medium">Madrasa Medium</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-700">
                  Subjects *
                </label>
                <input
                  type="text"
                  name="subjects"
                  id="subjects"
                  required
                  value={formData.subjects}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    City/District *
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Dhaka, Chittagong"
                  />
                </div>

                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                    Area/Location *
                  </label>
                  <input
                    type="text"
                    name="area"
                    id="area"
                    required
                    value={formData.area}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Dhanmondi, Gulshan"
                  />
                </div>
              </div>
            </div>

            {/* Tuition Details */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tuition Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                    Salary (per month) *
                  </label>
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    required
                    value={formData.salary}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 8000"
                  />
                </div>

                <div>
                  <label htmlFor="tutorGenderPreference" className="block text-sm font-medium text-gray-700">
                    Tutor Gender Preference
                  </label>
                  <select
                    name="tutorGenderPreference"
                    id="tutorGenderPreference"
                    value={formData.tutorGenderPreference}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">No Preference</option>
                    <option value="Male">Male Tutor</option>
                    <option value="Female">Female Tutor</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
                    Urgency Level *
                  </label>
                  <select
                    name="urgency"
                    id="urgency"
                    required
                    value={formData.urgency}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="very_urgent">Very Urgent</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="guardianPhone" className="block text-sm font-medium text-gray-700">
                    Your Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="guardianPhone"
                    id="guardianPhone"
                    required
                    value={formData.guardianPhone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="01XXXXXXXXX"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Only admin can see your phone number for privacy protection
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                  Preferred Schedule
                </label>
                <textarea
                  name="schedule"
                  id="schedule"
                  rows={2}
                  value={formData.schedule}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Monday, Wednesday, Friday - 4:00 PM to 6:00 PM"
                />
              </div>
            </div>

            <div>
              <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700">
                Additional Requirements
              </label>
              <textarea
                name="additionalRequirements"
                id="additionalRequirements"
                rows={3}
                value={formData.additionalRequirements}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any specific requirements or qualifications..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/guardian-dashboard')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Tuition'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostTuition;