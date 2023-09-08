const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productController');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const { multer, fileFilter, fileStorage } = require("../../../middlewares/uploadMiddleware");
const upload = multer({ storage: fileStorage , fileFilter: fileFilter})

router.get('/',ProductController.productList);
router.post('/',isAuth,isAdmin,upload.array('files',10),ProductController.create);
router.put('/:productId',isAuth,isAdmin,ProductController.update);
router.delete('/',isAuth,isAdmin,ProductController.delete);
router.get('/product/:productId',ProductController.show);

module.exports = router;
