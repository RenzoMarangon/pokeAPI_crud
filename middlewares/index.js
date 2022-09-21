const validationError = require('./validate-errors');
const validationJWT = require('./validate-jwt');
const validationRole = require('./validate-role');
const validateFiles = require('./validate-files');

module.exports = {
    ...validationError,
    ...validationJWT,
    ...validationRole,
    ...validateFiles,
}