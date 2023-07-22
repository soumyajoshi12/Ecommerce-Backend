const mongoose = require("mongoose");

exports.dataBaseConnection = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Data Base connected ");
  } catch (error) {
    console.log(error);
  }
};
