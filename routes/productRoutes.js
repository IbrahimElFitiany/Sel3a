const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');



router
.route('')
.post(verifyToken,productController.addProduct)
.get(verifyToken,productController.getAllProcucts);

router.route('/:productID')
.get(productController.getProductById)
.delete(verifyToken,productController.deleteProduct);


router.route('/stock')
.post(verifyToken,productController.addBranchStock);

module.exports = router;