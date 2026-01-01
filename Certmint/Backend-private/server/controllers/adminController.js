const User = require("../models/user");
const Institution = require("../models/institution");
const InstitutionRequest = require("../models/institutionRequest");

exports.getInstitutionRequests = async (req, res) => {
  const requests = await InstitutionRequest.find().sort({ createdAt: -1 });
  res.json(requests);
};

exports.approveInstitution = async (req, res) => {
  const request = await InstitutionRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ message: "Not found" });

  const username =
    request.email.split("@")[0] + Math.floor(1000 + Math.random() * 9000);

  const user = await User.create({
    username,
    name: request.name,
    email: request.email,
    passwordHash: request.passwordHash,
    role: "INSTITUTION",
  });

  await Institution.create({
    userId: user._id,
    name: request.name,
    email: request.email,
    phone: request.phone,
    address: request.address,
    pincode: request.pincode,
    companyDocument: request.companyDocument,
    isApproved: true,
    approvedAt: new Date(),
  });

  request.status = "APPROVED";
  await request.save();

  res.json({ message: "Institution approved" });
};

exports.rejectInstitution = async (req, res) => {
  await InstitutionRequest.findByIdAndUpdate(req.params.id, {
    status: "REJECTED",
  });
  res.json({ message: "Institution rejected" });
};
/* ================================
   GET ALL INSTITUTIONS
   ================================ */
exports.getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find().sort({ createdAt: -1 });
    res.status(200).json(institutions);
  } catch (err) {
    console.error("GET INSTITUTIONS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* 
   TOGGLE ACTIVE / INACTIVE
 */
exports.toggleInstitutionStatus = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution)
      return res.status(404).json({ message: "Institution not found" });

    institution.isActive = !institution.isActive;
    await institution.save();

    res.json({ message: "Institution status updated" });
  } catch (err) {
    console.error("TOGGLE STATUS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   TOGGLE BAN / UNBAN
   ================================ */
exports.toggleInstitutionBan = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution)
      return res.status(404).json({ message: "Institution not found" });

    institution.isBanned = !institution.isBanned;
    await institution.save();

    res.json({ message: "Institution ban status updated" });
  } catch (err) {
    console.error("TOGGLE BAN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};