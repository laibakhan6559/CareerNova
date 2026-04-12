import React from "react";
import { motion } from "framer-motion";

const trendingFields = [
  {
    degree: "BS Computer Science",
    area: "Technology & Software",
    growth: "Very High",
    percent: 95,
    icon: "💻",
    color: "#06b6d4",
    demand: "500K+ Jobs",
  },
  {
    degree: "BS Artificial Intelligence",
    area: "Machine Learning & AI",
    growth: "Very High",
    percent: 98,
    icon: "🤖",
    color: "#8b5cf6",
    demand: "300K+ Jobs",
  },
  {
    degree: "BS Data Science",
    area: "Analytics & Big Data",
    growth: "Very High",
    percent: 92,
    icon: "📊",
    color: "#10b981",
    demand: "400K+ Jobs",
  },
  {
    degree: "BS Cyber Security",
    area: "Network Security",
    growth: "Very High",
    percent: 90,
    icon: "🔐",
    color: "#ef4444",
    demand: "350K+ Jobs",
  },
  {
    degree: "MBBS Medicine",
    area: "Healthcare",
    growth: "High",
    percent: 85,
    icon: "⚕️",
    color: "#f59e0b",
    demand: "1M+ Jobs",
  },
  {
    degree: "BS Software Engineering",
    area: "App Development",
    growth: "Very High",
    percent: 93,
    icon: "📱",
    color: "#ec4899",
    demand: "600K+ Jobs",
  },
  {
    degree: "BBA Business Admin",
    area: "Management",
    growth: "High",
    percent: 80,
    icon: "💼",
    color: "#6366f1",
    demand: "450K+ Jobs",
  },
  {
    degree: "BS Cloud Computing",
    area: "Infrastructure",
    growth: "Very High",
    percent: 88,
    icon: "☁️",
    color: "#0ea5e9",
    demand: "250K+ Jobs",
  },
  {
    degree: "BS Robotics",
    area: "Automation",
    growth: "Very High",
    percent: 87,
    icon: "🦾",
    color: "#14b8a6",
    demand: "200K+ Jobs",
  },
];

function GrowthBar({ percent, color }) {
  return (
    <div className="growth-bar-container">
      <motion.div 
        className="growth-bar-fill"
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ background: color }}
      />
    </div>
  );
}

export default function TrendingFields() {
  return (
    <div className="trending-page">
      <div className="trending-hero">
        <span className="trending-badge">📈 Market Trends 2026</span>
        <h1 className="trending-title">Trending Career Fields</h1>
        <p className="trending-subtitle">
          Explore the most in-demand degrees based on job market analysis and growth projections.
        </p>
      </div>

      <div className="trending-stats">
        <div className="stat-item">
          <span className="stat-number">9M+</span>
          <span className="stat-label">Global Job Openings</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">45%</span>
          <span className="stat-label">Tech Sector Growth</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">$85K</span>
          <span className="stat-label">Avg. Starting Salary</span>
        </div>
      </div>

      <div className="trending-grid">
        {trendingFields.map((field, idx) => (
          <motion.div
            key={idx}
            className="trending-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="trending-card-top">
              <div className="trending-icon" style={{ background: `${field.color}20`, color: field.color }}>
                {field.icon}
              </div>
              <div className="trending-growth" style={{ color: field.color }}>
                {field.growth}
              </div>
            </div>
            
            <h3 className="trending-degree">{field.degree}</h3>
            <p className="trending-area">{field.area}</p>
            
            <div className="trending-metrics">
              <div className="growth-section">
                <div className="growth-label">
                  <span>Growth Rate</span>
                  <span style={{ color: field.color }}>{field.percent}%</span>
                </div>
                <GrowthBar percent={field.percent} color={field.color} />
              </div>
              <div className="demand-badge">
                <span>🔥</span> {field.demand}
              </div>
            </div>

            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(field.degree + ' career opportunities')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="trending-btn"
              style={{ '--btn-color': field.color }}
            >
              View Careers
            </a>
          </motion.div>
        ))}
      </div>

      <div className="trending-footer">
        <p>💡 Data sourced from LinkedIn, Indeed, and Glassdoor job market reports.</p>
      </div>
    </div>
  );
}


