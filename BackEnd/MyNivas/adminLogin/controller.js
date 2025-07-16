const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Validate environment variables
const requiredEnvVars = ['GMAIL_USER', 'GMAIL_PASS', 'JWT_SECRET'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// Initialize email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Input validation middleware
const validateInput = (requiredFields) => (req, res, next) => {
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `${field} is required` });
    }
  }
  next();
};

// Request Add Admin Controller (initiates the process by sending OTP)
const requestAddAdmin = async (req, res) => {
  try {
    const AdminModel = req.app.get('AdminModel');
    const { adminName, adminEmail, adminPassword, dateOfBirth } = req.body;

    // Check if the email is already registered
    const existingAdmin = await AdminModel.findOne({ adminEmail });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Get the requesting admin's details (from JWT)
    const requestingAdmin = await AdminModel.findById(req.admin.id);
    if (!requestingAdmin) {
      return res.status(404).json({ message: 'Requesting admin not found' });
    }

    // Generate OTP and store it
    const otp = generateOTP();
    requestingAdmin.addAdminOTP = otp;
    requestingAdmin.addAdminOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    requestingAdmin.pendingAdmin = { adminName, adminEmail, adminPassword, dateOfBirth };
    requestingAdmin.auditLogs.push({ action: 'Request Add Admin', details: `OTP generated for adding admin ${adminEmail}` });
    await requestingAdmin.save();

    // Send OTP email to the requesting admin
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: requestingAdmin.adminEmail,
      subject: 'MyNivas - OTP for Adding New Admin',
      text: `Hello ${requestingAdmin.adminName},\n\nYou have requested to add a new admin (${adminEmail}). Your OTP is: ${otp}\nThis OTP is valid for 10 minutes. If you did not initiate this request, please contact support immediately.`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error while sending add admin OTP email:', error);
          reject(error);
        } else {
          console.log('Add admin OTP email sent:', info.response);
          resolve(info);
        }
      });
    });

    res.status(200).json({ message: 'OTP sent to your email for adding new admin' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify Add Admin OTP Controller (verifies OTP and creates the new admin)
const verifyAddAdminOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const AdminModel = req.app.get('AdminModel');

    // Find the requesting admin
    const requestingAdmin = await AdminModel.findOne({
      _id: req.admin.id,
      addAdminOTP: otp,
      addAdminOTPExpires: { $gt: Date.now() },
    });

    if (!requestingAdmin) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Extract pending admin details
    const { adminName, adminEmail, adminPassword, dateOfBirth } = requestingAdmin.pendingAdmin;

    // Create the new admin
    const newAdmin = new AdminModel({ adminName, adminEmail, adminPassword, dateOfBirth });
    await newAdmin.save();

    // Send welcome email to the new admin
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: adminEmail,
      subject: 'Welcome to MyNivas - Admin Account Created',
      text: `Hello ${adminName},\n\nYour admin account for MyNivas has been successfully created by ${requestingAdmin.adminName} (${requestingAdmin.adminEmail}). If this was not authorized, please contact support immediately.`,
    };

    try {
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error while sending admin registration email:', error);
            reject(error);
          } else {
            console.log('Admin registration email sent:', info.response);
            resolve(info);
          }
        });
      });
    } catch (emailError) {
      // Roll back: delete the admin if email fails
      await AdminModel.deleteOne({ _id: newAdmin._id });
      return res.status(500).json({ message: 'Failed to send registration email, admin creation rolled back', error: emailError.message });
    }

    // Clear the OTP and pending admin details
    requestingAdmin.addAdminOTP = null;
    requestingAdmin.addAdminOTPExpires = null;
    requestingAdmin.pendingAdmin = null;
    requestingAdmin.auditLogs.push({ action: 'Add Admin', details: `Admin ${adminEmail} added successfully` });
    await requestingAdmin.save();

    res.status(201).json({ message: 'Admin added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Request Login Controller (initiates login by sending OTP)
const requestLogin = async (req, res) => {
  try {
    const { adminEmail, adminPassword, dateOfBirth } = req.body;
    const AdminModel = req.app.get('AdminModel');

    const admin = await AdminModel.findOne({ adminEmail });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate date of birth
    const inputDob = new Date(dateOfBirth).toISOString();
    const storedDob = new Date(admin.dateOfBirth).toISOString();
    if (inputDob !== storedDob) {
      return res.status(400).json({ message: 'Invalid date of birth' });
    }

    const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate OTP and store it
    const otp = generateOTP();
    admin.resetPasswordOTP = otp;
    admin.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000;
    admin.auditLogs.push({ action: 'Request Login', details: 'OTP generated for login' });
    await admin.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: adminEmail,
      subject: 'MyNivas - OTP for Admin Login',
      text: `Hello ${admin.adminName},\n\nYou are attempting to log into MyNivas. Your OTP is: ${otp}\nThis OTP is valid for 10 minutes. If you did not initiate this request, please contact support immediately.`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error while sending login OTP email:', error);
          reject(error);
        } else {
          console.log('Login OTP email sent:', info.response);
          resolve(info);
        }
      });
    });

    res.status(200).json({ message: 'OTP sent to your email for login' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify Login OTP Controller (verifies OTP and completes login)
const verifyLoginOTP = async (req, res) => {
  try {
    const { adminEmail, otp } = req.body;
    const AdminModel = req.app.get('AdminModel');

    const admin = await AdminModel.findOne({
      adminEmail,
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Notify other admins
    const allAdmins = await AdminModel.find({ adminEmail: { $ne: adminEmail } }, 'adminEmail adminName');
    if (allAdmins.length > 0) {
      const loginTime = new Date().toISOString();
      const notificationPromises = allAdmins.map(otherAdmin => {
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: otherAdmin.adminEmail,
          subject: 'MyNivas - Admin Login Notification',
          text: `Hello ${otherAdmin.adminName},\n\nAn admin (${admin.adminName}, ${adminEmail}) has logged into MyNivas at ${loginTime}. If this activity is suspicious, please take appropriate action.`,
        };
        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(`Error while sending login notification to ${otherAdmin.adminEmail}:`, error);
              reject(error);
            } else {
              console.log(`Login notification sent to ${otherAdmin.adminEmail}:`, info.response);
              resolve(info);
            }
          });
        });
      });

      await Promise.all(notificationPromises).catch(error => {
        return res.status(500).json({ message: 'Failed to send login notifications to other admins', error: error.message });
      });
    }

    // Clear the OTP
    admin.resetPasswordOTP = null;
    admin.resetPasswordOTPExpires = null;
    admin.auditLogs.push({ action: 'Admin Login', details: 'Login successful' });
    await admin.save();

    res.status(200).json({
      message: 'Admin login successful',
      token,
      admin: {
        id: admin._id,
        adminName: admin.adminName,
        adminEmail: admin.adminEmail,
        role: 'admin',
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin Forgot Password Controller
const adminForgotPassword = async (req, res) => {
  try {
    const { adminEmail, dateOfBirth } = req.body;
    const AdminModel = req.app.get('AdminModel');

    const admin = await AdminModel.findOne({ adminEmail });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Validate date of birth
    const inputDob = new Date(dateOfBirth).toISOString();
    const storedDob = new Date(admin.dateOfBirth).toISOString();
    if (inputDob !== storedDob) {
      return res.status(400).json({ message: 'Invalid date of birth' });
    }

    const otp = generateOTP();
    admin.resetPasswordOTP = otp;
    admin.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000;
    admin.auditLogs.push({ action: 'Admin Forgot Password', details: 'OTP generated for admin password reset' });
    await admin.save();

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: adminEmail,
      subject: 'Admin Password Reset OTP - MyNivas',
      text: `Hello ${admin.adminName},\n\nYou have requested to reset your admin password for MyNivas. Your OTP is: ${otp}\nThis OTP is valid for 10 minutes. If you did not initiate this request, please contact support immediately.`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error while sending OTP email to admin:', error);
          reject(error);
        } else {
          console.log('Admin OTP Email sent:', info.response);
          resolve(info);
        }
      });
    });

    res.status(200).json({ message: 'OTP sent to your admin email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin Verify OTP Controller
const adminVerifyOTP = async (req, res) => {
  try {
    const { adminEmail, otp } = req.body;
    const AdminModel = req.app.get('AdminModel');

    const matchedAdmin = await AdminModel.findOne({
      adminEmail,
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: { $gt: Date.now() },
    });

    if (!matchedAdmin) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'Admin OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin Reset Password Controller
const adminResetPassword = async (req, res) => {
  try {
    const { adminEmail, otp, newPassword } = req.body;
    const AdminModel = req.app.get('AdminModel');

    const matchedAdmin = await AdminModel.findOne({
      adminEmail,
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: { $gt: Date.now() },
    });

    if (!matchedAdmin) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    matchedAdmin.adminPassword = newPassword;
    matchedAdmin.markModified('adminPassword');
    matchedAdmin.resetPasswordOTP = null;
    matchedAdmin.resetPasswordOTPExpires = null;
    matchedAdmin.auditLogs.push({ action: 'Admin Password Reset', details: 'Admin password reset successfully' });
    await matchedAdmin.save();

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: adminEmail,
      subject: 'Admin Password Reset Confirmation - MyNivas',
      text: `Hello ${matchedAdmin.adminName},\n\nYour admin password for MyNivas has been successfully reset. If you did not initiate this action, please contact support immediately.`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error while sending reset confirmation email to admin:', error);
          reject(error);
        } else {
          console.log('Admin reset confirmation email sent:', info.response);
          resolve(info);
        }
      });
    });

    res.status(200).json({ message: 'Admin password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  requestAddAdmin: [validateInput(['adminName', 'adminEmail', 'adminPassword', 'dateOfBirth']), requestAddAdmin],
  verifyAddAdminOTP: [validateInput(['otp']), verifyAddAdminOTP],
  requestLogin: [validateInput(['adminEmail', 'adminPassword', 'dateOfBirth']), requestLogin],
  verifyLoginOTP: [validateInput(['adminEmail', 'otp']), verifyLoginOTP],
  adminForgotPassword: [validateInput(['adminEmail', 'dateOfBirth']), adminForgotPassword],
  adminVerifyOTP: [validateInput(['adminEmail', 'otp']), adminVerifyOTP],
  adminResetPassword: [validateInput(['adminEmail', 'otp', 'newPassword']), adminResetPassword],
};