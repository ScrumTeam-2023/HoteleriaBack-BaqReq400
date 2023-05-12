'use strict'

const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({

    name: {
        type: String,
        require: true,
        unique: true,
    },

    address: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }


});

module.exports = mongoose.model('Hotel',hotelSchema)