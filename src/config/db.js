const mongoose = require("mongoose");

const connectDatabase = () => {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDatabase;
