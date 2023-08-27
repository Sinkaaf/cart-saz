const express = require('express');
const router = express.Router();

const isAuth = require('../../../middlewares/is-auth');
const ShippingController = require('../controllers/ShippingController');

router.get('/:shippingId' ,isAuth,ShippingController.index)
router.get('/shippingList' ,isAuth,ShippingController.shippingList)
router.post('/' ,isAuth,ShippingController.create)
router.put('/:shippingId' ,isAuth,ShippingController.update)
router.put('/changeShippingStatus/:shippingId' ,isAuth,ShippingController.changeShippingStatus)
router.delete('/' ,isAuth,ShippingController.delete)

module.exports = router;
