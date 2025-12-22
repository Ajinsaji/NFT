import React, { useState } from "react";
import { Link } from "react-router-dom";
import InstitutionHeader from "../../components/InstitutionHeader";
import "./Institution.css";

const InstitutionDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  /* ----------------------------
     FRONTEND TEST DATA
  ----------------------------- */
  const [institution] = useState({
    name: user.name || "Demo Institution",
    contactNumber: "9876543210",
    status: "Approved",
  });

  const [certificates] = useState([
    {
      id: "101",
      subject: "BCA",
      studentName: "Ajin",
      year: 2024,
    },
    {
      id: "102",
      subject: "Web Development",
      studentName: "Arun",
      year: 2023,
    },
  ]);

  return (
    <>
      {/* Institution-specific header */}
      <InstitutionHeader />

      <div className="inst-wrapper">
        <h2 className="inst-title">Institution Dashboard</h2>

        {/* Institution Info */}
        <div className="inst-card">
          <p>
            <strong>Institution:</strong> {institution.name}
          </p>
          <p>
            <strong>Contact:</strong> {institution.contactNumber}
          </p>
          <p>
            <strong>Status:</strong> {institution.status}
          </p>
        </div>

        {/* Action */}
        <div style={{ marginBottom: 20 }}>
          <Link to="/issue-certificate" className="btn btn-primary">
            Issue Certificate
          </Link>
          <Link to="/institution-profile" className="btn" style={{ marginLeft: 8 }}>
            Profile
          </Link>
          <Link to="/institution-account-settings" className="btn" style={{ marginLeft: 8 }}>
            Account
          </Link>
        </div>

        {/* Issued Certificates */}
        <div className="inst-card">
          <h3>Recently Issued Certificates</h3>

          {certificates.length === 0 ? (
            <p>No certificates issued yet.</p>
          ) : (
            <table className="inst-table">
              <thead>
                <tr>
                  <th>Token ID</th>
                  <th>Student Name</th>
                  <th>Subject</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id}>
                    <td>{cert.id}</td>
                    <td>{cert.studentName}</td>
                    <td>{cert.subject}</td>
                    <td>{cert.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default InstitutionDashboard;
