# Firestore Setup Guide

## Database Rules

Replace your Firestore rules with the following to ensure proper security:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data, admins can read all
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Tutor profiles - public read for verified tutors, write only by owner or admin
    match /tutorProfiles/{profileId} {
      allow read: if resource.data.status == 'verified';
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Tuition posts - public read for active posts, write by guardians and admins
    match /tuitionPosts/{postId} {
      allow read: if resource.data.status == 'active';
      allow read, write: if request.auth != null && request.auth.uid == resource.data.guardianId;
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Tutor requests - read/write by involved parties and admin
    match /tutorRequests/{requestId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.guardianId || 
         request.auth.uid == resource.data.tutorId);
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Tuition applications - read/write by involved parties and admin
    match /tuitionApplications/{applicationId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.guardianId || 
         request.auth.uid == resource.data.tutorId);
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Notifications - read/write by owner only
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Tutor edit requests - admin only
    match /tutorEditRequests/{requestId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow read: if request.auth != null && request.auth.uid == resource.data.requestedBy;
    }
  }
}
```

## Required Collections

The following collections will be created automatically when data is first added:

1. **users** - User profiles and roles
2. **tutorProfiles** - Tutor profile information
3. **tuitionPosts** - Job postings from guardians
4. **tutorRequests** - Direct tutor requests from guardians
5. **tuitionApplications** - Tutor applications for jobs
6. **notifications** - Real-time notifications
7. **tutorEditRequests** - Tutor profile edit requests

## Index Requirements

If you encounter index errors, Firestore will provide direct links to create the required indexes. The most common ones needed are:

### For tutorProfiles collection:
- **status** (Ascending) + **city** (Ascending)
- **status** (Ascending) + **location** (Ascending)

### For tuitionPosts collection:
- **status** (Ascending) + **createdAt** (Descending)

### For notifications collection:
- **userId** (Ascending) + **isRead** (Ascending)

## Initial Setup Steps

1. **Deploy Firestore Rules**: Copy the rules above to your Firestore Rules tab
2. **Create Admin User**: Use the admin setup component or manually create in Firestore Console
3. **Test Collections**: Try creating a tutor profile to initialize collections
4. **Create Indexes**: Click the provided links when index errors occur

## Security Features

- **Guardian phone numbers**: Only visible to admins
- **Role-based access**: Different permissions for tutors, guardians, and admins
- **Profile verification**: Tutors must be verified by admin before appearing publicly
- **Edit restrictions**: Tutors cannot directly edit profiles after creation

## Troubleshooting

- **Permission Denied**: Check if user has correct role in users collection
- **Index Required**: Click the provided link to create the composite index
- **Data Not Showing**: Verify the status field matches the query (e.g., 'verified', 'active')