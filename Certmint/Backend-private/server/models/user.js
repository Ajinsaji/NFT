const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: {
    type: String,
    enum: ["ADMIN", "STUDENT", "INSTITUTION"],
    required: true,
  },
});

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
