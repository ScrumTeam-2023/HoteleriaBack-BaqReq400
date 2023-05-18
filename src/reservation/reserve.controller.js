'use strict'
const Reservation = require('./reserve.model');
const User = require('../user/user.model');
const Room = require('../rooms/room.model');
const RoomServices = require('../roomServices/rs.model');


exports.test = async(req, res)=>{
    return res.send({message: 'Test running'})
}

exports.createReservation = async(req, res)=>{
    try {
        let data = req.body;
        let existUser = await User.findOne({_id: data.users});
        let existRoom = await Room.findOne({_id: data.room});
        let existRoomServices = await RoomServices.findOne({_id: data.roomServices});        
        if(!existUser){
            return res.status(404).send({message: 'User not found'})
        }
        if(!existRoom){
            return res.status(404).send({message: 'Room not found'})
        }
        if(!existRoomServices){
            return res.status(404).send({message: 'Service not found'})
        }
        let reservation = new Reservation(data);
        await reservation.save();
        return res.send({message: 'Reservation saved sucessfully'})    
    } catch (err) {
        console.log(err)
       return res.status(500).send({message: 'Error creating Reservation !!!'})   
    }
}

exports.getReservas = async(req, res)=>{
    try {
        let reserva = await Reservation.find().populate();
        return res.send({message: 'Reservatios found: ', reserva})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error getting Reservation !!!'})
    }
}

exports.getReservaBy = async(req, res)=>{
    try {
        let reservaId = req.params.id;
        let reserva = await Reservation.findOne({_id: reservaId}).populate('users','room','roomServices')
        if(!reserva){
            return res.status(400).send({message: 'Reservation not found'})
        }
        return res.send({message: 'Reservation found: ',reserva})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error getting Reservation !!!'})
    }
}

exports.updateReserva = async(req, res)=>{
    try {
        let reservaId = req.params.id;
        let data = req.body
        let params= {
            endDate: data.endDate,
            startDate: data.startDate,
            roomServices: data.roomServices
                     
        }
        let updateReserva = await Reservation.findByIdAndUpdate(
            {_id: reservaId},
            params,
            {new: true}
        )
        if(!updateReserva){
            return res.status(404).send({message: 'Reservation not found and not updatting !!!'})
        }
        return res.status(200).send({message: 'Reservation updated ', updateReserva})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error updating Reservation !!'})
    }
}

exports.deleteReserva = async(req, res)=>{
    try {
        const reserva = await Reservation.findById(req.params.id);
        if(!reserva){
            return res.status(404).send({message: 'Reservation not found !!!'})
        }
        const room = await Room.findById(reserva.room);
        if(room){
            room.disponible = true;
            await room.save();
            console.log(room)
        }
        let deleteReserva = await Reservation.deleteOne(reserva);
        if(deleteReserva.deletedCount === 0) return res.status(404).send({message: 'Reservation not found and not deleting !!!'})
        return res.status(200).send({message: 'Reservation deleted sucessfully'})
    } catch (err) { 
        console.log(err)
        return res.status(500).send({message: 'Error deleting reservation'})
    }
}


