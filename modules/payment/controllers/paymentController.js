const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require("../../../constant/statusCodes");
const errorHandle = require('../../../controllers/errorHandele/errorCreate');
const { pay, verify } = require("../../../utils/zarinpal");
const Payment = require("../models/Payment");

exports.create = async (req, res, next) => {
    try {
        let { orderId } = req.body;
        const userId = req.userId;
        // let callback = `http://192.168.1.61:8080/register/payBack/${businessId}`
        let callback = `https://localhost/payback`;
        let price = 9999;
        let payment = await pay(price, callback, "خرید محصول");        
        if (payment && payment.status === 100) {
            let transactionId = payment.authority;
            let online_payment = await Payment.create({
                price,
                transactionId,
                UserId : userId,
                OrderId :orderId,
                // isSuccessful : true
            });
           
            return res.status(statusCodes.OK).json({ message: messages.shopping, payment });
        } else {
            errorHandle(messages.accessDenied, statusCodes.notFound);
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err);
    }
};
exports.payback = async (req, res, next) => {
    let { businessId, authority } = req.body;
    try {
        let payment = await Payment.findOne({
            where: {
                transactionId: authority
            },
        });

        if (payment) {
            let payment_verify = await verify(authority, payment.price);

            await payment.update({
                isSuccessful: payment_verify.status === 100 ? 1 : 0
            })

            let message = payment.isSuccessful ? messages.successfullPayment : messages.unsuccessfullPayment

            return res.status(statusCodes.OK).json({ message });
        } else {
            errorHandle(messages.accessDenied, statusCodes.notFound);
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err);
    }
};



