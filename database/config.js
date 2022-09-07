const mongoose = require('mongoose');

const dbConnection = ()=>{
    try {
        mongoose.connect( process.env.MONGO_CONNECTION )
        .then(()=>{
            console.log('MongoDB connected')
        });
        
    } catch (error) {
        console.log( error );
        throw new Error('Error al levantar MongoDB');
    }
}

module.exports = {
    dbConnection
}
