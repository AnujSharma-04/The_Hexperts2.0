// AuthorityDashboard.jsx
import React, { useState, useEffect } from "react";
import { getUserInfo } from "../utils/decode";  // Import the helper function
import LogoutButton from "../components/logout";  // Import LogOutButton
import { getNotifications, reportDisaster } from "../apiService";  // Import API service functions

const AuthorityDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);  // Store the user info (name, role, etc.)
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    total_reported: 0,
    approved: 0,
    rejected: 0
  });
  const [disasters, setDisasters] = useState([]);
  const [jurisdiction, setJurisdiction] = useState("");  // Store the jurisdiction (district)

  useEffect(() => {
    const userData = getUserInfo();
    setUserInfo(userData);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    const fetchDisasterStats = async () => {
      try {
        const response = await api.get("/disasters/stats", { params: { district: jurisdiction } });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching disaster stats", error);
      }
    };

    const fetchDisasters = async () => {
      try {
        const response = await api.get("/disasters", { params: { district: jurisdiction } });
        setDisasters(response.data);
      } catch (error) {
        console.error("Error fetching disasters", error);
      }
    };

    if (jurisdiction) {
      fetchNotifications();
      fetchDisasterStats();
      fetchDisasters();
    }
  }, [jurisdiction]);

  const handleDisasterAction = async (disasterId, action) => {
    try {
      await reportDisaster(disasterId, action); // Implement this in apiService.js
      setDisasters(disasters.filter((disaster) => disaster.id !== disasterId));  // Remove the approved/rejected disaster from the list
    } catch (error) {
      console.error("Error updating disaster", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 text-[#051650]">
      <h1 className="text-4xl font-bold text-center mb-6">Authority Dashboard</h1>
      {/* Display Jurisdiction only when userInfo is available */}
      
        <h1 className="text-4xl font-bold text-center mb-6">
          Jurisdiction: {userInfo ? userInfo.district : "Jurisdiction"}
        </h1>
      {/* Display stats */}
      <div className="flex justify-between mb-6">
        <div className="bg-[#ADE8F4] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Reported</h3>
          <p>{stats.total_reported}</p>
        </div>
        <div className="bg-[#CAF0F8] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Approved</h3>
          <p>{stats.approved}</p>
        </div>
        <div className="bg-[#80FFDB] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Rejected</h3>
          <p>{stats.rejected}</p>
        </div>
      </div>

      {/* Disaster List */}
      <h2 className="text-2xl font-semibold mb-4">Disasters in Your Jurisdiction</h2>
      <div className="space-y-4">
        {disasters.map((disaster) => (
          <div key={disaster.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{disaster.disaster_type}</h3>
              <p>{disaster.description}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleDisasterAction(disaster.id, "approve")}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Approve
              </button>
              <button
                onClick={() => handleDisasterAction(disaster.id, "reject")}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Notifications Section */}
      <div>
        <h2 className="text-2xl font-semibold mt-6">Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="py-2">
              {notification.message} - {notification.is_read ? "Read" : "Unread"}
            </li>
          ))}
        </ul>
      </div>

      {/* Log Out Button */}
      <LogoutButton />
    </div>
  );
};

export default AuthorityDashboard;
