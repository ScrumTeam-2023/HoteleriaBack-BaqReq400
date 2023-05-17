'use strict'

const express = require('express');
const api = express.Router();
const reserveController = require('./reserve.controller');

api.get('/test', reserveController.test);
api.post('/addReserva', reserveController.createReservation);
api.delete('/deleteReserva/:id', reserveController.deleteReserva);
api.get('/getby/:id', reserveController.getReservaBy);
api.get('/get', reserveController.getReservas);
api.put('/update/:id', reserveController.updateReserva);

module.exports = api;