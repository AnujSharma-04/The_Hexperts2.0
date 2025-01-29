// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../apiService"; // Assuming register API call is in apiService

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Navigate to different pages

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await register(name, email, phone, district, password);
      console.log(response.data); // You can use this response as needed
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError("Registration failed!"); // Show error if registration fails
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        {error && <div className="error text-red-500 text-center">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border rounded-md bg-white text-gray-900"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              id="phone"
              type="text"
              className="w-full p-3 border rounded-md bg-white text-gray-900"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">District</label>
            <input
              id="district"
              type="text"
              className="w-full p-3 border rounded-md bg-white text-gray-900"
              placeholder="Enter your district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-3 border rounded-md bg-white text-gray-900"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-[#023E8A] to-[#03045E] text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account? 
            <span 
              onClick={() => navigate('/login')} 
              className="text-blue-600 cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
