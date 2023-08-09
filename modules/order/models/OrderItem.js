const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/orderItemValidation");


class OrderItem extends Model {
    static orderItemValidation(body) {
        return v.validate(body, schema);
    }
}

OrderItem.init(
    {
        price: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        quantity: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = OrderItem;