import React, { useState } from "react";
import { motion } from "framer-motion";

const fieldsData = [
  {
    icon: "🩺",
    title: "Pre-Medical",
    subtitle: "Biology, Chemistry, Physics",
    color: "#ef4444",
    subfields: [
      "MBBS (Medicine & Surgery)",
      "BDS (Dental Surgery)",
      "DPT (Physical Therapy)",
      "BS Nursing",
      "Pharm D (Pharmacy)",
      "BS Biotechnology",
      "BS Psychology",
      "BS Nutrition & Dietetics",
    ],
  },
  {
    icon: "⚙️",
    title: "Pre-Engineering",
    subtitle: "Math, Physics, Chemistry",
    color: "#f59e0b",
    subfields: [
      "BS Electrical Engineering",
      "BS Mechanical Engineering",
      "BS Civil Engineering",
      "BS Software Engineering",
      "BS Computer Engineering",
      "BS Artificial Intelligence",
      "BS Robotics",
      "BS Mechatronics",
    ],
  },
  {
    icon: "💻",
    title: "ICS",
    subtitle: "Computer, Math, Physics",
    color: "#06b6d4",
    subfields: [
      "BS Computer Science",
      "BS Software Engineering",
      "BS Information Technology",
      "BS Artificial Intelligence",
      "BS Cyber Security",
      "BS Data Science",
      "BS Game Development",
      "BS Cloud Computing",
    ],
  },
  {
    icon: "📊",
    title: "Commerce",
    subtitle: "Accounting, Business, Economics",
    color: "#10b981",
    subfields: [
      "BBA (Business Administration)",
      "BS Accounting & Finance",
      "BS Economics",
      "BS Banking & Finance",
      "BS Marketing",
      "BS Supply Chain",
      "BS Entrepreneurship",
      "BS Human Resource",
    ],
  },
  {
    icon: "📚",
    title: "Arts & Humanities",
    subtitle: "Social Sciences, Literature",
    color: "#8b5cf6",
    subfields: [
      "BS English Literature",
      "BS Psychology",
      "BS Sociology",
      "BS Political Science",
      "BS Mass Communication",
      "BS International Relations",
      "BS Education",
      "BS Fine Arts",
    ],
  },
  {
    icon: "⚖️",
    title: "Professional",
    subtitle: "Open for All Streams",
    color: "#ec4899",
    subfields: [
      "LLB (Law)",
      "B.Architecture",
      "BS Graphic Design",
      "BS Interior Design",
      "BS Fashion Design",
      "BS Media Studies",
      "BS Aviation Management",
      "BS Criminology",
    ],
  },
];

export default function FieldsSection() {
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <div className="fields-page">
      <div className="fields-hero">
        <span className="fields-badge">📖 Career Fields</span>
        <h1 className="fields-title">Explore Your Study Path</h1>
        <p className="fields-subtitle">
          Discover degree programs tailored to your academic background. Click on any field to see available options.
        </p>
      </div>

      <div className="fields-grid">
        {fieldsData.map((field, idx) => (
          <motion.div
            key={idx}
            className={`field-card ${expandedCard === idx ? 'expanded' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
            style={{ '--accent-color': field.color }}
          >
            <div className="field-card-header">
              <div className="field-icon" style={{ background: `${field.color}20` }}>
                {field.icon}
              </div>
              <div className="field-info">
                <h3>{field.title}</h3>
                <span>{field.subtitle}</span>
              </div>
              <div className="field-expand-icon">
                {expandedCard === idx ? '−' : '+'}
              </div>
            </div>
            
            <motion.div 
              className="field-subfields"
              initial={false}
              animate={{ 
                height: expandedCard === idx ? 'auto' : 0,
                opacity: expandedCard === idx ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="subfields-list">
                {field.subfields.map((sub, i) => (
                  <div key={i} className="subfield-item">
                    <span className="subfield-dot" style={{ background: field.color }}></span>
                    {sub}
                  </div>
                ))}
              </div>
              <a
                href="https://en.wikipedia.org/wiki/Bachelor%27s_degree"
                target="_blank"
                rel="noopener noreferrer"
                className="field-explore-btn"
                onClick={(e) => e.stopPropagation()}
              >
                Explore Programs →
              </a>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="fields-cta">
        <div className="cta-content">
          <h3>🎯 Not sure which field to choose?</h3>
          <p>Use our AI Advisor to get personalized recommendations based on your interests and scores.</p>
        </div>
      </div>
    </div>
  );
}


