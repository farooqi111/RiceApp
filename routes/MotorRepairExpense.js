var { motorRepairExpense } = require("../Model/Rice.Model");
let express = require("express");
let router = express.Router();
var myDateString = Date();

router.route("/").get(function(req, res) {
  motorRepairExpense
    .find(function(err, exp) {
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
  motorRepairExpense.findById(id, function(err, exp) {
    res.json(exp);
  });
});
router.route("/add").post(function(req, res) {
  //console.log(req.body);
  let exp = new motorRepairExpense(req.body);
  console.log(exp);
  exp
    .save()
    .then(exp => {
      res.status(200).json({ exp: "repair expense added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new repair Expense failed");
    });
});
router.delete("/delete/:id", (req, res) => {
  var id = req.params.id;
  motorRepairExpense.deleteOne({ _id: id }, (err, result) => {
    if (err) return console.log(err);
    else return console.log("deleted Successfully");
  });
  res.send("deleted Successfully");
});
router.route("/update/:id").post(function(req, res) {
  motorRepairExpense.findById(req.params.id, function(err, exp) {
    if (!exp) {
      res.status(404).send("repair Expense Not Found");
    } else {
      exp.cost = req.body.cost;
      exp.description = req.body.description;
      exp.date = req.body.date;
      exp.paid = req.body.paid;
      exp
        .save()
        .then(exp => {
          res.json("Repair expense Updated");
        })
        .catch(err => {
          res.json("Update not possible");
        });
    }
  });
});

module.exports = router;
