import React, { useState } from "react";

const AuthorityProfile = () => {
  // Dummy Data (Replace with API Data)
  const [profile, setProfile] = useState({
    name: "District Authority XYZ",
    jurisdiction: "PDEU District Zone 3",
    budgetAllocated: 5000000, // 50 Lakhs
    budgetLeft: 2500000, // 25 Lakhs
    logs: [
      { id: 1, action: "Approved", request: "Flood Relief", timestamp: "2025-01-20 10:30 AM" },
      { id: 2, action: "Rejected", request: "Earthquake Aid", timestamp: "2025-01-18 2:15 PM" },
      { id: 3, action: "Approved", request: "Medical Supplies", timestamp: "2025-01-15 5:00 PM" }
    ],
    notifications: [
      "Urgent: Heavy Rainfall Alert in Zone 3",
      "Budget Report Submission Deadline: Feb 5",
      "New Safety Guidelines Updated"
    ],
    techSupportEmail: "support@disasterinsights.com"
  });

  return (
    <div className="container mx-auto px-6 py-12 text-[#051650]">
      <h1 className="text-4xl font-bold text-center mb-6">Authority Profile</h1>

      {/* Jurisdiction & Budget Section */}
      <div className="bg-[#CAF0F8] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold">Jurisdiction: {profile.jurisdiction}</h2>
        <p className="text-lg mt-2">
          <strong>Budget Allocated:</strong> ₹{profile.budgetAllocated.toLocaleString()}  
        </p>
        <p className="text-lg">
          <strong>Budget Left:</strong> ₹{profile.budgetLeft.toLocaleString()}  
        </p>
      </div>

      {/* Logs Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Approval & Rejection Logs</h2>
        <ul>
          {profile.logs.map((log) => (
            <li key={log.id} className="border-b py-2 flex justify-between">
              <span>
                <strong>{log.action}:</strong> {log.request}  
              </span>
              <span className="text-sm text-gray-600">{log.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notifications */}
      <div className="bg-[#ADE8F4] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Major Notifications</h2>
        <ul>
          {profile.notifications.map((note, index) => (
            <li key={index} className="border-b py-2">{note}</li>
          ))}
        </ul>
      </div>

      {/* Tech Support */}
      <div className="bg-[#20818e] p-6 rounded-lg shadow-md text-white text-center">
        <h2 className="text-2xl font-semibold mb-4">Tech Support</h2>
        <p className="text-lg">Facing issues? Report to our tech team.</p>
        <a href={`mailto:${profile.techSupportEmail}`} className="text-lg font-bold underline">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default AuthorityProfile;
