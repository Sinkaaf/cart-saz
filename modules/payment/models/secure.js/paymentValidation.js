const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v = new Validator();
const schema = {
    transactionId: {
        type: "string",
        trim: true,
        optional: false,
        max: 64,
        messages: {
            required: Message("required", "شناسه تراکنش"),
            stringMax: Message("max", "شناسه تراکنش", 64),
        },
    },
    price: {
        type: "number",
        trim: true,
        optional: false,
        required: Message("required", "مبلغ سفارش"),
        number: Message("required","مبلغ سفارش"),
    },
    isSuccessful: {
        optional: false,
        messages: {
            required: Message("required", "وضعیت سفارش"),
            boolean: "وضعیت نامعتبر",
        },
    }
};
module.exports = {
    schema,
    v,
};
