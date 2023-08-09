const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
// const { v, schema } = require("./secure/userValidation");
// const { v2, schema2 } = require("./secure/userPhoneValidation");


class Product_Category extends Model {
    // static userValidation(body) {
    //     return v.validate(body, schema);
    // }
    // static userPhoneValidation(body) {
    //     return v2.validate(body, schema2);
    // }
}

Product_Category.init(
    {
        
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Product_Category;