const express = require("express");
const router = express.Router();

const admin = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth"); // ✅ REQUIRED
const Student = require("../models/student");

/* ======================================================
   EXISTING ROUTES (DO NOT CHANGE)
   ====================================================== */
router.get("/institution-requests", admin.getInstitutionRequests);
router.put("/institution-requests/:id/approve", admin.approveInstitution);
router.put("/institution-requests/:id/reject", admin.rejectInstitution);

/* ======================================================
   ADDED ROUTES (REQUIRED FOR FRONTEND)
   ====================================================== */
router.get("/institutions", admin.getInstitutions);
router.put("/institutions/:id/toggle-status", admin.toggleInstitutionStatus);
router.put("/institutions/:id/toggle-ban", admin.toggleInstitutionBan);

/* ======================================================
   GET ALL STUDENTS (ADMIN)
   URL: /api/admin/students
   ====================================================== */
router.get("/students", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (err) {
    console.error("Admin get students error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
