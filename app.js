const express = require("express");
const app = express();

app.use(express.json())

//route import

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");



app.use("/",product)
app.use("/",user)

//middleware for error

module.exports = app;
