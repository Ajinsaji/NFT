const express = require("express");
const router = express.Router();
const verify = require("../controllers/verifyController");

router.get("/:code", verify.verifyCertificate);

module.exports = router;
