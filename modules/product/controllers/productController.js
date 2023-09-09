const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Product = require('../models/Product');
const User = require('../../user/models/User');
const errorHandle = require('../../../controllers/errorHandele/errorCreate');
const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require('../../../constant/statusCodes');
const Product_Category = require("../models/Product_Category");
// const Product_Image = require('../models/ProductImage');
const Category = require("../../category/models/Category");
const ProductImage = require("../models/ProductImage");
const { clearFile } = require("../../../middlewares/uploadMiddleware");


exports.productList = async (req, res, next) => {
    const { cat_id } = req.query;
    // if(validate ==  true){
    let query = {};
    try {
        if (cat_id) {
            query = { include: { model: Product_Category, where: { CategoryId: cat_id } } };
        }
        // query.where = {id:12}
        // console.log(query);

        // console.log(query.where);
        // return
        // query.where = queryValue;
        // const products = await Product.findAll(query);
        const products = await Product.findAll(query);
        res.status(statusCodes.OK).json({ message: messages.productsList, products })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
    // }else{
    //     const errors = [];
    //     validate.forEach((err) => {
    //         errors.push(err.message);
    //     })
    //     errorHandle(errors, statusCodes.unprocessableContent);
    // }

}

exports.show = async (req, res, next) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findOne({
            where: { id: productId },
            include: [{
                model: Category,
            }, {
                model: ProductImage
            }]
        })
        if (!product) {
            errorHandle(messages.productDoesntExist, statusCodes.notFound);
        }
        res.status(statusCodes.OK).json({ message: messages.product, product })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}

exports.create = async (req, res, next) => {
    try {
        let { title, price, code, count, CategoryId } = req.body;
        CategoryId = CategoryId.replace(/'/g, '"');
        CategoryId = JSON.parse(CategoryId);
        const files = req.files;
        const validate = await Product.productValidation(req.body);
        if (validate == true) {
            //check productCode not exist
            const product_code = await Product.findOne({ where: { code } });
            if (product_code) {
                errorHandle(messages.productCodeExist, statusCodes.conflict);
            }
            const result = await sequelize.transaction(async (t) => {
                const product = await Product.create({
                    title,
                    price,
                    code,
                    count,
                    is_vitrin: false
                }, { transaction: t });
                await product.addCategory(CategoryId, { transaction: t });
                for (const file of files) {
                    const filePath = `images/product/${file.filename}`;
                    await ProductImage.create({
                        url: filePath,
                        ProductId: product.id
                    }, { transaction: t })
                }
                res.status(statusCodes.created).json({ message: messages.createdSuccessfully, product })
            });

        } else {
            const errors = [];
            validate.forEach((err) => {
                errors.push(err.message);
            })
            errorHandle(errors, statusCodes.unprocessableContent);
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }

}

exports.update = async (req, res, next) => {
    try {
        const productId = req.params.productId
        let { title, price, code, count, CategoryId, deletedImages } = req.body;
        if (CategoryId) {
            CategoryId = CategoryId.replace(/'/g, '"');
            CategoryId = JSON.parse(CategoryId);
        }
        const validate = await Product.productUpdateValidation(req.body);
        if (validate == true) {
            const newFiles = req.files;
            const product = await Product.findOne({
                where: { id: productId },
                include: [{
                    model: Category,
                }, {
                    model: ProductImage
                }]
            })

            if (!product) {
                errorHandle(messages.productDoesntExist, statusCodes.notFound);
            }
            if(code){
                const product_code = await Product.findOne({ where: { code } });
                if (product_code && product_code.dataValues.id != productId) {
                    errorHandle(messages.productCodeExist, statusCodes.conflict);
                }
            }
            const result = await sequelize.transaction(async (t) => {
                await product.update({
                    title,
                    price,
                    code,
                    count
                }, { transaction: t })
                await product.removeCategories(product.dataValues.Categories, { transaction: t });
                await product.addCategory(CategoryId, { transaction: t });
                if (deletedImages) {
                    deletedImages = deletedImages.replace(/'/g, '"');
                    deletedImages = JSON.parse(deletedImages);
                    for (const deletedImage of deletedImages) {
                        const d_product = await ProductImage.findOne({ where: { id: deletedImage } }, { transaction: t })
                        if (!d_product) {
                            errorHandle(messages.fileDoesntExist, statusCodes.notFound);
                        }
                        clearFile(d_product.url);
                        await d_product.destroy();
                    }
                }

                // deletedImages.map(async (deletedImage) => {
                //     const d_product = await ProductImage.findOne({ where: { id: deletedImage } })
                //     if (!d_product) {
                //         errorHandle(messages.fileDoesntExist, statusCodes.notFound);
                //     }
                //     clearFile(d_product.url);
                //     d_product.destroy();

                // }, { transaction: t })
                await newFiles.map(async (newFile) => {
                    const filePath = `images/product/${newFile.filename}`;
                    await ProductImage.create({
                        url: filePath,
                        ProductId: product.id
                    },)
                }, { transaction: t })
                res.status(statusCodes.OK).json({ message: messages.createdSuccessfully, product })
            });

        } else {
            const errors = [];
            validate.forEach((err) => {
                errors.push(err.message);
            })
            errorHandle(errors, statusCodes.unprocessableContent);
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }

}

exports.delete = async (req, res, next) => {
    try {
        let { productIds } = req.body;

        for (let i = 0; i < productIds.length; i++) {
            let productId = productIds[i];
            let product = await Product.findByPk(productId);
            if (!product) {
                errorHandle(messages.productDoesntExist, statusCodes.notFound);
            }
            await product.destroy()
        }

        res.status(statusCodes.OK).json({ message: messages.productsDeleted });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}
