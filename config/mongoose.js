const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(`mongodb://localhost/${config.DATABASE}`,{useNewUrlParser : true , useUnifiedTopology : true},(err) => {
    if(err){
        throw new Error(err);
    }else{
        console.log('Database Connected');
    }
})

