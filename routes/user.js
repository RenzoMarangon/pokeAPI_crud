const { Router } = require('express');

const { userGet,
        userDelete,
        userPatch,
        userPost,
        userPut
    } = require('../controllers/index');

const router = Router();

router.get('/' , userGet)
router.post('/' , userPost)
router.put('/:id' , userPut)
router.delete('/:id' , userDelete)
router.patch('/:id' , userPatch)

module.exports = router;