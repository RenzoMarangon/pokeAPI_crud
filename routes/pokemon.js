const { Router } = require('express');

const { pokemonGet,
        pokemonDelete,
        pokemonPatch,
        pokemonPost,
        pokemonPut
    } = require('../controllers/index');

const router = Router();

router.get('/' , pokemonGet)
router.post('/' , pokemonPost)
router.put('/' , pokemonPut)
router.delete('/' , pokemonDelete)
router.patch('/' , pokemonPatch)

module.exports = router;