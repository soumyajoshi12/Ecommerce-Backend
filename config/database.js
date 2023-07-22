const mongoose = require("mongoose");

exports.dataBaseConnection = () => {
  try {
    mongoose.connect(
      "mongodb+srv://soumyaj2003:<password>@soumya.pibwzbu.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Data Base connected ");
  } catch (error) {
    console.log(error);
  }
};
