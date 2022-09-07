require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app  = express();
        this.port = process.env.PORT;

        //Conectar a MongoDB
        this.connectDB();

        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    routes(){

        this.app.use('/api/pokemon', require('../routes/pokemon'));
        this.app.use('/api/user', require('../routes/user'));
        
        this.app.get('*', ( req , res ) => {
            res.sendFile(__dirname+'/public/404.html');
        })
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('App online - port ' + this.port);
        });
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){

        //Proteccion superficial pero chrome o ffox pueden tirar error
        this.app.use(cors());

        //Usar formato json
        this.app.use( express.json() );

        //Servir contenido estático
        this.app.use( express.static('public') );
    }
}

module.exports = Server;