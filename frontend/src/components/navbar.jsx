import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a192f] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-white text-2xl font-bold">
            <Link to="/">Opulent</Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="relative text-white text-lg transition-all duration-300 ease-in-out hover:text-yellow-400 hover:scale-105">
              Home
              <span className="absolute left-1/2 bottom-[-2px] w-0 h-[2px] bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full transform -translate-x-1/2"></span>
            </Link>
            <Link
              to="/shop"
              className="relative text-white text-lg transition-all duration-300 ease-in-out hover:text-yellow-400 hover:scale-105">
              Shop
              <span className="absolute left-1/2 bottom-[-2px] w-0 h-[2px] bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full transform -translate-x-1/2"></span>
            </Link>
            <Link
              to="/about"
              className="relative text-white text-lg transition-all duration-300 ease-in-out hover:text-yellow-400 hover:scale-105">
              About Us
              <span className="absolute left-1/2 bottom-[-2px] w-0 h-[2px] bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full transform -translate-x-1/2"></span>
            </Link>
            <Link
              to="/contact"
              className="relative text-white text-lg transition-all duration-300 ease-in-out hover:text-yellow-400 hover:scale-105">
              Contact
              <span className="absolute left-1/2 bottom-[-2px] w-0 h-[2px] bg-yellow-400 transition-all duration-300 ease-in-out group-hover:w-full transform -translate-x-1/2"></span>
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
