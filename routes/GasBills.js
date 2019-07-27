var { gasBills } = require("../Model/Rice.Model");
let express = require("express");
let router = express.Router();
var myDateString = Date();

var d = new Date();
m = d.getMonth(); //current month
y = d.getFullYear(); //current year
var start = new Date(y, m, 1 + 1);
var end = new Date(y, m + 1);

router.route("/").get(function(req, res) {
  dbQuery = { date: { $gte: start, $lt: end } };
  gasBills
    .find(dbQuery, function(err, bills) {
      if (err) {
        console.log(err);
      } else {
        res.json(bills);
      }
    })
    .sort({ _id: -1 });
});
router.route("/:id").get(function(req, res) {
  let id = req.params.id;
  gasBills.findById(id, function(err, bills) {
    res.json(bills);
  });
});
router.route("/add").post(function(req, res) {
  //console.log(req.body);
  let bills = new gasBills(req.body);
  console.log(bills);
  bills
    .save()
    .then(bills => {
      res.status(200).json({ bills: "bills added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new Bills failed");
    });
});
router.delete("/delete/:id", (req, res) => {
  var id = req.params.id;
  gasBills.deleteOne({ _id: id }, (err, result) => {
    if (err) return console.log(err);
    else return console.log("deleted Successfully");
  });
  res.send("deleted Successfully");
});
router.route("/update/:id").post(function(req, res) {
  gasBills.findById(req.params.id, function(err, bills) {
    if (!bills) {
      res.status(404).send("Bills Not Found");
    } else {
      bills.cost = req.body.cost;
      bills.date = req.body.date;
      bills.paid = req.body.paid;
      bills.description = req.body.description;
      bills
        .save()
        .then(bills => {
          res.json("Bills Updated");
        })
        .catch(err => {
          res.json("Update not possible");
        });
    }
  });
});

module.exports = router;
