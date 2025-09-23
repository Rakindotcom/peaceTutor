# Peace Tutor Academy

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
- **Icons**: Lucide React, React Icons
- **Routing**: React Router DOM 7
- **Carousel**: React Slick

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project with Firestore and Authentication enabled

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/peace-tutor-academy.git
   cd peace-tutor-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   ```

4. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Set up Firestore security rules (see below)

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔐 Firebase Security Rules

Add these rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public writes for form submissions
    match /{collection=**}/{document=**} {
      allow write: if true;
      allow read: if request.auth != null;
    }
  }
}
```

## 🏗️ Project Structure

```
src/
├── Components/
│   ├── UI/                 # Reusable UI components
│   │   ├── Modal.jsx
│   │   ├── FormField.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorBoundary.jsx
│   ├── Categories.jsx      # Subject categories carousel
│   ├── Footer.jsx          # Site footer
│   ├── Header.jsx          # Navigation header
│   ├── Hero.jsx            # Landing page hero
│   └── TuitionTypes.jsx    # Tutoring options
├── Pages/
│   ├── Home.jsx            # Landing page
│   ├── Hire.jsx            # Student hiring form
│   ├── Apply.jsx           # Tutor application form
│   ├── Contact.jsx         # Contact form
│   ├── AdminLogin.jsx      # Admin authentication
│   ├── AdminDashboard.jsx  # Admin panel
│   └── NotFound.jsx        # 404 page
├── constants/
│   └── formData.js         # Form options and validation patterns
├── utils/
│   └── validation.js       # Form validation utilities
├── firebase.js             # Firebase configuration
├── App.jsx                 # Main app component
├── main.jsx               # App entry point
└── index.css              # Global styles
```

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Clean, lint, and build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run clean` - Remove build directory

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |

### Admin Access

To access the admin dashboard:
1. Create a user in Firebase Authentication
2. Navigate to `/admin-login`
3. Sign in with your credentials
4. Access the dashboard at `/admin`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Netlify

1. Build the project: `npm run build:prod`
2. Upload the `dist` folder to Netlify
3. Configure environment variables
4. Set up continuous deployment

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build:prod`
5. Deploy: `firebase deploy`

## 🧪 Testing

The application includes:
- Form validation testing
- Error boundary testing
- Responsive design testing
- Accessibility testing

## 🔒 Security Features

- Environment variable protection
- Firebase security rules
- Input validation and sanitization
- XSS protection
- CSRF protection through Firebase

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Rakin Al Shahriar**
- LinkedIn: [rakinalshahriar](https://www.linkedin.com/in/rakinalshahriar/)
- Email: [contact@rakin.dev](mailto:contact@rakin.dev)

## 🆘 Support

For support, email support@peacetutor.com or create an issue in this repository.

## 📞 Contact Information

**Peace Tutor Academy**
- Address: House No#83, Road No#23, Gulshan-1, Dhaka, Bangladesh 1212
- Phone: 01938-679075, 01783-795850
- Business Hours: Saturday – Thursday: 9:00 AM – 8:00 PM

---

Made with ❤️ for quality education in Bangladesh