const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authenticateAdmin = require('./authMiddleware');
const {
  requestAddAdmin,
  verifyAddAdminOTP,
  requestLogin,
  verifyLoginOTP,
  adminForgotPassword,
  adminVerifyOTP,
  adminResetPassword,
} = require('./controller');

// Rate limiters
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later.',
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: 'Too many password reset attempts, please try again later.',
});

// Middleware to inject AdminModel
const ensureAdminModel = (req, res, next) => {
  const AdminModel = req.app.get('AdminModel');
  if (!AdminModel) {
    return res.status(500).json({ message: 'AdminModel not initialized' });
  }
  req.AdminModel = AdminModel;
  next();
};

router.use(ensureAdminModel);

// Routes
router.post('/add-admin', authenticateAdmin, ...requestAddAdmin);
router.post('/verify-add-admin-otp', authenticateAdmin, ...verifyAddAdminOTP);
router.post('/login', loginLimiter, ...requestLogin);
router.post('/verify-login-otp', ...verifyLoginOTP);
router.post('/forgot-password', forgotPasswordLimiter, ...adminForgotPassword);
router.post('/verify-otp', ...adminVerifyOTP);
router.post('/reset-password', ...adminResetPassword);

// New /me endpoint
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const AdminModel = req.app.get('AdminModel');
    const admin = await AdminModel.findById(decoded.id).select('-adminPassword -resetPasswordOTP -resetPasswordOTPExpires -addAdminOTP -addAdminOTPExpires -pendingAdmin');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    console.log('auth/me response:', { admin: { id: admin._id, adminName: admin.adminName, adminEmail: admin.adminEmail, role: admin.role } }); // Debug log
    res.json({ admin: { id: admin._id, adminName: admin.adminName, adminEmail: admin.adminEmail, role: admin.role } });
  } catch (err) {
    console.error('auth/me error:', err.message); // Debug log
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;