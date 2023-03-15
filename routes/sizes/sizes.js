const { Router } = require('express');
const { getSizes } = require('../../controllers/sizesController.js');
const { getSizes2 } = require('../../controllers/sizesController2.js');

const router = Router();

router.get('/sizes1', getSizes);
router.get('/sizes2', getSizes2);

module.exports = router;