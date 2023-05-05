const mongoose = require ('mongoose');

exports.connect = async()=>{
    try {
        const uriMongo = `${proccess.env.URI_MONGO}`;
        mongoose.set('strictQuery',false);
        await mongoose.connect(uriMongo);
        console.log('Engaged Hotel...')
    } catch (err) {
        console.error(err)
        
    }
}