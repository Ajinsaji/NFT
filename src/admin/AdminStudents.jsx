import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import "./Admin.css";

const AdminStudents = () => {
  const [students] = useState([
    { id: 1, name: "Ajin", email: "ajin@example.com", course: "BCA" },
    { id: 2, name: "Arun", email: "arun@example.com", course: "Web Dev" },
    { id: 3, name: "Meera", email: "meera@example.com", course: "MBA" },
  ]);

  return (
    <>
      <AdminHeader />

      <div className="admin-wrapper">
        <h2 className="admin-title">Admin — Students</h2>

        <div className="admin-card">
          <h3>Registered Students</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminStudents;
