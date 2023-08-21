const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");


class verifyCode extends Model {}

verifyCode.init(
    {
        code: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = verifyCode;