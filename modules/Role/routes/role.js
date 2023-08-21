const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');

// router.post('/loginRegister',RoleController.create);

module.exports = router;
