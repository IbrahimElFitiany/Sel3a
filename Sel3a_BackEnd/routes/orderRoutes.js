const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');



router
.route('')
.post(verifyToken, orderController.placeOrder)

router
.route('/cancel/:orderId')
.patch(verifyToken, orderController.cancelOrder)


router
.route('/pick-up/:productid')
.post(verifyToken, orderController.placePickUpOrder)



module.exports = router;