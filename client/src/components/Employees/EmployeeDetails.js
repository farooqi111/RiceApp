import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import CustomAppbar from "../CustomAppbar";
import API from "../Api/API";
import PhoneIcon from "@material-ui/icons/Phone";
import Address from "@material-ui/icons/Home";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "1oovh",
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
    flexDirection: "column",
    width: "100%"
  }
}));
export default function EmployeeDetails(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [load, setLoad] = React.useState(false);
  const [employee, setEmployee] = React.useState({
    employees_name: "",
    employees_type: "",
    employees_salary: 0,
    employees_phoneNo: "",

    employees_date: "",
    employees_reference: {
      ref_name: "",
      ref_phoneNumber: ""
    }
  });
  let [img, setImg] = React.useState("");
  let [type, setType] = React.useState("");

  const id = props.match.params.id;

  //console.log(props.match.params.id);
  React.useEffect(() => {
    API.get("/employees/" + id)
      .then(response => {
        setLoad(true);
        setEmployee(response.data);
        setType("data:" + response.data.employees_idPhoto.type + ";base64,");
        if (response.data.employees_idPhoto.data) {
          API.get("/employees/getImage/" + id)
            .then(response => {
              setImg(response.data);
            })
            .catch(function(error) {});
        }
      })
      .catch(function(error) {});
  }, [id]);

  return (
    <div className={classes.root}>
      <CustomAppbar details={"Employee Details"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={fixedHeightPaper}>
            <Grid container spacing={2}>
              {load && (
                <Grid item xs={6} md={6} lg={6}>
                  <h3>{employee.employees_name}</h3>
                  <h5>Role: {employee.employees_type}</h5>
                  <PhoneIcon />
                  {employee.employees_phoneNo}
                  <h5>Reference: {employee.employees_reference.ref_name}</h5>
                  <h5>Salary: Rs {employee.employees_salary}</h5>
                  <PhoneIcon />
                  {employee.employees_reference.ref_phoneNumber}
                  <br />

                  <h5>
                    <Address /> {employee.employees_address}
                  </h5>
                  <h5>Hiring Date: {employee.employees_date}</h5>
                </Grid>
              )}

              <Grid item xs={6} md={6} lg={6} style={{ textAlign: "center" }}>
                {img && (
                  <img
                    src={type + img}
                    style={{ height: "200px", width: "250px" }}
                    aria-hidden
                    alt="No Image"
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </main>
    </div>
  );
}
