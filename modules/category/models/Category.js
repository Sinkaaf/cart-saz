const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/categoryValidation");
const { v2, schema2 } = require("./secure/categoryUpdateValidation");

class Category extends Model {
    static categoryValidation(body) {
        return v.validate(body, schema);
    }
    static categoryUpdateValidation(body) {
        return v2.validate(body, schema2);
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