# Admin Setup Instructions

This document provides instructions for creating the first admin user in the Peace Tutor BD system.

## ⚠️ Security Warning

Admin accounts have full access to the system. Only create admin accounts for trusted personnel and follow security best practices.

## Method 1: Using Admin Setup Page (Recommended for Initial Setup)

1. **Access the setup page**: Navigate to `/admin-setup` in your browser
2. **Fill in admin details**:
   - Full Name: System Administrator
   - Email: admin@peacetutorbd.com (or your preferred admin email)
   - Phone: Your admin phone number
   - Password: Use a strong, secure password
3. **Create the account**: Click "Create Admin User"
4. **⚠️ IMPORTANT**: After creating the first admin, immediately remove the `/admin-setup` route from `src/App.jsx` for security

## Method 2: Manual Creation via Firebase Console

### Step 1: Create Firebase Auth User
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Authentication** → **Users**
4. Click **Add user**
5. Enter email and password
6. Copy the generated **User UID**

### Step 2: Create Firestore Document
1. Navigate to **Firestore Database**
2. Create a collection named `users` (if it doesn't exist)
3. Click **Add document**
4. Use the **User UID** from Step 1 as the **Document ID**
5. Add the following fields:

```
uid: [User UID from Step 1]
email: "admin@peacetutorbd.com"
fullName: "System Administrator"
phone: "01700000000"
role: "admin"
createdAt: [Current ISO date string, e.g., "2024-01-15T10:30:00.000Z"]
isActive: true
createdBy: "manual"
permissions: {
  canManageUsers: true
  canViewReports: true
  canManageContent: true
  canAccessAnalytics: true
}
```

## Method 3: Using Developer Utility (Development Only)

If you're a developer with access to the codebase:

1. Open `src/utils/createAdmin.js`
2. Uncomment and modify the example usage at the bottom
3. Run the function to create the admin user
4. **Important**: Don't commit uncommented admin creation code

## After Creating Admin

1. **Test the admin login**:
   - Go to `/admin-login`
   - Use the admin credentials you created
   - Verify access to `/admin` dashboard

2. **Security cleanup**:
   - Remove `/admin-setup` route from `src/App.jsx`
   - Delete or secure the `AdminSetup.jsx` component
   - Ensure no admin creation utilities are exposed in production

3. **Additional admins**:
   - Use Method 2 (Firebase Console) for creating additional admin users
   - Never use the public sign-up process for admin accounts

## Troubleshooting

### "Access denied" error
- Verify the user document exists in Firestore `users` collection
- Check that `role` field is set to `"admin"`
- Ensure `isActive` field is set to `true`

### "Admin account not found" error
- The Firebase Auth user exists but no corresponding Firestore document
- Create the Firestore document using Method 2, Step 2

### Can't access admin dashboard
- Verify you're using `/admin-login` not `/login`
- Check browser console for any JavaScript errors
- Ensure Firebase configuration is correct

## Security Best Practices

1. **Strong passwords**: Use complex passwords for admin accounts
2. **Limited access**: Only create admin accounts for necessary personnel
3. **Regular audits**: Periodically review admin user list
4. **Remove setup tools**: Delete admin creation tools from production
5. **Monitor access**: Keep logs of admin dashboard access
6. **Two-factor authentication**: Consider implementing 2FA for admin accounts (future enhancement)

## Support

If you encounter issues during admin setup, check:
1. Firebase project configuration
2. Firestore security rules
3. Network connectivity
4. Browser console for errors

For additional support, contact the development team.