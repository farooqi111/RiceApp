import React from "react";
import Dashboard from "./components/Dashboard";
import Expenses from "./components/Expenses/Expenses";
import ExpenseCreate from "./components/Expenses/ExpenseCreate";
import ExpenseDelete from "./components/Expenses/Bills/ExpenseDelete";
import ExpenseEdit from "./components/Expenses/ExpenseEdit";
import Employees from "./components/Employees/Employees";
import EmployeeDetails from "./components/Employees/EmployeeDetails";
import EmployeeCreate from "./components/Employees/EmployeeCreate";
import EmployeeDelete from "./components/Employees/EmployeeDelete";
import EmployeeEdit from "./components/Employees/EmployeeEdit";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Dashboard} />
      <Route path="/Expenses/" component={Expenses} />
      <Route path="/addExpense" component={ExpenseCreate} />
      <Route path="/Expenses/ExpenseDelete/:id" component={ExpenseDelete} />
      <Route path="/ExpenseEdit/:id" component={ExpenseEdit} />
      <Route path="/Employees/" component={Employees} />
      <Route path="/EmployeeDetails/:id" component={EmployeeDetails} />
      <Route path="/addEmployee" component={EmployeeCreate} />
      <Route path="/Employees/EmployeeDelete/:id" component={EmployeeDelete} />
      <Route path="/EmployeeEdit/:id" component={EmployeeEdit} />
    </Router>
  );
}
