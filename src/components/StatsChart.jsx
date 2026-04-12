import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsChart({ stats = {} }) {
  // Normalize values to similar scale for better visualization
  const activeUsers = stats.activeUsers || 1245;
  const rating = stats.siteRating || 4.8;
  const engagement = stats.engagement || 87;

  const chartData = {
    labels: ["Users", "Rating", "Engage"],
    datasets: [
      {
        data: [
          activeUsers / 15, // Scale down users to ~80-130 range
          rating * 20,      // Scale up rating to ~80-100 range
          engagement,       // Already in good range
        ],
        backgroundColor: [
          "rgba(124, 58, 237, 0.9)",
          "rgba(6, 182, 212, 0.9)",
          "rgba(16, 185, 129, 0.9)",
        ],
        borderColor: [
          "rgb(124, 58, 237)",
          "rgb(6, 182, 212)",
          "rgb(16, 185, 129)",
        ],
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        padding: 14,
        titleFont: { size: 13, weight: "700" },
        bodyFont: { size: 14 },
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          title: () => "",
          label: function (context) {
            const index = context.dataIndex;
            if (index === 0) return `👥 Active Users: ${activeUsers.toLocaleString()}`;
            if (index === 1) return `⭐ Rating: ${rating.toFixed(1)} / 5`;
            return `📊 Engagement: ${engagement}%`;
          },
        },
      },
    },
    animation: {
      duration: 600,
      easing: "easeOutQuart",
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
        grid: { 
          color: "rgba(255, 255, 255, 0.04)",
          drawBorder: false,
        },
        ticks: { display: false },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { 
          color: "rgba(255, 255, 255, 0.6)",
          padding: 8,
          font: { size: 12, weight: "600" },
        },
        border: { display: false },
      },
    },
  };

  return (
    <div className="chart-card card">
      <div className="chart-header">
        <h3>Real-time metrics</h3>
        <span className="live-badge">● LIVE</span>
      </div>
      <div className="chart-stats-summary">
        <div className="mini-stat">
          <span className="mini-stat-value purple">{activeUsers.toLocaleString()}</span>
          <span className="mini-stat-label">Users</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value cyan">{rating.toFixed(1)}</span>
          <span className="mini-stat-label">Rating</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value green">{engagement}%</span>
          <span className="mini-stat-label">Engage</span>
        </div>
      </div>
      <div className="chart-container-bar">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}


