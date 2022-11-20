const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/Product.c')

router.post('/Inventory', ProductController.currentInventory);

router.post('/importGoods', ProductController.importGoods);

router.post('/importHistory', ProductController.importHistory);

router.post('/insert', ProductController.insertFood);

router.get('/current', ProductController.CurrentProduct);

router.use('/', ProductController.index);

module.exports = router;