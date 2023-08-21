const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v2 = new Validator();
const schema2 = {
    title: {
        type: "string",
        trim: true,
        optional: true,
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
    schema2,
    v2,
};
