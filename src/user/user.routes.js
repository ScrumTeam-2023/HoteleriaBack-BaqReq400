'use Strict'
//Importaciones
const express = require ('express');
const api = express.Router();
const userController = require('./user.controller')
const { ensureAuth , isAdmin } = require('../services/authenticated')

//PUBLIC
api.post('/register',userController.register);
api.post('/login',userController.login);
api.post('/search',ensureAuth,userController.Search);
api.get('/get',ensureAuth,userController.getUser);
api.get('/get/:id',ensureAuth,userController.getTheUser);
api.put('/update/:id',ensureAuth,userController.update)
api.delete('/delete/:id',ensureAuth,userController.delete)
//PRIVATE
api.post ('/save', [ensureAuth , isAdmin], userController.save)



module.exports = api;