import React, { useState } from "react";
import "./Mint.css";
import Header from "../components/Header";

const Mint = () => {
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  const handleMint = () => {
    setMessage("");
    setTimeout(() => {
      setMessage("NFT Certificate minted successfully (demo)");
    }, 1000);
  };

  return (
    <>
      <Header />

      <div className="mint-page">
        <h2 className="mint-title">Mint Certificate (Demo)</h2>

        <div className="card mint-card">
          <input
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />

          <input
            placeholder="Course / Degree"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <input
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <button className="btn btn-primary" onClick={handleMint}>
            Mint NFT
          </button>

          {message && <p className="mint-success">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Mint;
