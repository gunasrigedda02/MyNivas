const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const hostelSchema = new mongoose.Schema({
    hostelId: {
        type: String,
        default: uuidv4,
        unique: true,
        immutable: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {          // Textual location or city/area name
        type: String,
        required: true,
        trim: true
    },
    geoLocation: {       // Exact coordinates for map and geospatial queries
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
            validator: function (arr) {
                return arr.length <= 4;
            },
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
        trim: true
    },
    contact: {
        phone: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
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

// Create 2dsphere index on geoLocation for geo queries
hostelSchema.index({ geoLocation: '2dsphere' });

module.exports = mongoose.model('Hostel', hostelSchema);
