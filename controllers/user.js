const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const user = require('../models/user');

//Obtener usuario || GET
const userGet = async(req = request,res = response) => {
    
    const { id } = req.params;

    const user = await User.findById( id );

    if(!user) return res.status(400).json({ err : "No existe el usuario"});

    res.json( user )

}

const usersGet = async(req = request,res = response) => {
    
    const { desde = 0, limite = 5 } = req.query;

    //Pregunto si req.query son numeros
    if( isNaN(desde) ||  isNaN(limite) ) return res.status(400).json({ msg: "El inicio y el límite deben ser números" })

    //Busco los usuarios
    const [ totalUsers, users ] = await Promise.all([
        User.count({ state:true }),
        User.find({ state:true })
            .skip( Number( desde ))
            .limit( Number( limite ))
    ])

    res.json({ totalUsers, users })
}
//Crear usuario || POST
const userPost = async(req = request,res = response) => {

    const { name, password, mail , role } = req.body;
    const user = new User( { name, password, mail } );    
    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync() //creo un nivel de dificultad, por defecto 10
    user.password = bcryptjs.hashSync( password, salt )

    //Guardar en DB
    await user.save()

    res.json({ user })
}

//Actualizar usuario || PUT
const userPut = async(req = request,res = response) => {

    const { id } = req.params;
    //Saco lo que no quiero que se modifique
    const { _id, password, google, ...user } = req.body;

    if( password ) {
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt )
    }

    const userUpdated = await User.findByIdAndUpdate( id, user, { new:true}  );

    res.json( userUpdated )
}

//DELETE
const userDelete = async(req = request,res = response) => {
    const { id } = req.params;

    //Borrar fisicamentres
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { state:false, user:req.user._id }, { new:true}  );


    res.json( {user} )
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    usersGet
}