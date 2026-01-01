const Certificate = require("../models/certificate");

exports.getMyCertificates = async (req, res) => {
  const certs = await Certificate.find({
    studentEmailSnapshot: req.user.email,
  }).sort({ createdAt: -1 });

  res.json(certs);
};
