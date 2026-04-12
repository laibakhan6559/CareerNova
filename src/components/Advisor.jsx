import React from "react";
import SmartAnalysisForm from "./SmartAnalysisForm";

export default function Advisor() {
  return (
    <div className="advisor-container">
      {/* Analyzer Section */}
      <div className="advisor-section">
        <SmartAnalysisForm />
      </div>

      {/* CareerNova Journey Section */}
      <div className="journey-section">
        <h2 className="journey-title">CareerNova Journey</h2>
        <p className="journey-subtitle">
          Let personalized guide to choose the right career path.
        </p>
        <div className="journey-grid">
          <NextStepCard
            icon="👤"
            title="Discover"
            text="Discover your strengths, set clear goals, and unlock expert insights for career success."
          />
          <NextStepCard
            icon="🗂️"
            title="Explore"
            text="Explore various fields and find the one that matches your interests."
          />
          <NextStepCard
            icon="🎯"
            title="Receive"
            text="Receive expert advice based on your skills and academic background."
          />
          <NextStepCard
            icon="🏫"
            title="Understand"
            text="Understand which university programs align with your academic and career goals."
          />
          <NextStepCard
            icon="💼"
            title="Discover"
            text="Discover top career opportunities in your chosen field."
          />
          <NextStepCard
            icon="📊"
            title="Analyze"
            text="Analyze your strengths and discover your best-fit profession."
          />
          <NextStepCard
            icon="🎓"
            title="Get"
            text="Get recommendations for degrees and subjects to pursue."
          />
          <NextStepCard
            icon="🗺️"
            title="Build"
            text="Build a clear and detailed roadmap for your successful future career."
          />
        </div>
      </div>
    </div>
  );
}

function NextStepCard({ icon, title, text }) {
  return (
    <div className="journey-card">
      <div className="journey-card-icon">{icon}</div>
      <h4 className="journey-card-title">{title}</h4>
      <p className="journey-card-text">{text}</p>
    </div>
  );
}


