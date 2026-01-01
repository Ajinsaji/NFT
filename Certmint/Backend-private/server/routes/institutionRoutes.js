const express = require("express");
const router = express.Router();
const Institution = require("../models/institution");
const Certificate = require("../models/certificate");
const authMiddleware = require("../middleware/auth");

/* ================= INSTITUTION DASHBOARD ================= */
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const institution = await Institution.findOne({ userId });
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    const totalCertificates = await Certificate.countDocuments({
      institution: institution._id,
    });

    res.status(200).json({
      institutionName: institution.name,
      isActive: institution.isActive,
      isBanned: institution.isBanned,
      totalCertificates,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
