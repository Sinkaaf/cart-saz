const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const isAuth = require('../../../middlewares/is-auth');

router.post('/loginRegister',UserController.create);
router.post('/verify',UserController.verify);
router.get('/userInfo',isAuth,UserController.userInfo);

module.exports = router;
