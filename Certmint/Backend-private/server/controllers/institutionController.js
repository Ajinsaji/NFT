const Institution = require("../models/institution");

exports.getMyInstitution = async (req, res) => {
  const institution = await Institution.findOne({
    userId: req.user.userId,
  });

  if (!institution)
    return res.status(404).json({ message: "Institution not found" });

  res.json(institution);
};

exports.updateInstitution = async (req, res) => {
  const updated = await Institution.findOneAndUpdate(
    { userId: req.user.userId },
    req.body,
    { new: true }
  );

  res.json(updated);
};
