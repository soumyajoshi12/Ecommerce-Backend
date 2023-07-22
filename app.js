const express = require("express");
const app = express();

app.use(express.json())

//route import

const product = require("./routes/productRoutes");

app.use("/",product)

module.exports = app;
