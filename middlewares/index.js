const validationError = require('./validate-errors');
const validationJWT = require('./validate-jwt');
const validationRole = require('./validate-role');
const validateFiles = require('./validate-files');
const validatePokemons = require('./validate-pokemons');

module.exports = {
    ...validationError,
    ...validationJWT,
    ...validationRole,
    ...validateFiles,
    ...validatePokemons,
}