const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/shippingValidation");


class Shipping extends Model {
    static shippingValidation(body) {
        return v.validate(body, schema);
    }
}

Shipping.init(
    {
        fullName: {
            type: DataTypes.STRING(32),
        },
        address: {
            type: DataTypes.TEXT,
        },
        postalCode: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Shipping;