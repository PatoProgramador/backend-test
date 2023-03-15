const { Router } = require('express');
const sizeRouter = require('./sizes/sizes.js');


const router = Router();

router.use('/', sizeRouter);


module.exports = router;