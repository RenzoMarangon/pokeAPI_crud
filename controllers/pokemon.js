const { response, request } = require('express');
const Pokemon = require('../models/pokemon');

const pokemonGet = async(req = request,res = response) => {
   
    const { limit = 5, from = 0 } = req.query;

    const query = { state: true };

    const [ total, pokemons ] = await Promise.all([
        Pokemon.countDocuments( query ),
        Pokemon.find( query )
            .populate('user', 'name')
            .populate('evolution','name')
            .skip(Number( from )) 
            .limit(Number( limit ))
    ])

    const sortPokemons = pokemons.sort((a,b)=>{
        if( Number(a.numberID) > Number(b.numberID) ){
            return 1;
        }else if( Number(a.numberID) < Number(b.numberID) ){
            return -1;
        }else{
            return 0;
        }
    })

    res.json({total, pokemons:sortPokemons})
}

const pokemonPost = async(req = request ,res = response) => {
    
    let { name, type, img, generation, numberID, evolution, stats } = req.body;

    //Pregunto si hay un type;
    if(type){
        //Lo convierto a array para poder hacerle un map
        type = type.split(' ')
        const typeUpperCase = type.map(type => {return type.toUpperCase()});
        //Convierto el array en string
        type = typeUpperCase.join(" ")
    }

    const pokemon = new Pokemon({ name, type, img, generation, numberID, evolution, stats })

    pokemon.user = req.user._id;
    pokemon.name = name.toUpperCase();
         
    await pokemon.save();

    res.json( pokemon )
}
const pokemonPut = async(req,res = response) => {

    const { id } = req.params;
    
    const user = req.user._id;

    let { name, type, img, generation, numberID, evolution} = req.body;

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
        evolution
    }
    
    const pokemon = await Pokemon.findByIdAndUpdate( id, data, { new:true} );


    res.json( pokemon )
}
const pokemonDelete = async(req,res = response) => {
    const { id } = req.params;

    const pokemon = await Pokemon.findByIdAndUpdate( id, { state:false, user:req.user }, {new:true} );

    res.json(pokemon)
}


const pokemonFindOne = async(req, res) => {
    const id = req.params.id;

    console.log(id)

    const pokemon = await Pokemon.findById( id )

    res.json( pokemon )
}



module.exports = {
    pokemonGet,
    pokemonPost,
    pokemonPut,
    pokemonDelete,
    pokemonFindOne,
}