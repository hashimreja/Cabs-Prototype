const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const userSchema = new mongoose.Schema({
    uid : {
        type : String,
        required : true
    },
    userName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps : true});

userSchema.pre('save', function(next){
    this.password =  bcrypt.hashSync(this.password, salt);
    next();
});

module.exports = mongoose.model('users',userSchema);