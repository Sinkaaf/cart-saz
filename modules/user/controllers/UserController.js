const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const User = require('../models/User');
const errorHandle = require('../../../controllers/errorHandele/errorCreate');
const {messages}= require('../../../lang/fa/index');
const {statusCodes}= require('../../../constant/statusCodes');
const { tokenMaker } = require("../../../utils/auth");

exports.create = async (req, res, next) => {
    let { phone } = req.body;
    let token;
    const validate = await User.userPhoneValidation(req.body);
    try {
        if (validate == true) {
            let user = await User.findOne({ where: { phone } });
            if (!user) {
                let verifyCodePhone = Math.floor(100000 + Math.random() * 900000);
                user = await User.create({
                    phone,
                    verifyCodePhone,
                })
                token = await tokenMaker(user.id);
            }
            // await registerSms(user);
            res.status(200).json({ message: 'user', user, token })
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

exports.verify = async (req, res, next) => {
    let { verifyCodePhone,phone } = req.body
    const validate = await User.userPhoneValidation(req.body);
    let confirm = true;
    try {
        if (validate == true) {
            let user = await User.findOne({ where: { phone }, attributes: { exclude: ["password"] } });
            if (!user) {
                errorHandle(messages.userDoesntExist, statusCodes.notFound);
            }
            if ((user.phone && user.verifyCodePhone == verifyCodePhone)) {
                await user.update({
                    phoneVerifiedAt: new Date()
                }
                );
                if ((!user.firstName) || (!user.lastName)) {
                    confirm = false;
                }
                token = await tokenMaker(user.id);
                let result = {
                    user,
                    confirm,
                    token
                }
                res.status(statusCodes.OK).json({ message: "verified user", result});
            } else {
                errorHandle(messages.wrongCode, statusCodes.forbidden);
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

exports.update = async (req, res, next) => {
    let userId = req.userId
    let {
        firstName,
        lastName
    } = req.body;
    const validate = await User.userUpdateValidation(req.body);
    try {
        if (validate == true) {
            let user = await User.findOne({
                where: { id: userId }, attributes: { exclude: ["password"] } 
            });
            if (!user) {
                errorHandle(messages.userDoesntExist, statusCodes.notFound);
            }
            await user.update({
                firstName,
                lastName,
            });
            res.status(statusCodes.OK).json({ message: messages.userUpdated, user });
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

exports.userInfo = async (req, res, next) => {
    let userId = req.userId;
    try {
        let user = await User.findOne({ where: { id: userId } , attributes: { exclude: ["password"] } });
        if (!user) {
            errorHandle(messages.userDoesntExist, statusCodes.notFound);
        }
            res.status(200).json({ message: messages.userInfo, user })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }

}