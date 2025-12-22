import React, { useState } from "react";
import InstitutionHeader from "../../components/InstitutionHeader";
import "../institution/Institution.css";

const InstitutionProfile = () => {
  const stored = JSON.parse(localStorage.getItem("user") || "{}") || {};
  const [inst, setInst] = useState(stored);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(inst.name || "");
  const [email, setEmail] = useState(inst.email || "");
  const [phone, setPhone] = useState(inst.phone || "");
  const [address, setAddress] = useState(inst.address || "");
  const [place, setPlace] = useState(inst.place || "");
  const [registrationTime, setRegistrationTime] = useState(inst.registrationTime || "");

  const handleSave = () => {
    const updated = { ...inst, name: name.trim(), email: email.trim(), phone: phone.trim(), address: address.trim(), place: place.trim(), registrationTime };
    localStorage.setItem("user", JSON.stringify(updated));
    setInst(updated);
    setEditing(false);
    alert("Institution profile updated");
  };

  return (
    <>
      <InstitutionHeader />

      <div className="inst-wrapper">
        <h2 className="inst-title">Institution Profile</h2>

        <div className="inst-card">
          {!editing ? (
            <>
              <p><strong>Name:</strong> {inst.name || "-"}</p>
              <p><strong>Email:</strong> {inst.email || "-"}</p>
              <p><strong>Phone:</strong> {inst.phone || "-"}</p>
              <p><strong>Place:</strong> {inst.place || "-"}</p>
              <p><strong>Address:</strong> {inst.address || "-"}</p>
              <p><strong>Registration:</strong> {inst.registrationTime || "-"}</p>
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
              <label>
                Place
                <input value={place} onChange={(e) => setPlace(e.target.value)} />
              </label>
              <label>
                Address
                <input value={address} onChange={(e) => setAddress(e.target.value)} />
              </label>
              <label>
                Registration Time
                <input type="datetime-local" value={registrationTime} onChange={(e) => setRegistrationTime(e.target.value)} />
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

export default InstitutionProfile;
