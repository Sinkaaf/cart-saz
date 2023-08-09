const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v = new Validator();
const schema = {
    status: {
        type: "enum",
        values: ['awaiting_Payment','doing','awaiting_review','done','canceled','returned','unsuccessfull'],
        trim: true,
        optional: false,
        messages: {
            required: Message("required","وضعیت سفارش"),
            enum: Message("enum","وضعیت سفارش"),
        },
    }
};
module.exports = {
    schema,
    v,
};
