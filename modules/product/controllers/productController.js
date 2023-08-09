const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Product = require('../models/Product');
const User = require('../../user/models/User');
const errorHandle = require('../../../controllers/errorHandele/errorCreate');
const { messages } = require('../../../lang/fa/index');
const { statusCodes } = require('../../../constant/statusCodes');


exports.show = async (req, res, next) => {
    const validate = await Product.productValidation(req.body);
    if(validate ==  true){
        try {
            let query;
            const products = await Product.findAll(query);
            res.status(statusCodes.OK).json({ message: messages.productsList, products })
            
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = statusCodes.internalServerError;
            }
            next(err)
        }
    }else{
        const errors = [];
        validate.forEach((err) => {
            errors.push(err.message);
        })
        errorHandle(errors, statusCodes.unprocessableContent);
    }

}

exports.create = async (req,res,next) =>{
    const userId = req.userId;
    const{title,price,code} = req.body;
    const validate = await Product.productValidation(req.body);
    if(validate == true){
        try {
            const user = User.findByPk(userId);
            if(!user){
                errorHandle(messages.userDoesntExist, statusCodes.notFound);
            }
            const product = await Product.create({
                title,
                price,
                code
            })
            res.status(statusCodes.created).json({ message: messages.createdSuccessfully, product })

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = statusCodes.internalServerError;
            }
            next(err)
        }
    }else{
        const errors = [];
        validate.forEach((err) => {
            errors.push(err.message);
        })
        errorHandle(errors, statusCodes.unprocessableContent);
    }

}

exports.update = async (req,res,next) =>{
    const userId = req.userId;
    const productId = req.params.productId
    const{title,price,code} = req.body;
    const validate = await Product.productUpdateValidation(req.body);
    if(validate == true){
        try {
            const user = User.findByPk(userId);
            if(!user){
                errorHandle(messages.userDoesntExist, statusCodes.notFound);
            }
            let product = await Product.findByPk(productId);
            if(!product){
                errorHandle(messages.productDoesntExist, statusCodes.notFound);
            }
            await product.update({
                title,
                price,
                code
            })
            res.status(statusCodes.OK).json({ message: messages.createdSuccessfully, product })

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = statusCodes.internalServerError;
            }
            next(err)
        }
    }else{
        const errors = [];
        validate.forEach((err) => {
            errors.push(err.message);
        })
        errorHandle(errors, statusCodes.unprocessableContent);
    }

}

exports.delete = async (req,res,next)=>{
    let userId = req.userId;
    let {productIds} = req.body;

    try {
        const user = User.findByPk(userId);
        if(!user){
            errorHandle(messages.userDoesntExist, statusCodes.notFound);
        }

        for(let i = 0; i < productIds.length; i++){
            let productId = productIds[i];
            let product = await Product.findByPk(productId);
            if(!product){
                errorHandle(messages.productDoesntExist, statusCodes.notFound);
            }
           await  product.destroy()
        }
    
      res.status(statusCodes.OK).json({message: messages.productsDeleted});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = statusCodes.internalServerError;
        }
        next(err)
    }
}

exports.showSingleProduct = async(req,res,next)=>{
    const productId = req.params.productId;
    const validate = await Product.productValidation(req.body);
    if(validate ==  true){
        try {
            const product = await Product.findByPk(productId)
            if(!product){
                errorHandle(messages.productDoesntExist, statusCodes.notFound);
            }
            res.status(statusCodes.OK).json({ message: messages.product, product })
            
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = statusCodes.internalServerError;
            }
            next(err)
        }
    }else{
        const errors = [];
        validate.forEach((err) => {
            errors.push(err.message);
        })
        errorHandle(errors, statusCodes.unprocessableContent);
    }
}