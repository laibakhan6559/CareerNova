import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import NotificationSystem from "./NotificationSystem";

export default function Navbar({ active, onChange, onLogout }) {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { id: "advisor", label: "Advisor" },
    { id: "university", label: "University" },
    { id: "scholarships", label: "Scholarships" },
    { id: "resume", label: "Resume" },
    { id: "fields", label: "Fields" },
    { id: "evaluation", label: "Counselor" },
    { id: "trending", label: "Trending" },
  ];

  function handleClick(id, e) {
    if (e && (e.metaKey || e.ctrlKey || e.button === 1)) return;
    e?.preventDefault();

    // Close mobile menu when item is clicked
    setMenuOpen(false);

    if (id === active) {
      if (window && window.location) window.location.hash = "";
      onChange?.(null);
      return;
    }

    if (window && window.location) window.location.hash = id;
    onChange?.(id);
  }

  return (
    <nav className="topnav" role="navigation" aria-label="Main navigation">
      <div className="nav-left">
        <div className="brand">CareerNova</div>
      </div>

      <div className={`nav-center ${menuOpen ? "open" : ""}`}>
        <div className="nav-links">
          {items.map((it) => (
            <button
              key={it.id}
              className={`nav-btn ${it.id === active ? "active" : ""}`}
              onClick={(e) => handleClick(it.id, e)}
              aria-pressed={it.id === active}
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>

      <div className="nav-right">
        <NotificationSystem />
        
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button className="logout-btn" onClick={onLogout} aria-label="Logout">
          Logout
        </button>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}


