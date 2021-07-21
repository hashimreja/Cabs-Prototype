const mongoose = require('mongoose');

const userBookingSchema = new mongoose.Schema({
    uid : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    fromLocation : {
        type : Array,
        required : true
    },
    toLocation : {
        type : Array,
        required: true
    },
    distance : {
        type : Number
    },
    distanceMeasure : {
        type : String,
        default : "KM"
    },
    cab : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'cabs',
        required: true
    }
},{timestamps : true});

module.exports = mongoose.model('userBookings',userBookingSchema);