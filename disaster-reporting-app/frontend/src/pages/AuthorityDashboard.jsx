import React, { useState, useEffect } from "react";
import LogoutButton from "../components/logout";  // Import LogOutButton

const AuthorityDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications for the logged-in user
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold">Authority Dashboard</h1>

      {/* Add Log Out Button */}
      <LogoutButton />

      {/* Display notifications */}
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
    </div>
  );
};

export default AuthorityDashboard;
