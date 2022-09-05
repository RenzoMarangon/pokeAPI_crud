const { response } = require('express');


const pokemonGet = (req,res = response) => {
    res.json({msg:'pokemon get'})
}
const pokemonPost = (req,res = response) => {
    res.json({msg:'pokemon post'})
}
const pokemonPut = (req,res = response) => {
    res.json({msg:'pokemon put'})
}
const pokemonDelete = (req,res = response) => {
    res.json({msg:'pokemon delete'})
}
const pokemonPatch = (req,res = response) => {
    res.json({msg:'pokemon patch'})
}

module.exports = {
    pokemonGet,
    pokemonPost,
    pokemonPut,
    pokemonDelete,
    pokemonPatch,
}