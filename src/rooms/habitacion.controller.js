const Habitacion = require('../rooms/habitacion.model')
const underscore = require('underscore')
const Hotel = require('../hotel/hotel.model')

//agregar habitaciones


exports.agregarHabitacion = async (req, res) => {
  const { numeroDeHabitacion, descripcion, precio, disponible, idHotel } = req.body;
  if (!numeroDeHabitacion || !descripcion || !precio || !disponible || !idHotel) {
    return res.status(400).json({ mensaje: 'Por favor, llene todos los campos' });
  }
  try {
    const habitacionExistente = await Habitacion.findOne({ numeroDeHabitacion });
    if (habitacionExistente) {
      return res.status(409).json({ mensaje: 'Ya existe una habitación con ese número' });
    }
    const habitacion = new Habitacion({ numeroDeHabitacion, descripcion, precio, disponible, idHotel });
    await habitacion.save();
    res.status(201).json({ mensaje: 'Habitación creada exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al agregar la habitación' });
  }
};


exports.editarHabitacion = async (req, res) => {
    var parametros = req.body
    var idHabitacion = req.params.idHabitacion
    Habitacion.findByIdAndUpdate(idHabitacion, parametros, { new: true }, (err, habitacionEditada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!habitacionEditada) return res.status(404).send({ mensaje: 'Error no se pudo editar la habitacion' });
        return res.status(200).send({ habitacion: habitacionEditada })
    })
}
 
exports.eliminarHabitacion = async(req, res) => {
    var idHabitacion = req.params.idHabitacion;
    Habitacion.findByIdAndDelete(idHabitacion, (err, habitacionEliminada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!habitacionEliminada) return res.status(404).send({ mensaje: 'Error al eliminar la habitacion' });
        return res.status(200).send({habitacion: habitacionEliminada });
    })
}

//listar todas las habitaciones por hotel
exports.buscarHabitaciones = async (req, res) => {
    Habitacion.find({idAdmin: req.user.sub},(err, habitacionesEncontradas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!habitacionesEncontradas) return res.status(404).send({ mensaje: 'Error no se pudo obtener las habitaciones' });
        return res.status(200).send({ habitaciones: habitacionesEncontradas })
    })
}

exports.habitacionDisponible = async(req, res) => {
    let cont = 0; 
    let parametros = req.body;
    if (parametros.nombre) {
        Hotel.findOne({ nombre: parametros.nombre }, (err, hotelEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (underscore.isEmpty(hotelEncontrado)) return res.status(404).send({ mensaje: 'Error al obtener el hotel' });

            Habitacion.find({ idHotel: hotelEncontrado._id, disponible: true }, (err, habitacioDisponible) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!habitacioDisponible) return res.status(404).send({ mensaje: 'Error al obtener el hotel' });
                habitacioDisponible.forEach(habitaciones => { habitaciones.nombre, cont++; })
                return res.status(200).send({ habitacion: cont })
            })
        })
    } else {
        return res.status(404).send({ mensaje: 'Ingresa todos los datos, Por favor' })
    }
}

