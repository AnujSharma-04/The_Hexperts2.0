import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { getUserInfo } from "../utils/decode";
import LogoutButton from "../components/logout";

const gujaratDistricts = [
  "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar",
  "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar",
  "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana",
  "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot",
  "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"
];

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("Amreli"); // Default district
  const navigate = useNavigate(); 

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
        <h2 className="text-2xl font-semibold mb-4">Select or Enter Your District</h2>
        <select
          className="w-full p-3 rounded-lg border border-gray-300 mb-3"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          {gujaratDistricts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-gray-300"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          placeholder="Enter your district"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Approved Disasters in {selectedDistrict}</h2>
        <button 
          onClick={() => navigate(`/approved-disasters/${selectedDistrict}`)} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          View Approved Disasters
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">User Activity</h2>
        <button 
          onClick={() => navigate("/useractivity")} 
          className="bg-purple-500 text-white px-4 py-2 rounded-md"
        >
          View User Activity
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
