const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v = new Validator();
const schema = {
    title: {
        type: "string",
        trim: true,
        optional: false,
        min: 4,
        max: 64,
        messages: {
            required: Message("required", "نام محصول"),
            stringMax: Message("max", "نام محصول", 64),
            stringMin: Message("min", "نام محصول", 4),
        },
    },   
    description: {
        type: "string",
        trim: true,
        max: 255,
        optional: true,
        messages: {
            stringMax: Message("max", "طول توضیحات", 255),
        },
    },
    price: {
        type: "string",
        trim: true,
        optional: false,
        required: Message("required", "مبلغ محصول"),
        pattern: /^\d+$/,
        messages: {
            stringPattern: Message("pattern", "مبلغ محصول"),
        },
    },
    code: {
        type: "string",
        trim: true,
        optional: false,
        min: 1,
        pattern: /^\d+$/,
        messages: {
            required: Message("required", "کد محصول"),
            stringMin: Message("min", "کد محصول", 1),
            stringPattern: Message("pattern", "کد محصول"),
        },
    },
    count: {
        type: "string",
        trim: true,
        optional: false,
        pattern: /^\d+$/,
        messages: {
            required: Message("required", "تعداد محصول"),
            stringPattern: Message("pattern", "تعداد محصول"),
        },
    },
};
module.exports = {
    schema,
    v,
};
