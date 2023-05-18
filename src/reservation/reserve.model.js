'use strict'

const mongoose  = require('mongoose');

const reservationSchema = mongoose.Schema({
    startDate:{
        type: Date,
        required: true,
        validate:{
            validator: function(value){
                return value <= this.endDate;
            },
            message: 'La fecha de inicio no puede ser mayor a la fecha de finalizacion'
        }
    },
    endDate:{
        type: Date,
        required: true
    },
    total:{
        type: Number,  
        default: 0 
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    roomServices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: false
    }],
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

module.exports = mongoose.model('Reservation', reservationSchema);
mongoose.model('roomServices', reservationSchema);