const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')
const {verifyToken} = require('../middleware/authMiddleware')


router
.route('/login')
.get(authController.login);

router
.route('/pending-approval')
.get(verifyToken,adminController.getPendingStores);

router
.route('/approve/:storeId')
.put(verifyToken,adminController.approveStore);

router
.route('/gov')
.post(verifyToken,adminController.addGov)
.delete(verifyToken,adminController.removeGov);

router
.route('/districts')
.post(verifyToken,adminController.addDistrict);



module.exports = router;