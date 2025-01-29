import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem("jwt_token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
