const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const User = require('../models/User');
const VerifyCode = require('../models/VerifyCode');
const Role = require('../../role/models/Role');
const errorHandle = require('../../../controllers/errorHandele/errorCreate');
const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require('../../../constant/statusCodes');
const { tokenMaker } = require("../../../utils/auth");


exports.create = async (req, res, next) => {
    try {
        let { phone } = req.body;
        let token,newCode;
        const validate = await User.userValidation(req.body);
        if (validate == true) {
            let code = Math.floor(100000 + Math.random() * 900000);
            let user = await User.findOne({ where: { phone } });
            if (!user) {
                user = await User.create({
                    phone,
                    RoleId:2
                });
                newCode = await VerifyCode.create({
                    code,
                    userId: user.id
                })
            } else {
                newCode = await VerifyCode.findOne({ where: { userId: user.id } });
                if ( await this.isExpired(newCode.dataValues.updatedAt) == 1) {
                       newCode = await newCode.update({code})
                }
            }
            //sms code 
            token = await tokenMaker(user.id);
            result = {user,token,code :newCode.code}
            // await registerSms(user);
            res.status(200).json({ message: 'user', result })
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
    try {
        let { verifyCodePhone, phone } = req.body
        const validate = await User.userValidation(req.body);
        let confirm = true;
        if (validate == true) {
            let user = await User.findOne({ where: { phone }, attributes: { exclude: ["password"] } });
            if (!user) {
                errorHandle(messages.userDoesntExist, statusCodes.notFound);
            }
                let verify_code = await VerifyCode.findOne({where:{userId:user.id}});
                if (!verify_code) {
                    errorHandle(messages.codeDoesntExist, statusCodes.notFound);
                }
                if(await this.isExpired(verify_code.dataValues.updatedAt)){
                    errorHandle(messages.codeExpired, statusCodes.forbidden);
                }
                if(verify_code.code == verifyCodePhone){
                    await user.update({isVerified : true})
                }else{
                    errorHandle(messages.wrongCode, statusCodes.forbidden);
                }
                if (!user.fullName) {
                    confirm = false;
                }
                token = await tokenMaker(user.id);
                let result = {
                    user,
                    confirm,
                    token
                }
                res.status(statusCodes.OK).json({ message: "verified user", result });
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

// exports.update = async (req, res, next) => {
//     let userId = req.userId;
//     let {
//         fullName,
//         address,
//         postalCode,
//         description
//     } = req.body;
//     const validate = await User.userUpdateValidation(req.body);
//     try {
//         if (validate == true) {
//             let user = await User.findOne({
//                 where: { id: userId }, attributes: { exclude: ["password"] }
//             });
//             if (!user) {
//                 errorHandle(messages.userDoesntExist, statusCodes.notFound);
//             }
//             await user.update({
//                 fullName,
//                 address,
//                 postalCode,
//                 description
//             });
//             res.status(statusCodes.OK).json({ message: messages.userUpdated, user });
//         } else {
//             const errors = [];
//             validate.forEach((err) => {
//                 errors.push(err.message)
//             })
//             errorHandle(errors, statusCodes.unprocessableContent);
//         }
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = statusCodes.internalServerError;
//         }
//         next(err)
//     }
// }

exports.userInfo = async (req, res, next) => {
    try {
        let userId = req.userId;
        let user = await User.findOne({ where: { id: userId }, attributes: { exclude: ["password"] } });
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

exports.allUsers = async (req, res, next) => {
    try {
        let query;
        let users = await User.findAll(query);
        if (!users) {
            errorHandle(messages.userDoesntExist, statusCodes.notFound);
        }
        res.status(200).json({ message: messages.userList, users })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }

}

exports.isExpired = async (date) => {
    //difference minutes between two dates to check isValid verifyCode
    let diff = Math.abs(date - new Date());
    let status = 0;
    let minutes = Math.floor((diff / 1000) / 60);
    if (minutes >= 2) {
        status = 1;
    }
    return status;
}