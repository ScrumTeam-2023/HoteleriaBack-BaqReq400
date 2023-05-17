const express = require('express');
const habitacionController = require('../rooms/habitacion.controller');
const md_autenticacion = require('../services/authenticated');


const api = express.Router();

api.post('/agregarHabitacion', habitacionController.agregarHabitacion);
api.put('/editarHabitacion/:idHabitacion',habitacionController.editarHabitacion);
api.delete('/eliminarHabitacion/:idHabitacion', habitacionController.eliminarHabitacion);
api.get('/buscarHabitaciones', habitacionController.buscarHabitaciones);
api.get('/buscarHotelDisponible',habitacionController.habitacionDisponible);
module.exports = api;