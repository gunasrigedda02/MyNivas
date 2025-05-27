const mongoose = require("mongoose");

const hostelShowcaseSchema = mongoose.Schema({
    hostelName: {
        type: String,
        required: true
    },
    hostelLocation: {
        type: String,
        required: true
    },
    hostelPhone: {
        type: Number,
        required: true
    },
    hostelEmail: {
        type: String
    },
    hostelWIFI: {
        type: String,
        required: true
    },
    hostelMess: {
        type: String,
        required: true
    },
    hostelLaundry: {
        type: String,
        required: true
    }
})