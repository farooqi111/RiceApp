var { petrolExpense } = require("../Model/Rice.Model");
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
  petrolExpense
    .find(dbQuery, function(err, exp) {
      if (err) {
        console.log(err);
      } else {
        res.json(exp);
      }
    })
    .sort({ _id: -1 });
});
router.route("/:id").get(function(req, res) {
  let id = req.params.id;
  petrolExpense.findById(id, function(err, exp) {
    res.json(exp);
  });
});
router.route("/add").post(function(req, res) {
  //console.log(req.body);
  let exp = new petrolExpense(req.body);
  console.log(exp);
  exp
    .save()
    .then(bills => {
      res.status(200).json({ exp: "petrol expense added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new petrol Expense failed");
    });
});
router.delete("/delete/:id", (req, res) => {
  var id = req.params.id;
  petrolExpense.deleteOne({ _id: id }, (err, result) => {
    if (err) return console.log(err);
    else return console.log("deleted Successfully");
  });
  res.send("deleted Successfully");
});
router.route("/update/:id").post(function(req, res) {
  petrolExpense.findById(req.params.id, function(err, exp) {
    if (!exp) {
      res.status(404).send("petrol Expens Not Found");
    } else {
      exp.cost = req.body.cost;
      exp.description = req.body.description;
      exp.date = req.body.date;
      exp.paid = req.body.paid;
      exp
        .save()
        .then(exp => {
          res.json("Petrol expense Updated");
        })
        .catch(err => {
          res.json("Update not possible");
        });
    }
  });
});

module.exports = router;
