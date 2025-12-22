import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import "./Admin.css";

const AdminAccountSettings = () => {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("admin") || "{}");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const current = stored.password || "admin";
    if (oldPwd !== current) {
      alert("Old password is incorrect");
      return;
    }
    if (!newPwd || newPwd !== confirmPwd) {
      alert("New passwords do not match or are empty");
      return;
    }
    const updated = { ...stored, password: newPwd };
    localStorage.setItem("admin", JSON.stringify(updated));
    setOldPwd("");
    setNewPwd("");
    setConfirmPwd("");
    alert("Admin password updated");
  };

  return (
    <>
      <AdminHeader />

      <div className="admin-wrapper">
        <h2 className="admin-title">Account Settings</h2>

        <div className="admin-card">
          <form onSubmit={handleChangePassword}>
            <div>
              <label>
                Old Password
                <input type="password" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                New Password
                <input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                Confirm New Password
                <input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
              </label>
            </div>
            <div style={{ marginTop: 10 }}>
              <button type="submit" className="btn btn-primary">Change Password</button>
            </div>
          </form>
        </div>

        <button className="btn btn-danger" onClick={handleLogout} style={{ marginTop: 12 }}>
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminAccountSettings;
