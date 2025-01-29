// UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { getUserInfo } from "../utils/decode";  // Import the helper function
import LogoutButton from "../components/logout";  // Import LogOutButton

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);  // Store the user info (name, role, etc.)
  const [selectedDistrict, setSelectedDistrict] = useState("PDEU District Zone 1");
  const [disasters, setDisasters] = useState([]);
  const [reportedDisasters, setReportedDisasters] = useState([]);
  
  // Dummy Data for Districts and Disasters
  const districts = {
    "PDEU District Zone 1": ["Flood", "Earthquake", "Fire"],
    "PDEU District Zone 2": ["Cyclone", "Landslide", "Drought"],
    "PDEU District Zone 3": ["Tornado", "Thunderstorm", "Gas Leak"],
  };

  // Update Disasters when District Changes
  useEffect(() => {
    setDisasters(districts[selectedDistrict]);
  }, [selectedDistrict]);

  // Fetch user info from JWT token
  useEffect(() => {
    const userData = getUserInfo();
    setUserInfo(userData);
  }, []);

  // Handle Reporting Disaster
  const handleReportDisaster = () => {
    // Logic for reporting a disaster
  };

  // Handle Activity Section (Reported, Approved, Rejected)
  const handleActivitySection = () => {
    // Logic to display user's activity (reported, approved, rejected disasters)
  };

  return (
    <div className="container mx-auto px-6 py-10 text-[#051650]">
      {/* Greeting */}
      <h1 className="text-4xl font-bold text-center mb-6">
        Good Morning, {userInfo ? userInfo.name : "User"} 👋
      </h1>

      {/* Add Log Out Button */}
      <LogoutButton />

      {/* District Selection */}
      <div className="bg-[#ADE8F4] p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Select Your District</h2>
        <select
          className="w-full p-3 rounded-lg border border-gray-300"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          {Object.keys(districts).map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* Disaster Data */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Disasters in {selectedDistrict}</h2>
        <ul>
          {disasters.map((disaster, index) => (
            <li key={index} className="border-b py-2">{disaster}</li>
          ))}
        </ul>
      </div>

      {/* Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Activity</h2>
        <button 
          onClick={handleActivitySection} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          View Activity
        </button>

        <div className="mt-4">
          <h3 className="font-semibold">Reported Disasters</h3>
          <ul>
            {reportedDisasters.map((disaster, index) => (
              <li key={index} className="border-b py-2">{disaster}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button to Report Disaster */}
      <div className="mt-6">
        <button 
          onClick={handleReportDisaster} 
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Report Disaster
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
