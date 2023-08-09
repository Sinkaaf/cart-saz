module.exports = (action, attribute, option) => {
    option = option || null;
    switch (action) {
        case "create":
            return `${attribute} با موفقیت ایجاد گردید`;
        case "update":
            return `${attribute} با موفقیت ویرایش گردید`;
        case "delete":
            return `${attribute} با موفقیت حذف گردید`;
        case "required":
            return `فیلد ${attribute} اجباری میباشد`;
        case "min":
            return `${attribute} نمی تواند کمتر از ${option} کاراکتر باشد`;
        case "max":
            return `${attribute} نمی تواند بیش از ${option} کاراکتر باشد`;
        case "pattern":
            return `${attribute} وارد شده صحیح نمی باشد`;
        case "unique":
            return `${attribute} وارد شده تکراری می باشد`;
        case "email":
            return `${attribute} وارد شده معتبر نمی باشد`;
        case "url":
            return `${attribute} وارد شده معتبر نمی باشد`;
        case "equal":
            return `${attribute} و ${option} یکسان نمی باشند`;
        case "enum":
            return `${attribute} معتبر نمی باشد`;
        case "number":
            return `${attribute} باید به صورت ارقام باشد`;
        case "numberPositive":
            return `${attribute}را صحیح وارد نمایید`;
        case "string":
            return `${attribute}را صحیح وارد نمایید`;
        case "negativeCount":
            return `ثبت فاکتور به دلیل کمبود موجودی کالا ${attribute} - ${option} امکانپذیر نیست `;
    }
};
