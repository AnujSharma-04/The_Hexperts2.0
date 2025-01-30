import { useEffect, useState, useRef } from "react";
import NewsCard from "../components/NewsCard";
import Chart from "chart.js/auto";
import { getDisasterNews } from "../apiService"; // Importing the API service to fetch news

const Insights = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chart references
  const disasterChartRef = useRef(null);
  const severityChartRef = useRef(null);
  const monthlyChartRef = useRef(null);
  const statusChartRef = useRef(null);

  // Dummy Data
  const dummyData = {
    disasterTypes: { labels: ["Flood", "Earthquake", "Fire", "Landslide", "Storm"], data: [30, 15, 25, 10, 20] },
    severityLevels: { labels: ["Low", "Medium", "High"], data: [20, 45, 35] },
    monthlyReports: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], data: [12, 19, 15, 25, 22, 30] },
    statusDistribution: { labels: ["Submitted", "Approved", "Rejected", "Merged"], data: [40, 30, 20, 10] },
  };

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
    
    if (!disasterChartRef.current || !severityChartRef.current || !monthlyChartRef.current || !statusChartRef.current) return;

    // Create charts
    new Chart(disasterChartRef.current, {
      type: "bar",
      data: { labels: dummyData.disasterTypes.labels, datasets: [{ label: "Reports", data: dummyData.disasterTypes.data, backgroundColor: "rgba(54, 162, 235, 0.8)" }] },
      options: { responsive: true, scales: { y: { beginAtZero: true } } },
    });

    new Chart(severityChartRef.current, {
      type: "pie",
      data: { labels: dummyData.severityLevels.labels, datasets: [{ data: dummyData.severityLevels.data, backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(255, 206, 86, 0.8)", "rgba(255, 99, 132, 0.8)"] }] },
      options: { responsive: true },
    });

    new Chart(monthlyChartRef.current, {
      type: "line",
      data: { labels: dummyData.monthlyReports.labels, datasets: [{ label: "Reports per Month", data: dummyData.monthlyReports.data, borderColor: "rgba(153, 102, 255, 1)", tension: 0.1, fill: false }] },
      options: { responsive: true, scales: { y: { beginAtZero: true } } },
    });

    new Chart(statusChartRef.current, {
      type: "doughnut",
      data: { labels: dummyData.statusDistribution.labels, datasets: [{ data: dummyData.statusDistribution.data, backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(75, 192, 192, 0.8)", "rgba(255, 99, 132, 0.8)", "rgba(255, 159, 64, 0.8)"] }] },
      options: { responsive: true },
    });
  }, []);

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

      {/* Analytics Section */}
      <h2 className="text-2xl font-semibold text-center mt-10">Disaster Analytics</h2>
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
