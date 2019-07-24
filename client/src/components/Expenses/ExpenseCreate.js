import React from "react";
import clsx from "clsx";
import CustomAppbar from "../CustomAppbar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import BillsCreate from "./Bills/BillsCreate";
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
    flexDirection: "column"
  }
}));
export default function ExpenseCreate() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CustomAppbar details={"Create Expense"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <BillsCreate />
              </Paper>
            </Grid>
            <Grid item xs={10} md={10} lg={11} />
            <Grid item xs={2} md={2} lg={1} />
          </Grid>
        </Container>
      </main>
    </div>
  );
}
