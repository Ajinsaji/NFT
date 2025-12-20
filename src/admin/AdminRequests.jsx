import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import "./Admin.css";

const AdminRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: "ABC University", status: "PENDING" },
    { id: 2, name: "XYZ Institute", status: "PENDING" },
  ]);

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    );
  };

  return (
    <>
      <AdminHeader />

      <div className="admin-wrapper">
        <h2 className="admin-title">Institution Requests</h2>

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
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.name}</td>
                <td className="status-pending">{req.status}</td>
                <td>
                  <button
                    className="btn btn-approve"
                    onClick={() => updateStatus(req.id, "APPROVED")}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-reject"
                    onClick={() => updateStatus(req.id, "REJECTED")}
                  >
                    Reject
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

export default AdminRequests;
