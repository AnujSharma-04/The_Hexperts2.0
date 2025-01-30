import React, { useState, useEffect } from "react";
import { getUserInfo } from "../utils/decode";
import { getNotifications } from "../apiService";
import { useNavigate } from "react-router-dom";

const UserActivity = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const userData = getUserInfo();
    setUserInfo(userData);

    // Fetch user's notifications
    fetchUserNotifications();
  }, []);

  // Fetch notifications (approval/rejection updates)
  const fetchUserNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-600">Your Activity</h2>
        <p className="text-gray-600 text-center mb-6">Track the status of your reported disasters.</p>

        {/* Notifications Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2">Notifications</h3>
          <ul className="mt-4">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className="border-b py-2">
                  {notification.message} 
                  <span className={`ml-2 ${notification.is_read ? "text-gray-500" : "text-green-600 font-bold"}`}>
                    {notification.is_read ? "(Read)" : "(New)"}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No notifications yet.</p>
            )}
          </ul>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button onClick={() => navigate("/userdashboard")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
