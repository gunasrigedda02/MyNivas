const Hostel = require('./model');

exports.createHostel = async (req, res) => {
  try {
    const {
      userId,
      name,
      location,
      geoLocation,
      hostelType,
      amenities,
      description,
      address,
      contact,
      pricePerMonth
    } = req.body;

    // 🚫 Ensure user is logged in
    if (!userId) {
      return res.status(400).json({ message: "User must be logged in to create a hostel." });
    }

    // 🧠 Parse structured JSON inputs
    const parsedGeoLocation = geoLocation ? JSON.parse(geoLocation) : null;
    const parsedAmenities = amenities ? JSON.parse(amenities) : {};
    const parsedContact = contact ? JSON.parse(contact) : {};

    // 📷 Collect image paths
    const images = req.files ? req.files.map(file => '/hostelImages/' + file.filename) : [];

    // 🏠 Construct hostel object
    const newHostel = new Hostel({
      userId,
      name,
      location,
      geoLocation: parsedGeoLocation,
      hostelType: hostelType.toLowerCase(),
      images,
      amenities: parsedAmenities,
      description,
      address,
      contact: parsedContact,
      pricePerMonth
    });

    // ✅ Validate data — this will throw if any required field is missing
    await newHostel.validate();

    // ✅ Save only after successful validation
    const savedHostel = await newHostel.save();

    res.status(201).json({ message: 'Hostel created successfully', hostel: savedHostel });

  } catch (error) {
    console.error("Error creating hostel:", error);

    if (error.name === "ValidationError") {
      // 🔴 Validation failed: return detailed errors
      return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }

    // 🔴 Other errors (e.g., DB connection, duplicate key, etc.)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET all hostels
exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, hostels });
  } catch (error) {
    console.error('Error fetching hostels:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// GET single hostel by ID
exports.getHostelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hostel = await Hostel.findById(id);

    if (!hostel) {
      return res.status(404).json({ success: false, message: 'Hostel not found' });
    }

    res.status(200).json({ success: true, hostel });
  } catch (error) {
    console.error('Error fetching hostel:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};