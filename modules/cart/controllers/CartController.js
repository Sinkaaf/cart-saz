const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Cart = require('../models/Cart');
const User = require('../../user/models/User');
const Product = require('../../product/models/Product');
const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require("../../../constant/statusCodes");
const errorHandle = require('../../../controllers/errorHandele/errorCreate');


exports.index = async (req, res, next) => {
    try {
        const userId = req.userId;
        const cartItems = await Cart.findAll({ where: { UserId: userId } });
        res.status(statusCodes.OK).json({ message: messages.cartItems, cartItems })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}

exports.create = async (req, res, next) => {
    try {
        const { quantity, productId } = req.body;
        const userId = req.userId;
        const validate = await Cart.cartValidation(req.body);
        if (validate == true) {
            let product = await Product.findOne({ productId });
            if (!product) {
                errorHandle(messages.productDoesntExist, statusCodes.notFound);
            }
            if (quantity > product.count) {
                errorHandle(messages.insufficientInventory, statusCodes.badRequest)
            }
            const cart = await Cart.create({
                quantity,
                ProductId: productId,
                UserId: userId,
            });
            res.status(statusCodes.created).json({ message: messages.createdSuccessfully })

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
        const userId = req.userId;
        const cartId = req.params.cartId;
        const { quantity } = req.body;
        const validate = await Cart.cartUpdateValidation(req.body);
        if (validate == true) {
            let cart = await Cart.findOne({ where: { id: cartId } });
            if (!cart) {
                errorHandle(messages.cartDoesntExist, statusCodes.notFound);
            }
            if (cart.UserId != userId) {
                errorHandle(messages.forbidden, statusCodes.forbidden);
            }
            cart.update({
                quantity
            })
            res.status(statusCodes.OK).json({ message: messages.updatedSuccessfully })

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
    let { cartIds } = req.body;
    const userId = req.userId;
    try {

        for (let i = 0; i < cartIds.length; i++) {
            let cartId = cartIds[i];
            let cart = await Cart.findByPk(cartId);
            if (!cart) {
                errorHandle(messages.cartDoesntExist, statusCodes.notFound);
            }
            if (cart.UserId != userId) {
                errorHandle(messages.forbidden, statusCodes.forbidden);
            }
            await cart.destroy()
        }

        res.status(statusCodes.OK).json({ message: messages.productsDeleted });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}