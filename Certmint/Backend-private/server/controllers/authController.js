const User = require("../models/User");
const Student = require("../models/Student");
const InstitutionRequest = require("../models/InstitutionRequest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= SIGNUP ================= */
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, phone, dob, address, pincode } =
      req.body;

    if (role === "STUDENT") {
      const existing = await User.findOne({ email });
      if (existing)
        return res.status(400).json({ message: "Email already exists" });

      const passwordHash = await bcrypt.hash(password, 10);
      const username =
        email.split("@")[0] + Math.floor(1000 + Math.random() * 9000);

      const user = await User.create({
        username,
        name,
        email,
        passwordHash,
        role: "STUDENT",
      });

      await Student.create({
        userId: user._id,
        name,
        email,
        phone,
        dob,
      });

      return res.json({ message: "Student signup successful" });
    }

    if (role === "INSTITUTION") {
      const passwordHash = await bcrypt.hash(password, 10);

      await InstitutionRequest.create({
        name,
        email,
        passwordHash,
        phone,
        address,
        pincode,
        companyDocument: req.file?.path,
      });

      return res.json({
        message: "Institution request submitted. Waiting for admin approval.",
      });
    }

    res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
