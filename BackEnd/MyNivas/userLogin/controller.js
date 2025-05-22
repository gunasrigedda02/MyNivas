const User = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Controller
const registerUser = async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body;
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const newUser = new User({ userName, userEmail, userPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login Controller
const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
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
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;