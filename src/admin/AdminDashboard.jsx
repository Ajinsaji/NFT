import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import "./Admin.css";

const AdminDashboard = () => {
  /* ----------------------------
     FRONTEND DEMO DATA
  ----------------------------- */
  const [institutions, setInstitutions] = useState([
    { id: 1, name: "ABC University", status: "PENDING" },
    { id: 2, name: "XYZ Institute", status: "APPROVED" },
    { id: 3, name: "LMN College", status: "BANNED" },
  ]);

  const [certificates] = useState([
    {
      tokenId: "101",
      institution: "XYZ Institute",
      student: "Ajin",
      course: "BCA",
      year: 2024,
    },
    {
      tokenId: "102",
      institution: "XYZ Institute",
      student: "Arun",
      course: "Web Development",
      year: 2023,
    },
  ]);

  /* ----------------------------
     ACTION HANDLERS
  ----------------------------- */

  const updateStatus = (id, newStatus) => {
    setInstitutions((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, status: newStatus } : inst
      )
    );
  };

  return (
    <>
      <AdminHeader />

      <div className="admin-wrapper">
        <h2 className="admin-title">Admin Dashboard</h2>

        {/* ================= INSTITUTIONS ================= */}
        <div className="admin-card">
          <h3>Institution Requests & Management</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Institution</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {institutions.map((inst) => (
                <tr key={inst.id}>
                  <td>{inst.id}</td>
                  <td>{inst.name}</td>
                  <td
                    className={`status-${inst.status.toLowerCase()}`}
                  >
                    {inst.status}
                  </td>

                  <td className="action-cell">
                    {inst.status === "PENDING" && (
                      <>
                        <button
                          className="btn btn-approve"
                          onClick={() =>
                            updateStatus(inst.id, "APPROVED")
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-reject"
                          onClick={() =>
                            updateStatus(inst.id, "REJECTED")
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {inst.status === "APPROVED" && (
                      <button
                        className="btn btn-ban"
                        onClick={() =>
                          updateStatus(inst.id, "BANNED")
                        }
                      >
                        Ban
                      </button>
                    )}

                    {inst.status === "BANNED" && (
                      <button
                        className="btn btn-approve"
                        onClick={() =>
                          updateStatus(inst.id, "APPROVED")
                        }
                      >
                        Unban
                      </button>
                    )}

                    {inst.status === "REJECTED" && (
                      <span className="rejected-text">
                        Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= CERTIFICATES ================= */}
        <div className="admin-card">
          <h3>All Issued Certificates</h3>

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
              {certificates.map((cert) => (
                <tr key={cert.tokenId}>
                  <td>{cert.tokenId}</td>
                  <td>{cert.institution}</td>
                  <td>{cert.student}</td>
                  <td>{cert.course}</td>
                  <td>{cert.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
