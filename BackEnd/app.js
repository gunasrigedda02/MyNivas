const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());  // ✅ to parse JSON body

const stdRouter = require("./forTesting/router");

const mongoose_URL = process.env.Mongo_URL;

// Connect to MongoDB
mongoose.connect(mongoose_URL)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));


// Sample route
app.get("/get-data", (req, res) => {
    console.log("data sending");
    res.send("hello world");
});

app.use('/', stdRouter);

app.listen(1000, () => {
    console.log("Server running on port 10000");
});