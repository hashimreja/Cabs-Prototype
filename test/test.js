require('../config/mongoose');
require('./user.test');
require('./cabs.test');
require('./userBooking.test');

const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports.getToken = async() => {
    try{
        const user = await userModel.findOne();
        const token = jwt.sign({user},config.JWT_SECRET);
        return token;
    }catch(error){
        console.log(error , 'error occured at generating test token')
    }
}