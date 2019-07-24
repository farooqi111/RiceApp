var { repairPartsExpense } = require("../Model/Rice.Model");
let express = require("express");
let router = express.Router();
var myDateString = Date();

router.route("/").get(function(req, res) {
  repairPartsExpense.find(function(err, exp) {
    if (err) {
      console.log(err);
    } else {
      res.json(exp);
    }
  });
});
router.route("/:id").get(function(req, res) {
  let id = req.params.id;
  repairPartsExpense.findById(id, function(err, exp) {
    res.json(exp);
  });
});
router.route("/add").post(function(req, res) {
  //console.log(req.body);
  let exp = new repairPartsExpense(req.body);
  console.log(exp);
  exp
    .save()
    .then(exp => {
      res.status(200).json({ exp: "Repair Parts expense added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new Repair Parts Expense failed");
    });
});
router.delete("/delete/:id", (req, res) => {
  var id = req.params.id;
  repairPartsExpense.deleteOne({ _id: id }, (err, result) => {
    if (err) return console.log(err);
    else return console.log("deleted Successfully");
  });
  res.send("deleted Successfully");
});
router.route("/update/:id").post(function(req, res) {
  repairPartsExpense.findById(req.params.id, function(err, exp) {
    if (!exp) {
      res.status(404).send("Repair Parts Expense Not Found");
    } else {
      exp.cost = req.body.cost;
      exp.description = req.body.description;
      exp.date = req.body.date;
      exp.paid = req.body.paid;
      exp
        .save()
        .then(exp => {
          res.json("Repair Parts expense Updated");
        })
        .catch(err => {
          res.json("Update not possible");
        });
    }
  });
});

module.exports = router;
