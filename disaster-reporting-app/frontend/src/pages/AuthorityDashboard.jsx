import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";




const AuthorityDashboard = () => {
  const [districtName, setDistrictName] = useState("Ahmedabad"); // Dynamic District Name
  const [requests, setRequests] = useState([]); // Disaster requests data

  useEffect(() => {
    // Fetching dummy data (replace with API call later)
    setRequests([
      { id: 101, type: "Earthquake", status: "Pending" },
      { id: 102, type: "Flood", status: "Pending" },
      { id: 103, type: "Wildfire", status: "Approved" },
    ]);
  }, []);

  const handleDecision = (id, decision) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: decision } : req
      )
    );
  };

  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <section className="text-center py-8 bg-[#FCFBFF] rounded-lg mt-8 text-[#051650]">
        <h1 className="text-4xl font-bold mb-2">Authority Dashboard</h1>
        <h2 className="text-2xl font-semibold">District: {districtName}</h2>
      </section>
      <Link to="/authorityprofile" className="bg-[#20818e] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#051650] transition">
  View Profile
</Link>

      {/* Data List Section */}
      <section className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-[#051650] mb-4">Disaster Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#20818e] text-white">
                <th className="p-3 border">Request ID</th>
                <th className="p-3 border">Disaster Type</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="text-center bg-gray-100 border">
                  <td className="p-3 border">{req.id}</td>
                  <td className="p-3 border">{req.type}</td>
                  <td className="p-3 border font-semibold text-blue-700">
                    {req.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Approval Section */}
      <section className="mt-8 p-6 bg-[#FCFBFF] rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-[#051650] mb-4">Approve or Reject Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests
            .filter((req) => req.status === "Pending")
            .map((req) => (
              <div
                key={req.id}
                className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
              >
                <span className="text-lg font-medium">{req.type} (ID: {req.id})</span>
                <div>
                  <Button
                    className="bg-green-500 text-white px-4 py-2 mr-2"
                    onClick={() => handleDecision(req.id, "Approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    className="bg-red-500 text-white px-4 py-2"
                    onClick={() => handleDecision(req.id, "Rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default AuthorityDashboard;
