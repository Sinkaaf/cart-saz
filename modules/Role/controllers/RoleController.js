const Role = require('../models/Role');
const sequelize = require("../../../config/database");


// exports.create = async (req, res, next) => {
//     const {title} = req.body;
//     const validate = await Role.roleValidation(req.body);
//     try {
//         if(validate == true){
//             const role = await Role.create({
//                 title
//             })
//             res.status(201).json({ message: 'role', user, role });
//         }else{
//             const errors = [];
//             validate.forEach((err) => {
//                 errors.push(err.message);
//             })
//             errorHandle(errors, statusCodes.unprocessableContent);
//         }
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = statusCodes.internalServerError;
//         }
//         next(err)
//     }
    
// }
