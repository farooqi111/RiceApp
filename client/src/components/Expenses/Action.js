import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import purple from "@material-ui/core/colors/purple";
import { withStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import Label from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import GetExpenses from "./GetExpenses";

const accent = purple["A700"];
const styles = {
  fab: {
    backgroundColor: accent
  },
  select: {
    width: 250,
    textAlign: "center"
  }
};

class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      expenseType: "ebill",
      open: false
    };
  }

  handleChangeSelect = event => {
    this.setState({ expenseType: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={8}>
            <Label>Select Expense Type: </Label>

            <Select
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.expenseType}
              onChange={this.handleChangeSelect}
              inputProps={{
                name: "age",
                id: "demo-controlled-open-select",
                className: classes.select
              }}
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
        </Grid>

        <GetExpenses expenseType={this.state.expenseType} />
      </div>
    );
  }
}
export default withStyles(styles)(Action);
