const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');

router.post('/loginRegister',UserController.create);
router.post('/verify',UserController.verify);
router.put('/update',isAuth,UserController.update);
router.get('/userInfo',isAuth,UserController.userInfo);
router.get('/allUsers',isAuth,isAdmin,UserController.allUsers);

module.exports = router;
