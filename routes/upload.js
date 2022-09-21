const { Router } = require('express');
const { check } = require('express-validator');
const { uploadImage, updateImage, getImage, updateImageCloudinary, uploadImageCloudinary } = require('../controllers');
const { validateErrors, validateFileToUpload } = require('../middlewares')
const { collectionsAllowed } = require('../helpers/db-validators');

const router = Router();

router.post('/',validateFileToUpload, uploadImageCloudinary );

router.put('/:collection/:id',[
    validateFileToUpload,
    check('id', 'El ID debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, [ 'users','pokemons' ])),
    validateErrors
], updateImageCloudinary)

router.get('/:collection/:id',[
    check('id', 'El ID debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, [ 'users','pokemons' ])),
    validateErrors
], getImage)


module.exports = router;