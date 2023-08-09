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
            required: Message("required","نام دسته بندی"),
            stringMin: Message("min", "نام دسته بندی", 4),
            stringMax: Message("max", "نام دسته بندی", 32),
        },
    },
    image: {
        type: "string",
        trim: true,
        optional: true,
        messages: {
            string: Message("pattern", "آدرس تصویر"),
        },
    },
};
module.exports = {
    schema,
    v,
};
