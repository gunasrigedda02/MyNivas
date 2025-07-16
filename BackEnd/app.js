const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/hostelImages', express.static('public/hostelImages'));

// Validate environment variables
const requiredEnvVars = ['BASE_URL', 'GMAIL_USER', 'GMAIL_PASS', 'JWT_SECRET'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

// MongoDB Connection
const mongoose_URL = process.env.BASE_URL;
console.log("MongoDB URL:", mongoose_URL.replace(/:([^@]+)@/, ":<hidden>@")); // Debug log

mongoose.connect(mongoose_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Successfully connected to MongoDB");
  // Use MyNivas database
  const myNivasDb = mongoose.connection.useDb("MyNivas");
  app.set("myNivasDb", myNivasDb);
  console.log("MyNivas database set:", myNivasDb.name); // Debug log

  // Initialize User model
  try {
    const userModel = require("./MyNivas/userLogin/model")(myNivasDb);
    app.set("UserModel", userModel);
    console.log("UserModel initialized successfully"); // Debug log
  } catch (error) {
    console.error("Error initializing UserModel:", error);
  }

  // Initialize Admin model
  try {
    const adminSchema = require("./MyNivas/adminLogin/model");
    const AdminModel = myNivasDb.model("Admin", adminSchema, "authAdmin");
    app.set("AdminModel", AdminModel);
    console.log("AdminModel initialized successfully"); // Debug log
  } catch (error) {
    console.error("Error initializing AdminModel:", error);
  }

  // Import Routes
  const userRouter = require("./MyNivas/userLogin/router");
  const adminRouter = require("./MyNivas/adminLogin/router");

  // Use Routes
  app.use("/MyNivas/user", userRouter);
  app.use("/MyNivas/auth", adminRouter);

  // Test Route
  app.get("/MyNivas", (req, res) => {
    console.log("Data sending");
    res.send("Hello World");
  });
})
.catch((err) => {
  console.error("MongoDB connection error details:", err);
  console.error("Connection string used (without password):", mongoose_URL.replace(/:([^@]+)@/, ":<hidden>@"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start the Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});