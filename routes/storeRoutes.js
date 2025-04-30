const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const storeController = require('../controllers/storeController')
const {verifyToken} = require('../middleware/authMiddleware')



router
.route('/register')
.post(storeController.register);

router
.route('/login')
.get(authController.login);


router
.route('/branch')
.post(verifyToken,storeController.addBranch);





module.exports = router;