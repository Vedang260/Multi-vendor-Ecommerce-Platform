import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token") // Initialize based on stored token
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("access_token"));
    };

    // Listen for changes in localStorage (e.g., login/logout actions)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        console.error("No refresh token found");
        return;
      }

      const response = await fetch("http://localhost:8000/api/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        console.log("Logout successful");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsAuthenticated(false); // Update state to re-render Navbar
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a192f] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-white text-2xl font-bold">
            <Link to="/">Opulent</Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white text-lg hover:text-yellow-400">Home</Link>
            <Link to="/shop" className="text-white text-lg hover:text-yellow-400">Shop</Link>
            <Link to="/about" className="text-white text-lg hover:text-yellow-400">About Us</Link>
            <Link to="/contact" className="text-white text-lg hover:text-yellow-400">Contact</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
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
