import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import "./Admin.css";

const AdminCertificates = () => {
  const [certificates] = useState([
    { tokenId: "101", student: "Ajin", institution: "XYZ Institute", course: "BCA", year: 2024 },
    { tokenId: "102", student: "Arun", institution: "XYZ Institute", course: "Web Dev", year: 2023 },
  ]);

  return (
    <>
      <AdminHeader />

      <div className="admin-wrapper">
        <h2 className="admin-title">Admin — Certificates</h2>

        <div className="admin-card">
          <h3>Issued Certificates</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Token ID</th>
                <th>Institution</th>
                <th>Student</th>
                <th>Course</th>
                <th>Year</th>
              </tr>
            </thead>

            <tbody>
              {certificates.map((c) => (
                <tr key={c.tokenId}>
                  <td>{c.tokenId}</td>
                  <td>{c.institution}</td>
                  <td>{c.student}</td>
                  <td>{c.course}</td>
                  <td>{c.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminCertificates;
