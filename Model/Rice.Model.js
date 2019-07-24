const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ElectricityBills = new Schema({
  cost: {
    type: Number
  },
  description: {
    type: String
  },
  date: {
    type: String
  },

  paid: {
    type: Boolean
  }
});

var GasBills = new Schema({
  cost: {
    type: Number
  },
  description: {
    type: String
  },
  date: {
    type: String
  },
  paid: {
    type: Boolean
  }
});
var PetrolExpense = new Schema({
  cost: {
    type: Number
  },
  description: {
    type: String
  },
  date: {
    type: String
  },
  paid: {
    type: Boolean
  }
});
var MotorRepairExpense = new Schema({
  cost: {
    type: Number
  },
  description: {
    type: String
  },
  date: {
    type: String
  },
  paid: {
    type: Boolean
  }
});
var EngineOilExpense = new Schema({
  cost: {
    type: Number
  },
  description: {
    type: String
  },
  date: {
    type: String
  },
  paid: {
    type: Boolean
  }
});
var RepairPartsExpense = new Schema({
  cost: {
    type: Number
  },
  description: {
    type: String
  },
  date: {
    type: String
  },
  paid: {
    type: Boolean
  }
});
var BuildingMentainence = new Schema({
  cost: {
    type: Number
  },
  description: {
    type: String
  },
  date: {
    type: String
  },
  paid: {
    type: Boolean
  }
});
var machineryMentainence = new Schema({
  cost: {
    type: Number
  },
  description: {
    type: String
  },
  date: {
    type: String
  },
  paid: {
    type: Boolean
  }
});
var MiscellaneousExpenses = new Schema({
  cost: {
    type: Number
  },
  description: {
    type: String
  },
  date: {
    type: String
  },

  paid: {
    type: Boolean
  }
});
var Employees = new Schema({
  employees_name: {
    type: String
  },
  employees_type: {
    type: String
  },
  employees_date: {
    type: String
  },
  employees_idPhoto: {
    data: {
      type: Buffer
    },
    type: {
      type: String
    }
  },
  employees_salary: {
    type: Number
  },
  employees_phoneNo: {
    type: String
  },
  employees_reference: {
    ref_name: {
      type: String
    },
    ref_phoneNumber: {
      type: String
    }
  },
  employees_address: {
    type: String
  }
});

var MiscellaneousExpenses = mongoose.model(
  "MiscellaneousExpenses",
  MiscellaneousExpenses
);
var machineryMentainence = mongoose.model(
  "MachineryMentainence",
  machineryMentainence
);
var buildingMentainence = mongoose.model(
  "BuildingMentainence",
  BuildingMentainence
);
var repairPartsExpense = mongoose.model(
  "RepairPartsExpense",
  RepairPartsExpense
);
var engineOilExpense = mongoose.model("EngineOilExpense", EngineOilExpense);
var motorRepairExpense = mongoose.model("RepairExpense", MotorRepairExpense);
var petrolExpense = mongoose.model("PetrolExpense", PetrolExpense);
var employees = mongoose.model("employees", Employees);
var ebills = mongoose.model("Electricitybills", ElectricityBills);
var gbills = mongoose.model("Gasbills", GasBills);

module.exports = {
  Employees: employees,
  electricityBills: ebills,
  gasBills: gbills,
  petrolExpense: petrolExpense,
  motorRepairExpense: motorRepairExpense,
  engineOilExpense: engineOilExpense,
  repairPartsExpense: repairPartsExpense,
  BuildingMentainence: buildingMentainence,
  machineryMentainence: machineryMentainence,
  MiscellaneousExpenses: MiscellaneousExpenses
};
