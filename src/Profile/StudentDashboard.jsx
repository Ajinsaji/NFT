import React from "react";
import { Link } from "react-router-dom";
import StudentHeader from "../components/StudentHeader";
import "./Profile.css";

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      {/* Student-specific header */}
      <StudentHeader />

      <div className="profile-wrapper">
        <h2 className="profile-title">Student Dashboard</h2>

        <div className="profile-card">
          <p><strong>Name:</strong> {user.name || "Student"}</p>
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <p><strong>Role:</strong> STUDENT</p>
        </div>

        {/* Navigation cards */}
        <div className="profile-actions">
          <Link to="/student-profile" className="profile-link">
            My Profile
          </Link>

          <Link to="/account-settings" className="profile-link">
            Account Settings
          </Link>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
