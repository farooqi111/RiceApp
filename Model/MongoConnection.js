const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://farooqi:farooqi123@ds163510.mlab.com:63510/heroku_2hgcdhms",
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("mongo connected"))
  .catch(err => console.log(err));
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("Mongoose database connection is established successfully");
});
module.exports;
