'use strict'

//Importaciones 

const express = require ('express');
const api = express.Router();
const roomController = require('./room.controller')


// Public
api.get('/get', roomController.getRooms);
// api.get('/get/:id',roomController.getRoomBy);
api.post('/add', roomController.addRoom);
api.put('/update/:id', roomController.updateRoom);
api.delete('/delete/:id', roomController.delete);

module.exports = api;