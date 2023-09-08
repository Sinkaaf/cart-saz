const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/paymentController');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');

router.post('/',isAuth,PaymentController.create);
router.post('/verify',isAuth,PaymentController.payback);

module.exports = router;
