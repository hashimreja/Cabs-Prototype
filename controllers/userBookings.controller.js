const userBookingsModel = require('../models/userBookings.model');
const pagination = require('msrv-shared-modules/modules');

const helpers = require('../utils/helpers');

module.exports.bookCab = async (req, res) => {
    try {   
        let data = req.body;
        //Haversine distance to measure the distance between the co-ordiantes
        data.distance = helpers.haversineDistance([data.fromLocation[0], data.fromLocation[1]], [data.toLocation[0], data.toLocation[1]]);
        data.distance = Math.round(data.distance);
        data.userId = req.user._id;
        data.uid = req.user.uid;
        const Booking = new userBookingsModel(data);
        const saveBooking = await Booking.save();
        return res.status(201).json({
            status: 201,
            message: 'Cab Booked Successfully',
            responsePayLoad: saveBooking
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            errorMessage: 'Error occured while Booking a Cab',
            error: error.message
        })
    }
}

module.exports.getAllBookingsByUser = async (req,res) => {
    try {
        const { offset, limit } = pagination.getPaginationValues(req.query);
        const bookings = await userBookingsModel.find({uid : req.user.uid}).populate('cab').skip(offset).limit(limit);
        const bookingsCount = await userBookingsModel.find({uid : req.user.uid}).count();
        if(bookings.length ==0) return res.status(404).json({status : 404, message : 'No Bookings found'})
        const paginatedResponse = pagination.addPagination(req,bookingsCount,bookings)
        return res.status(200).json({
            status: 200,
            message: 'Bookings Retrieved Successfuly',
            responsePayLoad: paginatedResponse
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            errorMessage: 'Error occured while Retrieving Bookings',
            error: error.message
        })
    }
}