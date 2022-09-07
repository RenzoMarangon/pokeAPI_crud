require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = ()=>{
    try {
        mongoose.connect( process.env.MONGO_CONNECTION )
        .then(()=>{
            console.log('MongoDB connected')
        });
        
    } catch (error) {
        throw new Error('Error al levantar MongoDB');
    }
}

module.exports = {
    dbConnection
}
