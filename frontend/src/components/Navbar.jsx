import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// FUNCTIONALITY TO CLOSE MOBILE MENU WHEN CLICKED ON A LINK
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = false; // Change this to true to simulate a logged-in user

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Automatically close the menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Close menu on `md` screens or larger
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="relative z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* COMPANY LOGO */}
        <div className="flex items-center text-indigo-600 text-xl font-semibold">
          NurtureMed
        </div>

        {/* MOBILE MENU (Hamburger) */}
        <div className="md:hidden">
          <button
            className="text-indigo-600 text-lg focus:outline-none"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>

        {/* NAV LINKS (Hidden on Small Screens) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link to="/doctors" className="hover:text-indigo-600">
            Doctors
          </Link>
          <Link to="/about" className="hover:text-indigo-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-indigo-600">
            Contact
          </Link>
          <Link to="/admin" className="hover:text-indigo-600">
            Admin
          </Link>
        </div>

        {/* USER SECTION */}
        <div className="hidden md:flex items-center">
          {isLoggedIn ? (
            <button
            href="#profile"
            className="text-sm bg-indigo-600 text-white rounded-full px-4 py-2"
            onClick={toggleMenu}
          >
            Profile
          </button>
          ) : (
            <button
                href="#create-account"
                className="text-sm bg-indigo-600 text-white rounded-full px-4 py-2"
                onClick={toggleMenu}
              >
                Create Account
              </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU (Overlay Dropdown) */}
      {isMenuOpen && (
        <>
          {/* Overlay Background */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu} // Close menu when clicking on the background
          ></div>

          {/* Dropdown Menu */}
          <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-6 text-sm">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              X
            </button>

            <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link to="/doctors" className="hover:text-indigo-600">
            Doctors
          </Link>
          <Link to="/about" className="hover:text-indigo-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-indigo-600">
            Contact
          </Link>
          <Link to="/admin" className="hover:text-indigo-600">
            Admin
          </Link>

            {isLoggedIn ? (
              <button
                href="#profile"
                className="text-sm bg-indigo-600 text-white rounded-full px-2 py-1"
                onClick={toggleMenu}
              >
                Profile
              </button>
            ) : (
              <button
                href="#create-account"
                className="text-sm bg-indigo-600 text-white rounded-full px-2 py-1"
                onClick={toggleMenu}
              >
                Create Account
              </button>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
