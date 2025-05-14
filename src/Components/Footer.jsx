import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Peace Tutor Academy</h2>
          <p className="text-gray-300 text-sm">
            Connecting students with the best tutors for a brighter future. Learn, Grow, and Succeed with us.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-gray-300 text-sm">
            <Link to="/" className="hover:text-blue-300 transition">Home</Link>
            <Link to="/hire" className="hover:text-blue-300 transition">Hire a Tutor</Link>
            <Link to="/apply" className="hover:text-blue-300 transition">Apply as a Tutor</Link>
            <Link to="/contact" className="hover:text-blue-300 transition">Contact Us</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="text-xl font-semibold mb-4">Head Office</h3>
          <p className="text-gray-300 text-sm">
            Peacetutorbd, (4th Floor - Lift 4), House No#83, Road No#23, Gulshan-1,<br />
            Dhaka, Bangladesh, 1212
          </p>
          <p className="text-gray-300 text-sm mt-2">Phone: 01938-679075</p>
          <p className="text-gray-300 text-sm">Phone: 01783-795850</p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-blue-300 text-2xl"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-300 text-2xl"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-300 text-2xl"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Peace Tutor Academy. All rights reserved.
        <p>
          Developed By -{' '}
          <a href="https://www.linkedin.com/in/rakinalshahriar/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline hover:text-[wheat]">
            Rakin al Shahriar
          </a>
        </p>
      </div>

    </footer>
  );
}

export default Footer;