const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const fileUploader = require('../../../middlewares/uploadMiddleware');

router.get('/',CartController.index);
router.post('/',isAuth,isAdmin,CartController.create);
router.put('/:cartId',isAuth,isAdmin,CartController.update);
// router.delete('/',isAuth,isAdmin,CategoryController.delete);
// router.get('/category/:catId',CategoryController.show);

module.exports = router;
