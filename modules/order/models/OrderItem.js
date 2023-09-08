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
        },
        total: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.price * this.quantity ;
            },
            set(value) {
                throw new Error('Do not try to set the `total` value!');
            }
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = OrderItem;