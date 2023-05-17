'use strict'

const Room = require('./room.model')
const {validateData} = require('../utils/validate')

///--------------------ADD ROOM------------------------
exports.addRoom = async (req, res) => {
    try {
      const { roomNumber, description, price, available, hotelId } = req.body;
  
      // Verificar si ya existe una habitación con el mismo número y el mismo hotel
      const existingRoom = await Room.findOne({ roomNumber, hotel: hotelId });
  
      if (existingRoom) {
        return res.status(400).json({ error: 'El número de habitación ya está en uso para este hotel' });
      }
  
      // Crear una nueva instancia de habitación utilizando el modelo
      const newRoom = new Room({
        roomNumber,
        description,
        price,
        available,
        hotel: hotelId
      });
  
      // Guardar la habitación en la base de datos
      const savedRoom = await newRoom.save();
  
      res.status(200).json(savedRoom);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al agregar la habitación' });
    }
  }
  
  

//----------------DELETE-------------------------------------

exports.delete = async (req, res) => {
    try {
      const roomId = req.params.id;
  
      // Verificar si la habitación existe antes de eliminarla
      const existingRoom = await Room.findById(roomId);
  
      if (!existingRoom) {
        return res.status(404).json({ error: 'La habitación no existe' });
      }
  
      // Eliminar la habitación de la base de datos
      await Room.findByIdAndRemove(roomId);
  
      res.status(200).json({ message: 'Habitación eliminada correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar la habitación' });
    }
  }
  
//-----------------------GET----------------------------------

exports.getRooms = async (req, res) => {
    try {
      // Obtener todas las habitaciones de la base de datos
      const rooms = await Room.find();
  
      res.status(200).json(rooms);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener las habitaciones' });
    }
  }

//----------------------UPDATE------------------------------

// Actualizar una habitación existente
exports.updateRoom = async (req, res) => {
    try {
      // Obtener el ID de la habitación a actualizar
      const roomId = req.params.id;
    
      // Obtener los datos del formulario (body)
      const data = req.body;
    
      // Buscar si existe alguna habitación con el mismo número
      const existingRoom = await Room.findOne({ roomNumber: data.roomNumber }).lean();
    
      if (existingRoom) {
        // Validar que el ID que llega tenga el mismo número de habitación del que va a actualizar
        if (existingRoom._id != roomId) {
          return res.send({ message: 'Room number already exists' });
        }
      }
    
      // Actualizar la habitación
      const updatedRoom = await Room.findByIdAndUpdate(
        { _id: roomId },
        data,
        { new: true }
      );
    
      if (!updatedRoom) {
        return res.status(404).send({ message: 'Room not found and not updated' });
      }
    
      return res.status(200).send({ message: 'Room updated', updatedRoom });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error updating room' });
    }
  };
  