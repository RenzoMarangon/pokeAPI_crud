const { Router } = require('express');
const { check } = require('express-validator');
const { uploadImage, 
        updateImage, 
        getImage, 
        updateImageCloudinary, 
        uploadImageCloudinary 
} = require('../controllers');

const { validateErrors, 
        validateFileToUpload, 
        validateJWT,
        isRole,
        isAdmin
 } = require('../middlewares')

const { collectionsAllowed } = require('../helpers/db-validators');

const router = Router();

router.post('/',validateFileToUpload, uploadImageCloudinary );

router.put('/:collection/:id',[
    validateJWT,
    validateFileToUpload,
    check('id', 'El ID debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, [ 'users','pokemons' ])),
    validateErrors
], updateImageCloudinary)

router.get('/:collection/:id',[
    validateJWT,
    isAdmin,
    isRole('ADMIN_ROLE'),
    check('id', 'El ID debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, [ 'users','pokemons' ])),
    validateErrors
], getImage)

router.get('/download',[],(req, res) => {
    res.download(__dirname+'/../public/poke-api.postman_collection.json');
})


module.exports = router;