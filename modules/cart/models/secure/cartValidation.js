const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v = new Validator();
const schema = {
isActive: {
    optional: false,
    messages: {
        required: Message("required", "وضعیت سبد خرید"),
        boolean: "وضعیت نامعتبر",
    },
}
};
module.exports = {
    schema,
    v,
};
