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
        const orders = await Order.findAll({ where: { UserId: userId }, include: { model: OrderItem , include:{model:Product}} });
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
            const carts = await Cart.findAll({ where: { UserId: userId } , include:{model:Product}});
            if (carts === undefined || carts.length == 0) {
                errorHandle(messages.cartDoesntExist, statusCodes.notFound);
            }
            const result = await sequelize.transaction(async (t) => {
                let order = await Order.create({
                    UserId: userId,
                    ShippingId: shippingId,
                }, { transaction: t });

                for (const cart of carts) {
                    const product = cart.dataValues.Product;
                    if (cart.quantity > product.count) {
                        errorHandle(messages.insufficientInventory, statusCodes.badRequest)
                    }
                    const orderItem = await order.createOrderItem({
                        quantity: cart.quantity,
                        price: product.price,
                        ProductId: product.id,
                        OrderId: order.id
                    }, { transaction: t })

                    await product.update({
                        count: product.count - cart.quantity,
                    }, { transaction: t });
                    await Cart.destroy({ where: { UserId: userId } }, { transaction: t })
                }
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
        let total = 0;
        for (const orderItem of order.dataValues.OrderItems) {
            total = orderItem.total + total;
        }
        res.status(statusCodes.OK).json({ message: messages.order, order, total })
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