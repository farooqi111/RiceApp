import React from "react";
import CustomAppbar from "../CustomAppbar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import API from "../Api/API";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../SnackBar";
import PropTypes from "prop-types";

var display;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,

    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  menu: {
    width: 100
  }
}));
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
export default function EmployeesCreate(props) {
  const classes = useStyles();
  let [type, setType] = React.useState("");
  let [salary, setSalary] = React.useState(0);
  let [name, setName] = React.useState("");
  let [phoneNo, setPhoneNo] = React.useState("");
  let [refName, setRefName] = React.useState("");
  let [refPhoneNo, setRefPhoneNo] = React.useState("");
  let [address, setAddress] = React.useState("");

  const [file, setFile] = React.useState(false);
  let [error, setError] = React.useState(false);
  let [success, setSuccess] = React.useState(false);

  let [fileCheck, setFileCheck] = React.useState(false);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  function changeType(event) {
    setType(event.target.value);
  }
  function onChangeName(event) {
    setName(event.target.value);
  }
  function onChangePhoneNo(event) {
    setPhoneNo(event.target.value);
  }
  function onChangeSalary(event) {
    setSalary(event.target.value);
  }
  function onChangeRefName(event) {
    setRefName(event.target.value);
  }
  function onChangeRefPhoneNo(event) {
    setRefPhoneNo(event.target.value);
  }
  function onChangeAddress(event) {
    setAddress(event.target.value);
  }
  function onChangeFile(event) {
    setFile(event.target.files[0]);
    display = URL.createObjectURL(event.target.files[0]);
    setFileCheck(true);
  }
  function resetFile(event) {
    event.preventDefault();
    setFile(null);
    display = null;
    setFileCheck(false);
  }
  function onSubmit(e) {
    e.preventDefault();
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    const newEmployee = {
      employees_name: name,
      employees_type: type,
      employees_salary: salary,
      employees_date: date,
      employees_phoneNo: phoneNo,
      employees_reference: {
        ref_name: refName,
        ref_phoneNumber: refPhoneNo
      },
      employees_address: address,
      fileCheck: fileCheck
    };
    let img = new FormData();
    img.append("file", file);

    if (
      type === "" ||
      name === "" ||
      salary === 0 ||
      date === "" ||
      phoneNo === "" ||
      refName === "" ||
      refPhoneNo === ""
    ) {
      setError(true);
    } else {
      API.post("employees/addEmp", newEmployee)
        .then(res => {
          if (fileCheck) {
            API.post("employees/addImg", img).then(res => {
              props.history.push({
                pathname: "/Employees",
                state: { check: "created" }
              });
            });
          } else {
            props.history.push({
              pathname: "/Employees",
              state: { check: "created" }
            });
          }
        })
        .catch(err => {});
    }
    display = null;
  }
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setSuccess(false);
  }
  MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["success", "error"]).isRequired
  };
  return (
    <div className={classes.root}>
      <CustomAppbar details={"Create Employee"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <form className={classes.container} onSubmit={onSubmit}>
            <Paper className={fixedHeightPaper}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    id="my-input"
                    // required
                    select
                    label="Role"
                    className={classes.textField}
                    style={{ width: "30%" }}
                    value={type}
                    onChange={changeType}
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
                    value={name}
                    onChange={onChangeName}
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
                    value={salary}
                    onChange={onChangeSalary}
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
                    value={phoneNo}
                    onChange={onChangePhoneNo}
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
                    value={refName}
                    onChange={onChangeRefName}
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
                    value={refPhoneNo}
                    onChange={onChangeRefPhoneNo}
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
                    value={address}
                    onChange={onChangeAddress}
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
                  {!file && <input type="file" onChange={onChangeFile} />}
                  {file && (
                    <div style={{ textAlign: "center" }}>
                      <button onClick={resetFile}>Remove File</button>
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
                    Add Employee
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
              width: "100%"
            }}
            open={success}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <MySnackbarContentWrapper
              onClose={handleClose}
              variant="success"
              message="Employee Created Successfully!"
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
            //  TransitionComponent={this.state.Transition}
            open={error}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <MySnackbarContentWrapper
              onClose={handleClose}
              variant="error"
              className={classes.margin}
              message="Fill the Form!"
            />
          </Snackbar>
        </Container>
      </main>
    </div>
  );
}
