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
            required: Message("required", "نام کالا"),
            stringMax: Message("max", "نام کالا", 64),
            stringMin: Message("min", "نام کالا", 4),
        },
    },
    price: {
        type: "number",
        trim: true,
        optional: false,
        required: Message("required", "مبلغ کالا"),
        number: Message("required","مبلغ کالا"),
    },
    code: {
        type: "number",
        trim: true,
        optional: false,
        messages: {
            required: Message("required", "مبلغ کالا"),
            stringMin: Message("min", "کد کالا", 10),
            stringMax: Message("max","کد کالا", 10),
        },
    }
};
module.exports = {
    schema,
    v,
};
