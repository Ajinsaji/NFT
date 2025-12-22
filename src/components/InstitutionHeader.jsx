import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./InstitutionHeader.css";

const InstitutionHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="inst-header">
      <div className="inst-header-inner">
        {/* Logo */}
        <Link to="/institution-dashboard" className="inst-logo">
          🏫 Institution Panel
        </Link>

        {/* Navigation */}
        <nav className="inst-nav">
          <Link
            to="/institution-dashboard"
            className={location.pathname === "/institution-dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>

          <Link
            to="/issue-certificate"
            className={location.pathname === "/issue-certificate" ? "active" : ""}
          >
            Issue Certificate
          </Link>

          <Link
            to="/institution-profile"
            className={location.pathname === "/institution-profile" ? "active" : ""}
          >
            Profile
          </Link>

          <Link
            to="/institution-account-settings"
            className={location.pathname === "/institution-account-settings" ? "active" : ""}
          >
            Account
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default InstitutionHeader;
