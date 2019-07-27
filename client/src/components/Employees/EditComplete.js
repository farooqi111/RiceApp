import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import purple from "@material-ui/core/colors/purple";
import MySnackbarContentWrapper from "../SnackBar";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import API from "../Api/API";

const accent = purple["A700"];
var display;
const styles = {
  root: {
    flexGrow: 1
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: 250
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    backgroundColor: accent,
    color: "white"
  },
  input: {
    display: "none"
  }
};
const options = [
  {
    value: "Manager",
    label: "Manager"
  },
  {
    value: "Accountant",
    label: "Accountant"
  },
  {
    value: "FourMan",
    label: "Four man"
  },
  {
    value: "Cook",
    label: "Cook"
  },
  {
    value: "Mechanic",
    label: "Mechanic"
  },
  {
    value: "Driver",
    label: "Driver"
  },
  {
    value: "Watchman",
    label: "Watchman"
  },
  {
    value: "Labour",
    label: "General Labour"
  }
];
class EditComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      address: "",
      phoneNo: "",
      ref_name: "",
      ref_phoneNo: "",
      salary: 0,
      paid: false,
      success: false,
      error: false,
      typeChange: false,
      file: null,
      fileCheck: false
    };
  }
  componentDidMount() {
    const { editId } = this.props;

    API.get("/employees/" + editId)
      .then(response => {
        this.setState({
          type: response.data.employees_type,
          name: response.data.employees_name,
          salary: response.data.employees_salary,
          address: response.data.employees_address,
          phoneNo: response.data.employees_phoneNo,
          ref_name: response.data.employees_reference.ref_name,
          ref_phoneNo: response.data.employees_reference.ref_phoneNumber
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  changeType = e => {
    this.setState({ typeChange: true });
  };
  onChangeName = event => {
    this.setState({ name: event.target.value });
  };
  onChangePhoneNo = event => {
    this.setState({ phoneNo: event.target.value });
  };
  onChangeSalary = event => {
    this.setState({ salary: event.target.value });
  };
  onChangeRefName = event => {
    this.setState({ ref_name: event.target.value });
  };
  onChangeRefPhoneNo = event => {
    this.setState({ ref_phoneNo: event.target.value });
  };
  onChangeAddress = event => {
    this.setState({ address: event.target.value });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ success: false });
    this.setState({ error: false });
    this.setState({ typeChange: false });
  };
  onSubmit = e => {
    e.preventDefault();
    const { editId } = this.props;
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    const updateEmployee = {
      employees_name: this.state.name,
      employees_type: this.state.type,
      employees_address: this.state.address,
      employees_date: date,
      employees_salary: this.state.salary,
      employees_phoneNo: this.state.phoneNo,
      employees_reference: {
        ref_name: this.state.ref_name,
        ref_phoneNumber: this.state.ref_phoneNo
      }
    };
    if (
      updateEmployee.employees_name === "" ||
      updateEmployee.employees_type === "" ||
      updateEmployee.employees_address === "" ||
      updateEmployee.employees_phoneNo === "" ||
      updateEmployee.employees_salary === "" ||
      updateEmployee.employees_reference.ref_name === "" ||
      updateEmployee.employees_reference.ref_phoneNumber === ""
    ) {
      this.setState({
        error: true
      });
    } else {
      this.setState({ success: true });

      let img = new FormData();
      img.append("file", this.state.file);
      console.log(updateEmployee);
      API.post("/employees/update/" + editId, updateEmployee).then(res => {
        if (this.state.fileCheck) {
          API.post("/employees/updateImg/" + editId, img).then(res => {
            this.props.history.push({
              pathname: "/Employees",
              state: { check: "created" }
            });
          });
        } else {
          console.log(res);
          this.props.history.push({
            pathname: "/Employees",
            state: { check: "created" }
          });
        }
      });
    }
    display = null;
  };
  onChangeFile = event => {
    this.setState({ file: event.target.files[0] });
    display = URL.createObjectURL(event.target.files[0]);
    this.setState({ fileCheck: true });
  };
  resetFile = e => {
    e.preventDefault();
    this.setState({ file: null });
    display = null;
  };
  render() {
    const { classes } = this.props;
    MySnackbarContentWrapper.propTypes = {
      className: PropTypes.string,
      message: PropTypes.node,
      onClose: PropTypes.func,
      variant: PropTypes.oneOf(["success", "error"]).isRequired
    };
    console.log(this.state.address);
    return (
      <div className={classes.root}>
        <form className={classes.container} onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                id="my-input"
                // required
                select
                label="Role"
                className={classes.textField}
                style={{ width: "30%" }}
                value={this.state.type}
                onChange={this.changeType}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please select Role"
                margin="normal"
              >
                {options.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                id="my-amount"
                label="Employee Name"
                //    required
                style={{ width: "30%" }}
                value={this.state.name}
                onChange={this.onChangeName}
                type="text"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={5} md={5} lg={5}>
              <TextField
                label="Salary"
                //   required
                value={this.state.salary}
                onChange={this.onChangeSalary}
                type="number"
                className={classes.textField}
                style={{ width: "74%" }}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={5} md={5} lg={5}>
              <TextField
                label="Phone Number"
                //    required
                value={this.state.phoneNo}
                onChange={this.onChangePhoneNo}
                style={{ width: "74%" }}
                type="text"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={5} md={5} lg={5}>
              <TextField
                label="Reference Name"
                //   required
                value={this.state.ref_name}
                onChange={this.onChangeRefName}
                style={{ width: "74%" }}
                type="text"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={5} md={5} lg={5}>
              <TextField
                label="Reference Phone Number"
                //  required
                value={this.state.ref_phoneNo}
                onChange={this.onChangeRefPhoneNo}
                style={{ width: "74%" }}
                type="text"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                label="Address"
                //  required
                value={this.state.address}
                onChange={this.onChangeAddress}
                style={{ width: "74%" }}
                type="text"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {!this.state.file && (
                <input type="file" onChange={this.onChangeFile} />
              )}
              {this.state.file && (
                <div style={{ textAlign: "center" }}>
                  <button onClick={this.resetFile}>Remove File</button>
                </div>
              )}
              <img style={{ width: "75px" }} src={display} alt="" />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ textAlign: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Update Employee
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
            width: "100%"
          }}
          open={this.state.success}
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Employee Updated Successfully!"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          TransitionComponent={this.state.Transition}
          open={this.state.error}
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="error"
            className={classes.margin}
            message="Fill the Form!"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          TransitionComponent={this.state.Transition}
          open={this.state.typeChange}
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="error"
            className={classes.margin}
            message="You can't change Role!"
          />
        </Snackbar>
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(EditComplete));
