const { response } = require('express');

const validateStats = (req, res = response, next) => {

    const stats = req.body.stats;

    if( !stats ) return res.status(400).json({ err: 'Se requieren las estadísticas del pókemon' })

    const emptyStats = []
    Object.entries( stats ).forEach(([stat, value])=>{
        if( value.length < 1 ){
            emptyStats.push( stat.toUpperCase() );
        }
    })

    if(emptyStats.length > 0) return res.status(400).json({ err: `Se requieren las siguientes estadísticas: ${ emptyStats }` })

    next();

}

module.exports = {
    validateStats
}