'use strict'

const Service = require('./rs.model');

//Obtener todos los servicios
exports.getServices = async (req, res)=>{
    try{
        let service = await Service.find().populate();
        return res.send({ message: 'Serices found', service });
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting services'});
    }
};

// Create service
exports.createService = async (req, res)=>{
    try{
        let data = req.body;
        // Validar Duplicados
        let existService = await Service.findOne({ name: data.name });
        if(existService){
            return res.status(409).send({ message: 'Service already exist'});
        }
        let service = new Service(data);
        await service.save();
        return res.status(201).send({ message: 'Service created successfully'});
    }catch (error) {
        console.error(error);
        return res. status(500).send ({ message: 'Error creating service'});
    }
};

//Actualizar un servicio existente

exports.updateService = async (req, res) =>{
    try{
        //Obtener el ID del servicio a actualizar
        const serviceId = req.params.id;
        
        //Obtener los datos del formulario  (body)
        const data = req.body;

        //Buscar si existe algúnn servicio con el mismo nombre
         const existingService = await Service.findOne({ name: data.name}).lean();
        
         if(existingService){
            //Validar que el ID que llega tenga el mismo nombre del que va actualizar
            if(existingService.id != serviceId){
                return res.send({ message: 'Service already created'});
            }
         }

         //Actualizar el servicio
         const updateService = await Service.findOneAndUpdate(
           { _id: serviceId},
           data,
           { new: true}
        );
        
        if (!updateService){
            return res.status(404).send({ message: 'Service not found and not update'});
        }
        return res.send({ message: 'Service update', updateService})
    }catch(err){
        console.error(err);
        return res.status(500).send({ message: 'Error updating service'});
    }
};



