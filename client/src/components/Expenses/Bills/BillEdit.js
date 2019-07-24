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
import Select from "@material-ui/core/Select";
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

class BillEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: "",
      type: "",
      date: "",
      description: "",
      paid: false,
      success: false,
      error: false,
      typeChange: false
    };
  }
  componentDidMount() {
    const { expenseType, editId } = this.props;
    console.log(expenseType);
    this.setState({ type: expenseType });
    if (expenseType === "ebill") {
      API.get("/electricitybills/" + editId)
        .then(response => {
          this.setState({
            cost: response.data.cost,
            date: response.data.date,
            description: response.data.description,
            paid: response.data.paid
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else if (expenseType === "gbill") {
      API.get("/gasbills/" + editId)
        .then(response => {
          this.setState({
            cost: response.data.cost,
            date: response.data.date,
            description: response.data.description,
            paid: response.data.paid
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else if (expenseType === "fuel") {
      API.get("/fuel/" + editId)
        .then(response => {
          this.setState({
            cost: response.data.cost,
            date: response.data.date,
            description: response.data.description,
            paid: response.data.paid
          });
        })

        .catch(function(error) {
          console.log(error);
        });
    } else if (expenseType === "motorRepair") {
      API.get("/motorRepair/" + editId)
        .then(response => {
          this.setState({
            cost: response.data.cost,
            date: response.data.date,
            description: response.data.description,
            paid: response.data.paid
          });
        })

        .catch(function(error) {
          console.log(error);
        });
    } else if (expenseType === "engineOil") {
      API.get("/engineOil/" + editId)
        .then(response => {
          this.setState({
            cost: response.data.cost,
            date: response.data.date,
            description: response.data.description,
            paid: response.data.paid
          });
        })

        .catch(function(error) {
          console.log(error);
        });
    } else if (expenseType === "repairParts") {
      API.get("/repairParts/" + editId)
        .then(response => {
          this.setState({
            cost: response.data.cost,
            date: response.data.date,
            description: response.data.description,
            paid: response.data.paid
          });
        })

        .catch(function(error) {
          console.log(error);
        });
    } else if (expenseType === "buildingMentainence") {
      API.get("/buildingMentainence/" + editId)
        .then(response => {
          this.setState({
            cost: response.data.cost,
            date: response.data.date,
            description: response.data.description,
            paid: response.data.paid
          });
        })

        .catch(function(error) {
          console.log(error);
        });
    } else if (expenseType === "machineryMentainence") {
      API.get("/machineryMentainence/" + editId)
        .then(response => {
          this.setState({
            cost: response.data.cost,
            date: response.data.date,
            description: response.data.description,
            paid: response.data.paid
          });
        })

        .catch(function(error) {
          console.log(error);
        });
    } else if (expenseType === "miscellaneousExpenses") {
      API.get("/miscellaneousExpenses/" + editId)
        .then(response => {
          this.setState({
            cost: response.data.cost,
            date: response.data.date,
            description: response.data.description,
            paid: response.data.paid
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  onChangeBillsCost = e => {
    this.setState({ cost: e.target.value });
  };
  onChangeBillsPaid = e => {
    this.setState({ paid: !this.state.paid });
  };
  onChangeBillsType = e => {
    this.setState({ typeChange: true });
  };
  onChangeBillsDescription = e => {
    this.setState({ description: e.target.value });
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
      newBill.type === "ebill" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/electricitybills/update/" + editId, newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    } else if (
      newBill.type === "gbill" &&
      newBill.cost !== "" &&
      newBill.description !== ""
    ) {
      API.post("/gasbills/update/" + editId, newBill).then(res => {
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
      API.post("/fuel/update/" + editId, newBill).then(res => {
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
      API.post("/motorRepair/update/" + editId, newBill).then(res => {
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
      API.post("/engineOil/update/" + editId, newBill).then(res => {
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
      API.post("/repairParts/update/" + editId, newBill).then(res => {
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
      API.post("/buildingMentainence/update/" + editId, newBill).then(res => {
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
      API.post("/machineryMentainence/update/" + editId, newBill).then(res => {
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
      API.post("/miscellaneousExpenses/update/" + editId, newBill).then(res => {
        this.props.history.push({
          pathname: "/Expenses",
          state: { check: "created" }
        });
      });
    }
    /*   this.setState({
      cost: "",
      type: "",
      date: "",
      description: "",
      paid: false
    }); */
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
          <Grid container spacing={3}>
            <Grid item xs={4} sm={4} md={4} lg={4} />
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.type}
                onChange={this.onChangeBillsType}
                className={classes.textField}
              >
                <MenuItem value="ebill">Electricity bill</MenuItem>
                <MenuItem value="gbill">Gas bill</MenuItem>
                <MenuItem value="fuel">Fuel</MenuItem>
                <MenuItem value="motorRepair">Motor Repair</MenuItem>
                <MenuItem value="engineOil">Engine Oil</MenuItem>
                <MenuItem value="repairParts">Repair Parts</MenuItem>
                <MenuItem value="buildingMentainence">
                  Building Mentainence
                </MenuItem>
                <MenuItem value="machineryMentainence">
                  Machinery Mentainence
                </MenuItem>
                <MenuItem value="miscellaneousExpenses">
                  Miscellaneous Expenses
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} />
            <Grid item xs={4} sm={4} md={4} lg={4} />
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <TextField
                id="standard-number"
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
            <Grid item xs={4} sm={4} md={4} lg={4} />
            <Grid item xs={4} sm={4} md={4} lg={4} />
            <Grid item xs={4} sm={4} md={4} lg={4}>
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
            <Grid item xs={4} sm={4} md={4} lg={4} />
            <Grid item xs={4} sm={4} md={4} lg={4} />
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Checkbox
                onChange={this.onChangeBillsPaid}
                value={this.state.paid}
                checked={this.state.paid}
                inputProps={{
                  "aria-label": "primary checkbox"
                }}
              />
              <label>Finalize payment</label>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} />
            <Grid item xs={4} sm={4} md={4} lg={4} />
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              style={{ textAlign: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Update Expense
              </Button>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} />
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
            message="Expense Updated Successfully!"
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
            message="You can't change Expense Type!"
          />
        </Snackbar>
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(BillEdit));
