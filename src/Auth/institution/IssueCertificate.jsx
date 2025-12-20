import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Institution.css";

const IssueCertificate = () => {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleIssue = async () => {
    setError("");
    setSuccess("");

    if (!subject || !studentName) {
      setError("Subject and Student Name are required");
      return;
    }

    setLoading(true);

    try {
      setTimeout(() => {
        setSuccess("Certificate issued successfully");
        setLoading(false);
        setTimeout(() => {
          navigate("/institution-dashboard");
        }, 1000);
      }, 1200);
    } catch (err) {
      setError(err?.message || "Failed to issue certificate");
      setLoading(false);
    }
  };

  return (
    <div className="inst-wrapper">
      <h2 className="inst-title">Issue Certificate</h2>

      <div className="card inst-card">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input placeholder="Subject / Course" value={subject} onChange={(e) => setSubject(e.target.value)} />

        <input placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />

        <input placeholder="Student Email (optional)" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />

        <button className="btn btn-primary" onClick={handleIssue} disabled={loading}>
          {loading ? "Issuing..." : "Issue Certificate"}
        </button>
      </div>
    </div>
  );
};

export default IssueCertificate;
