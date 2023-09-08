const ZarinpalCheckout = require("zarinpal-checkout");
const zarinpal = ZarinpalCheckout.create(
    "61546368-6dc1-11e9-9f93-000c29344814",
    false
);
exports.pay = async (amount, callback, description) => {
    let response = "";
    await zarinpal
        .PaymentRequest({
            Amount: amount, // In Tomans
            CallbackURL: callback,
            Description: description,
        })
        .then((res) => {
            if (res.status === 100) {
                console.log(res.authority);
                console.log(res.url);
            }
            response = res;
        })
        .catch((err) => {
            console.log(err)
            console.error(err);
        });
    console.log(response)
    return response;
};
exports.verify = async (authority, amount) => {
    let response = "";
    await zarinpal
        .PaymentVerification({
            Amount: amount, // In Tomans
            Authority: authority,
        })
        .then((res) => {
            response = res;
            // if (res.status !== 100) {
            //     console.log("Empty!");
            // } else {
            //     console.log(res.RefID);
            // }
        })
        .catch((err) => {
            console.error(err);
        });
    return response;
};