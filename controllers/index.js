const controllerPokemon  = require('../controllers/pokemon')
const controllerUser  = require('../controllers/user')
const controllerAuth  = require('../controllers/auth')

module.exports = {
    ...controllerPokemon,
    ...controllerUser,
    ...controllerAuth
}