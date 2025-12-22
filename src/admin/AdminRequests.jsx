import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import "./Admin.css";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("institutionRequests")) || [];
    setRequests(stored);
  }, []);

  const updateStatus = (id, status) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status } : req
    );

    setRequests(updated);
    localStorage.setItem(
      "institutionRequests",
      JSON.stringify(updated)
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
              <th>Email</th>
              <th>License</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.license}</td>
                <td className="status-pending">{req.status}</td>
                <td>
                  {req.status === "PENDING" && (
                    <>
                      <button
                        className="btn btn-approve"
                        onClick={() =>
                          updateStatus(req.id, "APPROVED")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-reject"
                        onClick={() =>
                          updateStatus(req.id, "REJECTED")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
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
