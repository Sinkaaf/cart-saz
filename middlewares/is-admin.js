// if(user.role != "admin"){
//     errorHandle(messages.forbidden, statusCodes.forbidden);
// }

const jwt = require('jsonwebtoken');
const errorHandle = require("../controllers/errorHandele/errorCreate");
const {Sequelize, Op} = require("sequelize");
const sequelize = require("../config/database");
const User = require("../modules/user/models/User");

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    let decodedToken;
    try {
        if (!authHeader) {
            errorHandle("کاربری با این اطلاعات وجود ندارد", "401");
        }
        const token = authHeader.split(' ')[1];
        if (!token || token == "null"){
            errorHandle("کاربری با این اطلاعات وجود ندارد", '401');
        }
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            errorHandle("کاربری با این اطلاعات وجود ندارد", '401');
        }
        let user = await User.findByPk(decodedToken.userId);
        if (!user){
            errorHandle('چنین کاربری وجود ندارد', '401');
        }
        if (user.role !== "admin"){
            errorHandle('شما اجازه دسترسی ندارید', '403');
        }
        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
};