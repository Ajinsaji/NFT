const express = require("express");
const mongoose = require("mongoose");
const Certificate = require("../models/certificate");
const Institution = require("../models/institution");
const Student = require("../models/student");
const User = require("../models/user");
// <- needed to find user by email
const authMiddleware = require("../middleware/auth"); // JWT parser


const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { subject, studentName, studentEmail } = req.body;
    const userId = req.user.userId; // institution's userId

    // find institution
    const institution = await Institution.findOne({ userId });
    if (!institution) {
      return res.status(400).json({ message: "Institution profile not found" });
    }

    // create the certificate directly (no student lookup)
    const cert = await Certificate.create({
      institution: institution._id,
      subject,
      studentNameSnapshot: studentName,
      studentEmailSnapshot: studentEmail,
      institutionNameSnapshot: institution.name,
    });

    // 🔗 Mint NFT on blockchain (lazy-require so server can start without blockchain env)
    let tokenId = null;
    try {
      const mintCertificateNFT = require("../blockchain/mintCertificateNFT.cjs");
      if (typeof mintCertificateNFT === 'function') {
        tokenId = await mintCertificateNFT({
          subject,
          studentName,
          studentEmail,
          certificateId: cert._id.toString(),
        });
      } else if (mintCertificateNFT && typeof mintCertificateNFT.default === 'function') {
        tokenId = await mintCertificateNFT.default({
          subject,
          studentName,
          studentEmail,
          certificateId: cert._id.toString(),
        });
      } else {
        console.warn('mintCertificateNFT import does not export a function');
      }
    } catch (err) {
      console.warn('Minting skipped — blockchain module unavailable or misconfigured:', err.message);
    }

    cert.blockchainTokenId = tokenId;
    await cert.save();

    return res.status(201).json({
      message: "Certificate created successfully",
      certificate: cert,
    });

  } catch (err) {
    console.error("Create cert error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
