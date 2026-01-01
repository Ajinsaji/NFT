const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const upload = require("../middleware/upload");

router.post("/signup", upload.single("companyDocument"), auth.signup);
router.post("/login", auth.login);

module.exports = router;
