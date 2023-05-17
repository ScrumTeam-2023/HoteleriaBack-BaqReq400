'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HabitacionSchema = Schema({
  numeroDeHabitacion: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  disponible: {
    type: Boolean,
    required: true
  },
  idHotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  }
});

module.exports = mongoose.model('Habitacion', HabitacionSchema);
