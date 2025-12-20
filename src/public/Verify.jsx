import React from "react";
import "./Verify.css";
import Header from "../components/Header";

const Verify = () => {
  return (
    <>
      <Header />

      <div className="verify-page">
        <h2>Verify Certificate</h2>
        <p>Paste the token ID to verify the certificate (demo).</p>

        <div className="card verify-card">
          <input placeholder="Token ID" />
          <button className="btn btn-primary">Verify</button>
        </div>
      </div>
    </>
  );
};

export default Verify;
