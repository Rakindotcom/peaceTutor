import React, { useState } from 'react';
import { createAdminUser } from '../utils/createAdmin';
import { showToast } from '../utils/toast';
import FormField from './UI/FormField';
import LoadingSpinner from './UI/LoadingSpinner';

/**
 * AdminSetup Component
 * 
 * This component should ONLY be used during initial system setup
 * to create the first admin user. After the first admin is created,
 * this component should be removed or access should be restricted.
 * 
 * WARNING: This is a security-sensitive component and should not be
 * accessible in production without proper authentication.
 */
const AdminSetup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      showToast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await createAdminUser(
        formData.email,
        formData.password,
        formData.fullName,
        formData.phone
      );

      showToast.success('Admin user created successfully!');
      setIsCreated(true);

      // Clear form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: ''
      });

    } catch (error) {
      console.error('Error creating admin:', error);
      showToast.error('Failed to create admin user: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isCreated) {
    return (
      <div className="max-w-md mx-auto px-6 py-12 bg-green-50 rounded-2xl shadow-lg mt-10 border border-green-200">
        <div className="text-center">
          <div className="text-green-600 text-4xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Admin Created Successfully!</h2>
          <p className="text-green-700 mb-4">
            The admin user has been created and can now log in through the admin login page.
          </p>
          <p className="text-sm text-green-600">
            <strong>Important:</strong> Remove or restrict access to this setup page for security.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg mt-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-red-700 mb-2">⚠️ Admin Setup</h1>
        <p className="text-gray-600 text-sm">
          This is for initial system setup only. Remove after creating the first admin.
        </p>
      </div>

      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800">
          <strong>Security Warning:</strong> This page should only be accessible during initial setup.
          Remove or restrict access after creating the first admin user.
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner size="lg" message="Creating admin user..." />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter admin full name"
            required
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@peacetutorbd.com"
            required
          />

          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="01700000000"
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter secure password"
            required
          />

          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition transform hover:scale-105"
          >
            Create Admin User
          </button>
        </form>
      )}

      <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Alternative:</strong> You can also create admin users manually in Firebase Console:
          Authentication → Users (create user) → Firestore → users collection (add role: "admin")
        </p>
      </div>
    </div>
  );
};

export default AdminSetup;