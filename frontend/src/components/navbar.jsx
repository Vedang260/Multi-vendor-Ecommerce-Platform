import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#0a192f] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-white text-2xl font-bold">
            <Link to="/">E-Shop</Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white text-lg hover:text-yellow-400 transition">
              Home
            </Link>
            <Link to="/shop" className="text-white text-lg hover:text-yellow-400 transition">
              Shop
            </Link>
            <Link to="/vendors" className="text-white text-lg hover:text-yellow-400 transition">
              Vendors
            </Link>
            <Link to="/contact" className="text-white text-lg hover:text-yellow-400 transition">
              Contact
            </Link>
          </div>

          {/* Login & Sign Up Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link to="/login">
              <button className="bg-yellow-400 text-[#0a192f] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:text-[#0a192f] transition">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
