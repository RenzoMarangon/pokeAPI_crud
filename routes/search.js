const { Router } = require('express');
const { search } = require('../controllers/search')

const router = Router();


router.get('/:collection/:element', search );
router.get('/:collection', search );


module.exports = router;