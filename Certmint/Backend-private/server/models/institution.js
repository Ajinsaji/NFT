const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    email: String,
    phone: String,
    address: String,
    pincode: String,
    companyDocument: String,

    isApproved: Boolean,
    approvedAt: Date,
    isActive: { type: Boolean, default: true },
    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Institution ||
  mongoose.model("Institution", institutionSchema);
