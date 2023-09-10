const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const isAuth = require('../../../middlewares/is-auth');
const isAdmin = require('../../../middlewares/is-admin');
const { multer, fileFilter, fileStorage } = require("../../../middlewares/uploadMiddleware");
const upload = multer({ storage: fileStorage , fileFilter: fileFilter})

router.get('/',CategoryController.categoryList);
router.post('/',isAuth,isAdmin,upload.single('file'),CategoryController.create);
router.put('/:catId',isAuth,isAdmin,upload.single('file'),CategoryController.update);
router.delete('/',isAuth,isAdmin,CategoryController.delete);
// router.get('/category/:catId',CategoryController.show);

module.exports = router;
