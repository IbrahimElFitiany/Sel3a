const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const customerController = require('../controllers/customerController')

const {verifyToken} = require('../middleware/authMiddleware')



router
.route('/register')
.post(customerController.register)

router
.route('/login')
.post(authController.login);


router
.route('/address')
.post(verifyToken,customerController.addAddress)
.delete(verifyToken,customerController.deleteAddress)

router
.route('/category/:categoryName')
.get(verifyToken,customerController.getCategory)

router
.route('/wishlist')
.get (verifyToken, customerController.getWishList)
.post(verifyToken ,customerController.addToWishList)
.delete(verifyToken ,customerController.removeFromWishList)



module.exports = router;