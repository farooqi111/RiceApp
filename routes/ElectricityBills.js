var { electricityBills } = require("../Model/Rice.Model");

let express = require("express");
let router = express.Router();

router.route("/").get(function(req, res) {
  electricityBills
    .find()
    .then(items => res.json(items))
    .sort({ _id: -1 });
});
router.route("/:id").get(function(req, res) {
  let id = req.params.id;
  electricityBills.findById(id, function(err, bills) {
    res.json(bills);
  });
});
router.route("/add").post(function(req, res) {
  let bills = new electricityBills(req.body);
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
  electricityBills.deleteOne({ _id: id }, (err, result) => {
    if (err) return console.log(err);
    else return console.log("deleted Successfully");
  });
  res.send("deleted Successfully");
});
router.route("/update/:id").post(function(req, res) {
  electricityBills.findById(req.params.id, function(err, bills) {
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
