const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v = new Validator();
const schema = {
    title: {
        type: "string",
        trim: true,
        optional: false,
        min: 4,
        max: 32,
        messages: {
            required: Message("required", "نام نقش"),
            stringMax: Message("max", "نام نقش", 64),
            stringMin: Message("min", "نام نقش", 4),
        },
    },
};
module.exports = {
    schema,
    v,
};
