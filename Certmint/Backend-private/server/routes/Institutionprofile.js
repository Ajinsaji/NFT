const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Student = require("../models/student");
const Institution = require("../models/institution");
const Certificate = require("../models/certificate");

const authMiddleware = require("../middleware/auth");

/**
 * GET Institution Dashboard Data
 * Protected Route
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find institution linked to logged-in user
    const institution = await Institution.findOne({ userId }).lean();
    if (!institution) {
      return res.status(404).json({ message: "Institution profile not found" });
    }

    const institutionId = institution._id;

    // Query params
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 1000);
    const includeMonthly =
      String(req.query.includeMonthly || "false").toLowerCase() === "true";

    // Recent certificates
    const certificates = await Certificate.find({
      institution: institutionId,
    })
      .sort({ dateOfIssue: -1 })
      .limit(limit)
      .populate({
        path: "student",
        model: "Student",
        populate: {
          path: "userId",
          model: "User",
          select: "name email",
        },
      })
      .lean();

    const recentCertificates = certificates.map((c) => ({
      id: c._id,
      subject: c.subject,
      certificateCode: c.certificateCode || null,
      dateOfIssue: c.dateOfIssue,
      studentName:
        c.studentNameSnapshot || c.student?.userId?.name || null,
      studentEmail:
        c.studentEmailSnapshot || c.student?.userId?.email || null,
    }));

    // Stats
    const totalCertificates = await Certificate.countDocuments({
      institution: institutionId,
    });

    const distinctStudentIds = await Certificate.distinct("student", {
      institution: institutionId,
    });

    const totalUniqueStudents = distinctStudentIds.filter(Boolean).length;

    // Subject breakdown
    const subjectBreakdownAgg = await Certificate.aggregate([
      { $match: { institution: institutionId } },
      { $group: { _id: "$subject", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 50 },
    ]);

    const subjectBreakdown = subjectBreakdownAgg.map((s) => ({
      subject: s._id,
      count: s.count,
    }));

    // Monthly issuance (optional)
    let monthlyIssuance = [];
    if (includeMonthly) {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);

      const monthlyAgg = await Certificate.aggregate([
        {
          $match: {
            institution: institutionId,
            dateOfIssue: { $gte: start },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$dateOfIssue" },
              month: { $month: "$dateOfIssue" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);

      const monthlyMap = {};
      monthlyAgg.forEach((m) => {
        const key = `${m._id.year}-${String(m._id.month).padStart(2, "0")}`;
        monthlyMap[key] = m.count;
      });

      for (let i = 0; i < 12; i++) {
        const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
        const key = `${d.getFullYear()}-${String(
          d.getMonth() + 1
        ).padStart(2, "0")}`;
        monthlyIssuance.push({
          period: key,
          count: monthlyMap[key] || 0,
        });
      }
    }

    // Student list (max 200)
    const studentIds = distinctStudentIds.filter(Boolean).slice(0, 200);
    const students = await Student.find({ _id: { $in: studentIds } })
      .populate({
        path: "userId",
        model: "User",
        select: "name email",
      })
      .lean();

    const studentList = students.map((s) => ({
      id: s._id,
      name: s.userId?.name || null,
      email: s.userId?.email || null,
    }));

    // Final response
    return res.json({
      institution: {
        id: institution._id,
        name: institution.name,
        address: institution.address,
        contactNumber: institution.contactNumber,
        locationUrl: institution.locationUrl,
      },
      stats: {
        totalCertificates,
        totalUniqueStudents,
      },
      recentCertificates,
      subjectBreakdown,
      monthlyIssuance,
      students: studentList,
    });
  } catch (err) {
    console.error("Institution dashboard error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
