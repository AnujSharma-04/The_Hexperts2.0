import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getUserInfo } from "../utils/decode";
import LogoutButton from "../components/logout";

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("PDEU District Zone 1");
  const [disasters, setDisasters] = useState([]);
  const [reportedDisasters, setReportedDisasters] = useState([]);

  const navigate = useNavigate(); // Initialize navigation function

  const districts = {
    "PDEU District Zone 1": ["Flood", "Earthquake", "Fire"],
    "PDEU District Zone 2": ["Cyclone", "Landslide", "Drought"],
    "PDEU District Zone 3": ["Tornado", "Thunderstorm", "Gas Leak"],
  };

  useEffect(() => {
    setDisasters(districts[selectedDistrict]);
  }, [selectedDistrict]);

  useEffect(() => {
    const userData = getUserInfo();
    setUserInfo(userData);
  }, []);

  return (
    <div className="container mx-auto px-6 py-10 text-[#051650]">
      <h1 className="text-4xl font-bold text-center mb-6">
        Good Morning, {userInfo ? userInfo.name : "User"} 👋
      </h1>

      <LogoutButton />

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

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Disasters in {selectedDistrict}</h2>
        <ul>
          {disasters.map((disaster, index) => (
            <li key={index} className="border-b py-2">{disaster}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Activity</h2>
        <button 
          onClick={() => navigate("/useractivity")} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          View Activity
        </button>
      </div>

      <div className="mt-6">
        <button 
          onClick={() => navigate("/reportdisaster")} 
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Report Disaster
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;