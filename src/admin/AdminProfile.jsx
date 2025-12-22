import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import "./Admin.css";

const AdminProfile = () => {
  const stored = JSON.parse(localStorage.getItem("admin") || "{}" );
  const [user, setUser] = useState(stored);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");

  const handleSave = () => {
    const updated = { ...user, name: name.trim(), email: email.trim(), phone: phone.trim() };
    localStorage.setItem("admin", JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
    alert("Admin profile updated");
  };

  return (
    <>
      <AdminHeader />

      <div className="admin-wrapper">
        <h2 className="admin-title">My Profile</h2>

        <div className="admin-card">
          {!editing ? (
            <>
              <p><strong>Name:</strong> {user.name || "-"}</p>
              <p><strong>Email:</strong> {user.email || "-"}</p>
              <p><strong>Phone:</strong> {user.phone || "-"}</p>
              <button className="btn" onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          ) : (
            <>
              <label>
                Name
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                Email
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>
                Phone
                <input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </label>
              <div style={{ marginTop: 10 }}>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                <button className="btn" onClick={() => setEditing(false)} style={{ marginLeft: 8 }}>Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
