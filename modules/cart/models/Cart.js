const {DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/cartValidation");
const { v2, schema2 } = require("./secure/cartUpdateValidation");


class Cart extends Model {
    static cartValidation(body) {
        return v.validate(body, schema);
    }
    static cartUpdateValidation(body) {
        return v2.validate(body, schema2);
    }
}

Cart.init(
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
module.exports = Cart;