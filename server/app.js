const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const productRoutes = require("./Routes/productsRoute");
const userRoutes = require("./Routes/userRoute");
const errMiddleware = require("./middleware/error");
const orderRoutes = require("./Routes/orderRoute");
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1", productRoutes);

app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

//adding middleware for errors
app.use(errMiddleware);
module.exports = app;
