const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    email: String,
    phone: String,
    dob: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
