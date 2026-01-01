const express = require("express");
const router = express.Router();
const Certificate = require("../models/certificate");
const Institution = require("../models/institution");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, async (req, res) => {
  const { subject, studentName, studentEmail } = req.body;
  const userId = req.user.userId;

  const institution = await Institution.findOne({ userId });
  if (!institution) {
    return res.status(400).json({ message: "Institution profile not found" });
  }

  const cert = await Certificate.create({
    institution: institution._id,
    subject,
    studentNameSnapshot: studentName,
    studentEmailSnapshot: studentEmail,
    institutionNameSnapshot: institution.name,
  });

  return res.status(201).json({
    message: "Certificate created successfully",
    certificate: cert,
  });
});

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const institution = await Institution.findOne({ userId });

  const certificates = await Certificate.find({
    institution: institution._id,
  });

  res.json(certificates);
});

module.exports = router;
