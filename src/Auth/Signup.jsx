import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [licenseFile, setLicenseFile] = useState(null);

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSignup = () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    /* ================= INSTITUTION SIGNUP ================= */
    if (role === "INSTITUTION") {
      if (!licenseFile) {
        setError("Institution license is required");
        return;
      }

      const requests =
        JSON.parse(localStorage.getItem("institutionRequests")) || [];

      requests.push({
        id: Date.now(),
        name,
        email,
        license: licenseFile.name,
        status: "PENDING",
      });

      localStorage.setItem(
        "institutionRequests",
        JSON.stringify(requests)
      );

      setSubmitted(true);
      setShowPopup(true);

      setTimeout(() => {
        navigate("/login");
      }, 2500);

      return;
    }

    /* ================= STUDENT SIGNUP ================= */
    // basic validation
    if (!name || !email || !password) {
      setError("Name, email and password are required");
      return;
    }

    const student = { name, email, phone, dob, password, role: "STUDENT" };
    localStorage.setItem("user", JSON.stringify(student));
    navigate("/student-dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="STUDENT">Student</option>
          <option value="INSTITUTION">Institution</option>
        </select>

        <input
          placeholder={role === "INSTITUTION" ? "Institution Name" : "Full Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {role === "STUDENT" && (
          <>
            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {role === "INSTITUTION" && (
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => setLicenseFile(e.target.files[0])}
          />
        )}

        <button
          className={`btn btn-primary ${submitted ? "btn-pending" : ""}`}
          onClick={handleSignup}
          disabled={submitted}
        >
          {submitted ? "⏳ Pending Approval" : "Submit"}
        </button>
      </div>

      {/* ================= POPUP ================= */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>✅ Request Submitted</h3>
            <p>
              Your institution request has been submitted successfully.
              <br />
              Please wait for admin approval.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
