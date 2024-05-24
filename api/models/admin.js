// mongose Schema for a admin
const mongoose = require('mongoose');

const admin = mongoose.Schema({
    password: {type:String,required:true,unique:false},
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

module.exports = mongoose.model('Admin',admin);