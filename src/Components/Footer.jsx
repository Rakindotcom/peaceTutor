import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Newsletter from './Newsletter';

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.png"
                  alt="Peace Tutor Academy Logo"
                  className="w-10 h-10"
                />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Peace Tutor Academy
                </h2>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Bangladesh's leading tutoring platform connecting students with qualified, verified tutors for personalized learning experiences. Excellence in education, guaranteed results.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com/peacetutor" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors" aria-label="Follow us on Facebook">
                  <FaFacebook className="text-lg" />
                </a>
                <a href="https://instagram.com/peacetutor" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors" aria-label="Follow us on Instagram">
                  <FaInstagram className="text-lg" />
                </a>
                <a href="https://linkedin.com/company/peacetutor" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors" aria-label="Follow us on LinkedIn">
                  <FaLinkedin className="text-lg" />
                </a>
                <a href="https://twitter.com/peacetutor" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors" aria-label="Follow us on Twitter">
                  <FaTwitter className="text-lg" />
                </a>
                <a href="https://youtube.com/@peacetutor" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors" aria-label="Subscribe to our YouTube channel">
                  <FaYoutube className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Home
              </Link>
              <Link to="/hire" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Hire a Tutor
              </Link>
              <Link to="/apply" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Apply as a Tutor
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Contact Us
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Popular Subjects</h3>
            <div className="space-y-3">
              <Link to="/hire" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">Mathematics</Link>
              <Link to="/hire" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">Physics</Link>
              <Link to="/hire" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">Chemistry</Link>
              <Link to="/hire" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">English</Link>
              <Link to="/hire" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">Bangla</Link>
              <Link to="/hire" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">Biology</Link>
              <Link to="/hire" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">IELTS Preparation</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>House No#83, Road No#23</p>
                  <p>Gulshan-1, Dhaka</p>
                  <p>Bangladesh 1212</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-green-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>01938-679075</p>
                  <p>01783-795850</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-purple-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>info@peacetutor.com</p>
                  <p>support@peacetutor.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaClock className="text-orange-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Saturday – Thursday</p>
                  <p>9:00 AM – 8:00 PM</p>
                  <p className="text-red-300">Friday: Closed</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest updates, study tips, and exclusive offers.
            </p>
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} Peace Tutor Academy. All rights reserved.</p>
            </div>

            <div className="text-gray-400 text-sm text-center md:text-right">
              <p>
                Developed with ❤️ by{' '}
                <a
                  href="https://www.linkedin.com/in/rakinalshahriar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  Rakin Al Shahriar
                </a>
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Verified Tutors</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;