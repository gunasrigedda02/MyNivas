const Hostel = require('./model');

exports.createHostel = async (req, res) => {
  try {
    const {
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

    // 🧠 Parse JSON strings
    const parsedGeoLocation = geoLocation ? JSON.parse(geoLocation) : null;
    const parsedAmenities = amenities ? JSON.parse(amenities) : {};
    const parsedContact = contact ? JSON.parse(contact) : {};

    // 📷 Handle images
    const images = req.files ? req.files.map(file => '/hostelImages/' + file.filename) : [];

    // ✅ Construct hostel object
    const newHostel = new Hostel({
      name,
      location,
      geoLocation: parsedGeoLocation,
      hostelType: hostelType.toLowerCase(), // Convert to lowercase if your enum expects that
      images,
      amenities: parsedAmenities,
      description,
      address,
      contact: parsedContact,
      pricePerMonth
    });

    const savedHostel = await newHostel.save();
    res.status(201).json(savedHostel);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
