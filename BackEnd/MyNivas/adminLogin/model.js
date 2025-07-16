const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const adminSchema = new mongoose.Schema({
  adminId: {
    type: String,
    default: uuidv4,
    unique: true,
    immutable: true,
  },
  adminName: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minlength: 3,
  },
  adminEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Enter a valid email"],
  },
  adminPassword: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    validate: {
      validator: function (value) {
        // Skip validation if adminPassword is not modified (i.e., it's already a hash)
        if (!this.isModified("adminPassword")) return true;
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      },
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
    validate: {
      validator: function (value) {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1 >= 18;
        }
        return age >= 18;
      },
      message: "Admin must be at least 18 years old",
    },
  },
  role: {
    type: String,
    default: "admin",
    immutable: true,
  },
  resetPasswordOTP: {
    type: String,
    default: null,
  },
  resetPasswordOTPExpires: {
    type: Date,
    default: null,
  },
  addAdminOTP: {
    type: String,
    default: null,
  },
  addAdminOTPExpires: {
    type: Date,
    default: null,
  },
  pendingAdmin: {
    type: {
      adminName: String,
      adminEmail: String,
      adminPassword: String,
      dateOfBirth: Date,
    },
    default: null,
  },
  auditLogs: [
    {
      action: String,
      timestamp: { type: Date, default: Date.now },
      details: String,
    },
  ],
}, {
  timestamps: true,
  versionKey: false,
  collection: "authAdmin",
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("adminPassword")) return next();
  this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
  next();
});

module.exports = adminSchema;