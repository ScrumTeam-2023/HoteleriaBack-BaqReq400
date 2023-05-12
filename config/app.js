'use Strict'

const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
//server Config

const hotelRoutes = require('../src/hotel/hotel.routes');

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors());
app.use(helmet())
app.use(morgan('dev'))

//Agregar Rutas de Cada Entidad
app.use('/hotel',hotelRoutes)
//const NombreRoutes = require('Ruta')

//Server
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Hotel Server running on port ${port}`);

}