const stringify = require('json-stringify-safe');
const {Sequelize,Op,QueryTypes } = require("sequelize");
const Errorlog = require("../../modules/errorLog/models/ErrorLog");

exports.get404 = (req,res)=> {
    res.status(404).json({message:"not found 404"});
}
exports.getErrors = async (error, req, res, next) => {
    console.log(error);
    let request = stringify(req);
    const status = error.statusCode || 500;
    const message = Array.isArray(error.message) ? stringify(error.message) : error.message

    await Errorlog.create({
        route:req.url,
        UserId:req.userId,
        BusinessId:req.businessId,
        message,
        request
    })
    res.status(status).json({ message: error.message});
}


