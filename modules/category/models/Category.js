const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/categoryValidation");

class Category extends Model {
    static categoryValidation(body) {
        return v.validate(body, schema);
    }
}

Category.init(
    {
        title: {
            type: DataTypes.STRING(32),
        },
        image: {
            type: DataTypes.STRING(255),
        },
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Category;