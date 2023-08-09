const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/productImageValidation");


class ProductImage extends Model {
    static productImageValidation(body) {
        return v.validate(body, schema);
    }
}

ProductImage.init(
    {
        url: {
            type: DataTypes.STRING(255),
        },
        is_main: {
            type: DataTypes.BOOLEAN,
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = ProductImage;