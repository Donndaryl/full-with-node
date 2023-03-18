const mongoose = require('mongoose');
const UniqueValidator = require("mongoose-unique-validator")
const mongodb = require("mongoose");
const userSheme = mongoose.Schema({
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
});

userSheme.plugin(UniqueValidator);

module.exports = mongodb.model('User',userSheme)