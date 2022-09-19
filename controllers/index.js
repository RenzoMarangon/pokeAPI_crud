const controllerPokemon  = require('../controllers/pokemon');
const controllerUser  = require('../controllers/user');
const controllerAuth  = require('../controllers/auth');
const controllerPokeTypes  = require('../controllers/pokeTypes');

module.exports = {
    ...controllerPokemon,
    ...controllerUser,
    ...controllerAuth,
    ...controllerPokeTypes
}