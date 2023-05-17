'use strict'
const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    typeEvent: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    startTime:{
        type: String,
        required: true
    },
    endTime:{
        type: String,
        required: true
    },
    hotel: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Hotel',
       required: true
    }

    
},{ 
    versionKey: false
});

module.exports = mongoose.model('Event', eventSchema);
