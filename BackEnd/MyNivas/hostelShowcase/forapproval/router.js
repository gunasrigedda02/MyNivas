const express = require('express');
const router = express.Router();
const upload = require('./uploads'); // path to multer config
const hostelController = require('./controller');

// Use multer middleware to accept max 4 images with field name 'images'
router.post('/newHostels', upload.array('images', 4), hostelController.createHostel);

// GET /api/hostels - get all hostels
router.get('/allHostels', hostelController.getAllHostels);

// GET /api/hostels/:id - get hostel by ID
router.get('/:id', hostelController.getHostelById);

module.exports = router;