const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const User = require('../../user/models/User')
const errorHandle = require('../../../controllers/errorHandele/errorCreate');
const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require('../../../constant/statusCodes');
const Shipping = require("../models/Shipping");

exports.shippingList = async (req, res, next) => {
    try {
        const userId = req.userId;
        const shippings = await Shipping.findAll({ where: { UserId: userId } })
        res.status(200).json({ message: messages.shippingList, shippings })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}
exports.index = async (req, res, next) => {
    try {
        const shippingId = req.params.shippingId;
        const shipping = await Shipping.findOne({ where: { id: shippingId } });
        if (!shipping) {
            errorHandle(messages.shippingDoesntExist, statusCodes.notFound)
        }
        res.status(200).json({ message: messages.shippingInfo, shipping })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}
exports.create = async (req, res, next) => {
    try {
        let userId = req.userId;
        let {
            fullName,
            address,
            postalCode,
            description
        } = req.body;
        let is_main = false;
        const validate = await Shipping.shippingValidation(req.body);
        if (validate == true) {
            let user = await User.findOne({
                where: { id: userId }
            });
            if (!user) {
                errorHandle(messages.userDoesntExist, statusCodes.notFound);
            }
            const main_shipping = await Shipping.findOne({where:{UserId:userId}});
            if(!main_shipping){
                is_main = true;
            }
            const shipping = await Shipping.create({
                fullName,
                address,
                postalCode,
                description,
                UserId: userId,
                is_main
            });
            res.status(statusCodes.OK).json({ message: messages.shippingCreated, shipping });
        } else {
            const errors = [];
            validate.forEach((err) => {
                errors.push(err.message)
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
        let shippingId = req.params.shippingId;
        let {
            fullName,
            address,
            postalCode,
            description
        } = req.body;
        const validate = await Shipping.shippingUpdateValidation(req.body);
        if (validate == true) {
            let shipping = await Shipping.findOne({
                where: { id: shippingId }
            });
            if (!shipping) {
                errorHandle(messages.shippingDoesntExist, statusCodes.notFound);
            }
            await shipping.update({
                fullName,
                address,
                postalCode,
                description
            });
            res.status(statusCodes.OK).json({ message: messages.shippingUpdated, shipping });
        } else {
            const errors = [];
            validate.forEach((err) => {
                errors.push(err.message)
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
exports.changeShippingStatus = async (req, res, next) => {
    let userId = req.userId;
    try {
        const shippingId = req.params.shippingId;
        const shipping = await Shipping.findByPk(shippingId);
        if (!shipping) {
            errorHandle(messages.shippingDoesntExist, statusCodes.notFound);
        }
        const main_shipping = await Shipping.findOne({ where: { UserId: userId, is_main: true } });
        if (main_shipping) {
            if(main_shipping.dataValues.id != shippingId){
                await main_shipping.update({
                    is_main: false
                })
                await shipping.update({
                    is_main: true
                })
            }
        }else{
            console.log(222222);
            await shipping.update({
                is_main: true
            })
        }
        res.status(200).json({ message: messages.shippingUpdated })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}
exports.delete = async (req, res, next) => {
    try {
        let { shippingIds } = req.body;

        for (let i = 0; i < shippingIds.length; i++) {
            let shippingId = shippingIds[i];
            let shipping = await Shipping.findByPk(shippingId);
            if (!shipping) {
                errorHandle(messages.shippingDoesntExist, statusCodes.notFound);
            }
            await shipping.destroy()
        }

        res.status(statusCodes.OK).json({ message: messages.shippingsDeleted });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}