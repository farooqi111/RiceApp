const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://<dbuser>:<dbpassword>@ds163510.mlab.com:63510/heroku_2hgcdhms",
  {
    useNewUrlParser: true
  }
);
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("Mongoose database connection is established successfully");
});
module.exports;
