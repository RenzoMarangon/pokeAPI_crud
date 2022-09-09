const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt-generator');

const accountLogin = async( req = request, res = response) => {

    const { mail, password } = req.body;

   try {
     //Verificar si el email existe
     const userExist = await User.findOne({ mail });
     if( !userExist ) return res.status(400).json({ error: "El correo no es válido" });
 
     //Verificar si la contraseña es correcta
     const validatePassword = bcryptjs.compareSync( password, userExist.password );
     if( !validatePassword ) return res.status(400).json({ error: "La contraseña no es válida" });
 
     //Verificar el state del usuario
     if( !userExist.state ) return res.status(400).json({ error: "El usuario no existe" });
 
 
     //Generar el jwt
    const token = await generateJWT( userExist.id );

     res.json({userExist,token})

   } catch (error) {
        console.log(error)
        res.status(500).json({ error:"Error interno de la base de datos, comuniquelo con el backend" })
   }

}

module.exports = {
    accountLogin
}