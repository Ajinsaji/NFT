import React from "react";
import "./About.css";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      <Header />

      <div className="about-page">
        <h2>About NFT-Creds</h2>

        <p>
          NFT-Creds is a blockchain-based academic credential management system
          designed to issue, store, and verify educational certificates securely
          using Non-Fungible Tokens (NFTs).
        </p>

        <h3>Problem Statement</h3>
        <p>
          Traditional academic certificates are prone to forgery, loss, and
          manual verification delays. Employers and institutions face
          difficulties in verifying the authenticity of certificates.
        </p>

        <h3>Solution</h3>
        <p>
          NFT-Creds solves this problem by converting academic certificates into
          NFTs stored on a blockchain. Each certificate is immutable,
          tamper-proof, and can be instantly verified using a unique Token ID.
        </p>

        <h3>Key Features</h3>
        <ul>
          <li>Secure NFT-based certificate issuance</li>
          <li>Instant public certificate verification</li>
          <li>Prevention of fake or duplicate certificates</li>
          <li>Student ownership of credentials</li>
          <li>Institution-controlled certificate issuance</li>
        </ul>

        <h3>User Roles</h3>
        <ul>
          <li><strong>Admin:</strong> Controls the entire system and approves institutions</li>
          <li><strong>Institution:</strong> Issues certificates to students</li>
          <li><strong>Student:</strong> Views and owns issued certificates</li>
          <li><strong>Public:</strong> Verifies certificates using Token ID</li>
        </ul>

        <h3>Technology Stack</h3>
        <p>
          Frontend is developed using React.js. Backend and blockchain
          integration are simulated for demo purposes and can be extended using
          Node.js, MongoDB, and Ethereum smart contracts.
        </p>
      </div>
    </>
  );
};

export default About;
