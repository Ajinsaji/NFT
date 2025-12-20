import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");

  const [name, setName] = useState("");
  const [institutionName, setInstitutionName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const mockUser = {
        role,
        name: role === "STUDENT" ? name : institutionName,
        email,
      };

      localStorage.setItem("token", "mock-token");
      localStorage.setItem("user", JSON.stringify(mockUser));

      if (role === "INSTITUTION") {
        navigate("/institution-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>{role === "STUDENT" ? "Student registration" : "Institution registration"}</p>

        {error && <p className="error">{error}</p>}

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="STUDENT">Student</option>
          <option value="INSTITUTION">Institution</option>
        </select>

        {role === "STUDENT" && (
          <input
            placeholder="Student Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {role === "INSTITUTION" && (
          <input
            placeholder="Institution Name"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
          />
        )}

        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button className="btn btn-primary" onClick={handleSignup} disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
