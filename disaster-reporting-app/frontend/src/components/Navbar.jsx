import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <span className="text-2xl font-bold text-gray-800 hover:text-gray-600">
              Disaster Insights
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              to="/insights" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Insights
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Contact Us
            </Link>
            <Link 
              to="/login" 
              className="bg-[#023E8A] text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 