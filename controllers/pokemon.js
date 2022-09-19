const { response, request } = require('express');
const Pokemon = require('../models/pokemon');

const pokemonGet = async(req = request,res = response) => {
   
    const { limit = 5, from = 0 } = req.query;

    const query = { state: true };

    const [ total, pokemons ] = await Promise.all([
        Pokemon.countDocuments( query ),
        Pokemon.find( query )
            .populate('user', 'name')
            .skip(Number( from )) 
            .limit(Number( limit ))
    ])
    res.json({total, pokemons})
}

const pokemonPost = async(req = request ,res = response) => {
    
    let { name, type, img, generation, numberID } = req.body;

    //Pregunto si hay un type;
    if(type){
        //Lo convierto a array para poder hacerle un map
        type = type.split(' ')
        const typeUpperCase = type.map(type => {return type.toUpperCase()});
        //Convierto el array en string
        type = typeUpperCase.join(" ")
    }

    const pokemon = new Pokemon({ name, type, img, generation, numberID })

    pokemon.user = req.user._id;
    pokemon.name = name.toUpperCase();
         
    await pokemon.save();

    res.json( pokemon )
}
const pokemonPut = async(req,res = response) => {

    const { id } = req.params;
    
    const user = req.user._id;

    let { name, type, img, generation, numberID, state} = req.body;

    //Pregunto si hay un type;
    if(type){
        //Lo convierto a array para poder hacerle un map
        type = type.split(' ')
        const typeUpperCase = type.map(type => {return type.toUpperCase()});
        //Convierto el array en string
        type = typeUpperCase.join(" ")
    }
    
    //Pregunto si envia el nombre y lo convierto a mayusculas
    if( name ) name = name.toUpperCase();

    const data = { 
        name,
        type,
        user,
        img,
        generation,
        numberID,
    }
    
    const pokemon = await Pokemon.findByIdAndUpdate( id, data, { new:true} );


    res.json( pokemon )
}
const pokemonDelete = async(req,res = response) => {
    const { id } = req.params;

    const pokemon = await Pokemon.findByIdAndUpdate( id, { state:false, user:req.user }, {new:true} );

    res.json(pokemon)
}


module.exports = {
    pokemonGet,
    pokemonPost,
    pokemonPut,
    pokemonDelete,
}