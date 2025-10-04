import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Pages/Home'
import Hire from './Pages/Hire'
import Apply from './Pages/Apply'
import Contact from './Pages/Contact'

import PostTuition from './Pages/PostTuition'
import GetTuition from './Pages/GetTuition'
import ApplyTuition from './Pages/ApplyTuition'
import Header from './Components/Header'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'
import WhatsAppFloat from './Components/WhatsAppFloat'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminDashboard from './Pages/AdminDashboard'
import AdminLogin from './Pages/AdminLogin'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Help from './Pages/Help'
import TutorDashboard from './Pages/TutorDashboard'
import GuardianDashboard from './Pages/GuardianDashboard'
import TutorProfile from './Pages/TutorProfile'
import TutorProfileDemo from './Pages/TutorProfileDemo'
import ProtectedRoute from './Components/ProtectedRoute'
import AdminSetup from './Components/AdminSetup'
import FirestoreSetup from './Components/FirestoreSetup'
import NotFound from './Pages/NotFound'


const App = () => {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/post-tuition" element={<PostTuition />} />
          <Route path="/get-tuition" element={<GetTuition />} />
          <Route path="/apply-tuition/:id" element={<ApplyTuition />} />

          {/* New unified login page */}
          <Route path="/login" element={<Login />} />

          {/* Profile page - protected route for authenticated users */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Help page */}
          <Route path="/help" element={<Help />} />

          {/* Protected dashboards */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/tutor-dashboard" element={
            <ProtectedRoute requiredRole="tutor">
              <TutorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/tutor-profile" element={
            <ProtectedRoute requiredRole="tutor">
              <TutorProfile />
            </ProtectedRoute>
          } />

          {/* Demo route - remove in production */}
          <Route path="/tutor-profile-demo" element={<TutorProfileDemo />} />
          <Route path="/guardian-dashboard" element={
            <ProtectedRoute requiredRole="guardian">
              <GuardianDashboard />
            </ProtectedRoute>
          } />

          {/* Admin login */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Setup routes - REMOVE THESE ROUTES AFTER INITIAL SETUP */}
          <Route path="/admin-setup" element={<AdminSetup />} />
          <Route path="/firestore-setup" element={<FirestoreSetup />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppFloat />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App