const controllerPokemon  = require('../controllers/pokemon')
const controllerUser  = require('../controllers/user')

module.exports = {
    ...controllerPokemon,
    ...controllerUser
}