import React from "react";
import StudentHeader from "../components/StudentHeader";
import "./Profile.css";

const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <StudentHeader />

      <div className="profile-wrapper">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> Active</p>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
