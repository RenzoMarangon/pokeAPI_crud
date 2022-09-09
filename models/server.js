require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.path = {
            pokemon : '/api/pokemon',
            user    : '/api/user',
            auth    : '/auth'
        }

        //Conectar a MongoDB
        this.connectDB();

        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    routes(){

        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.pokemon, require('../routes/pokemon'));
        this.app.use(this.path.user, require('../routes/user'));
        
        this.app.get('*', ( req , res ) => {
            res.send({ msg:"No existe esa página" });
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