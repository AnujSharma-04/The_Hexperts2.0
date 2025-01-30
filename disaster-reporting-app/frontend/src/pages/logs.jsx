import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLogs } from "../apiService";
import { getUserInfo } from "../utils/decode";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await getLogs(userInfo.district);
      setLogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-blue-600">Disaster Logs</h2>
        <p className="text-gray-600 text-center mb-6">View all disasters you have approved or rejected.</p>

        {loading ? (
          <p className="text-center">Loading logs...</p>
        ) : logs.length === 0 ? (
          <p className="text-center text-gray-600">No logs available.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
            <div key={log.id} className={`p-6 rounded-lg shadow-md ${log.action === "approved" ? "bg-green-100" : "bg-red-100"}`}>
                <h3 className="text-xl font-semibold">{log.disaster_type || "Unknown Disaster"}</h3>
                <p><span className="font-semibold">Action:</span> {log.action}</p>
                <p><span className="font-semibold">Location:</span> {log.location || "Unknown Location"}</p>
                <p><span className="font-semibold">Date:</span> {log.timestamp ? new Date(log.timestamp).toLocaleString() : "No Date Available"}</p>
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

export default Logs;
