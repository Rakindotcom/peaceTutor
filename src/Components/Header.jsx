import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      <header className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-xl backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group py-2">
            <img
              src="/logo.png"
              alt="Peace Tutor Academy Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform"
            />
            <span className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide group-hover:text-blue-200 transition-colors hidden sm:block">
              Peace Tutor Academy
            </span>
            <span className="text-white text-sm font-bold tracking-wide group-hover:text-blue-200 transition-colors sm:hidden">
              Peace Tutor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <Link to="/" className="text-white hover:text-blue-300 transition-colors font-medium relative group text-sm xl:text-base">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/get-tuition" className="text-white hover:text-blue-300 transition-colors font-medium relative group text-sm xl:text-base">
              Get Tuition
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/apply" className="text-white hover:text-blue-300 transition-colors font-medium relative group text-sm xl:text-base">
              Apply
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-white hover:text-blue-300 transition-colors font-medium relative group text-sm xl:text-base">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/hire"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 xl:px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg text-sm xl:text-base"
            >
              Hire Tutor
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none p-2"
              aria-label="Toggle mobile menu"
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  // X icon when menu open
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon when closed
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-blue-800 to-indigo-800 px-4 py-6 space-y-2 border-t border-blue-700 animate-slide-up">
            <Link to="/" className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-all font-medium" onClick={() => setIsMenuOpen(false)}>
              <span>🏠</span>
              <span className="ml-3">Home</span>
            </Link>
            <Link to="/get-tuition" className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-all font-medium" onClick={() => setIsMenuOpen(false)}>
              <span>📚</span>
              <span className="ml-3">Get Tuition</span>
            </Link>
            <Link to="/apply" className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-all font-medium" onClick={() => setIsMenuOpen(false)}>
              <span>📝</span>
              <span className="ml-3">Apply as a Tutor</span>
            </Link>
            <Link to="/contact" className="flex items-center text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-all font-medium" onClick={() => setIsMenuOpen(false)}>
              <span>📞</span>
              <span className="ml-3">Contact Us</span>
            </Link>
            <div className="pt-4">
              <Link
                to="/hire"
                className="block bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-full font-semibold text-center hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Hire Tutor
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
