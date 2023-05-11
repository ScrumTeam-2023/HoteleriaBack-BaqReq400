'use Strict'

const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
<<<<<<< HEAD
=======
//server Config
const servicesRoutes = require('../src/roomServices/rs.routes')

>>>>>>> llopez-2021134

//const NombreRoutes = require('Ruta')
const eventRoutes = require ('../src/events/event.routes');
const userRoutes = require('../src/user/user.routes')
const servicesRoutes = require('../src/roomServices/rs.routes')

//server Config
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors());
app.use(helmet())
app.use(morgan('dev'))

//Agregar Rutas de Cada Entidad
<<<<<<< HEAD
app.use('/event',eventRoutes);
app.use('/user',userRoutes);
app.use('/services',servicesRoutes);
//Server
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Hotel Server running on port ${port}`);

}