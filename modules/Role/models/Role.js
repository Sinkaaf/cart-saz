const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/roleValidation");


class Role extends Model {
    static roleValidation(body) {
        return v.validate(body, schema);
    }
}

Role.init(
    {
        title: {
            type: DataTypes.STRING(32),
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Role;