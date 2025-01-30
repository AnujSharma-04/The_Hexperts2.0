import React, { useState, useEffect } from "react";
import { getUserInfo } from "../utils/decode";  // Import helper function
import LogoutButton from "../components/logout";  // Import LogOutButton
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { getNotifications, getAuthorityStats } from "../apiService";  // Import API service functions

const AuthorityDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    total_reported: 0,
    approved: 0,
    rejected: 0
  });
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const userData = getUserInfo();
    if (userData && userData.district) {
      setUserInfo(userData);
      fetchStats(userData.district);  // ✅ Pass userData.district directly
    } else {
      console.error("User info or district is missing");
    }
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  // Fetch statistics (Total Reported, Approved, Rejected)
  const fetchStats = async (district) => {
    if (!district) {
      console.error("District is missing");
      return;
    }
    try {
      const response = await getAuthorityStats(district);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics", error);
    }
  };
  

  return (
    <div className="container mx-auto px-6 py-10 text-[#051650]">
      <h1 className="text-4xl font-bold text-center mb-6">Authority Dashboard</h1>

      <h2 className="text-2xl font-semibold text-center mb-4">
        Jurisdiction: {userInfo ? userInfo.district : "Jurisdiction"}
      </h2>

      {/* Stats Section */}
      <div className="flex justify-around mb-6">
        <div className="bg-[#ADE8F4] p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Reported</h3>
          <p className="text-3xl font-bold">{stats.total_reported}</p>
        </div>
        <div className="bg-[#CAF0F8] p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Approved</h3>
          <p className="text-3xl font-bold">{stats.approved}</p>
        </div>
        <div className="bg-[#80FFDB] p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Rejected</h3>
          <p className="text-3xl font-bold">{stats.rejected}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => navigate("/submittedreports")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600"
        >
          View Submitted Reports
        </button>
        <button
          onClick={() => navigate("/logs")}
          className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-600"
        >
          View Logs
        </button>
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
