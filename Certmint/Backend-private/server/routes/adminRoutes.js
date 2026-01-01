const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");

/* ======================================================
   EXISTING ROUTES (DO NOT CHANGE)
   ====================================================== */
router.get("/institution-requests", admin.getInstitutionRequests);
router.put("/institution-requests/:id/approve", admin.approveInstitution);
router.put("/institution-requests/:id/reject", admin.rejectInstitution);

/* ======================================================
   ADDED ROUTES (REQUIRED FOR FRONTEND)
   NO EXISTING LOGIC IS CHANGED
   ====================================================== */
router.get("/institutions", admin.getInstitutions);
router.put("/institutions/:id/toggle-status", admin.toggleInstitutionStatus);
router.put("/institutions/:id/toggle-ban", admin.toggleInstitutionBan);

module.exports = router;
