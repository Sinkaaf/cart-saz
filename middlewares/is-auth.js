const jwt = require('jsonwebtoken');
const {Sequelize, Op} = require("sequelize");
const sequelize = require("../config/database");
const User = require('../modules/user/models/User');
const {statusCodes} = require('../constant/statusCodes');
const errorHandle = require('../controllers/errorHandele/errorCreate');
module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    let decodedToken;
    try {
        if (!authHeader) {
            errorHandle("کاربری با این اطلاعات وجود ندارد", statusCodes.Unauthorized);
        }
        const token = authHeader.split(' ')[1];
        if (!token || token == "null"){
            errorHandle("کاربری با این اطلاعات وجود ندارد", statusCodes.Unauthorized);
        }
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            errorHandle("کاربری با این اطلاعات وجود ندارد", statusCodes.Unauthorized);
        }
        let user = await User.findByPk(decodedToken.userId);
        if (!user){
            errorHandle('چنین کاربری وجود ندارد', statusCodes.Unauthorized);
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
