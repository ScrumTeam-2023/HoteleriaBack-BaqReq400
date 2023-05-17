'use strict'

const express = require('express')
const api = express.Router();
const eventController = require('./event.controller');

api.get('/test', eventController.test);
api.post('/createEvent', eventController.createEvent);
api.get('/getEvents', eventController.getEvents);
api.get('/get/:id', eventController.getEventBy);
api.put('/updateEvent/:id', eventController.updateEvent);
api.delete('/deleteEvent/:id', eventController.deleteEvent);

module.exports = api;