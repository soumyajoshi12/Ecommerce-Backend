const mongoose = require("mongoose");

exports.dataBaseConnection = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("Data Base connected ");
  } catch (error) {
    console.log(error.message);
  }
};
