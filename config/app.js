'use Strict'

const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

//const NombreRoutes = require('Ruta')
const eventRoutes = require ('../src/events/event.routes');
const userRoutes = require('../src/user/user.routes')

//server Config
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors());
app.use(helmet())
app.use(morgan('dev'))

//Agregar Rutas de Cada Entidad
app.use('/event',eventRoutes);
app.use('/user',userRoutes);

//Server
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Hotel Server running on port ${port}`);

}