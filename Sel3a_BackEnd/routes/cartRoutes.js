const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware')
const cartController = require('../controllers/cartController');



router
.route('')
.post(verifyToken,cartController.addCartItem)
.get(verifyToken,cartController.getCartItems)

router
.route('/:carItemId')
.delete(verifyToken,cartController.deleteCartItem);

router
.route('/count')
.get(verifyToken,cartController.getCartCount);



module.exports = router;