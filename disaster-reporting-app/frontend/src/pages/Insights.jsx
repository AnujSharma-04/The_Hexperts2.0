import { useEffect, useState, useRef } from "react";
import NewsCard from "../components/NewsCard";
import Chart from "chart.js/auto";
import { getDisasterNews } from "../apiService"; // Importing the API service to fetch news

// Importing district data
import { districtData } from "./districtData"; // Assuming data file is 'districtData.js'

const Insights = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("Ahmedabad"); // Default selected district

  // Chart references
  const disasterChartRef = useRef(null);
  const severityChartRef = useRef(null);
  const monthlyChartRef = useRef(null);
  const statusChartRef = useRef(null);

  // Add refs for chart instances
  const chartInstances = useRef({});

  // Fetch Disaster News when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedArticles = await getDisasterNews(); // Fetch disaster news using the API
        setArticles(fetchedArticles);
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        setError("Failed to fetch disaster news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (!disasterChartRef.current || !severityChartRef.current || !monthlyChartRef.current || !statusChartRef.current) return;

    // Destroy existing charts
    Object.values(chartInstances.current).forEach(chart => {
      if (chart) chart.destroy();
    });

    const districtInfo = districtData[selectedDistrict];

    // Create charts for selected district
    chartInstances.current.disasterChart = new Chart(disasterChartRef.current, {
      type: "bar",
      data: {
        labels: districtInfo.disasterTypes.labels,
        datasets: [{
          label: "Reports",
          data: districtInfo.disasterTypes.data,
          backgroundColor: "rgba(54, 162, 235, 0.8)"
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    chartInstances.current.severityChart = new Chart(severityChartRef.current, {
      type: "pie",
      data: {
        labels: districtInfo.severityLevels.labels,
        datasets: [{
          data: districtInfo.severityLevels.data,
          backgroundColor: [
            "rgba(75, 192, 192, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(255, 99, 132, 0.8)"
          ],
        }],
      },
      options: {
        responsive: true,
      },
    });

    chartInstances.current.monthlyChart = new Chart(monthlyChartRef.current, {
      type: "line",
      data: {
        labels: districtInfo.monthlyReports.labels,
        datasets: [{
          label: "Reports per Month",
          data: districtInfo.monthlyReports.data,
          borderColor: "rgba(153, 102, 255, 1)",
          tension: 0.1,
          fill: false,
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    chartInstances.current.statusChart = new Chart(statusChartRef.current, {
      type: "doughnut",
      data: {
        labels: districtInfo.statusDistribution.labels,
        datasets: [{
          data: districtInfo.statusDistribution.data,
          backgroundColor: [
            "rgba(54, 162, 235, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(255, 159, 64, 0.8)"
          ],
        }],
      },
      options: {
        responsive: true,
      },
    });

    // Cleanup function
    return () => {
      Object.values(chartInstances.current).forEach(chart => {
        if (chart) chart.destroy();
      });
    };
  }, [selectedDistrict]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Disaster News & Analytics</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* News Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <NewsCard key={index} title={article.title || "No title available"} description={article.description || "No description available"} url={article.url || "#"} />
        ))}
      </div>

      {/* District Selection Dropdown */}
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold">Select District</h2>
        <select
          className="mt-2 p-2 border border-gray-300 rounded"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Surat">Surat</option>
          <option value="Vadodara">Vadodara</option>
        </select>
      </div>

      {/* District Heading - Changed text color to white */}
      <h2 className="text-2xl font-semibold text-center mt-10 text-white">
        {selectedDistrict} - Disaster Analytics
      </h2>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold text-center mb-3">Disasters by Type</h3>
          <canvas ref={disasterChartRef}></canvas>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold text-center mb-3">Disasters by Severity</h3>
          <canvas ref={severityChartRef}></canvas>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold text-center mb-3">Monthly Reports</h3>
          <canvas ref={monthlyChartRef}></canvas>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold text-center mb-3">Report Status Distribution</h3>
          <canvas ref={statusChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Insights;
