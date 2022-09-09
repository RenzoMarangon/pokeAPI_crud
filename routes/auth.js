const { Router } = require('express');
const { check } = require('express-validator');
const { validateErrors } = require('../middlewares/index');
const { validateRole, validateEmail, existUserID } = require('../helpers/db-validators');
const { accountLogin } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('mail',"El email no es válido").isEmail(), //Express-validator => isEmail();
    check('password',"La contraseña es obligatoria").not().isEmpty(),
    validateErrors
], accountLogin);

module.exports = router;