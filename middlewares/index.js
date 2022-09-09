const validationError = require('../middlewares/validate-errors');
const validationJWT = require('../middlewares/validate-jwt');
const validationRole = require('../middlewares/validate-role');

module.exports = {
    ...validationError,
    ...validationJWT,
    ...validationRole,
}