# Troubleshooting Guide

## Common Issues and Solutions

### 1. "You don't have permission to perform this action" Error

This error typically occurs because:
- **Firestore security rules** are restrictive
- **Users collection doesn't exist** yet
- **Default Firebase rules** deny operations

#### **Solution A: Apply Proper Firestore Rules (Recommended)**
1. Follow the complete guide in `FIRESTORE_SETUP.md`
2. Go to [Firebase Console](https://console.firebase.google.com)
3. Navigate to **Firestore Database** → **Rules**
4. Apply the security rules provided
5. Click **Publish**

#### **Solution B: Initialize Firestore Collections**
If collections don't exist, use one of these methods:

**Method 1: Use Setup Page**
1. Visit `/firestore-setup` in your browser
2. Click "Initialize Firestore Collections"
3. Check Firebase Console for created collections

**Method 2: Manual Creation**
1. Go to Firebase Console → Firestore Database
2. Create collections manually: `users`, `hireRequests`, `tutorApplications`, `contactMessages`
3. Add a sample document to each collection

**Method 3: Just Sign Up**
- Try creating a user account normally
- Collections will be created automatically if rules are correct

#### **Solution C: Temporary Permissive Rules (Development Only)**
For immediate testing, use permissive rules:

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

**⚠️ WARNING**: Replace with proper rules before production!

#### **Solution D: Check Authentication**
Ensure the user is properly authenticated:
1. Check browser console for authentication errors
2. Verify Firebase configuration in `src/firebase.js`
3. Ensure user is logged in before accessing Firestore

### 2. User Data Not Saving During Sign-up

#### **Symptoms:**
- Account created successfully in Firebase Auth
- User document not created in Firestore
- "Profile setup incomplete" warning

#### **Solutions:**
1. **Check Firestore Rules**: Ensure users can create their own documents
2. **Verify Network**: Check for network connectivity issues
3. **Check Browser Console**: Look for specific error messages
4. **Manual Fix**: Create user document manually in Firestore

#### **Manual User Document Creation:**
1. Go to Firebase Console → Firestore Database
2. Navigate to `users` collection
3. Add document with User UID as document ID
4. Add required fields:
   ```json
   {
     "uid": "user-firebase-uid",
     "email": "user@example.com",
     "fullName": "User Name",
     "phone": "01XXXXXXXXX",
     "role": "tutor|guardian",
     "createdAt": "2024-01-15T10:30:00.000Z",
     "isActive": true
   }
   ```

### 3. Forgot Password Not Working

#### **Symptoms:**
- "Forgot Password" button doesn't send email
- Error messages when trying to reset password

#### **Solutions:**
1. **Check Email Configuration**: Verify Firebase Auth email settings
2. **Check Spam Folder**: Password reset emails might be in spam
3. **Verify Email Address**: Ensure the email address is correct and exists
4. **Check Firebase Auth Settings**:
   - Go to Firebase Console → Authentication → Templates
   - Verify "Password reset" template is enabled and configured

### 4. User Role Not Recognized

#### **Symptoms:**
- "Access denied" errors for valid users
- Users redirected to wrong dashboards
- Role verification failures

#### **Solutions:**
1. **Check User Document**: Verify user document exists in Firestore
2. **Verify Role Field**: Ensure `role` field is correctly set
3. **Check Active Status**: Verify `isActive` field is `true`
4. **Clear Browser Cache**: Sometimes cached data causes issues

#### **Manual Role Fix:**
1. Go to Firebase Console → Firestore Database
2. Find user document in `users` collection
3. Edit the document and set correct `role` value
4. Ensure `isActive` is set to `true`

### 5. Dashboard Access Issues

#### **Symptoms:**
- Infinite loading on dashboard pages
- "Verifying access" message doesn't disappear
- Redirected to login page repeatedly

#### **Solutions:**
1. **Check Authentication State**: Verify user is properly logged in
2. **Check User Data**: Ensure user document exists in Firestore
3. **Clear Browser Storage**: Clear localStorage and sessionStorage
4. **Check Network**: Verify internet connectivity
5. **Refresh Page**: Sometimes a simple refresh fixes the issue

### 6. Admin Login Issues

#### **Symptoms:**
- "Access denied" for admin users
- "Admin account not found" error
- Can't access admin dashboard

#### **Solutions:**
1. **Create Admin User**: Use `/admin-setup` or manual creation
2. **Verify Admin Role**: Check Firestore document has `role: "admin"`
3. **Check Active Status**: Ensure `isActive: true`
4. **Use Correct Login**: Use `/admin-login` not `/login`

### 7. Development Setup Issues

#### **Firebase Configuration:**
Ensure your `.env` file has correct Firebase configuration:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

#### **Dependencies:**
Ensure all required packages are installed:
```bash
npm install firebase react-router-dom react-toastify
```

## Getting Help

If you're still experiencing issues:

1. **Check Browser Console**: Look for specific error messages
2. **Check Firebase Console**: Look for errors in Firebase logs
3. **Test with Different Browser**: Rule out browser-specific issues
4. **Check Network**: Ensure stable internet connection
5. **Contact Support**: Provide specific error messages and steps to reproduce

## Useful Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Check for linting errors
npm run lint
```

## Firebase Console Links

- [Authentication](https://console.firebase.google.com/project/_/authentication/users)
- [Firestore Database](https://console.firebase.google.com/project/_/firestore)
- [Project Settings](https://console.firebase.google.com/project/_/settings/general)
- [Usage and Billing](https://console.firebase.google.com/project/_/usage)