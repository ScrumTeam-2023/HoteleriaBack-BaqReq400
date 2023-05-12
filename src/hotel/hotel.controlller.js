'use strict'

const Hotel = require('./hotel.model');
const { validateData } = require('../utils/validate');


//Obtener todos los Hoteles
exports.getHotel = async(req, res)=>{
    try{
        let hotel = await Hotel.find().populate();
        return res.send({message: 'Hotel found', hotel});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Hotels'});

    }
};

//Obtener todos los hoteles por ID
exports.getHotelBy = async(req, res)=>{
    try{
        let hotelId = req.params.id;
        let hotel = await Hotel.findById({_id: hotelId})
        if(!hotel) return res.status(418).send({message: 'Hotel not found'});
        return res.send(hotel)
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Hotel for ID'});
    }
}

//Buscar Hotel por nombre
exports.search = async(req, res)=>{
    try{
        let params = {
            name: req.body.name
        }
        let validate = validateData(params);
        if(validate) return res.status(400).send(validate);
        let hotel = await Hotel.find({
            name: {
                $regex: params.name,
                $options: 'i'
            }
        })
        return res.send({hotel})
    }catch(err){
        console.error(err);
        return request.status(500).send({message: 'Error searching hotel'});
    }
}

// Crear un Hotel 
exports.createHotel = async(req, res)=>{
    try{
        let data = req.body;
        //Validar Duplicados
        let existHotel = await Hotel.findOne({ name: data.name });
        if(existHotel){
            return res.status(409).send({message: 'Hotel already exists'});
        }
        let hotel = new Hotel(data);
        await hotel.save();
        return res.status(201).send({message: 'Hotel created successfully'});
    }catch(err){
       console.error(err);
       return res.status(400).send({message: 'Error creating Hotel'});    }
};

//Actualizar un hotel existente
exports.updateHotel = async(req, res)=>{
    try{
    //Obtener el ID del Hotel a actualizar
    const hotelId = req.params.id;
    //Obtner los datos del formulario (body)
    const data = req.body;
    //Buscar si existe algun hotel con el mismo nombre
    const existingHotel = await Hotel.findOne({name: data.name}).lean();
    if(existingHotel){
        //Validar que el ID que llega tenga el mismo nombre del que va actualizar
        if(existingHotel._id != hotelId){
            return res.send({message: 'Hotel already created'});
        }
    }

    //Actualizar el HOTEL
     const updateHotel = await Hotel.findByIdAndUpdate(
        { _id: hotelId},
        data,
        {new: true}
     );
     if(!updateHotel){
        return res.status(404).send({message: 'Hotel not found and not update'});
     }
     return res.status(200).send({message: 'Hotel Update', updateHotel})

}catch(err){
    console.error(err);
    return res.status(404).send({message: 'Error updating hotel'});
    }
};

exports.delete = async(req, res) => {
    try{
        //Capturar el id del hotel
        let hotelId = req.params.id;
        //Validar que exista el hotel
        //Eliminarlo
        let deleteHotel = await Hotel.deleteOne({_id: hotelId})
        if(deleteHotel.deleteCount === 0)return res.status(404).send({message: 'Hotel not found, not deleted'});
        return res.send({message: 'Hotel deleted'});
    }catch(err){
    console.error(err);
    return res.status(500).send({message: 'Error deleting hotel'});
    }
};
