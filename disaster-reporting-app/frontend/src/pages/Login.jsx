import React, { useState } from "react";
import { login } from "../apiService";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Use the `useNavigate` hook for programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);  // Send login credentials to backend
      const { access_token } = response.data;
      localStorage.setItem('jwt_token', access_token); // Store the JWT token in localStorage

      // Decode the JWT token to get the user role
      const decodedToken = jwt_decode(access_token);
      const role = decodedToken.role;  // Assume the role is stored as `role` in the token

      // Redirect based on role
      if (role === "authority") {
        navigate('/authoritydashboard');  // Redirect to the authority dashboard
      } else if (role === "user") {
        navigate('/userdashboard');  // Redirect to the user dashboard
      } else {
        // If role is not found, you can handle it as an error or redirect to a default route
        navigate('/login');  // Redirect to login (or show an error message)
      }
    } catch (err) {
      setError('Invalid credentials');  // Show error if login fails
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border rounded-md bg-white text-gray-900"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-3 border rounded-md bg-white text-gray-900"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-[#023E8A] to-[#03045E] text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Not registered? 
            <span 
              onClick={() => navigate('/register')} 
              className="text-blue-600 cursor-pointer"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
