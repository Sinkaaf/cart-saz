const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../../cart/models/Cart');
const User = require('../../user/models/User');
const Product = require('../../product/models/Product');
const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require("../../../constant/statusCodes");
const errorHandle = require('../../../controllers/errorHandele/errorCreate');


exports.orderList = async (req, res, next) => {
    try {
        const userId = req.userId;
        const orders = await Order.findAll({ where: { UserId: userId }, include: { model: OrderItem } });
        res.status(statusCodes.OK).json({ message: messages.orders, orders })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}

exports.create = async (req, res, next) => {
    try {
        const { shippingId } = req.body;
        const userId = req.userId;
        const validate = await Order.orderValidation(req.body);
        if (validate == true) {
            const carts = await Cart.findAll({ where: { UserId: userId }, include: { model: Product } });
            if (!carts) {
                errorHandle(messages.cartDoesntExist, statusCodes.notFound);
            }

            let total = 0;
            const result = await sequelize.transaction(async (t) => {
                let order = await Order.create({
                    UserId: userId,
                    ShippingId: shippingId,
                    status: "awaiting_Payment",
                    total: 0
                }, { transaction: t });

                for (const cart of carts) {
                    const product = cart.dataValues.Product;
                    if (cart.quantity > product.count) {
                        errorHandle(messages.insufficientInventory, statusCodes.badRequest)
                    }
                    await order.createOrderItem({
                        quantity: cart.quantity,
                        price: product.price,
                        ProductId: product.id,
                        OrderId: order.id
                    }, { transaction: t })

                    total = (product.price) * cart.quantity + total;
                }
                await order.update({
                    total
                }, { transaction: t })
            });
            res.status(statusCodes.OK).json({ message: messages.createdSuccessfully })

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

exports.show = async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        const order = await Order.findOne({ where: { id: orderId }, include: { model: OrderItem } });
        res.status(statusCodes.OK).json({ message: messages.order, order })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}

exports.changeOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;
        const validate = await Order.orderValidation(req.body);
        if (validate == true) {
            const order = await Order.findOne({ where: { id: orderId } });
            await order.update({
                status
            })
            res.status(statusCodes.OK).json({ message: messages.updatedSuccessfully, order })
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