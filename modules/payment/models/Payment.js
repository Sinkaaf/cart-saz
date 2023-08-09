const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
// const { v, schema } = require("./secure/userValidation");
// const { v2, schema2 } = require("./secure/userPhoneValidation");


class Payment extends Model {
    // static userValidation(body) {
    //     return v.validate(body, schema);
    // }
    // static userPhoneValidation(body) {
    //     return v2.validate(body, schema2);
    // }
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