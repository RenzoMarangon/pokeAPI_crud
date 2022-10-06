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
        usersGet,
        userDelete,
        userPost,
        userPut } = require('../controllers/index');

const router = Router();

router.get('/',[
    validateJWT, 
    isAdmin,
    isRole('ADMIN_ROLE'),
    validateErrors
] , usersGet)

router.get('/:id',[
    validateJWT, 
    isAdmin,
    isRole('ADMIN_ROLE'),
    validateErrors
] , userGet)

router.post('/',[
    check('mail',"El email no es válido").isEmail(), //Express-validator => isEmail();
    check('name',"El nombre es obligatorio").not().isEmpty(),
    check('password',"La contraseña es obligatoria").not().isEmpty(),
    check('password',"La contraseña debe tener al menos 6 carácteres").isLength({min:6}),
    check('mail').custom( validateEmail ), 
    validateErrors
], userPost)

router.put('/:id',[
    validateJWT, 
    isAdmin,
    isRole('ADMIN_ROLE'),
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