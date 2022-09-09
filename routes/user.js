const { Router } = require('express');
const { check } = require('express-validator');

const { validateErrors, 
        validateJWT, 
        isAdmin, 
        isRole} = require('../middlewares/index');

const { validateRole, 
        validateEmail, 
        existUserID } = require('../helpers/db-validators');

const { userGet,
        userDelete,
        userPost,
        userPut } = require('../controllers/index');

const router = Router();

router.get('/' , userGet)

router.post('/',[
    check('mail',"El email no es válido").isEmail(), //Express-validator => isEmail();
    check('name',"El nombre es obligatorio").not().isEmpty(),
    check('password',"La contraseña es obligatoria").not().isEmpty(),
    check('password',"La contraseña debe tener al menos 6 carácteres").isLength({min:6}),
    check('mail').custom( validateEmail ), 
    check('role').custom( validateRole ),
    validateErrors
], userPost)

router.put('/:id',[
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existUserID ),
    validateErrors
 ], userPut)

router.delete('/:id',[
    validateJWT, 
    isAdmin,
    isRole('ADMIN_ROLE'),
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existUserID ),
    validateErrors
 ], userDelete)

module.exports = router;