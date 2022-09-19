const { Router } = require('express');
const { check } = require('express-validator');

const { validateErrors, 
        validateJWT, 
        isAdmin, 
        isRole,
    } = require('../middlewares/index');

const { pokemonGet,
        pokemonDelete,
        pokemonPost,
        pokemonPut,
    } = require('../controllers/index');

const { validatePokeName, 
        existPokemonID , 
        existNumberID, 
        validatePokeType,
        existPokeGeneration,
    } = require('../helpers/db-validators');

const router = Router();

router.get('/' , pokemonGet);

router.post('/',[
    validateJWT,
    isAdmin,
    isRole('ADMIN_ROLE'),
    check('name',"El nombre es obligatorio").not().isEmpty(),
    check('name').custom( validatePokeName ),
    check('numberID').custom( existNumberID ),
    check('numberID',"El número de índice es obligatorio").not().isEmpty(),
    check('type').custom( validatePokeType ),
    check('type',"El tipo de pokemon es obligatorio.").not().isEmpty(),
    check('generation').custom( existPokeGeneration ),
    check('generation',"El número de generación es obligatorio.").not().isEmpty(),
    validateErrors
], pokemonPost)

router.put('/:id',[
    validateJWT,
    isAdmin,
    isRole('ADMIN_ROLE'),
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existPokemonID ),
    check('type').custom( validatePokeType ),
    check('numberID').custom( existNumberID ),
    check('generation').custom( existPokeGeneration ),
    check('name').custom( validatePokeName ),
    validateErrors
] , pokemonPut);

router.delete('/:id',[
    validateJWT,
    isAdmin,
    isRole('ADMIN_ROLE'),
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existPokemonID ),
    validateErrors
], pokemonDelete);


module.exports = router;