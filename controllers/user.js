const { response, request } = require('express');


const userGet = (req = request,res = response) => {
    res.json({msg:'user get'})
}
const userPost = (req = request,res = response) => {

    const id = req.query

    const body = req.body;

    res.json({body, id})
}
const userPut = (req = request,res = response) => {
    res.json({msg:'user put'})
}
const userDelete = (req = request,res = response) => {
    const { id } = req.params;

    res.json({id})
}
const userPatch = (req = request,res = response) => {
    res.json({msg:'user patch'})
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch,
}