const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const { v, schema } = require("./secure/userValidation");
// const { v2, schema2 } = require("./secure/userPhoneValidation");
// const { v3, schema3 } = require("./secure/userUpdateValidation");


class User extends Model {
    static userValidation(body) {
        return v.validate(body, schema);
    }
    // static userPhoneValidation(body) {
    //     return v2.validate(body, schema2);
    // }
    // static userUpdateValidation(body) {
    //     return v3.validate(body, schema3);
    // }
}

User.init(
    {
        phone: {
            type: DataTypes.STRING(15),
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue : false
        }
    },
    {
        sequelize,
        paranoid: true,
    }
);
module.exports = User;