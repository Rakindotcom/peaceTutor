import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/toast';
import { VALIDATION_PATTERNS, DISTRICTS, getAreas } from '../constants/formData';
import { validateForm } from '../utils/validation';
import FormField from './UI/FormField';
import LoadingSpinner from './UI/LoadingSpinner';
import TutorProfileView from './TutorProfileView';

const TutorProfileForm = () => {
  const { user, userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [tutorId, setTutorId] = useState(null);
  const [existingProfileData, setExistingProfileData] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    contactNo: '',
    email: '',
    overview: '',

    // Educational Information
    degree: '',
    instituteName: '',
    examDegreeTitle: '',
    group: '',
    idCardNo: '',
    result: '',
    yearOfPassing: '',
    curriculum: '',
    currentInstitute: false,

    // Tuition Related Information
    availableDays: [],
    availableTimeFrom: '',
    availableTimeTo: '',
    expectedSalary: '',
    preferredCategories: [],
    preferredClasses: [],
    preferredSubjects: '',
    city: '',
    location: '',
    preferredLocations: [],
    tutoringStyles: [],
    placeOfTutoring: [],
    totalExperience: '',
    tutoringMethod: '',

    // Personal Information
    gender: '',
    dateOfBirth: '',
    religion: '',
    birthCertificateNo: '',
    additionalNumber: '',
    address: '',
    nationality: 'Bangladeshi',
    facebookProfile: '',

    // Family Information
    fatherName: '',
    fatherNumber: '',
    motherName: '',
    motherNumber: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    emergencyContactRelation: '',
    emergencyContactAddress: ''
  });

  const [errors, setErrors] = useState({});

  // Options for dropdowns
  const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const categories = ['Bangla Medium', 'English Medium', 'English Version', 'Madrasa Medium'];
  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8',
    'Class 9', 'Class 10', 'SSC', 'HSC - 1st Year', 'HSC- 2nd Year', 'HSC'
  ];
  const tutoringStyleOptions = ['One to One', 'Group Study', 'Online', 'Offline'];
  const placeOfTutoringOptions = ['Student Home', 'Tutor Home', 'Online', 'Coaching Center'];
  const genderOptions = ['Male', 'Female'];
  const religionOptions = ['Islam', 'Hinduism', 'Christianity', 'Buddhism', 'Others'];
  const curriculumOptions = ['bangla_medium', 'english_medium', 'english_version', 'madrasa_medium'];
  const degreeOptions = ['SSC', 'HSC', 'Bachelor/Honors', 'Masters', 'PhD'];

  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        name: userData.fullName || '',
        email: user?.email || '',
        contactNo: userData.phone || ''
      }));
    }
  }, [user, userData]);

  useEffect(() => {
    checkExistingProfile();
  }, [user]);

  const generateTutorId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const checkExistingProfile = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'tutorProfiles'),
        where('email', '==', user.email)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setHasExistingProfile(true);
        const profileData = querySnapshot.docs[0].data();
        setTutorId(profileData.tutorId);
        setFormData(profileData);
        setExistingProfileData(profileData);
      }
    } catch (error) {
      console.error('Error checking existing profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'currentInstitute') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        // Handle array checkboxes
        setFormData(prev => ({
          ...prev,
          [name]: checked
            ? [...(prev[name] || []), value]
            : (prev[name] || []).filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

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
      contactNo: { required: true, pattern: VALIDATION_PATTERNS.phone },
      overview: { required: true, minLength: 10 },
      degree: { required: true },
      instituteName: { required: true, minLength: 2 },
      expectedSalary: { required: true },
      city: { required: true },
      location: { required: true },
      gender: { required: true },
      dateOfBirth: { required: true },
      address: { required: true, minLength: 10 },
      fatherName: { required: true, minLength: 2 },
      motherName: { required: true, minLength: 2 }
    };

    const { isValid, errors: validationErrors } = validateForm(formData, validationRules);

    if (!isValid) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const profileData = {
        ...formData,
        tutorId: tutorId || generateTutorId(),
        userId: user.uid,
        timestamp: new Date(),
        status: 'active',
        updatedAt: new Date()
      };

      if (hasExistingProfile) {
        // Update existing profile
        const q = query(
          collection(db, 'tutorProfiles'),
          where('email', '==', user.email)
        );
        const querySnapshot = await getDocs(q);
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, profileData);
        showToast.success('Tutor profile updated successfully!');
      } else {
        // Create new profile
        await addDoc(collection(db, 'tutorProfiles'), profileData);
        setTutorId(profileData.tutorId);
        showToast.success('Tutor profile created successfully!');
      }

      // Update user profile
      await updateDoc(doc(db, 'users', user.uid), {
        fullName: formData.name,
        phone: formData.contactNo,
        updatedAt: new Date().toISOString()
      });

      setHasExistingProfile(true);
      setShowForm(false);
      setExistingProfileData(profileData);
    } catch (error) {
      console.error('Error saving profile:', error);
      showToast.error('Failed to save profile. Please try again.');
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
          <h2 className="text-xl font-semibold text-gray-900">Tutor Profile</h2>
          <p className="text-sm text-gray-600 mt-1">
            {hasExistingProfile ? 'Update your tutor profile information' : 'Create your comprehensive tutor profile'}
          </p>
          {tutorId && (
            <p className="text-sm text-blue-600 font-medium mt-1">
              Tutor ID: {tutorId}
            </p>
          )}
        </div>
        {!showForm && !showView && (
          <div className="flex space-x-3">
            {hasExistingProfile && (
              <button
                onClick={() => setShowView(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                View Profile
              </button>
            )}
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {hasExistingProfile ? 'Edit Profile' : 'Create Profile'}
            </button>
          </div>
        )}
      </div>

      {hasExistingProfile && !showForm && !showView && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-green-800 font-medium">Profile Active</p>
              <p className="text-green-700 text-sm">
                Your tutor profile is active and visible to students looking for tutors.
              </p>
            </div>
          </div>
        </div>
      )}

      {showView && existingProfileData && (
        <div>
          <div className="mb-4">
            <button
              onClick={() => setShowView(false)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Profile Options
            </button>
          </div>
          <TutorProfileView tutorData={existingProfileData} />
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-8">
          {isLoading && (
            <div className="flex justify-center py-4">
              <LoadingSpinner size="md" message="Saving profile..." />
            </div>
          )}

          {/* Basic Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
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
                label="Contact Number"
                name="contactNo"
                type="tel"
                value={formData.contactNo}
                onChange={handleChange}
                placeholder="Enter your contact number"
                required
                error={errors.contactNo}
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
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Overview <span className="text-red-500">*</span>
              </label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                placeholder="Brief description about your teaching approach and goals"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
              {errors.overview && <p className="text-red-500 text-sm mt-1">{errors.overview}</p>}
            </div>
          </div>

          {/* Educational Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Educational Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree <span className="text-red-500">*</span>
                </label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Degree</option>
                  {degreeOptions.map(degree => (
                    <option key={degree} value={degree}>{degree}</option>
                  ))}
                </select>
                {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
              </div>

              <FormField
                label="Institute Name"
                name="instituteName"
                type="text"
                value={formData.instituteName}
                onChange={handleChange}
                placeholder="Enter your institute name"
                required
                error={errors.instituteName}
              />

              <FormField
                label="Exam / Degree Title"
                name="examDegreeTitle"
                type="text"
                value={formData.examDegreeTitle}
                onChange={handleChange}
                placeholder="e.g., LLB, BSc in CSE"
                error={errors.examDegreeTitle}
              />

              <FormField
                label="Group/Subject"
                name="group"
                type="text"
                value={formData.group}
                onChange={handleChange}
                placeholder="e.g., Science, Commerce, Arts"
                error={errors.group}
              />

              <FormField
                label="ID Card No"
                name="idCardNo"
                type="text"
                value={formData.idCardNo}
                onChange={handleChange}
                placeholder="Student ID number"
                error={errors.idCardNo}
              />

              <FormField
                label="Result"
                name="result"
                type="text"
                value={formData.result}
                onChange={handleChange}
                placeholder="e.g., CGPA 3.75, GPA 5.00"
                error={errors.result}
              />

              <FormField
                label="Year of Passing"
                name="yearOfPassing"
                type="number"
                value={formData.yearOfPassing}
                onChange={handleChange}
                placeholder="e.g., 2024"
                error={errors.yearOfPassing}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Curriculum
                </label>
                <select
                  name="curriculum"
                  value={formData.curriculum}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Curriculum</option>
                  {curriculumOptions.map(curriculum => (
                    <option key={curriculum} value={curriculum}>
                      {curriculum.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
                {errors.curriculum && <p className="text-red-500 text-sm mt-1">{errors.curriculum}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="currentInstitute"
                  checked={formData.currentInstitute}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Currently studying at this institute</span>
              </label>
            </div>
          </div>
          {/* Tuition Related Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tuition Related Information</h3>

            {/* Available Days */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Days
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {daysOfWeek.map(day => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      name="availableDays"
                      value={day}
                      checked={formData.availableDays.includes(day)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                label="Available Time From"
                name="availableTimeFrom"
                type="time"
                value={formData.availableTimeFrom}
                onChange={handleChange}
                error={errors.availableTimeFrom}
              />

              <FormField
                label="Available Time To"
                name="availableTimeTo"
                type="time"
                value={formData.availableTimeTo}
                onChange={handleChange}
                error={errors.availableTimeTo}
              />

              <FormField
                label="Expected Salary (BDT)"
                name="expectedSalary"
                type="number"
                value={formData.expectedSalary}
                onChange={handleChange}
                placeholder="e.g., 6000"
                required
                error={errors.expectedSalary}
              />

              <FormField
                label="City"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Dhaka"
                required
                error={errors.city}
              />

              <FormField
                label="Location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Dhaka University Area"
                required
                error={errors.location}
              />
            </div>

            {/* Preferred Categories */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Categories
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferredCategories"
                      value={category}
                      checked={formData.preferredCategories.includes(category)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Classes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Classes
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {classes.map(cls => (
                  <label key={cls} className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferredClasses"
                      value={cls}
                      checked={formData.preferredClasses.includes(cls)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{cls}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Subjects
              </label>
              <textarea
                name="preferredSubjects"
                value={formData.preferredSubjects}
                onChange={handleChange}
                placeholder="List subjects you can teach (e.g., Mathematics, Physics, Chemistry, English, Accounting, Finance)"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              {errors.preferredSubjects && <p className="text-red-500 text-sm mt-1">{errors.preferredSubjects}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Locations
              </label>
              <textarea
                name="preferredLocations"
                value={formData.preferredLocations.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  preferredLocations: e.target.value.split(',').map(loc => loc.trim()).filter(loc => loc)
                }))}
                placeholder="Enter preferred tutoring locations separated by commas (e.g., Puran Dhaka, Motijheel, Farmgate)"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
            </div>

            {/* Tutoring Styles */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tutoring Styles
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {tutoringStyleOptions.map(style => (
                  <label key={style} className="flex items-center">
                    <input
                      type="checkbox"
                      name="tutoringStyles"
                      value={style}
                      checked={formData.tutoringStyles.includes(style)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{style}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Place of Tutoring */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Place of Tutoring
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {placeOfTutoringOptions.map(place => (
                  <label key={place} className="flex items-center">
                    <input
                      type="checkbox"
                      name="placeOfTutoring"
                      value={place}
                      checked={formData.placeOfTutoring.includes(place)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{place}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Experience
                </label>
                <textarea
                  name="totalExperience"
                  value={formData.totalExperience}
                  onChange={handleChange}
                  placeholder="Describe your teaching experience"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tutoring Method
                </label>
                <textarea
                  name="tutoringMethod"
                  value={formData.tutoringMethod}
                  onChange={handleChange}
                  placeholder="Describe your teaching methodology and approach"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              <FormField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                error={errors.dateOfBirth}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Religion
                </label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Religion</option>
                  {religionOptions.map(religion => (
                    <option key={religion} value={religion}>{religion}</option>
                  ))}
                </select>
              </div>

              <FormField
                label="Birth Certificate No"
                name="birthCertificateNo"
                type="text"
                value={formData.birthCertificateNo}
                onChange={handleChange}
                placeholder="Enter birth certificate number"
                error={errors.birthCertificateNo}
              />

              <FormField
                label="Additional Number"
                name="additionalNumber"
                type="tel"
                value={formData.additionalNumber}
                onChange={handleChange}
                placeholder="Alternative contact number"
                error={errors.additionalNumber}
              />

              <FormField
                label="Nationality"
                name="nationality"
                type="text"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="e.g., Bangladeshi"
                error={errors.nationality}
              />

              <FormField
                label="Facebook Profile Link"
                name="facebookProfile"
                type="url"
                value={formData.facebookProfile}
                onChange={handleChange}
                placeholder="https://www.facebook.com/yourprofile"
                error={errors.facebookProfile}
              />
            </div>

            <div className="mt-4">
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
          </div>

          {/* Family Information */}
          <div className="pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Family & Emergency Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Father's Name"
                name="fatherName"
                type="text"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Enter father's name"
                required
                error={errors.fatherName}
              />

              <FormField
                label="Father's Number"
                name="fatherNumber"
                type="tel"
                value={formData.fatherNumber}
                onChange={handleChange}
                placeholder="Enter father's contact number"
                error={errors.fatherNumber}
              />

              <FormField
                label="Mother's Name"
                name="motherName"
                type="text"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="Enter mother's name"
                required
                error={errors.motherName}
              />

              <FormField
                label="Mother's Number"
                name="motherNumber"
                type="tel"
                value={formData.motherNumber}
                onChange={handleChange}
                placeholder="Enter mother's contact number"
                error={errors.motherNumber}
              />

              <FormField
                label="Emergency Contact Name"
                name="emergencyContactName"
                type="text"
                value={formData.emergencyContactName}
                onChange={handleChange}
                placeholder="Name of emergency contact person"
                error={errors.emergencyContactName}
              />

              <FormField
                label="Emergency Contact Number"
                name="emergencyContactNumber"
                type="tel"
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                placeholder="Emergency contact number"
                error={errors.emergencyContactNumber}
              />

              <FormField
                label="Relation with Emergency Contact"
                name="emergencyContactRelation"
                type="text"
                value={formData.emergencyContactRelation}
                onChange={handleChange}
                placeholder="e.g., Father, Brother, Uncle"
                error={errors.emergencyContactRelation}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact Address
              </label>
              <textarea
                name="emergencyContactAddress"
                value={formData.emergencyContactAddress}
                onChange={handleChange}
                placeholder="Address of emergency contact person"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : hasExistingProfile ? 'Update Profile' : 'Create Profile'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setShowView(false);
              }}
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

export default TutorProfileForm;