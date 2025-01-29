import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the navigate hook
// import { GoogleLogin } from "react-google-login";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    console.log("Google Sign-In Success", response.profileObj);
    setIsLogin(true);
  };

  const handleGoogleFailure = (response) => {
    console.log("Google Sign-In Failed", response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sample credentials check (In a real app, use a backend API for verification)
    if (isLogin) {
      // For admin login (You can modify these conditions to match real authentication)
      if (email === "authority@example.com" && password === "authoritypassword") {
        navigate("/authoritydashboard"); // Redirect to Admin Dashboard
      } else if (email === "user@example.com" && password === "userpassword") {
        navigate("/userdashboard"); // Redirect to User Dashboard
      } else {
        alert("Invalid credentials");
      }
    } else {
      // Handle registration logic here
      console.log("Registration logic");
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Admin Login" : "Register"}
        </h1>
        {isLogin ? (
          <form onSubmit={handleSubmit} className="space-y-6">
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
        ) : (
          <form className="space-y-6">
            {/* Registration form fields */}
            <input type="text" placeholder="Name" className="w-full p-3 border rounded-md" required />
            <input type="text" placeholder="Phone Number" className="w-full p-3 border rounded-md" required />
            <input type="email" placeholder="Email" className="w-full p-3 border rounded-md" required />
            <input type="password" placeholder="Password" className="w-full p-3 border rounded-md" required />
            <button type="submit" className="w-full bg-gradient-to-r from-[#023E8A] to-[#03045E] text-white py-3 px-4 rounded-md">
              Register
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <button className="text-blue-600" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register Here" : "Back to Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
