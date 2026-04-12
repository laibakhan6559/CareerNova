import React, { useState, useEffect, useRef } from "react";

// Sample notifications data
const initialNotifications = [
  {
    id: 1,
    type: "deadline",
    title: "Fulbright Deadline Approaching!",
    message: "The Fulbright Scholarship deadline is in 2 weeks. Don't miss this opportunity!",
    time: "2 hours ago",
    read: false,
    link: "#scholarships",
    icon: "⏰",
  },
  {
    id: 2,
    type: "new",
    title: "New Scholarship Added",
    message: "MEXT Scholarship (Japan) has been added to our database. Check eligibility now!",
    time: "5 hours ago",
    read: false,
    link: "#scholarships",
    icon: "🆕",
  },
  {
    id: 3,
    type: "tip",
    title: "Application Tip",
    message: "Start preparing your Statement of Purpose early. Strong SOPs take time to perfect!",
    time: "1 day ago",
    read: false,
    icon: "💡",
  },
  {
    id: 4,
    type: "reminder",
    title: "Complete Your Profile",
    message: "Add your academic details to get personalized scholarship recommendations.",
    time: "2 days ago",
    read: true,
    icon: "📝",
  },
  {
    id: 5,
    type: "deadline",
    title: "Chevening Applications Open",
    message: "UK Chevening Scholarship applications are now open for 2026-2026 intake!",
    time: "3 days ago",
    read: true,
    link: "#scholarships",
    icon: "🎓",
  },
  {
    id: 6,
    type: "update",
    title: "Merit Calculator Updated",
    message: "We've added support for O-Levels and A-Levels grade conversion.",
    time: "4 days ago",
    read: true,
    icon: "✨",
  },
  {
    id: 7,
    type: "new",
    title: "Australia Awards Deadline",
    message: "Australia Awards applications close in 30 days. Start your application now!",
    time: "5 days ago",
    read: true,
    link: "#scholarships",
    icon: "🇦🇺",
  },
];

export default function NotificationSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simulate new notification every 30 seconds
  useEffect(() => {
    const tips = [
      { title: "IELTS Tip", message: "Practice speaking for 30 mins daily to improve fluency.", icon: "📚" },
      { title: "Deadline Alert", message: "DAAD Scholarship deadline is approaching!", icon: "⏰" },
      { title: "New Opportunity", message: "Swiss Government Excellence Scholarship now accepting applications.", icon: "🆕" },
      { title: "Weekly Tip", message: "Strong recommendation letters can make or break your application.", icon: "💡" },
    ];

    const interval = setInterval(() => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      const newNotification = {
        id: Date.now(),
        type: "tip",
        title: randomTip.title,
        message: randomTip.message,
        time: "Just now",
        read: false,
        icon: randomTip.icon,
      };
      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]);
    }, 60000); // Every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case "deadline":
        return "#ef4444";
      case "new":
        return "#22c55e";
      case "tip":
        return "#fbbf24";
      case "reminder":
        return "#3b82f6";
      case "update":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="notification-system" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        className="notification-bell"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="notification-dropdown">
          {/* Header */}
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="header-actions">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="mark-all-btn">
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="notification-filters">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === "unread" ? "active" : ""}`}
              onClick={() => setFilter("unread")}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </button>
            <button
              className={`filter-btn ${filter === "deadline" ? "active" : ""}`}
              onClick={() => setFilter("deadline")}
            >
              ⏰ Deadlines
            </button>
            <button
              className={`filter-btn ${filter === "new" ? "active" : ""}`}
              onClick={() => setFilter("new")}
            >
              🆕 New
            </button>
          </div>

          {/* Notifications List */}
          <div className="notification-list">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.read ? "unread" : ""}`}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.link) {
                      window.location.hash = notification.link.replace("#", "");
                      setIsOpen(false);
                    }
                  }}
                >
                  <div
                    className="notification-icon"
                    style={{ backgroundColor: `${getTypeColor(notification.type)}20` }}
                  >
                    <span>{notification.icon}</span>
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <button
                    className="delete-notification"
                    onClick={(e) => deleteNotification(notification.id, e)}
                    aria-label="Delete notification"
                  >
                    ✕
                  </button>
                  {!notification.read && <div className="unread-dot" style={{ backgroundColor: getTypeColor(notification.type) }} />}
                </div>
              ))
            ) : (
              <div className="no-notifications">
                <span className="no-notif-icon">🔔</span>
                <h4>No notifications</h4>
                <p>{filter === "unread" ? "You're all caught up!" : "No notifications in this category"}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="notification-footer">
              <button onClick={clearAll} className="clear-all-btn">
                Clear All Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



