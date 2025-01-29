import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server)
    alert('Form submitted successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Contact Us</h1>
      <p className="text-center text-gray-600 mb-8">We'd love to hear from you! Please fill out the form below to get in touch.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your message here"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 mt-4 bg-[#023E8A] text-white font-semibold rounded-lg shadow-md hover:bg-[#3366cc] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Send Message
          </button>
        </div>
      </form>

      {/* Reach Us Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reach Us Directly</h2>
        <p className="text-gray-600 mb-2">If you'd prefer, you can reach us at:</p>
        <div className="text-gray-800">
          <p><strong>Email:</strong> contact@yourwebsite.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
