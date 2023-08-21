const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v3 = new Validator();
const schema3 = {
    fullName: {
        type: "string",
        trim: true,
        optional: true,
        min: 4,
        max: 64,
        messages: {
            required: Message("required", "نام و نام خانوادگی"),
            stringMax: Message("max", "نام و نام خانوادگی", 64),
            stringMin: Message("min", "نام و نام خانوادگی", 4),
        },
    },
    address: {
        type: "string",
        trim: true,
        optional: true,
        min: 4,
        max: 255,
        messages: {
            required: Message("required", "آدرس"),
            stringMax: Message("max", "آدرس", 255),
            stringMin: Message("min", "آدرس", 4),
        },
    },
    postalCode: {
        type: "string",
        trim: true,
        optional: true,
        min: 10,
        max: 10,
        messages: {
            stringMin: Message("min", "کد پستی", 10),
            stringMax: Message("max", "کد پستی", 10),
        },
    },
    description: {
        type: "string",
        trim: true,
        max: 255,
        optional: true,
        messages: {
            stringMax: Message("max", "طول توضیحات", 255),
        },
    }
};
module.exports = {
    schema3,
    v3,
};
