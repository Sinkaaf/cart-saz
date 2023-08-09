const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v = new Validator();
const schema = {
    title: {
        type: "string",
        trim: true,
        optional: true,
        min: 4,
        max: 64,
        messages: {
            stringMax: Message("max", "نام کالا", 64),
            stringMin: Message("min", "نام کالا", 4),
        },
    },
    price: {
        type: "number",
        trim: true,
        optional: true,
        number: Message("required","مبلغ کالا"),
    },
    code: {
        type: "number",
        trim: true,
        optional: true,
        min: 1,
        messages: {
            stringMin: Message("min", "کد کالا", 1),
        },
    }
};
module.exports = {
    schema,
    v,
};
