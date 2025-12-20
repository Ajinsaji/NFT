import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminHeader.css";

const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header-inner">
        <div className="admin-logo">🛡️ Admin Panel</div>

        <nav className="admin-nav">
          <Link to="/admin-dashboard" className={location.pathname === "/admin-dashboard" ? "active" : ""}>
            Dashboard
          </Link>

          <Link to="/admin-requests" className={location.pathname === "/admin-requests" ? "active" : ""}>
            Requests
          </Link>

          <Link to="/admin-institutions" className={location.pathname === "/admin-institutions" ? "active" : ""}>
            Institutions
          </Link>

          <Link to="/admin-students" className={location.pathname === "/admin-students" ? "active" : ""}>
            Students
          </Link>

          <Link to="/admin-certificates" className={location.pathname === "/admin-certificates" ? "active" : ""}>
            Certificates
          </Link>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
