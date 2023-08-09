const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../../../config/database");

class ErrorLog extends Model {}

ErrorLog.init({
    message: {
        type: DataTypes.TEXT
    },
    is_resolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    request: {
        type: DataTypes.TEXT
    },
    route: {
        type: DataTypes.STRING(32)
    },
    version: {
        type: DataTypes.TINYINT,
        defaultValue:2
    }
}, {
    sequelize,
    modelName: 'ErrorLog',
    tableName: 'errorlogs',
    timestamps: true,
    paranoid: true,
});
module.exports = ErrorLog;