const User = require('../models/user');
const Role = require("../models/role");

//Validar rol
const validateRole = async( role = '' ) =>{

    const roleExist = await Role.findOne({ role });

    if( !roleExist ) throw new Error(`El rol ${ role } no existe.`);
}


//Verificar si el correo existe
const validateEmail = async( mail ) => {

    const mailExist = await User.findOne( { mail } );

    if( mailExist ) throw new Error(`El email ${mail} ya existe`);
}

const existUserID = async( id )=>{
    //Verificar si el ID existe

    const idExist = await User.findById( id );
    if( !idExist ) throw new Error(`El id: ${ id } no existe.`);
}



module.exports = {
    validateRole,
    validateEmail,
    existUserID
}