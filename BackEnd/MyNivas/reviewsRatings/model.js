const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  hostelId: {
    type: String, // UUID string of the hostel owner (Hostel.userId)
    required: true
  },
  userId: {
    type: String, // UUID string of the reviewer
    required: true
  },
  review: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  ownerResponse: {
    type: String,
    trim: true
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Prevent a user from reviewing the same hostel twice
reviewSchema.index({ hostelId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
