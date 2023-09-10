const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Order = require('../../order/models/Order');
const OrderItem = require('../../order/models/OrderItem');
const Product = require('../../product/models/Product');
const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require("../../../constant/statusCodes");
const errorHandle = require('../../../controllers/errorHandele/errorCreate');

exports.orderList = async (req, res, next) => {
    try {
        const status = req.query.status;
        let query = {};
        if (status) {
            query = { where:{status},include:{model:OrderItem , include:{model:Product}}};
        }
        const orders = await Order.findAll(query);
        res.status(statusCodes.OK).json({ message: messages.orders, orders })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        } 
        next(err)
    }
}