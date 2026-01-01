const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

/* 🔗 INITIALIZE BLOCKCHAIN (VERY IMPORTANT) */
require("./blockchain/certificateContract.cjs");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const institutionRoutes = require("./routes/institutionRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const studentRoutes = require("./routes/studentRoutes"); // ✅ ADDED

/* ================= MOUNT ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/institution", institutionRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/students", studentRoutes); // ✅ ADDED

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/* ================= DEV ONLY: RESET ADMIN ================= */
if (process.env.NODE_ENV !== "production") {
  const bcrypt = require("bcryptjs");
  const User = require("./models/user");

  async function resetAdmin() {
    try {
      const passwordHash = await bcrypt.hash("admin123", 10);
      await User.updateOne(
        { email: "admin@gmail.com" },
        { passwordHash }
      );
      console.log("🔐 Admin password reset (DEV ONLY)");
    } catch (err) {
      console.error("❌ Admin reset failed:", err);
    }
  }

  resetAdmin();
}
