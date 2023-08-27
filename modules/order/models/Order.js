const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/orderValidation");

class Order extends Model {
    static orderValidation(body) {
        return v.validate(body, schema);
    }
}

Order.init(
    {
        status: {
            // درانتظار پرداخت - در حال انجام - در انتظار بررسی - تکمیل شده - لغو شده - مسترد شده - ناموفق
            type: DataTypes.ENUM('awaiting_Payment','doing','awaiting_review','done','canceled','returned','unsuccessfull'),
            defaultValue: 'awaiting_review',
        },
        total: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Order;