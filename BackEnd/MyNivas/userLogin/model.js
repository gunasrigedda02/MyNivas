const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
        minlength: 6
    }
}, { timestamps: true });

userSchema.pre("save", async function(next) {
    if (!this.isModified("userPassword")) return next();
    this.userPassword = await bcrypt.hash(this.userPassword, 10);
    next();
});

module.exports = mongoose.model("User", userSchema);
