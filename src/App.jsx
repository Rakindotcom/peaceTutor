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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminDashboard from './Pages/AdminDashboard'
import AdminLogin from './Pages/AdminLogin'
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
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
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