const cabsModel = require('../models/cabs.model');
const pagination = require('msrv-shared-modules/modules');



module.exports.insertCabs = async (req, res) => {
    try {
        const cabs = await cabsModel.insertMany(req.body);
        return res.status(201).json({
            status: 201,
            message: 'Cabs Added Successfuly',
            responsePayLoad: cabs
        })
    } catch (error) {
        console.log(error , 'errorr')
        return res.status(500).json({
            status: 500,
            errorMessage: 'Error occured while Adding cabs',
            error: error.message
        })
    }
}


module.exports.getAllCabs = async (req, res) => {
    try {
        const { offset, limit } = pagination.getPaginationValues(req.query);
        const cabs = await cabsModel.find().skip(offset).limit(limit);
        const cabsCount = await cabsModel.find().count();
        if (cabs.length == 0) {
            return res.status(404).json({ status: 404, message: 'Cabs not found' })
        }
        const paginatedResponse = pagination.addPagination(req, cabsCount, cabs);
        return res.status(200).json({
            status: 200,
            message: 'Cabs Retrieval Successful',
            responsePayLoad: paginatedResponse
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            errorMessage: 'Error occured while retrieving cabs',
            error: error.message
        })
    }
}


module.exports.getNearestCabsInaLocation = async (req, res) => {
    try {
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;
        const distance = req.query.distance;
        await cabsModel.createIndexes({ "location": "2dsphere" });
        const cabs = await cabsModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: distance
                }
            }
        })
        return res.status(200).json({
            status: 200,
            message: 'cabs Retrieval successful',
            responsePayLoad: cabs
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            errorMessage: 'Error occured while retrieving cabs',
            error: error.message
        })
    }
}
