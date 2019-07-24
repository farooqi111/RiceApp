const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/RiceDatabase", {
  useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("Mongoose database connection is established successfully");
});
module.exports;
