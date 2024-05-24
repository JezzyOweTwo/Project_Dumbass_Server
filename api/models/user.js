// mongose Schema for a gym goer 
const mongoose = require('mongoose');

const user = mongoose.Schema({
    name: {type:String,required:true,unique:false},
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return (emailPattern.test(value))
            },
            message: '{PATH} data validation failed!'
        }
    },
    _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('User',user);