import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    setLoading(true);

    /* ================= ADMIN LOGIN ================= */
    if (email === "admin@gmail.com") {
      if (password === "admin123") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "System Admin",
            email,
            role: "ADMIN",
          })
        );
        localStorage.setItem("token", "mock-admin-token");
        navigate("/admin-dashboard");
      } else {
        setError("Invalid admin credentials");
        setLoading(false);
      }
      return;
    }

    /* ================= INSTITUTION LOGIN ================= */
    if (email.includes("inst")) {
      const requests =
        JSON.parse(localStorage.getItem("institutionRequests")) || [];

      const approvedInstitution = requests.find(
        (req) => req.email === email && req.status === "APPROVED"
      );

      if (!approvedInstitution) {
        setError("Institution not approved by admin");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: approvedInstitution.name,
          email,
          role: "INSTITUTION",
        })
      );
      localStorage.setItem("token", "mock-institution-token");
      navigate("/institution-dashboard");
      return;
    }

    /* ================= STUDENT LOGIN ================= */
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Demo Student",
        email,
        role: "STUDENT",
      })
    );
    localStorage.setItem("token", "mock-student-token");
    navigate("/student-dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <p>Access your account</p>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
