import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/toast';
import { VALIDATION_PATTERNS, DISTRICTS, CATEGORIES, GRADES, ACADEMIC_YEARS, getAreas } from '../constants/formData';
import { validateForm } from '../utils/validation';
import FormField from './UI/FormField';
import LoadingSpinner from './UI/LoadingSpinner';

const TutorApplication = () => {
  const { user, userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hasExistingApplication, setHasExistingApplication] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    district: '',
    area: '',
    university: '',
    department: '',
    year: '',
    cgpa: '',
    experience: '',
    expectedSalary: '',
    preferredSubjects: '',
    address: '',
    availability: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        name: userData.fullName || '',
        email: user?.email || '',
        phone: userData.phone || ''
      }));
    }
  }, [user, userData]);

  useEffect(() => {
    checkExistingApplication();
  }, [user]);

  const checkExistingApplication = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'tutorApplications'),
        where('email', '==', user.email),
        orderBy('timestamp', 'desc'),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      setHasExistingApplication(!querySnapshot.empty);
    } catch (error) {
      console.error('Error checking existing application:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation rules
    const validationRules = {
      name: { required: true, minLength: 2 },
      email: { required: true, pattern: VALIDATION_PATTERNS.email },
      phone: { required: true, pattern: VALIDATION_PATTERNS.phone },
      district: { required: true },
      area: { required: true },
      university: { required: true, minLength: 2 },
      department: { required: true, minLength: 2 },
      year: { required: true },
      cgpa: { required: true },
      experience: { required: true },
      expectedSalary: { required: true },
      preferredSubjects: { required: true, minLength: 5 },
      address: { required: true, minLength: 10 },
      availability: { required: true }
    };

    const { isValid, errors: validationErrors } = validateForm(formData, validationRules);

    if (!isValid) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Submit tutor application
      await addDoc(collection(db, 'tutorApplications'), {
        ...formData,
        timestamp: new Date(),
        status: 'pending',
        userId: user.uid
      });

      // Update user profile with tutor application data
      await updateDoc(doc(db, 'users', user.uid), {
        fullName: formData.name,
        phone: formData.phone,
        district: formData.district,
        area: formData.area,
        university: formData.university,
        department: formData.department,
        updatedAt: new Date().toISOString()
      });

      showToast.success('Tutor application submitted successfully! Your profile has been updated.');
      setHasExistingApplication(true);
      setShowForm(false);

      // Reset form
      setFormData({
        name: userData?.fullName || '',
        email: user?.email || '',
        phone: userData?.phone || '',
        district: '',
        area: '',
        university: '',
        department: '',
        year: '',
        cgpa: '',
        experience: '',
        expectedSalary: '',
        preferredSubjects: '',
        address: '',
        availability: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      showToast.error('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (userData?.role !== 'tutor') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tutor Application</h2>
          <p className="text-sm text-gray-600 mt-1">
            Apply to become a verified tutor on our platform
          </p>
        </div>
        {!hasExistingApplication && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </button>
        )}
      </div>

      {hasExistingApplication && !showForm && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-green-800 font-medium">Application Submitted</p>
              <p className="text-green-700 text-sm">
                Your tutor application has been submitted and is under review. We'll contact you soon!
              </p>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {isLoading && (
            <div className="flex justify-center py-4">
              <LoadingSpinner size="md" message="Submitting application..." />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              error={errors.name}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              error={errors.email}
              disabled
            />

            <FormField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              error={errors.phone}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select District</option>
                {DISTRICTS.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area <span className="text-red-500">*</span>
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!formData.district}
              >
                <option value="">Select Area</option>
                {formData.district && getAreas(formData.district).map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
            </div>

            <FormField
              label="University"
              name="university"
              type="text"
              value={formData.university}
              onChange={handleChange}
              placeholder="Enter your university name"
              required
              error={errors.university}
            />

            <FormField
              label="Department"
              name="department"
              type="text"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter your department"
              required
              error={errors.department}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Year <span className="text-red-500">*</span>
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Year</option>
                {ACADEMIC_YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
            </div>

            <FormField
              label="CGPA"
              name="cgpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={formData.cgpa}
              onChange={handleChange}
              placeholder="Enter your CGPA"
              required
              error={errors.cgpa}
            />

            <FormField
              label="Teaching Experience"
              name="experience"
              type="text"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 2 years home tutoring"
              required
              error={errors.experience}
            />

            <FormField
              label="Expected Salary (per month)"
              name="expectedSalary"
              type="text"
              value={formData.expectedSalary}
              onChange={handleChange}
              placeholder="e.g., 15000-20000 BDT"
              required
              error={errors.expectedSalary}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Subjects <span className="text-red-500">*</span>
            </label>
            <textarea
              name="preferredSubjects"
              value={formData.preferredSubjects}
              onChange={handleChange}
              placeholder="List the subjects you can teach (e.g., Mathematics, Physics, Chemistry, English)"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
            {errors.preferredSubjects && <p className="text-red-500 text-sm mt-1">{errors.preferredSubjects}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability <span className="text-red-500">*</span>
            </label>
            <textarea
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="Describe your available time slots (e.g., Weekdays 4-8 PM, Weekends 10 AM-6 PM)"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
            {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TutorApplication;