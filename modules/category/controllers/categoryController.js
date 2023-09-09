const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const {clearFile,editorImage} = require("../../../middlewares/uploadMiddleware");
const fs = require('fs');
const User = require('../../user/models/User');
const errorHandle = require('../../../controllers/errorHandele/errorCreate');
const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require('../../../constant/statusCodes');
const Category = require("../../category/models/Category");


exports.create = async (req, res, next) => {
    const { title } = req.body;
    const file = req.file;
    const validate = await Category.categoryValidation(req.body);
    try {
        if (validate == true) {
            const filePath = `images/category/${file.filename}`;
            const category = await Category.create({
                title,
                image: filePath
            });

            res.status(statusCodes.created).json({ message: messages.createdSuccessfully, category })
        } else {
            const errors = [];
            validate.forEach((err) => {
                errors.push(err.message);
            })
            errorHandle(errors, statusCodes.unprocessableContent);

        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}

exports.update = async (req, res, next) => {
    const { title } = req.body;
    const catId = req.params.catId
    // const file = req.files;
    const validate = await Category.categoryUpdateValidation(req.body);
    if (validate == true) {
        try {
            let category = await Category.findOne({ id: catId });
            if (!category) {
                errorHandle(messages.categoryDoesntExist, statusCodes.notFound);
            }
            category.update({
                title
            })
            res.status(statusCodes.OK).json({ message: messages.updatedSuccessfully, category })

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = statusCodes.internalServerError;
            }
            next(err)
        }
    } else {
        const errors = [];
        validate.forEach((err) => {
            errors.push(err.message);
        })
        errorHandle(errors, statusCodes.unprocessableContent);
    }
}

exports.categoryList = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            include: {
                model: Category,
                as: "Parent"
            }
        });
        res.status(statusCodes.OK).json({ message: messages.categoryList, categories })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }

}

exports.delete = async (req, res, next) => {
    let { catIds } = req.body;

    try {

        for (let i = 0; i < catIds.length; i++) {
            let catId = catIds[i];
            let category = await Category.findByPk(catId);
            if (!category) {
                errorHandle(messages.categoryDoesntExist, statusCodes.notFound);
            }
            await category.destroy()
        }

        res.status(statusCodes.OK).json({ message: messages.categoriesDeleted });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}
