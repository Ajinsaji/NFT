const Certificate = require("../models/Certificate");
const crypto = require("crypto");

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

    const certificate = await Certificate.create({
      student: null, // optional (if student exists later, can link)
      institution: institutionId,
      subject,
      studentNameSnapshot: studentName,
      studentEmailSnapshot: studentEmail,
      institutionNameSnapshot: institutionName,
      certificateCode,
      blockchainTokenId,
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
