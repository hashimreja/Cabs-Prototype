const mongoose = require('mongoose');

const cabsSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
        unique : true
    },
    cabModel: {
        type: String,
        required: true
    },
    seatAvailability: {
        type: Number,
        required: true
    },
    userRating: {
        type: Number,
        required: true
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        address: {
            type: String
        },
        coordinates: {
            type: Array
        }
    }
}, { timestamps: true });

cabsSchema.index({"location" : "2dsphere"});

module.exports = mongoose.model('cabs', cabsSchema);



