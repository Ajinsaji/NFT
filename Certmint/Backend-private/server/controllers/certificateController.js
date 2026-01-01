const Certificate = require("../models/certificate");
const crypto = require("crypto");
const generatePDF = require("../utils/generateCertificatePDF");

/* ======================================================
   ISSUE CERTIFICATE (INSTITUTION)
   ====================================================== */
exports.issueCertificate = async (req, res) => {
  try {
    const { subject, studentName, studentEmail } = req.body;

    if (!subject || !studentName) {
      return res.status(400).json({
        message: "Subject and student name are required",
      });
    }

    // Logged-in institution (from auth middleware)
    const institutionId = req.user.id;
    const institutionName = req.user.name;

    // Human-readable unique certificate code
    const certificateCode =
      "CERT-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    // NFT / Blockchain token (DEMO)
    const blockchainTokenId = crypto
      .createHash("sha256")
      .update(certificateCode + studentName + subject)
      .digest("hex");

    // ✅ GENERATE PDF
    const pdfUrl = generatePDF({
      studentName,
      subject,
      institution: institutionName,
    });

    // ✅ CREATE CERTIFICATE WITH PDF
    const certificate = await Certificate.create({
      student: null,
      institution: institutionId,
      subject,
      studentNameSnapshot: studentName,
      studentEmailSnapshot: studentEmail,
      institutionNameSnapshot: institutionName,
      certificateCode,
      blockchainTokenId,
      pdfUrl, // 🔥 VERY IMPORTANT
    });

    res.status(201).json({
      message: "Certificate issued successfully",
      certificate,
    });
  } catch (err) {
    console.error("ISSUE CERTIFICATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
