import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getApprovedDisasters } from "../apiService";

const ApprovedDisasters = () => {
  const { district } = useParams(); // Get district from URL params
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDisasters();
  }, [district]);

  const fetchDisasters = async () => {
    try {
      const response = await getApprovedDisasters(district);
      setDisasters(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching approved disasters:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 text-[#051650]">
      <h1 className="text-3xl font-bold text-center mb-6">Approved Disaster Reports</h1>
      <h2 className="text-xl font-semibold text-center mb-4">District: {district}</h2>

      {loading ? (
        <p className="text-center">Loading disasters...</p>
      ) : disasters.length === 0 ? (
        <p className="text-center text-gray-600">No approved disasters found.</p>
      ) : (
        <div className="space-y-4">
          {disasters.map((disaster) => (
            <div key={disaster.id} className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-semibold">{disaster.disaster_type}</h3>
              <p><span className="font-semibold">Location:</span> {disaster.location}</p>
              <p><span className="font-semibold">Description:</span> {disaster.description}</p>
              <p><span className="font-semibold">Severity:</span> {disaster.severity_level}</p>
              <p><span className="font-semibold">Date:</span> {new Date(disaster.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button onClick={() => navigate("/userdashboard")} className="bg-gray-500 text-white px-4 py-2 rounded-md">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ApprovedDisasters;
