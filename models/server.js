require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.path = {
            auth         : '/auth',
            pokemon      : '/api/pokemon',
            pokemonTypes : '/api/pokemon/type',
            user         : '/api/user',
            search       : '/api/search',
            upload       : '/api/upload'
        }

        //Conectar a MongoDB
        this.connectDB();

        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    routes(){

        this.app.use( this.path.auth, require('../routes/auth'));
        this.app.use( this.path.pokemon, require('../routes/pokemon'));
        this.app.use( this.path.pokemonTypes, require('../routes/pokeTypes'));
        this.app.use( this.path.user, require('../routes/user'));
        this.app.use( this.path.search, require('../routes/search'));
        this.app.use( this.path.upload, require('../routes/upload'));
        
        this.app.get('*', ( req , res ) => {
            res.status(404).send({ msg:"No existe este endpoint" });
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
        this.app.use( cors() );

        //Usar formato json
        this.app.use( express.json() );

        //Servir contenido estático
        this.app.use( express.static('public') );

        //Para poder subir archivos
        this.app.use(fileUpload({
            useTempFiles     : true,
            tempFileDir      : '/tmp/',
            createParentPath : true
        }));
    }
}

module.exports = Server;