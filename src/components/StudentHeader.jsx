import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./StudentHeader.css";

const StudentHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="student-header">
      <div className="student-header-inner">
        {/* Logo */}
        <Link to="/student-dashboard" className="student-logo">
          🎓 Student Panel
        </Link>

        {/* Navigation */}
        <nav className="student-nav">
          <Link
            to="/student-dashboard"
            className={location.pathname === "/student-dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>

          <Link
            to="/student-profile"
            className={location.pathname === "/student-profile" ? "active" : ""}
          >
            Profile
          </Link>

          <Link
            to="/account-settings"
            className={location.pathname === "/account-settings" ? "active" : ""}
          >
            Settings
          </Link>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default StudentHeader;
