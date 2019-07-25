const express = require("express");
const mongoose = require("mongoose");
const history = require("connect-history-api-fallback");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
require("./Model/MongoConnection"); //Mongodb Connection
require("dotenv").config();
var httpProxy = require("http-proxy");
const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV === "production") {
  //set static folder

  app.use(history());
  app.use(bodyparser.urlencoded({ extended: true }));

  let employees = require("./routes/Employees");
  let eBills = require("./routes/ElectricityBills");
  let gBills = require("./routes/GasBills");
  let petrolExpense = require("./routes/PetrolExpense");
  let miscellaneousExpenses = require("./routes/MiscellaneousExpenses");

  let motorRepairExpense = require("./routes/MotorRepairExpense");
  let EngineOilExpense = require("./routes/EngineOilExpense");
  let RepairPartsExpense = require("./routes/RepairPartsExpense");
  let buildingMentainence = require("./routes/BuildingMentainence");
  let machinerymentainence = require("./routes/MachineryMentainence");
  app.use(cors());
  app.use(bodyparser.json());

  app.use("/employees", employees);
  app.use("/electricitybills", eBills);
  app.use("/gasbills", gBills);
  app.use("/fuel", petrolExpense);
  app.use("/motorRepair", motorRepairExpense);
  app.use("/engineOil", EngineOilExpense);
  app.use("/repaiRparts", RepairPartsExpense);
  app.use("/buildingMentainence", buildingMentainence);
  app.use("/machineryMentainence", machinerymentainence);
  app.use("/miscellaneousExpenses", miscellaneousExpenses);

  mongoose.connect(
    "mongodb://heroku_2hgcdhms:p7d84tdeeuqv3336mr298seuva@ds163510.mlab.com:63510/heroku_2hgcdhms",
    {
      useNewUrlParser: true
    }
  );
  const connection = mongoose.connection;
  connection.once("open", function() {
    console.log("Mongoose database connection is established successfully");
  });

  app.use(express.static("client/build"));
  /* app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
}); */
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"), function(
      err
    ) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}
httpProxy.createProxyServer({
  target: "https://farooqitraders.herokuapp.com/",
  toProxy: true,
  changeOrigin: true,
  xfwd: true
});
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
