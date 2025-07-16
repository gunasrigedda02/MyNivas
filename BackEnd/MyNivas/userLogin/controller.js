const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Email
const sendOTPEmail = async (userEmail, userName, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: userEmail,
    subject: "Account Verification OTP",
    text: `Hello ${userName},\n\nYour OTP for account verification is: ${otp}\nThis OTP is valid for 10 minutes.`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error);
        reject(error);
      } else {
        console.log("OTP Email sent:", info.response);
        resolve(info);
      }
    });
  });
};

// Request OTP for Registration
const requestRegistrationOTP = async (req, res) => {
  try {
    const UserModel = req.app.get("UserModel");
    if (!UserModel) {
      console.error("UserModel not initialized");
      return res.status(500).json({ message: "UserModel not initialized" });
    }
    console.log("UserModel:", UserModel.modelName, "Collection:", UserModel.collection.name, "DB:", UserModel.db.name);
    
    const { userName, userEmail, userPassword } = req.body;
    
    const existingUser = await UserModel.findOne({ userEmail });
    if (existingUser && !existingUser.isVerified) {
      // If user exists but isn't verified, allow resending OTP
      const otp = generateOTP();
      existingUser.resetPasswordOTP = otp;
      existingUser.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
      await existingUser.save();
      
      await sendOTPEmail(userEmail, userName, otp);
      return res.status(200).json({ message: "OTP resent to your email" });
    }
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "Email already registered and verified" });
    }

    const otp = generateOTP();
    const newUser = new UserModel({
      userName,
      userEmail,
      userPassword,
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: Date.now() + 10 * 60 * 1000,
      isVerified: false
    });
    
    await newUser.save();
    await sendOTPEmail(userEmail, userName, otp);
    
    res.status(200).json({ message: "OTP sent to your email for verification" });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Verify OTP and Complete Registration
const verifyRegistrationOTP = async (req, res) => {
  try {
    const UserModel = req.app.get("UserModel");
    if (!UserModel) {
      console.error("UserModel not initialized");
      return res.status(500).json({ message: "UserModel not initialized" });
    }
    console.log("UserModel:", UserModel.modelName, "Collection:", UserModel.collection.name, "DB:", UserModel.db.name);
    
    const { userEmail, otp } = req.body;
    console.log("Verify OTP - userEmail:", userEmail, "OTP:", otp);

    const user = await UserModel.findOne({ 
      userEmail, 
      resetPasswordOTP: otp, 
      resetPasswordOTPExpires: { $gt: Date.now() },
      isVerified: false
    });

    if (!user) {
      console.log("Invalid or expired OTP");
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpires = null;
    await user.save();

    // Send welcome email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: userEmail,
      subject: "Welcome to Our Platform",
      text: `Hello ${user.userName},\n\nYour account has been successfully created!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error while sending welcome email:", error);
      } else {
        console.log("Welcome Email sent:", info.response);
      }
    });

    console.log("User verified and registered:", user.userEmail);
    res.status(201).json({ message: "Account verified and registered successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const UserModel = req.app.get("UserModel");
    if (!UserModel) {
      console.error("UserModel not initialized");
      return res.status(500).json({ message: "UserModel not initialized" });
    }
    console.log("UserModel:", UserModel.modelName, "Collection:", UserModel.collection.name, "DB:", UserModel.db.name);
    
    const { userEmail, userPassword } = req.body;

    const user = await UserModel.findOne({ userEmail });
    if (!user || !user.isVerified) {
      return res.status(400).json({ message: "Invalid email or account not verified" });
    }

    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Forgot Password Controller
const forgotPassword = async (req, res) => {
  try {
    const UserModel = req.app.get("UserModel");
    if (!UserModel) {
      console.error("UserModel not initialized");
      return res.status(500).json({ message: "UserModel not initialized" });
    }
    console.log("UserModel:", UserModel.modelName, "Collection:", UserModel.collection.name, "DB:", UserModel.db.name);
    
    const { userEmail } = req.body;
    const user = await UserModel.findOne({ userEmail, isVerified: true });
    if (!user) {
      return res.status(404).json({ message: "User not found or not verified" });
    }

    const otp = generateOTP();
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendOTPEmail(userEmail, user.userName, otp);
    
    res.status(200).json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Verify OTP Controller
const verifyOTP = async (req, res) => {
  try {
    const UserModel = req.app.get("UserModel");
    if (!UserModel) {
      console.error("UserModel not initialized");
      return res.status(500).json({ message: "UserModel not initialized" });
    }
    console.log("UserModel:", UserModel.modelName, "Collection:", UserModel.collection.name, "DB:", UserModel.db.name);
    
    const { userEmail, otp } = req.body;
    console.log("Verify OTP - userEmail:", userEmail, "OTP:", otp);

    const user = await UserModel.findOne({ 
      userEmail, 
      resetPasswordOTP: otp, 
      resetPasswordOTPExpires: { $gt: Date.now() },
      isVerified: true
    });

    if (!user) {
      console.log("Invalid or expired OTP");
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    console.log("OTP verified for user:", user.userEmail);
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Reset Password Controller
const resetPassword = async (req, res) => {
  try {
    const UserModel = req.app.get("UserModel");
    if (!UserModel) {
      console.error("UserModel not initialized");
      return res.status(500).json({ message: "UserModel not initialized" });
    }
    console.log("UserModel:", UserModel.modelName, "Collection:", UserModel.collection.name, "DB:", UserModel.db.name);
    
    const { userEmail, otp, newPassword } = req.body;
    console.log("Reset Password - userEmail:", userEmail, "OTP:", otp);

    const user = await UserModel.findOne({ 
      userEmail, 
      resetPasswordOTP: otp, 
      resetPasswordOTPExpires: { $gt: Date.now() },
      isVerified: true
    });

    if (!user) {
      console.log("Invalid or expired OTP");
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.userPassword = newPassword;
    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpires = null;
    await user.save();

    console.log("Password reset for user:", user.userEmail);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get all user IDs and names
const getAllUserIdsAndNames = async (req, res) => {
  try {
    const UserModel = req.app.get("UserModel");
    if (!UserModel) {
      console.error("UserModel not initialized");
      return res.status(500).json({ message: "UserModel not initialized" });
    }
    console.log("UserModel:", UserModel.modelName, "Collection:", UserModel.collection.name, "DB:", UserModel.db.name);

    // Query to select only userId and userName fields
    const users = await UserModel.find({}, { userId: 1, userName: 1, _id: 0 }).lean();

    // Send response
    res.status(200).json({
      success: true,
      data: users,
      message: "User IDs and names fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching user IDs and names:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Controller to get full details of all users
const getAllUsersFullDetails = async (req, res) => {
  try {
    const UserModel = req.app.get("UserModel");
    if (!UserModel) {
      console.error("UserModel not initialized");
      return res.status(500).json({ message: "UserModel not initialized" });
    }
    console.log("UserModel:", UserModel.modelName, "Collection:", UserModel.collection.name, "DB:", UserModel.db.name);

    // Query to exclude sensitive fields
    const users = await UserModel.find(
      {},
      {
        userPassword: 0, // Exclude password for security
        resetPasswordOTP: 0, // Exclude sensitive fields
        resetPasswordOTPExpires: 0,
        _id: 0, // Exclude MongoDB internal _id
      }
    ).lean();

    // Send response
    res.status(200).json({
      success: true,
      data: users,
      message: "Full user details fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching full user details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  requestRegistrationOTP,
  verifyRegistrationOTP,
  loginUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
  getAllUserIdsAndNames,
  getAllUsersFullDetails
};