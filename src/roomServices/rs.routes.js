'use strict'

const express = require('express');
const api = express.Router();
const rsController = require('./rs.controller');

api.get('/get', rsController.getServices);
api.get('/getBy/:id', rsController.getServiceBy);
api.post('/add', rsController.createService);
api.put('/update/:id', rsController.updateService);
api.delete('/delete/:id', rsController.deleteService);

module.exports = api;