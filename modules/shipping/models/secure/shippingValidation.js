const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v = new Validator();
const schema = {
    fullName: {
        type: "string",
        trim: true,
        optional: false,
        min: 4,
        max: 64,
        messages: {
            required: Message("required", "نام و نام خانوادگی"),
            stringMax: Message("max", "نام و نام خانوادگی", 64),
            stringMin: Message("min", "نام و نام خانوادگی", 4),
        },
    },
    address: {
        type: "text",
        trim: true,
        optional: false,
        min: 4,
        max: 64,
        messages: {
            required: Message("required", "نام و نام خانوادگی"),
            stringMax: Message("max", "نام و نام خانوادگی", 64),
            stringMin: Message("min", "نام و نام خانوادگی", 4),
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
            stringMax: Message("max","کد پستی", 10),
        },
    },
    description: {
        type: "string",
        trim: true,
        max: 255,
        optional: true,
        messages: {
            stringMax: Message("max","طول پیام", 255),
        },
    },
};
module.exports = {
    schema,
    v,
};
