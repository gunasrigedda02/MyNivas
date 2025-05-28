const multer = require('multer');
const path = require('path');

// Define storage location and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/hostelImages');
  },
  filename: function (req, file, cb) {
    // Unique filename: hostel-<timestamp>-<originalname>
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'hostel-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filter for images only (jpeg, png, jpg)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg and .png files are allowed!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB per file
  fileFilter
});

module.exports = upload;
