const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
router.get('/orderList',isAuth,isAdmin,AdminController.orderList);


module.exports = router;
