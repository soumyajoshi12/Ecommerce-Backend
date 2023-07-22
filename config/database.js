const mongoose = require("mongoose");

exports.dataBaseConnection = () => {
  try {
    mongoose.connect(
      "mongodb+srv://soumyaj2003:soumyaj2003@soumya.pibwzbu.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("Data Base connected ");
  } catch (error) {
    console.log(error);
  }
};
