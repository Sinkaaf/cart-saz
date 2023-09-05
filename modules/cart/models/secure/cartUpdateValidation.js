const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v2 = new Validator();
const schema2 = {
    quantity: {
        type: "number",
        trim: true,
        optional: true,
        number: Message("required", "تعداد محصول"),
    }
};
module.exports = {
    schema2,
    v2,
};
