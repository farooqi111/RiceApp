import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import purple from "@material-ui/core/colors/purple";
import MySnackbarContentWrapper from "../../SnackBar";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import API from "../../Api/API";

const accent = purple["A700"];
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
    value: "eBill",
    label: "Electricity Bill"
  },
  {
    value: "gBill",
    label: "Gas Bill"
  },
  {
    value: "fuel",
    label: "Fuel"
  },
  {
    value: "motorRepair",
    label: "Motor Repair"
  },
  {
    value: "engineOil",
    label: "Engine Oil"
  },
  { value: "repairParts", label: "Repair Parts" },

  { value: "buildingMentainence", label: "Building Mentainence" },
  {
    value: "machineryMentainence",
    label: "Machinery Mentainence"
  },
  {
    value: "miscellaneousExpenses",
    label: "Miscellaneous Expenses"
  }
];

class BillsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: "",
      type: "",
      date: "",
      description: "",
      paid: false,
      success: false,
      error: false
    };
  }

  onChangeBillsCost = e => {
    this.setState({ cost: e.target.value });
  };
  onChangeBillsPaid = e => {
    this.setState({ paid: !this.state.paid });
    console.log(this.state.paid);
  };
  onChangeBillsType = e => {
    this.setState({ type: e.target.value });
  };
  onChangeBillsDescription = e => {
    this.setState({ description: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    const newBill = {
      cost: this.state.cost,
      type: this.state.type,
      paid: this.state.paid,
      date: date,
      description: this.state.description
    };
    if (
      newBill.cost === "" ||
      newBill.date === "" ||
      newBill.type === "" ||
      newBill.description === ""
    ) {
      this.setState({
        error: true
      });
    } else {
      this.setState({ success: true });
    }

    if (
      newBill.type === "eBill" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/electricitybills/add", newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    } else if (
      newBill.type === "gBill" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/gasbills/add", newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    } else if (
      newBill.type === "fuel" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/fuel/add", newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    } else if (
      newBill.type === "motorRepair" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/motorRepair/add", newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    } else if (
      newBill.type === "engineOil" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/engineOil/add", newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    } else if (
      newBill.type === "repairParts" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/repairParts/add", newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    } else if (
      newBill.type === "buildingMentainence" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/buildingMentainence/add", newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    } else if (
      newBill.type === "machineryMentainence" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/machineryMentainence/add", newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    } else if (
      newBill.type === "miscellaneousExpenses" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/miscellaneousExpenses/add", newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    }

    this.setState({
      cost: "",
      type: "",
      date: "",
      description: "",
      paid: false
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ success: false });
    this.setState({ error: false });
  };

  render() {
    const { classes } = this.props;
    MySnackbarContentWrapper.propTypes = {
      className: PropTypes.string,
      message: PropTypes.node,
      onClose: PropTypes.func,
      variant: PropTypes.oneOf(["success", "error"]).isRequired
    };
    return (
      <div className={classes.root}>
        <form
          className={classes.container}
          onSubmit={this.onSubmit}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={3} style={{ textAlign: "center" }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="my-input"
                required
                select
                label="Bill Type"
                className={classes.textField}
                value={this.state.type}
                onChange={this.onChangeBillsType}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please select your Bill Type"
                margin="normal"
              >
                {options.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="my-amount"
                label="Amount"
                required
                value={this.state.cost}
                onChange={this.onChangeBillsCost}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                required
                value={this.state.description}
                onChange={this.onChangeBillsDescription}
                id="standard-required"
                label="Required"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Checkbox
                onChange={this.onChangeBillsPaid}
                value={this.state.paid}
                inputProps={{
                  "aria-label": "primary checkbox"
                }}
              />
              <label>Finalize payment</label>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Add Bill
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
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Bill Added Successfully!"
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
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="error"
            className={classes.margin}
            message="Fill the Form!"
          />
        </Snackbar>
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(BillsCreate));
