const Validator = require("fastest-validator");
const Message = require("../../../../messages/messages");
const v = new Validator();
const schema = {
    price: {
        type: "number",
        trim: true,
        optional: false,
        required: Message("required", "قیمت محصول"),
        number: Message("required", "قیمت محصول"),
    },
    quantity: {
        type: "number",
        trim: true,
        optional: false,
        required: Message("required", "تعداد محصول"),
        number: Message("required", "تعداد محصول"),
    }
};
module.exports = {
    schema,
    v,
};
