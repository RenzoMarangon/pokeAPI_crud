const { response } = require('express');

const validateStats = (req, res = response, next) => {

    const stats = req.body.stats;


    //Si no vienen los stats envio error
    if( !stats ) return res.status(400).json({ err: 'Se requieren las estadísticas del pókemon' });

    //Recorro c/u de los stats y los guardo en un array para verificar si hay alguno menor a 1
    const emptyStats = []
    const notAllowedStats = []
    const allowedStats = [ "attack","defense","special_attk","special_defense","velocity","hp"]
    Object.entries( stats ).forEach(([stat, value])=>{
        if( value < 1 ){
            emptyStats.push( stat.toUpperCase() );
        }

        if( !allowedStats.includes( stat ) ){
            notAllowedStats.push( stat.toUpperCase() );
        }
    })
    if(emptyStats.length > 0) return res.status(400).json({ err: `Se requieren las siguientes estadísticas: ${ emptyStats }` });

    //Pregunto si son menos que las estadísticas permitidas 
    if(Object.entries( stats ).length < allowedStats.length ) return res.status(400).json({err:"falta una estadística"});

    //Pregunto si existe alguna estadistica no permitida
    if(notAllowedStats.length > 0) return res.status(400).json({ err: `Las siguientes estadísticas no son permitidas: ${ notAllowedStats }` });

    next();

}

module.exports = {
    validateStats
}