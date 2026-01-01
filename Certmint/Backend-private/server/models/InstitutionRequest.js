const mongoose = require("mongoose");

const institutionRequestSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    passwordHash: String,
    phone: String,
    address: String,
    pincode: String,
    companyDocument: String,
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.InstitutionRequest ||
  mongoose.model("InstitutionRequest", institutionRequestSchema);
