const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v2 = new Validator();
const schema2 = {
    title: {
        type: "string",
        trim: true,
        optional: true,
        min: 4,
        max: 64,
        messages: {
            stringMax: Message("max", "نام محصول", 64),
            stringMin: Message("min", "نام محصول", 4),
        },
    },
    price: {
        type: "string",
        trim: true,
        optional: true,
        number: Message("required","مبلغ محصول"),
        pattern: /^\d+$/,
        messages: {
            stringPattern: Message("pattern", "مبلغ محصول"),
        },
    },
    code: {
        type: "string",
        trim: true,
        optional: true,
        min: 1,
        pattern: /^\d+$/,
        messages: {
            stringMin: Message("min", "کد محصول", 1),
            stringPattern: Message("pattern", "مبلغ محصول"),
        },
    },
    count: {
        type: "string",
        trim: true,
        optional: true,
        pattern: /^\d+$/,
        messages: {
            stringPattern: Message("pattern", "مبلغ محصول"),
        },
    }
};
module.exports = {
    schema2,
    v2,
};
