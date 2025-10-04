/**
 * Utility to initialize Firestore collections
 * This creates the basic structure needed for the app to work
 */

import { db } from '../firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

/**
 * Initialize Firestore collections with sample data
 * This should be run once during initial setup
 */
export const initializeFirestore = async () => {
  try {

    // Create a sample user document to initialize the users collection
    const sampleUserId = 'sample-user-' + Date.now();
    await setDoc(doc(db, 'users', sampleUserId), {
      uid: sampleUserId,
      email: 'sample@example.com',
      fullName: 'Sample User',
      phone: '01700000000',
      role: 'tutor',
      createdAt: new Date().toISOString(),
      isActive: false, // Inactive so it won't interfere
      isSample: true // Mark as sample data
    });

    // Initialize other collections with sample documents
    await addDoc(collection(db, 'hireRequests'), {
      name: 'Sample Request',
      email: 'sample@example.com',
      timestamp: new Date(),
      isSample: true
    });

    await addDoc(collection(db, 'tutorApplications'), {
      name: 'Sample Application',
      email: 'sample@example.com',
      timestamp: new Date(),
      isSample: true
    });

    await addDoc(collection(db, 'contactMessages'), {
      name: 'Sample Message',
      email: 'sample@example.com',
      message: 'Sample contact message',
      timestamp: new Date(),
      isSample: true
    });



    return {
      success: true,
      message: 'Firestore collections initialized successfully!'
    };

  } catch (error) {
    throw error;
  }
};

/**
 * Clean up sample data
 */
export const cleanupSampleData = async () => {
  try {
    // This function would clean up sample data
    // For now, please delete sample documents manually from Firebase Console

    // Note: Deleting documents requires additional setup
    // For now, users can delete sample documents manually

  } catch (error) {
    throw error;
  }
};

// Instructions for manual execution
// To initialize Firestore collections:
// 1. Open browser console on your app
// 2. Run: initializeFirestore()
// 3. Check Firebase Console for created collections
// 4. Delete sample documents if needed
// Alternatively, just try signing up a user - collections will be created automatically.