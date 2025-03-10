const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const sellerController = require('../controllers/sellerController')
const {verifyToken} = require('../middleware/authMiddleware')



router
.route('/register')
.post(sellerController.register);

router
.route('/login')
.get(authController.login);


router
.route('/product')
.post(verifyToken,sellerController.addProduct);


module.exports = router;