const { response } = require("express");
const Type = require("../models/types");

const { existPokeType } = require('../helpers/db-validators');

const pokemonTypesGet = async( req, res = response ) => {

    const { limit = 5, from = 0 } = req.query;

    const query = { state: true };

    const [ totalTypes, types ] = await Promise.all([
        Type.countDocuments(query),
        Type.find(query)
            .populate('user', 'name')
            .skip(Number( from )) 
            .limit(Number( limit ))
    ])

    res.json({totalTypes, types})
};


const pokemonTypesPost = async( req ,res = response ) => {
    let { name } = req.body;
    const user = req.user;

    name = name.toUpperCase();

    const type = new Type( { name, user:user._id } );

    //Guardar en db
    await type.save();

    res.json({ type });
};

const pokeTypesPut = async( req = request, res = response ) => {

    const { id } = req.params;

    let { name, state } = req.body;

    //Si el argumento "name" existe lo paso a mayusculas
    name && (name = name.toUpperCase()) ;

    const body = { name, state }

    const pokeType = await Type.findByIdAndUpdate( id, body, { new: true} )
    
    return res.json( pokeType )
};

const pokeTypesDelete = async( req = request, res = response ) => {

    const { id } = req.params;

    const pokeType = await Type.findByIdAndUpdate( id, { state:false }, { new: true} )
    
    res.json( pokeType )
};



module.exports = {
    pokemonTypesGet,
    pokemonTypesPost,
    pokeTypesPut,
    pokeTypesDelete
}