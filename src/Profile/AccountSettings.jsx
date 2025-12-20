import React from "react";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../components/StudentHeader";
import "./Profile.css";

const AccountSettings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <StudentHeader />

      <div className="profile-wrapper">
        <h2 className="profile-title">Account Settings</h2>

        <div className="profile-card">
          <p>🔐 Change Password (Demo)</p>
          <p>🔔 Notifications (Future)</p>
          <p>🔒 Security Settings (Future)</p>
        </div>

        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default AccountSettings;
