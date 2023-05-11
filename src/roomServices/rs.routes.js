'use strict'

const express = require('express');
const api = express.Router();
const rsController = require('./rs.controller');

api.get('/get', rsController.getServices);
api.post('/add', rsController.createService);
api.put('/update/:id', rsController.updateService);

module.exports = api;