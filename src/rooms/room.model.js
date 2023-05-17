'use strict'

const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: false,  
        unique: true     
    },
    description: {
        type: String ,
        required: true,  
    },
    price: {
        type: Number,
        required: true,  
    },
    available: {
        type: Boolean,
        required: true,  
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        require: true,  
    }
})

module.exports = mongoose.model('Room',roomSchema)