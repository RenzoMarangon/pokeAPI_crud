const validationError = require('./validate-errors');
const validationJWT = require('./validate-jwt');
const validationRole = require('./validate-role');


module.exports = {
    ...validationError,
    ...validationJWT,
    ...validationRole,
}