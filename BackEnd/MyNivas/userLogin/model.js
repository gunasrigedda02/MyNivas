const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
    immutable: true
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minlength: 3
  },
  userEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Enter a valid email"]
  },
  userPassword: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8
  }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("userPassword")) return next();
  this.userPassword = await bcrypt.hash(this.userPassword, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
