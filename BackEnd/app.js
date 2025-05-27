const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoose_URL = process.env.BASE_URL;

mongoose.connect(mongoose_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.get("/MyNivas", (req, res) => {
    console.log("data sending");
    res.send("hello world");
});

// Import and use your authentication routes
const authRoutes = require("./MyNivas/userLogin/router");
app.use("/MyNivas", authRoutes);

// Start the server
app.listen(10000, () => {
    console.log("Server running on port 10000");
});