const userModel = require('../models/user.model');
const cabsModel = require('../models/cabs.model');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');



module.exports.userRegister = async (req,res) => {
    try {
        const data = req.body;
        data.uid = uuidv4();
        const user = new userModel(data);
        let saveUser = await user.save();
        saveUser.password = null;
        return res.status(201).json({
            status : 201,
            message : 'User Registered Successfully',
            responsePayLoad : saveUser
        })
    } catch (error) {
        return res.status(500).json({
            status : 500,
            errorMessage : 'Error occured while saving User',
            error : error.message
        })
    }
}

module.exports.userLogin = async (req,res) => {
    try{
        const {mobileNumber,password} = req.body;
        if(!mobileNumber || !password) console.log('heree');
        let user = await userModel.findOne({mobileNumber : mobileNumber});
        if(!user) return res.status(404).json({status : 404 , message : 'MobileNumber not found'});
        let valid = bcrypt.compareSync(password, user.password);
        if(valid){
            user.password = null;
            let token = jwt.sign({user : user }, config.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({
                status : 200,
                message : 'User Login Successful',
                responsePayLoad : token
            })
        }else{
            return res.status(403).json({
                status : 403,
                message : 'Invalid Password',
            })
        }
    }catch(error){
        return res.status(500).json({
            status : 500,
            errorMessage : 'Error occured while Logging User',
            error : error.message
        })
    }
}
