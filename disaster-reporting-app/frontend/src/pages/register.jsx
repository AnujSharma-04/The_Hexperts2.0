import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../apiService"; // Assuming register API call is in apiService

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await register(name, email, phone, district, password);
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      setError("Registration failed!");
    }
  };

  return (
    
    
    <div className="min-h- hover:bg-#646cff flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg bg-white p-8 text-black rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-4">Register</h1>
        <p className="text-center text-sm text-gray-400 mb-8">Before we start, please create your account</p>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input className="w-full p-3 bg-blue-300 text-black border border-white rounded-md placeholder-gray-500" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="w-full p-3 bg-blue-300 text-black border border-white rounded-md placeholder-gray-500" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full p-3 bg-blue-300 text-black border border-white rounded-md placeholder-gray-500" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <input className="w-full p-3 bg-blue-300 text-black border border-white rounded-md placeholder-gray-500" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} required />
          <input className="w-full p-3 bg-blue-300 text-black border border-white rounded-md placeholder-gray-500" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input className="w-full p-3 bg-blue-300 text-black border border-white rounded-md placeholder-gray-500" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button className="w-full bg-[#ae7aff] p-3 font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">Create Account</button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">Already registered? <span className="cursor-pointer font-bold text-black hover:underline">Sign in to your account</span></p>
      </div>
    </div>
  );
};

export default Register;