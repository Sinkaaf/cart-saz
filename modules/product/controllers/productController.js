const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Product = require('../models/Product');
const User = require('../../user/models/User');
const errorHandle = require('../../../controllers/errorHandele/errorCreate');
const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require('../../../constant/statusCodes');
const Product_Category = require("../models/Product_Category");
const Category = require("../../category/models/Category");


exports.productList = async (req, res, next) => {
    const { cat_id } = req.query;
    // if(validate ==  true){
    let query;
    try {
        if (cat_id) {
            query = { include: { model: Product_Category, where: { CategoryId: cat_id } } };
        }
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
            const product = await Product.findOne({where:{id:productId},
            include:{
                model:Category
            }})
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

//todo : unique code for product???
exports.create = async (req, res, next) => {
    const { title, price, code, CategoryId } = req.body;
    const validate = await Product.productValidation(req.body);
    if (validate == true) {
        try {
            const result = await sequelize.transaction(async (t) => {
                const product = await Product.create({
                    title,
                    price,
                    code,
                }, { transaction: t });
                await product.addCategory(CategoryId, { transaction: t })
                res.status(statusCodes.created).json({ message: messages.createdSuccessfully, product })
            });

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = statusCodes.internalServerError;
            }
            next(err)
        }
    } else {
        const errors = [];
        validate.forEach((err) => {
            errors.push(err.message);
        })
        errorHandle(errors, statusCodes.unprocessableContent);
    }

}

exports.update = async (req, res, next) => {
    const productId = req.params.productId
    const { title, price, code, CategoryId } = req.body;
    const validate = await Product.productUpdateValidation(req.body);
    if (validate == true) {
        try {
            // await product.setCategories(cat_id );
            let product = await Product.findOne({ where: { id: productId },            
                include: {
                model: Category,
            }
        });
            if (!product) {
                errorHandle(messages.productDoesntExist, statusCodes.notFound);
            }
            const result = await sequelize.transaction(async (t) => {
                await product.update({
                    title,
                    price,
                    code
                }, { transaction: t })
                await product.removeCategories(product.Categories, { transaction: t });
                await product.addCategory(CategoryId, { transaction: t });

                res.status(statusCodes.OK).json({ message: messages.createdSuccessfully, product })
            });

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = statusCodes.internalServerError;
            }
            next(err)
        }
    } else {
        const errors = [];
        validate.forEach((err) => {
            errors.push(err.message);
        })
        errorHandle(errors, statusCodes.unprocessableContent);
    }

}

exports.delete = async (req, res, next) => {
    let { productIds } = req.body;

    try {

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
