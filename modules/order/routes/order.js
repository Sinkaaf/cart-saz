const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');

router.get('/orderList',isAuth,OrderController.orderList);
router.get('/order/:orderId',isAuth,OrderController.show);
router.post('/',isAuth,OrderController.create);
router.put('/order/:orderId',isAuth,OrderController.changeOrderStatus);
// router.delete('/',isAuth,isAdmin,CategoryController.delete);

module.exports = router;
