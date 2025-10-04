# Firestore Setup Guide

## Step 1: Apply Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**
4. Replace the existing rules with this content:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - Allow user creation and self-access
    match /users/{userId} {
      // Allow users to create their own document during signup
      allow create: if request.auth != null && 
        request.auth.uid == userId &&
        request.resource.data.uid == request.auth.uid;
      
      // Allow users to read and update their own document
      allow read, update: if request.auth != null && request.auth.uid == userId;
      
      // Allow admins to read all user documents
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Public collections - allow public writes, authenticated reads
    match /hireRequests/{document} {
      allow read: if request.auth != null;
      allow write: if true;
    }
    
    match /tutorApplications/{document} {
      allow read: if request.auth != null;
      allow write: if true;
    }
    
    match /contactMessages/{document} {
      allow read: if request.auth != null;
      allow write: if true;
    }
    
    match /tuitions/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

5. Click **Publish**

## Step 2: Test Rules (Optional)

Use the Firebase Console Rules Playground to test:
1. Go to **Rules** tab in Firestore
2. Click **Rules Playground**
3. Test scenarios:
   - User creation: `users/test-uid` with auth uid `test-uid`
   - User read: `users/test-uid` with auth uid `test-uid`

## Step 3: Create First User

After applying rules, try creating a user account through your app. The users collection will be created automatically.

## Alternative: Temporary Permissive Rules (Development Only)

If you're still having issues, temporarily use these permissive rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ IMPORTANT**: Replace with proper rules before going to production!

## Step 4: Verify Setup

1. Try signing up a new user
2. Check Firestore Database for the `users` collection
3. Verify the user document was created with correct structure

## Troubleshooting

If you still get permission errors:
1. Check browser console for specific error messages
2. Verify Firebase project configuration
3. Ensure you're using the correct Firebase project
4. Try clearing browser cache and localStorage