// utils/decodeToken.jsx
import jwtDecode from "jwt-decode";

// Function to decode the JWT token and get the user's role
export const getUserRole = () => {
  const token = localStorage.getItem("jwt_token"); // Get the JWT token from localStorage

  if (!token) return null; // If no token is found, return null

  try {
    const decodedToken = jwtDecode(token); // Decode the JWT token
    return decodedToken.role; // Assuming the role is stored in the "role" field of the JWT token
  } catch (error) {
    console.error("Invalid token", error);
    return null; // Return null if token is invalid
  }
};

export const getUserName = () => {
    const token = localStorage.getItem("jwt_token"); // Get the JWT token from localStorage
  
    if (!token) return null; // If no token is found, return null
  
    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      return decodedToken.name; // Assuming the role is stored in the "role" field of the JWT token
    } catch (error) {
      console.error("Invalid token", error);
      return null; // Return null if token is invalid
    }
  };

  export const getUserInfo = () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;
  
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;  // Assuming the token contains user info
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };
