const { Router } = require('express');
const { check } = require('express-validator');

const { validateErrors, 
        validateJWT, 
        isAdmin, 
        isRole,
        validateStats,
    } = require('../middlewares');

const { pokemonGet,
        pokemonDelete,
        pokemonPost,
        pokemonPut,
        pokemonFindOne,
    } = require('../controllers');

const { validatePokeName, 
        existPokemonID , 
        existNumberID, 
        validatePokeType,
        existPokeGeneration,
    } = require('../helpers/db-validators');

const router = Router();

router.get('/' , pokemonGet);

router.get('/:id' ,[
    check('id', 'No es un id de mongo válido').isMongoId(),
    validateErrors

], pokemonFindOne);



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
    check('evolution').custom( existPokemonID ),
    validateStats,
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
    check('evolution').custom( existPokemonID ),
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