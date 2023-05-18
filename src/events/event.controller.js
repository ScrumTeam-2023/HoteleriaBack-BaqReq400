'use strict'
const Event = require('./event.model');


exports.test = (req, res)=>{
    res.send({message: 'Test function is running Event'})
}

exports.createEvent = async(req, res)=>{
    try {
        let data = req.body;
        // Validar duplicados
        let existEvent = await Event.findOne({ name: data.name, hotelId: data.hotelId });
        if(existEvent){
            return res.status(409).send({message: 'Event already exists for this hotel'});
        }
        let event = new Event(data);
        await event.save();
        return res.send ({message: 'Event saved successfully'});
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error saving event !!!'})
    }
}


exports.getEvents = async(req, res)=>{
    try {
        let event = await Event.find().populate()
        return res.send({event});
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error getting events !!!'})
    }
}

exports.getEventBy = async(req, res)=>{
    try {
        let eventId = req.params.id;
        let event = await Event.findOne({_id: eventId}).populate()
        if(!event){
            return res.status(400).send({message: 'Event not found'})
        }
        return res.send({message: 'Event found: ', event});
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error getting events !!!'})
    }
}

exports.updateEvent = async(req, res)=>{
    try {
        let data = req.body;
        let eventId = req.params.id;
        let updateEvent = await Event.findByIdAndUpdate(
            {_id: eventId},
            data,
            {new: true}
        )
        if(!updateEvent) return res.status(404).send({message: 'Not found, not updated'});
        return res.send({message: 'Event updatting succesfully', updateEvent})       
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error updatting event !!!'})
    }
}

exports.deleteEvent = async(req, res)=>{
    try {
        let eventId = req.params.id;
        let deleteEvent = await Event.deleteOne({_id: eventId})
        if(deleteEvent.deletedCount === 0){
            return res.status(404).send({message: 'Event not found, not deleted'})
        }
        return res.send({message: 'Event deletting succesfully'})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error deletting event !!!'})
    }
}