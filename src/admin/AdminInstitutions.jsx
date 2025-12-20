import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import "./Admin.css";

const AdminInstitutions = () => {
  const [institutions, setInstitutions] = useState([
    { id: 1, name: "ABC University", status: "APPROVED" },
    { id: 2, name: "LMN College", status: "BANNED" },
  ]);

  const toggleStatus = (id) => {
    setInstitutions((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: i.status === "APPROVED" ? "BANNED" : "APPROVED" }
          : i
      )
    );
  };

  return (
    <>
      <AdminHeader />

      <div className="admin-wrapper">
        <h2 className="admin-title">Institutions</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Institution</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {institutions.map((inst) => (
              <tr key={inst.id}>
                <td>{inst.id}</td>
                <td>{inst.name}</td>
                <td className={`status-${inst.status.toLowerCase()}`}>
                  {inst.status}
                </td>
                <td>
                  <button
                    className="btn btn-ban"
                    onClick={() => toggleStatus(inst.id)}
                  >
                    {inst.status === "APPROVED" ? "Ban" : "Unban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminInstitutions;
