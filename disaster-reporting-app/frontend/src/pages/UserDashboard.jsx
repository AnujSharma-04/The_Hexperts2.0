import React, { useState, useEffect } from "react";

const UserDashboard = () => {
  // Dummy User Data (Can be replaced with API call)
  const user = {
    name: "Anuj Sharma",
    email: "anujsharma@example.com",
  };

  // Dynamic Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Dummy Data for Districts and Disasters
  const districts = {
    "PDEU District Zone 1": ["Flood", "Earthquake", "Fire"],
    "PDEU District Zone 2": ["Cyclone", "Landslide", "Drought"],
    "PDEU District Zone 3": ["Tornado", "Thunderstorm", "Gas Leak"],
  };

  const [selectedDistrict, setSelectedDistrict] = useState("PDEU District Zone 1");
  const [disasters, setDisasters] = useState(districts[selectedDistrict]);

  // Dummy Data for User Requests
  const [requests, setRequests] = useState([
    { id: 1, disaster: "Flood", status: "Pending", raisedOn: "2025-01-20" },
    { id: 2, disaster: "Earthquake", status: "Resolved", raisedOn: "2025-01-18" },
  ]);

  // Dummy Data for Notifications
  const [notifications, setNotifications] = useState([
    "New safety guidelines issued for flood management.",
    "Emergency earthquake drill scheduled for Feb 5.",
  ]);

  // Update Disasters when District Changes
  useEffect(() => {
    setDisasters(districts[selectedDistrict]);
  }, [selectedDistrict]);

  return (
    <div className="container mx-auto px-6 py-10 text-[#051650]">
      {/* Greeting Section */}
      <h1 className="text-4xl font-bold text-center mb-6">
        {getGreeting()}, {user.name} 👋
      </h1>

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

      {/* User Requests */}
      <div className="bg-[#CAF0F8] p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Disaster Requests</h2>
        <ul>
          {requests.map((req) => (
            <li key={req.id} className="border-b py-2 flex justify-between">
              <span>
                <strong>{req.disaster}:</strong> {req.status}
              </span>
              <span className="text-sm text-gray-600">Raised on {req.raisedOn}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notifications */}
      <div className="bg-[#20818e] p-6 rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-semibold mb-4">District Notifications</h2>
        <ul>
          {notifications.map((note, index) => (
            <li key={index} className="border-b py-2">{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
