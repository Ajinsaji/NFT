import React, { useState } from "react";
import StudentHeader from "../components/StudentHeader";
import "./Profile.css";

const StudentCertificates = () => {
  const demo = [
    { tokenId: "101", student: "Ajin", institution: "XYZ Institute", course: "BCA", year: 2024 },
  ];

  const stored = JSON.parse(localStorage.getItem("certificates") || "null");
  const [certificates] = useState(stored || demo);

  const handlePrint = (c) => {
    const win = window.open("", "_blank", "width=800,height=600");
    if (!win) {
      alert("Please allow popups to download the certificate.");
      return;
    }
    const html = `
      <html>
        <head>
          <title>Certificate ${c.tokenId}</title>
          <style>body{font-family: Arial, Helvetica, sans-serif;padding:40px;} .card{border:1px solid #ddd;padding:24px;border-radius:8px;}</style>
        </head>
        <body>
          <div class="card">
            <h1>Certificate — ${c.course}</h1>
            <p><strong>Token ID:</strong> ${c.tokenId}</p>
            <p><strong>Student:</strong> ${c.student}</p>
            <p><strong>Institution:</strong> ${c.institution}</p>
            <p><strong>Year:</strong> ${c.year}</p>
          </div>
        </body>
      </html>
    `;
    win.document.write(html);
    win.document.close();
    // Give the new window a moment to render then trigger print
    setTimeout(() => {
      win.focus();
      win.print();
    }, 300);
  };

  return (
    <>
      <StudentHeader />

      <div className="profile-wrapper">
        <h2 className="profile-title">My Certificates</h2>

        <div className="profile-card">
          {certificates && certificates.length > 0 ? (
            certificates.map((c) => (
              <div key={c.tokenId} style={{ marginBottom: 12 }} className="issued-item">
                <div><strong>{c.course}</strong> — {c.student} ({c.year})</div>
                <div style={{ marginTop: 6 }}>
                  <button className="btn btn-primary" onClick={() => handlePrint(c)}>Download PDF</button>
                </div>
              </div>
            ))
          ) : (
            <div>No certificates found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentCertificates;
