const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const productRoutes = require("./Routes/productsRoute");
const userRoutes = require("./Routes/userRoute");
const errMiddleware = require("./middleware/error");
const orderRoutes = require("./Routes/orderRoute");
const app = express();
app.use(cookieParser());
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/api/v1", productRoutes);
console.log("this is app");
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

//adding middleware for errors
app.use(errMiddleware);
module.exports = app;
