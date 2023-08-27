const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/shippingValidation");
const { v2, schema2 } = require("./secure/shippingUpdateValidation");


class Shipping extends Model {
    static shippingValidation(body) {
        return v.validate(body, schema);
    }
    static shippingUpdateValidation(body) {
        return v2.validate(body, schema2);
    }
}

Shipping.init(
    {
        fullName: {
            type: DataTypes.STRING(64),
        },
        address: {
            type: DataTypes.TEXT,
        },
        postalCode: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT
        },
        is_main: {
            type: DataTypes.BOOLEAN,
            defaultValue : false
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Shipping;