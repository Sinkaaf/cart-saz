const path = require('path');
const dotEnv = require("dotenv");

const express = require('express');
const sequelize = require("./config/database");
const relation = require("./models/relations");
const { multer, fileFilter, fileStorage } = require("./middlewares/uploadMiddleware");
const app = express()
const headers = require("./config/setHeader");
const bodyParser = require('body-parser')
const cors = require('./config/setHeader');

//body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
//     { name: "files", maxCount: 5 },
//     { name: "file", maxCount: 1 },
//   ])
// );
app.use("/images", express.static(path.join(__dirname, "uploads", "images")));

// Cross-Origin Resource Sharing for handle headers
app.use(headers);
// app.use(cors);

//routes
app.use("/users", require("./modules/user/routes/user"));
app.use("/products", require("./modules/product/routes/product"));
app.use("/categories", require("./modules/category/routes/category"));
app.use("/shippings", require("./modules/shipping/routes/shipping"));
app.use("/carts", require("./modules/cart/routes/cart"));
app.use("/orders", require("./modules/order/routes/order"));
app.use("/payments", require("./modules/payment/routes/paymant"));
app.use("/admin", require("./modules//admin/routes/admin"));

// handle errors
app.use(require("./controllers/errorHandele/errorController").getErrors);
app.use(require("./controllers/errorHandele/errorController").get404);


const PORT = process.env.PORT || 8080;

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(PORT, () => {
      console.log(`server is running in port:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
