const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/userValidation");
const { v2, schema2 } = require("./secure/userPhoneValidation");


class User extends Model {
    static userValidation(body) {
        return v.validate(body, schema);
    }
    static userPhoneValidation(body) {
        return v2.validate(body, schema2);
    }
}

User.init(
    {
        fullName: {
            type: DataTypes.STRING(32),
        },
        phone: {
            type: DataTypes.STRING(15),
        },
        address: {
            type: DataTypes.TEXT,
        },
        postalCode: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT
        },
        verifyCodePhone: {
            type: DataTypes.INTEGER,
        },
        phoneVerifiedAt: {
            type: DataTypes.DATE,
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = User;