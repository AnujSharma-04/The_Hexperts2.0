import React from 'react';

const AboutUs = () => {
  return (
    <div>
      {/* First div with gradient background */}
      <div className="bg-gradient-to-r from-[#03045E] to-[#023E8A] text-white py-16 px-6 sm:px-12 rounded-b-lg shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Empowering Communities, One Report at a Time
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            Welcome to [Your Platform Name], a crowdsourced disaster management platform designed to connect individuals and authorities for faster, smarter, and more effective disaster response.
          </p>
          
        </div>
      </div>

      {/* Remaining content with default background */}
      <div className="max-w-4xl mx-auto py-12 px-6 sm:px-12">
        {/* Our Mission Section with Card Styling */}
        <div className="mt-8 bg-[#CAF0F8] p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
          <p className="mt-2 text-lg text-gray-700">
            To empower individuals with a voice in disaster management and provide authorities with actionable insights to respond efficiently and save lives.
          </p>
        </div>

        {/* Why Choose Us Section with Icons and Card Styling */}
        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-gray-800">Why Choose Us?</h2>
          <ul className="mt-4 space-y-6">
            <li className="flex items-center text-lg text-gray-700 hover:text-indigo-600 transition duration-300">
              <span className="w-8 h-8 bg-gradient-to-r from-[#03045E] to-[#023E8A] text-white rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h2l3 9h8l3-9h2" />
                </svg>
              </span>
              Real-Time Reporting
            </li>
            <li className="flex items-center text-lg text-gray-700 hover:text-indigo-600 transition duration-300">
              <span className="w-8 h-8 bg-gradient-to-r from-[#03045E] to-[#023E8A] text-white rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h6M9 12h6M9 19h6" />
                </svg>
              </span>
              Aid Requests Made Simple
            </li>
            <li className="flex items-center text-lg text-gray-700 hover:text-indigo-600 transition duration-300">
              <span className="w-8 h-8 bg-gradient-to-r from-[#03045E] to-[#023E8A] text-white rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              Data-Driven Insights
            </li>
            <li className="flex items-center text-lg text-gray-700 hover:text-indigo-600 transition duration-300">
              <span className="w-8 h-8 bg-gradient-to-r from-[#03045E] to-[#023E8A] text-white rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h2l3 9h8l3-9h2" />
                </svg>
              </span>
              Transparency in Disaster Management
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
