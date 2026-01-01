const Certificate = require("../models/Certificate");

exports.verifyCertificate = async (req, res) => {
  const cert = await Certificate.findOne({
    certificateCode: req.params.code,
  });

  if (!cert) {
    return res.json({ valid: false });
  }

  res.json({
    valid: true,
    certificate: cert,
  });
};
