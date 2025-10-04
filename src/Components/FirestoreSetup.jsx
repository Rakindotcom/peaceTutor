import React, { useState } from 'react';
import { initializeFirestore } from '../utils/initializeFirestore';
import { showToast } from '../utils/toast';
import LoadingSpinner from './UI/LoadingSpinner';

/**
 * FirestoreSetup Component
 * 
 * This component helps initialize Firestore collections
 * Use this if you're getting permission errors due to missing collections
 * 
 * REMOVE THIS COMPONENT AFTER INITIAL SETUP
 */
const FirestoreSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleInitialize = async () => {
    setIsLoading(true);
    try {
      await initializeFirestore();
      showToast.success('Firestore collections initialized successfully!');
      setIsInitialized(true);
    } catch (error) {
      console.error('Initialization error:', error);
      showToast.error('Failed to initialize Firestore: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialized) {
    return (
      <div className="max-w-md mx-auto px-6 py-12 bg-green-50 rounded-2xl shadow-lg mt-10 border border-green-200">
        <div className="text-center">
          <div className="text-green-600 text-4xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Firestore Initialized!</h2>
          <p className="text-green-700 mb-4">
            Firestore collections have been created. You can now use the app normally.
          </p>
          <div className="text-sm text-green-600 space-y-2">
            <p><strong>Next steps:</strong></p>
            <p>1. Try signing up a new user</p>
            <p>2. Check Firebase Console for collections</p>
            <p>3. Remove this setup component</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg mt-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">🔧 Firestore Setup</h1>
        <p className="text-gray-600 text-sm">
          Initialize Firestore collections to fix permission errors
        </p>
      </div>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>What this does:</strong> Creates the necessary Firestore collections
          with sample data so your app can work properly.
        </p>
      </div>

      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Before running:</strong> Make sure you've applied the Firestore
          security rules from the FIRESTORE_SETUP.md file.
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner size="lg" message="Initializing Firestore..." />
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleInitialize}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Initialize Firestore Collections
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              This will create sample documents in Firestore collections
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Alternative:</strong> Just try signing up a user normally.
          Collections will be created automatically if security rules are correct.
        </p>
      </div>
    </div>
  );
};

export default FirestoreSetup;