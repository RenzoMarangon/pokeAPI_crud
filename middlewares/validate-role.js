const { response } = require('express');

const isAdmin = (req, res = response, next) => {
    
        const user = req.user;

        //Verifica si primero se llama a la funcion antes de llamar a la funcion que verifica el JWT y guarda el user en la req
        if(!user) return res.status(500).json({ error: "Primero se debe validar el token" })
    
        const { role, name } = user;
    
        if( role !=='ADMIN_ROLE' ) return res.status(401).json({ error: `${ name } no es administrador`});
        
        next();
    
}

//Verifica si tiene el rol especificado
const isRole = ( ...roles ) => {
    return (req, res = response,next) => {

        //Verifica si primero se llama a la funcion antes de llamar a la funcion que verifica el JWT y guarda el user en la req
        if(!req.user) return res.status(500).json({ error: "Primero se debe validar el token" })

        //Pregunto si los roles coinciden con los roles que tiene el usuario
        if( !roles.includes( req.user.role ) ) return res.status(401).json({ error: `El servicio requiere uno de estos roles ${ roles }` })
        
        next()
    }
}

module.exports = {
    isAdmin,
    isRole
}