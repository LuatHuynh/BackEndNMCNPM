const express = require('express');
const router = express.Router();
const DefaultController = require('../Controllers/Default.c')

router.use('/', DefaultController.index);

module.exports = router;