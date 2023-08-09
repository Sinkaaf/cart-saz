const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/cartValidation");

class Cart extends Model {
    static cartValidation(body) {
        return v.validate(body, schema);
    }
}

Cart.init(
    {
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Cart;