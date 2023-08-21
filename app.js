const path = require('path');
const dotEnv = require("dotenv");

const express = require('express');
const sequelize = require("./config/database");
const relation = require("./models/relations");
const multer  = require('multer');
const app = express()
// const upload = multer();
// app.use(upload.array());
const headers = require("./config/setHeader");
const bodyParser = require('body-parser')
const cors = require('./config/setHeader');

//body-parser
app.use(express.json())

// Cross-Origin Resource Sharing for handle headers
app.use(headers);
// app.use(cors);

//routes
app.use("/users", require("./modules/user/routes/user"));
app.use("/products", require("./modules/product/routes/product"));
app.use("/categories", require("./modules/category/routes/category"));

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
