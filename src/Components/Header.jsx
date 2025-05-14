import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          Peace Tutor Academy
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-blue-300 transition">Home</Link>
          <Link to="/hire" className="text-white hover:text-blue-300 transition">Hire a Tutor</Link>
          <Link to="/apply" className="text-white hover:text-blue-300 transition">Apply as a Tutor</Link>
          <Link to="/contact" className="text-white hover:text-blue-300 transition">Contact Us</Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
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
        <div className="md:hidden bg-blue-800 px-4 py-4 space-y-4">
          <Link to="/" className="block text-white hover:text-blue-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/hire" className="block text-white hover:text-blue-300" onClick={() => setIsMenuOpen(false)}>Hire a Tutor</Link>
          <Link to="/apply" className="block text-white hover:text-blue-300" onClick={() => setIsMenuOpen(false)}>Apply as a Tutor</Link>
          <Link to="/contact" className="block text-white hover:text-blue-300" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
