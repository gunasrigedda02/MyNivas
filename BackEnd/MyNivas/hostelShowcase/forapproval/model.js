const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  userId: {
    type: String, // UUID string from User.userId
    required: true,
    immutable: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  geoLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  hostelType: {
    type: String,
    enum: ['boys', 'girls', 'co-lives', 'all'],
    required: true
  },
  images: {
    type: [String],
    default: [],
    validate: {
      validator: arr => arr.length <= 4,
      message: 'You can upload a maximum of 4 images only.'
    }
  },
  amenities: {
    wifi: { type: Boolean, default: false },
    meals: { type: Boolean, default: false },
    laundry: { type: Boolean, default: false }
  },
  description: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true
    }
  },
  pricePerMonth: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

hostelSchema.index({ geoLocation: '2dsphere' });

module.exports = mongoose.model('Hostel', hostelSchema);
