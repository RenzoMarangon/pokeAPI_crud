const { validationResult } = require('express-validator');

//Verificar si existe algun error en los middlewares

const validateErrors = (req, res, next) => {
    const errors = validationResult( req );

    if( !errors.isEmpty() ){
        return res.status(400).json({ errors })
    }

    next();
}

module.exports = {
    validateErrors
}