const User = require('../models/user');
const Role = require("../models/role");
const Pokemon = require('../models/pokemon');
const Type = require('../models/types');

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


//Verificar si existe el pokemon
const validatePokeName = async( name ) => {

    const nameToUppercase = name.toUpperCase()
    const pokemonExist = await Pokemon.findOne({ name:nameToUppercase })

    if( pokemonExist ) throw new Error(` ${ name } ya existe.`);

}

//Verificar si el ID del pokemon existe
const existPokemonID = async( id )=>{

    if(typeof(id)==''){
        throw new Error('El ID de la evolución no puede ser vacío. Si el pókemon no tiene evolución, por favor borre esta propiedad.')
    }

    const idExist = await Pokemon.findById( id );
    
    if( !idExist ) throw new Error(`El pokemon no existe.`);
}

//Verificar si el numberID de un pokemon existe
const existNumberID = async( id ) => {

    const pokeExist = await Pokemon.findOne( { numberID:id } );

    if( pokeExist ) throw new Error(`Ya existe un pókemon con el ID: ${id}`);
}


//Cuando se crea un pokemon, se verifica si el tipo de pokemon existe
const validatePokeType = async( type ) => {

    if(!type) return;

    type = type.split(" ");
    //Busco todos los type guardados en DB
    const types = await Type.find();
    const typesInDB = types.map( element => {return element.name });

    //Por cada type que tenga el pokemon, voy a validarlo si existe en DB
    type.forEach( type => {


        //Hago la validacion del type vacio dentro del bucle por si mandan mas de uno
        if(type===""){
            throw new Error(`No debes dejar un espacio en blanco.`);
        }

        if( !typesInDB.includes( type.toUpperCase() ) ){
            throw new Error(`El tipo de pókemon '${type}' no existe`);
        }
    })
 
};

//Verificar que no exista otro type con el mismo nombre
const existPokeType = async(name) => {

    if(!name) throw new Error('No hay nombre del type en la peticion');

    name = name.split(" ");

    //Busco todos los objetos type guardados en DB y devuelvo solo los nombres en un array
    let types = await Type.find();
    types = types.map( type => {return type.name})

    //Por cada type que tenga el pokemon, voy a validarlo si existe en DB
    name.forEach( type => {

        if( types.includes( type.toUpperCase() ) ){
            throw new Error(`El tipo de pókemon '${type}' ya existe`);
        }
    })
   

}

//Verificar si la generación es correcta
const existPokeGeneration = async( generation ) => {

    if( generation < 1 || generation > 8 ) throw new Error(`La generación: ${generation} no existe`);
}

//Verificar si existe el ID del poketype

const existPokeTypeID = async( id ) => {

    const pokeType = await Type.findById( id, { state:false } )

    if( !pokeType ) throw new Error(`El ID: ${ id } no existe`);
};

//Verificar si la coleccion es permitida

const collectionsAllowed = ( collection, collectionsInDB ) => {

    if( !collectionsInDB.includes( collection )) throw new Error(`La collección ${collection} no es permitida`);

    return true

}


module.exports = {
    validateRole,
    validateEmail,
    existUserID,
    validatePokeName,
    existPokemonID,
    existNumberID,
    validatePokeType,
    existPokeGeneration,
    existPokeType,
    existPokeTypeID,
    collectionsAllowed
}