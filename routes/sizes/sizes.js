const { Router } = require('express');
const { getSizes } = require('../../controllers/sizesController');

const router = Router();

router.get('/', getSizes);

module.exports = router;