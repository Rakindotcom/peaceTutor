import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Hire from './Pages/Hire'
import Apply from './Pages/Apply'
import Contact from './Pages/Contact'
import Header from './Components/Header'
import Footer from './Components/Footer'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App