var { Employees } = require("../Model/Rice.Model");
let express = require("express");
let multer = require("multer");
let router = express.Router();
let fs = require("fs");
var buff;
var type;
let employeeCreate = new Employees();
router.route("/").get(function(req, res) {
  //endpoint to get data from database
  Employees.find(function(err, Employees) {
    if (err) {
      console.log(err);
    } else {
      res.json(Employees);
    }
  }).sort({ _id: -1 });
});
router.route("/Names").get(function(req, res) {
  var query = Employees.find({}).select("employees_name");
  query.exec(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.route("/getImage/:id").get(function(req, res) {
  let id = req.params.id;
  Employees.findById(id, function(err, employee) {
    // console.log(employee);
    var img = employee.employees_idPhoto.data.toString("base64");

    res.send(img);
  });
});
router.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Employees.findById(id, function(err, employee) {
    res.send(employee);
  });

  // res.status(200).json({ employee: "Employee found" });
});
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = multer({ storage: storage });

router.route("/addImg").post(upload.single("file"), (req, res) => {
  let ch = fs.readFileSync(req.file.path);
  type = req.file.mimetype;
  buff = new Buffer.from(ch, "base64");

  employeeCreate.employees_idPhoto.data = buff;
  employeeCreate.employees_idPhoto.type = type;
  console.log(employeeCreate);
  employeeCreate
    .save()
    .then(employee => {
      res.status(200).json({ employee: "Employee added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new Employee failed");
    });
});
router.route("/updateImg/:id").post(upload.single("file"), (req, res) => {
  Employees.findById(req.params.id, function(err, employee) {
    let ch = fs.readFileSync(req.file.path);
    type = req.file.mimetype;
    buff = new Buffer.from(ch, "base64");

    employee.employees_idPhoto.data = buff;
    employee.employees_idPhoto.type = type;

    employee
      .save()
      .then(employee => {
        res.status(200).json({ employee: "Employee added successfully" });
      })
      .catch(err => {
        res.status(400).send("adding new Employee failed");
      });
  });
});
router.route("/addEmp").post(function(req, res) {
  employeeCreate = new Employees(req.body);
  console.log(req.body.fileCheck);
  if (!req.body.fileCheck) {
    employeeCreate.employees_date.toString();
    console.log(employeeCreate.employees_date.toString());
    employeeCreate
      .save()
      .then(employee => {
        res.status(200).json({ employee: "Employee added successfully" });
      })
      .catch(err => {
        res.status(400).send("adding new Employee failed");
      });
  }

  res.status(200).json({ employee: "Employee found" });
});

router.delete("/delete/:id", (req, res) => {
  var id = req.params.id;
  Employees.deleteOne({ _id: id }, (err, result) => {
    if (err) return console.log(err);
    else return console.log("deleted Successfully");
  });
  res.send("deleted Successfully");
});
router.route("/update/:id").post(function(req, res) {
  Employees.findById(req.params.id, function(err, employee) {
    if (!employee) {
      res.status(404).send("Employee Not Found");
    } else {
      //photo remaining
      employee.employees_name = req.body.employees_name;
      employee.employees_type = req.body.employees_type;
      employee.employees_date = req.body.employees_date;
      employee.employees_idPhoto = req.body.employees_idPhoto;
      employee.employees_salary = req.body.employees_salary;
      employee.employees_phoneNo = req.body.employees_phoneNo;
      employee.employees_address = req.body.employees_address;
      employee.employees_reference.ref_name =
        req.body.employees_reference.ref_name;
      employee.employees_reference.ref_phoneNumber =
        req.body.employees_reference.ref_phoneNumber;

      employee
        .save()
        .then(employee => {
          res.json("Employee Updated");
        })
        .catch(err => {
          res.json("Update not possible");
        });
    }
  });
});
module.exports = router;
