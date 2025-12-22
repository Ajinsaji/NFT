import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstitutionHeader from "../../components/InstitutionHeader";
import "../institution/Institution.css";

const InstitutionAccountSettings = () => {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("user") || "{}");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const current = stored.password || "password";
    if (oldPwd !== current) {
      alert("Old password is incorrect");
      return;
    }
    if (!newPwd || newPwd !== confirmPwd) {
      alert("New passwords do not match or are empty");
      return;
    }
    const updated = { ...stored, password: newPwd };
    localStorage.setItem("user", JSON.stringify(updated));
    setOldPwd("");
    setNewPwd("");
    setConfirmPwd("");
    alert("Password updated");
  };

  return (
    <>
      <InstitutionHeader />

      <div className="inst-wrapper">
        <h2 className="inst-title">Account Settings</h2>

        <div className="inst-card">
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

export default InstitutionAccountSettings;
