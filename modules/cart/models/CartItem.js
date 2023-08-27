const {DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/cartItemValidation");


class CartItem extends Model {
    static cartItemValidation(body) {
        return v.validate(body, schema);
    }
}

CartItem.init(
    {
        quantity: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = CartItem;