const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Cart = require('../models/Cart');
const User = require('../../user/models/User');
const Product = require('../../product/models/Product');
const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require("../../../constant/statusCodes");

exports.create = async (req, res, next) => {
    try {
        const { quantity, products } = req.body;
        const userId = req.userId;
        const validate = await Cart.cartValidation(req.body);
        if (validate == true) {
            let cart = await Cart.findOne({ where: { UserId: userId, isActive: true } });
            if(cart && cart.isActive == false){
                cart.destroy({force:true})
            }
            if (!cart) {
                cart = await Cart.create({
                    UserId: userId,
                    isActive: true
                }, { transaction: t });
            }
            for (const product of products) {
                if (quantity > product.count) {
                    errorHandle(messages.InsufficientInventory, statusCodes.badRequest)
                }
                await Cart.createCartItem({
                    quantity,
                    ProductId: product.id
                })
            }
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

