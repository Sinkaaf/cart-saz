const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v = new Validator();
const schema = {
    phone: {
        type: "string",
        trim: true,
        optional: false,
        min: 10,
        max: 15,
        pattern: /(0|\+98)?([ ]|,|-|[()]){0,2}9[0|1|2|3|4|9]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/,
        messages: {
            stringMin: Message("min", "تلفن همراه", 10),
            stringMax: Message("max", "تلفن همراه", 15),
            stringPattern: Message("pattern", "تلفن همراه"),
        },
    },
};
module.exports = {
    schema,
    v,
};
