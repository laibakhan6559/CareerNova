import React from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import StatsChart from "../components/StatsChart";
import InteractionChart from "../components/InteractionChart";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Advisor from "../components/Advisor";
import University from "../components/University";
import ScholarshipFinder from "../components/ScholarshipFinder";
import ResumeBuilder from "../components/ResumeBuilder";
import Fields from "../components/Fields";
import TrendingFields from "../components/TrendingFields";
import EvaluationTest from "../components/EvaluationTest";
import Footer from "../components/Footer";
import AIChatBot from "../components/AIChatBot";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState({
    activeUsers: 1245,
    siteRating: 4.8,
    engagement: 87,
  });
  const [active, setActive] = React.useState("advisor");

  // Get user info from Firebase auth
  const user = auth.currentUser;
  const userEmail = user?.email || "";
  
  // Extract username from email (part before @)
  const getUserName = (email) => {
    if (!email) return "User";
    const namePart = email.split("@")[0];
    // Capitalize first letter and handle common separators
    return namePart
      .replace(/[._-]/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  
  const userName = getUserName(userEmail);

  // Simulate real-time stats updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const userDelta = Math.floor((Math.random() - 0.45) * 50);
        const ratingDelta = (Math.random() - 0.5) * 0.2;
        const engagementDelta = Math.floor((Math.random() - 0.5) * 5);

        return {
          activeUsers: Math.max(800, Math.min(2000, prev.activeUsers + userDelta)),
          siteRating: Math.max(3.5, Math.min(5, +(prev.siteRating + ratingDelta).toFixed(1))),
          engagement: Math.max(60, Math.min(99, prev.engagement + engagementDelta)),
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  function renderActive() {
    switch (active) {
      case "advisor":
        return <Advisor />;
      case "university":
        return <University />;
      case "scholarships":
        return <ScholarshipFinder />;
      case "resume":
        return <ResumeBuilder />;
      case "fields":
        return <Fields />;
      case "evaluation":
        return <EvaluationTest />;
      case "trending":
        return <TrendingFields />;
      default:
        return null;
    }
  }

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="dashboard-root">
      <Navbar
        active={active}
        onChange={(id) => setActive(id)}
        onLogout={handleLogout}
        userName={userName}
      />
      <header className="dashboard-header">
        <div className="header-content">
          <motion.div 
            className="welcome-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="welcome-greeting">{getGreeting()},</span>
            <span className="welcome-name">{userName}! </span>
          </motion.div>
          <h1>CareerNova</h1>
          <p className="caption">
            Explore career paths, track progress, and receive AI-powered
            guidance to achieve your professional goals.
          </p>
        </div>
      </header>
      {active === "advisor" && (
        <section className="dashboard-overview">
          <div className="stats-box-row">
            <div className="stats-box card">
              <span className="stats-label">Active Users</span>
              <motion.span 
                className="stats-value gradient-text"
                key={stats.activeUsers}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stats.activeUsers.toLocaleString()}
              </motion.span>
              <span className="stats-indicator up">↑ Live</span>
            </div>
            <div className="stats-box card">
              <span className="stats-label">Rating</span>
              <motion.span 
                className="stats-value gradient-text"
                key={stats.siteRating}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stats.siteRating.toFixed(1)} / 5
              </motion.span>
              <span className="stats-indicator">⭐ Users</span>
            </div>
            <div className="stats-box card">
              <span className="stats-label">Engagement</span>
              <motion.span 
                className="stats-value gradient-text"
                key={stats.engagement}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stats.engagement}%
              </motion.span>
              <span className="stats-indicator up">↑ Active</span>
            </div>
          </div>

          <motion.div
            className="graphs-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="graph-col">
              <StatsChart stats={stats} />
            </div>
            <div className="graph-col">
              <InteractionChart />
            </div>
          </motion.div>
        </section>
      )}
      <main className="dashboard-main with-nav">{renderActive()}</main>
      <Footer />
      <AIChatBot />
    </div>
  );
}


