const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("./controller"); // Adjust path if needed

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

module.exports = router;