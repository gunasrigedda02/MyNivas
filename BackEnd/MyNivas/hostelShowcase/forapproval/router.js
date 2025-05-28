const express = require('express');
const router = express.Router();
const upload = require('./uploads'); // path to multer config
const hostelController = require('./controller');

// Use multer middleware to accept max 4 images with field name 'images'
router.post('/newHostels', upload.array('images', 4), hostelController.createHostel);

module.exports = router;
