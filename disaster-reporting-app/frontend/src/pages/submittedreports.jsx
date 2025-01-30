import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubmittedDisasters, approveDisaster, rejectDisaster } from "../apiService";
import { getUserInfo } from "../utils/decode";

const SubmittedReports = () => {
  const [disasters, setDisasters] = useState([]);
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  useEffect(() => {
    fetchDisasters();
  }, []);

  // Fetch all submitted disasters
  const fetchDisasters = async () => {
    try {
      const response = await getSubmittedDisasters(userInfo.district);
      setDisasters(response.data);
    } catch (error) {
      console.error("Error fetching submitted disasters:", error);
    }
  };

  // Handle approval
  const handleApprove = async (disasterId) => {
    try {
      await approveDisaster(disasterId);
      setDisasters(disasters.filter((disaster) => disaster.id !== disasterId)); // Remove from list
    } catch (error) {
      console.error("Error approving disaster:", error);
    }
  };

  // Handle rejection
  const handleReject = async (disasterId) => {
    try {
      await rejectDisaster(disasterId);
      setDisasters(disasters.filter((disaster) => disaster.id !== disasterId)); // Remove from list
    } catch (error) {
      console.error("Error rejecting disaster:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-blue-600">Submitted Disaster Reports</h2>
        <p className="text-gray-600 text-center mb-6">Approve or reject disaster reports in your jurisdiction.</p>

        {disasters.length === 0 ? (
          <p className="text-center text-gray-600">No submitted disasters available.</p>
        ) : (
          <div className="space-y-4">
            {disasters.map((disaster) => (
              <div key={disaster.id} className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold">{disaster.disaster_type}</h3>
                <p><span className="font-semibold">Location:</span> {disaster.location}</p>
                <p><span className="font-semibold">Description:</span> {disaster.description}</p>
                <p><span className="font-semibold">Severity:</span> {disaster.severity_level}</p>
                <div className="flex gap-4 mt-4">
                  <button onClick={() => handleApprove(disaster.id)} className="bg-green-500 text-white px-4 py-2 rounded-md">
                    Approve
                  </button>
                  <button onClick={() => handleReject(disaster.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button onClick={() => navigate("/authoritydashboard")} className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmittedReports;
