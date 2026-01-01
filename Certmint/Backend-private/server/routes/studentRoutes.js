const express = require("express");
const router = express.Router();

const Student = require("../models/student");
const Certificate = require("../models/certificate");
const authMiddleware = require("../middleware/auth");

/* ======================================================
   GET LOGGED-IN STUDENT CERTIFICATES
   URL: /api/students/my-certificates
   ====================================================== */
router.get("/my-certificates", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1️⃣ Find student profile using logged-in userId
    const student = await Student.findOne({ userId });
    if (!student) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    // 2️⃣ Find certificates using SNAPSHOT email
    const certificates = await Certificate.find({
      studentEmailSnapshot: student.email,
    }).sort({ createdAt: -1 });

    res.status(200).json(certificates);
  } catch (err) {
    console.error("My certificates error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================================================
   GET STUDENT DASHBOARD DETAILS (OPTIONAL)
   URL: /api/students/dashboard/:email
   ====================================================== */
router.get("/dashboard/:email", authMiddleware, async (req, res) => {
  try {
    const { email } = req.params;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const certificates = await Certificate.find({
      studentEmailSnapshot: email,
    });

    res.status(200).json({
      user: {
        name: student.name,
        email: student.email,
        phone: student.phone,
        dob: student.dob,
        role: "STUDENT",
      },
      stats: {
        totalCertificates: certificates.length,
        verifiedCertificates: certificates.filter(
          (c) => c.blockchainTokenId
        ).length,
        status: "Active",
      },
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================================================
   UPDATE STUDENT PROFILE
   URL: /api/students/:userId
   ====================================================== */
router.put("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { phone, dob } = req.body;

    const student = await Student.findOneAndUpdate(
      { userId },
      { phone, dob },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    res.status(200).json({
      message: "Student profile updated",
      student,
    });
  } catch (err) {
    console.error("Student update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
