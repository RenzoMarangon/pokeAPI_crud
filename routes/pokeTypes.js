const { Router } = require('express');
const { check } = require('express-validator');

const { validateErrors, 
        validateJWT, 
        isAdmin, 
        isRole,
    } = require('../middlewares/index');

const { pokemonTypesGet,
        pokemonTypesPost,
        pokeTypesPut,
        pokeTypesDelete,
    } = require('../controllers');


const { 
    validatePokeType,
    existPokeType,
    existPokeTypeID
    } = require('../helpers/db-validators');
const router = Router();

router.get('/', [
],pokemonTypesGet)

router.post('/', [
    validateJWT,
    isAdmin,
    isRole('ADMIN_ROLE'),
    check('name').custom( existPokeType ),
    check('name', 'El nombre no puede estar vacio').not().isEmpty(),
    validateErrors
],pokemonTypesPost)

router.put('/:id', [
    validateJWT,
    isAdmin,
    isRole('ADMIN_ROLE'),
    check('id').custom( existPokeTypeID ),
    check('name').custom( existPokeType ),
    check('id', 'No es un id de mongo válido').isMongoId(),
    validateErrors
],pokeTypesPut)

router.delete('/:id', [
    validateJWT,
    isAdmin,
    isRole('ADMIN_ROLE'),
    check('id').custom( existPokeTypeID ),
    check('id', 'No es un id de mongo válido').isMongoId(),
    validateErrors
],pokeTypesDelete)


module.exports = router;