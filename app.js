const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

//route import

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")



app.use("/",product)
app.use("/",user)
app.use("/",order)

//middleware for error

module.exports = app;
