import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./HomePage.css";

const HomePage = () => {
  const [stats] = useState({
    institutions: 12,
    certificates: 245,
    verifications: 1032,
  });

  return (
    <>
      <Header />

      <div className="home-page">
        <section className="home-hero">
          <h1>Secure Academic Credentials using NFT</h1>
          <p>
            Issue, store, and verify academic certificates securely using
            blockchain technology.
          </p>

          <div className="home-actions">
            <Link to="/verify" className="btn btn-primary">
              Verify Certificate
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </section>

        <section className="home-stats">
          <div className="stat-card">
            <h2>{stats.institutions}+</h2>
            <p>Institutions</p>
          </div>

          <div className="stat-card">
            <h2>{stats.certificates}+</h2>
            <p>Certificates Issued</p>
          </div>

          <div className="stat-card">
            <h2>{stats.verifications}+</h2>
            <p>Verifications</p>
          </div>
        </section>

        <section className="home-info">
          <h2>Why NFT-based Certificates?</h2>
          <ul>
            <li>Immutable and tamper-proof records</li>
            <li>Instant public verification</li>
            <li>Eliminates fake certificates</li>
            <li>Secure ownership for students</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default HomePage;
