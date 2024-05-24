// mongose Schema for a category
const mongoose = require('mongoose');

const category = mongoose.Schema({
    name: {type:String,required:true,unique:true},
    description: {type:String,required:true,unique:true},
    tag1:{type:String,required:false,unique:false},
    tag2:{type:String,required:false,unique:false},
    tag3:{type:String,required:false,unique:false},
    _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Category',category);