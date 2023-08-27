const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
// const { v, schema } = require("./secure/roleValidation");


class Role extends Model {
    // static roleValidation(body) {
    //     return v.validate(body, schema);
    // }
}

Role.init(
    {
        fa_title: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        en_title: {
            type: DataTypes.STRING(32),
            allowNull: false
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = Role;