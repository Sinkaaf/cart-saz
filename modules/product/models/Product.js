const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../../../config/database");
const {v, schema} = require("./secure/productValidation");
const {v2, schema2} = require("./secure/productUpdateValidation");


class Product extends Model {
    static productValidation(body) {
        return v.validate(body, schema);
    }
    static productUpdateValidation(body) {
        return v2.validate(body, schema2);
    }
}

Product.init(
    {
        title: {
            type: DataTypes.STRING(32),
        },
        price: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        code: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Product;