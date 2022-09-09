const { resolve, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



const validateJWT = async( req = request, res = resolve, next) => {
    
    const tokenHeader = req.header('poke-token');

    if( !tokenHeader ){
        return  res.status(401).json({ error : "No hay token en la petición"})
    }

    try {
        //Leo y guardo el payload donde viene el id
        const { id } = jwt.verify( tokenHeader,  process.env.SECREORPRIVATEKEY);
        req.id = id;

        //Busco el usuario
        const user =  await User.findById( id );

        if( !user ) return res.status(401).json({ error : "El usuario no existe" });


        //Verifico si el usuario no fue borrado
        if( !user.state ) return res.status(401).json({ error : "El usuario fue eliminado" });

        req.user = user;

        next();

    } catch (error) {
        console.log( error );
        res.status(400).json({ error: "Token no válido" })
    }

}

module.exports = {
    validateJWT
}