const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure.js/paymentValidation");


class Payment extends Model {
    static userValidation(body) {
        return v.validate(body, schema);
    }
}

Payment.init(
    {
        transactionId: {
            type: DataTypes.STRING(64),
        },
        price: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        isSuccessful: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Payment;