const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v = new Validator();
const schema = {
    url: {
        type: "string",
        trim: true,
        optional: false,
        min: 4,
        max: 255,
        messages: {
            required: Message("required", "آدرس تصویر"),
            stringMax: Message("max", "آدرس تصویر", 64),
            stringMin: Message("min", "آدرس تصویر", 4),
        },
    },
    is_main: {
        type: "boolean",
        trim: true,
        optional: false,
        messages: {
            required: Message("required", "وضعیت تصویر"),
            number: Message("required","وضعیت تصویر"),
        },
    },
};
module.exports = {
    schema,
    v,
};
