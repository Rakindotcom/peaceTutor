/**
 * Utility script to create admin users in Firestore
 * This should be run manually by developers/system administrators
 * 
 * IMPORTANT: This is for development/setup purposes only.
 * In production, admin users should be created through a secure admin panel
 * or directly in the Firebase console.
 */

import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Creates an admin user account
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @param {string} fullName - Admin full name
 * @param {string} phone - Admin phone number (optional)
 * @returns {Promise<void>}
 */
export const createAdminUser = async (email, password, fullName, phone = '') => {
  try {
    console.log('Creating admin user...');

    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore with admin role
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      fullName: fullName,
      phone: phone,
      role: "admin",
      createdAt: new Date().toISOString(),
      isActive: true,
      createdBy: "system", // Indicates this was created by system admin
      permissions: {
        canManageUsers: true,
        canViewReports: true,
        canManageContent: true,
        canAccessAnalytics: true
      }
    });

    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('UID:', user.uid);

    return {
      success: true,
      uid: user.uid,
      email: email
    };

  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

/**
 * Example usage (uncomment and modify as needed):
 * 
 * // To create an admin user, uncomment and run this:
 * createAdminUser(
 *   'admin@peacetutorbd.com',
 *   'SecurePassword123!',
 *   'System Administrator',
 *   '01700000000'
 * ).then(() => {
 *   console.log('Admin creation completed');
 * }).catch((error) => {
 *   console.error('Failed to create admin:', error);
 * });
 */

// Instructions for manual admin creation:
console.log(`
=== ADMIN USER CREATION INSTRUCTIONS ===

To create an admin user manually:

1. Go to Firebase Console > Firestore Database
2. Create a new collection called "users" (if it doesn't exist)
3. Add a new document with the following structure:

Document ID: [Use the Firebase Auth UID]
{
  "uid": "[Firebase Auth UID]",
  "email": "admin@peacetutorbd.com",
  "fullName": "System Administrator",
  "phone": "01700000000",
  "role": "admin",
  "createdAt": "[Current ISO date string]",
  "isActive": true,
  "createdBy": "manual",
  "permissions": {
    "canManageUsers": true,
    "canViewReports": true,
    "canManageContent": true,
    "canAccessAnalytics": true
  }
}

4. Create the corresponding Firebase Auth user with the same email
5. Use the Auth UID as the document ID in Firestore

===========================================
`);