'use strict'

//Importaciones 

const express = require ('express');
const api = express.Router();
const hotelController = require('./hotel.controlller')


//Public
api.get('/get', hotelController.getHotel);
api.get('/get/:id',hotelController.getHotelBy);
api.post('/add', hotelController.createHotel);
api.put('/update/:id', hotelController.updateHotel);
api.delete('/delete/:id', hotelController.delete);

module.exports = api;