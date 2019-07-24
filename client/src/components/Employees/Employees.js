import React from "react";
import CustomAppbar from "../CustomAppbar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GetEmployees from "./GetEmployees";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  }
}));
export default function Employees(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CustomAppbar details={"Employees"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <GetEmployees />
            </Grid>
            <Grid item xs={10} md={10} lg={11} />
            <Grid item xs={2} md={2} lg={1} />
          </Grid>
        </Container>
      </main>
    </div>
  );
}
