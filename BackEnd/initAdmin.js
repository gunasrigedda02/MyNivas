const mongoose = require("mongoose");
require("dotenv").config();
const adminSchema = require("./MyNivas/adminLogin/model");

const initAdmin = async () => {
  try {
    const mongoose_URL = process.env.BASE_URL;
    await mongoose.connect(mongoose_URL);
    console.log("Successfully connected to MongoDB for admin initialization");

    const adminDb = mongoose.connection.useDb("MyNivas");
    const AdminModel = adminDb.model("Admin", adminSchema);

    // Check if any admins exist
    const adminCount = await AdminModel.countDocuments();
    if (adminCount > 0) {
      console.log("Admins already exist. Skipping initialization.");
      process.exit(0);
    }

    // Create the first admin
    const firstAdmin = new AdminModel({
      adminName: "Anil Polipalli",
      adminEmail: "anilkumarpolipalli24@gmail.com",
      adminPassword: "Anil@dm1n123", // Change this to a strong password
      dateOfBirth: "2002-12-23", // Change as needed
    });

    await firstAdmin.save();
    console.log("First admin created successfully:", firstAdmin.adminEmail);
    process.exit(0);
  } catch (error) {
    console.error("Error initializing first admin:", error);
    process.exit(1);
  }
};

initAdmin();