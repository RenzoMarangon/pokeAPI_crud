const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const Pokemon = require('../models/pokemon')
const Type = require('../models/types')

const allowedCollections = [
    'pokemons',
    'types',

]

const searchPokemons = async( element, res = response ) => {


    if( element === "" ){
        const pokemons = await Pokemon.find({ state:true });
        return res.json({ results : pokemons })
    }

    const isMongoID = ObjectId.isValid( element ); //TRUE
    //Pregunto si es un ID de mongo
    if( isMongoID ){
        const pokemon = await Pokemon.findById( element );

        return res.json({
            results: ( pokemon ) ? [ pokemon ] : []
        })
    }

    const regex = new RegExp( element, 'i' );

    const pokemons = await Pokemon.find({ 
        $or:[{ name: regex }, { generation:regex }, { type:regex }, {numberID:regex}],
        $and:[{ state:true }]
     })

     res.json({
        results:pokemons
     })

}

const searchTypes = async( element, res = response ) => {

    if( element === "" ){
        const pokeTypes = await Type.find({ state:true });
        return res.json({ results : pokeTypes })
    }

    const isMongoID = ObjectId.isValid( element ); //TRUE
    //Pregunto si es un ID de mongo
    if( isMongoID ){
        const pokeType = await Type.findById( element );

        return res.json({
            results: ( pokeType ) ? [ pokeType ] : []
        })
    }

    const regex = new RegExp( element, 'i' );

    const pokeTypes = await Type.find({ name: regex, state:true })

     res.json({
        results:pokeTypes
     })
}

const search = ( req, res = response ) => {

    const { collection, element } = req.params;

    if( !allowedCollections.includes( collection )){
        return res.status(400).json({
            msg : `Las colecciones permitidas son ${ allowedCollections }`
        })
    }

    switch( collection ){
        case 'pokemons':
            searchPokemons( element, res );
            break;
        case 'types':
            searchTypes( element, res );
            break;
        default:
            res.status(500).json({
                msg:'Ese tipo de busqueda todavia no esta programada en el backend'
            })
    }

};

module.exports = {
    search
}