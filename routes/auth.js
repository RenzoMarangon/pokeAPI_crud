const { Router } = require('express');
const { check } = require('express-validator');
const { validateErrors } = require('../middlewares/index');
const { validateEmail, validateRole } = require('../helpers/db-validators');
const { accountLogin, googleAuthPopUp } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('mail',"El email no es válido").isEmail(), //Express-validator => isEmail();
    check('password',"La contraseña es obligatoria").not().isEmpty(),
    validateErrors
], accountLogin);


router.post('/googleRegister',[
    check('mail',"El email no es válido").isEmail(), //Express-validator => isEmail();
    check('password',"La contraseña es obligatoria").not().isEmpty(),
    check('mail').custom( validateEmail ),
    check('password',"La contraseña debe tener al menos 6 carácteres").isLength({min:6}),
    validateErrors
], googleAuthPopUp);

module.exports = router;