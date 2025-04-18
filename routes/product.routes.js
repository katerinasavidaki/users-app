const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/', productController.findAllProducts);
router.get('/:product', productController.findOneProduct);
router.post('/', productController.createProduct);
router.patch('/:id', productController.update);
router.delete('/:id', productController.deleteProductById);

module.exports = router;