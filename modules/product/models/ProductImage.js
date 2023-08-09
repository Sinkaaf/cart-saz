const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
// const { v, schema } = require("./secure/userValidation");
// const { v2, schema2 } = require("./secure/userPhoneValidation");


class ProductImage extends Model {
    // static userValidation(body) {
    //     return v.validate(body, schema);
    // }
    // static userPhoneValidation(body) {
    //     return v2.validate(body, schema2);
    // }
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