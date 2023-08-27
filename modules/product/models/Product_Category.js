const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");


class Product_Category extends Model { }

Product_Category.init(
    {
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Product_Category;