# Peace Tutor BD

A modern web application connecting students with qualified tutors in Bangladesh. Built with React, Vite, and Firebase.

## 🚀 Features

- **Student Portal**: Easy tutor hiring with detailed requirements
- **Tutor Application**: Comprehensive application system for tutors
- **Contact System**: Direct communication with the academy
- **Admin Dashboard**: Complete management system for applications and requests
- **Responsive Design**: Works seamlessly on all devices
- **Real-time Data**: Firebase integration for instant updates
- **Form Validation**: Comprehensive client-side validation
- **Accessibility**: WCAG compliant design

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 6
- **Styling**: Tailwind CSS 4
- **Backend**: Firebase (Firestore, Authentication)

## 🔐 Authentication System

The application features a comprehensive role-based authentication system:

### User Roles
- **Tutor**: Can apply for tuition jobs, manage students, and track earnings
- **Guardian**: Can post tuition requirements, hire tutors, and monitor progress  
- **Admin**: Full access to admin dashboard with user management capabilities

### Login System
- **Unified Login Page**: Single login page with tabs for different user types (`/login`)
- **Role-based Dashboards**: Each user type has a dedicated dashboard
- **Protected Routes**: Role-based access control ensures users only access appropriate areas
- **Account Creation**: New users can sign up directly through the login page
- **Forgot Password**: Password reset functionality for all user types

### Dashboard Routes
- **Tutor Dashboard**: `/tutor-dashboard` - For tutors to manage their teaching activities
- **Guardian Dashboard**: `/guardian-dashboard` - For guardians to manage tuition requirements
- **Admin Dashboard**: `/admin` - For administrators to manage the platform

### Security Features
- **Firebase Authentication**: Secure user authentication and session management
- **Role Verification**: Server-side role verification for all protected routes
- **Account Status**: Active/inactive account management
- **Access Control**: Prevents unauthorized access to different user areas
- **Password Reset**: Forgot password functionality for all user types
- **Persistent Sessions**: Users stay logged in across browser sessions
- **Enhanced Error Handling**: Graceful handling of Firestore permission errors

### Admin Account Creation

**Important Security Note**: Admin accounts cannot be created through the regular sign-up process. They must be created manually by system administrators.

#### Methods to Create Admin Users:

1. **Using Admin Setup Page (Initial Setup Only)**:
   - Visit `/admin-setup` (⚠️ Remove this route after creating the first admin)
   - Fill in admin details and create the account
   - **Security Warning**: This page should be removed after initial setup

2. **Manual Creation via Firebase Console**:
   - Go to Firebase Console → Authentication → Users
   - Create a new user with email/password
   - Copy the user's UID
   - Go to Firestore Database → Create "users" collection
   - Add a document with the UID as document ID and the structure below

3. **Using the createAdmin utility** (for developers):
   - Use the `createAdminUser` function in `src/utils/createAdmin.js`
   - This should only be used during development/setup

### Database Structure
User data is stored in Firestore with the following structure:
```javascript
{
  uid: "user-firebase-uid",
  email: "user@example.com", 
  fullName: "User Full Name",
  phone: "01XXXXXXXXX",
  role: "tutor|guardian|admin",
  createdAt: "ISO-date-string",
  isActive: true,
  createdBy: "system|manual", // For admin users
  permissions: { // For admin users only
    canManageUsers: true,
    canViewReports: true,
    canManageContent: true,
    canAccessAnalytics: true
  }
}
```

### Security Features
- **No Admin Sign-up**: Admin accounts cannot be created through public sign-up
- **Role Verification**: All admin routes verify user role from Firestore
- **Account Status Check**: Inactive accounts are automatically blocked
- **Secure Admin Login**: Separate admin login with role verification

## 📊 Statistics

The home page displays impressive statistics:
- **Active Tutors**: 1M+
- **Happy Students**: 1.5M+
- **Average Tutor Rating**: 4.9/5

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd peace-tutor-bd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Firebase configuration in `.env`

4. **Configure Firebase**
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Copy configuration to `.env` file
   - Set up Firestore security rules (see `firestore.rules`)

5. **Start development server**
   ```bash
   npm run dev
   ```

### Firebase Setup

1. **Authentication**:
   - Enable Email/Password authentication
   - Configure email templates for password reset

2. **Firestore Database**:
   - Create database in production mode
   - Apply security rules from `firestore.rules`
   - Create initial collections as needed

3. **Security Rules**:
   - Copy content from `firestore.rules` to Firebase Console
   - Test rules using Firebase Console Rules Playground

## 📁 Project Structure

```
src/
├── Components/          # Reusable UI components
│   ├── UI/             # Basic UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   └── ...
├── Pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Unified login page
│   ├── AdminLogin.jsx  # Admin-specific login
│   ├── *Dashboard.jsx  # Role-based dashboards
│   └── ...
├── hooks/              # Custom React hooks
│   └── useAuth.js      # Authentication hook
├── utils/              # Utility functions
│   ├── auth.js         # Authentication utilities
│   ├── validation.js   # Form validation
│   └── toast.js        # Toast notifications
├── constants/          # Application constants
└── firebase.js         # Firebase configuration
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

## 🐛 Troubleshooting

Common issues and solutions are documented in `TROUBLESHOOTING.md`.

### Quick Fixes:

1. **Permission Errors**: Update Firestore security rules
2. **Login Issues**: Check Firebase configuration
3. **Build Errors**: Clear node_modules and reinstall
4. **Authentication Problems**: Verify environment variables

## 📚 Documentation

- **Admin Setup**: See `ADMIN_SETUP.md` for admin account creation
- **Troubleshooting**: See `TROUBLESHOOTING.md` for common issues
- **Email System**: See `EMAIL_SYSTEM_DOCUMENTATION.md` for email features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check `TROUBLESHOOTING.md` for common issues
- Review Firebase Console for errors
- Contact the development team

## 🔒 Security

- Never commit `.env` files
- Use strong passwords for admin accounts
- Regularly update dependencies
- Monitor Firebase usage and security
- Remove admin setup tools from production