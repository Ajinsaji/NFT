import React from "react";
import "./Issued.css";
import Header from "../components/Header";

const Issued = () => {
  return (
    <>
      <Header />

      <div className="issued-page">
        <h2>Issued Certificates</h2>
        <p>List of issued certificates (demo).</p>

        <div className="card issued-card">
          No records available in demo.
        </div>
      </div>
    </>
  );
};

export default Issued;
