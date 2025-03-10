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
.get(authController.login);


router
.route('/address')
.post(verifyToken,customerController.addAddress)
.delete(verifyToken,customerController.deleteAddress)

router
.route('/search')
.get(customerController.searchProducts)

router
.route('/category/:categoryName')
.get(customerController.getCategory)

module.exports = router;