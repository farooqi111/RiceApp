import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import TableList from "./Bills/TableList";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import purple from "@material-ui/core/colors/purple";
import API from "../Api/API";
import axios from "axios";
const accent = purple["A700"];

const styles = {
  fab: {
    backgroundColor: accent
  }
};
class GetExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Bills: [],
      search: ""
    };
  }

  componentDidMount() {
    //console.log(API);
    axios
      .get("/electricitybills/")
      .then(response => {
        this.setState({ Bills: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.expenseType === "ebill") {
      if (this.props !== prevProps) {
        API.get("/electricitybills/")
          .then(response => {
            this.setState({ Bills: response.data });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    } else if (this.props.expenseType === "gbill") {
      if (this.props !== prevProps) {
        API.get("/gasbills/")
          .then(response => {
            this.setState({ Bills: response.data });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    } else if (this.props.expenseType === "fuel") {
      if (this.props !== prevProps) {
        API.get("/fuel/")
          .then(response => {
            this.setState({ Bills: response.data });
          })

          .catch(function(error) {
            console.log(error);
          });
      }
    } else if (this.props.expenseType === "motorRepair") {
      if (this.props !== prevProps) {
        API.get("/motorRepair/")
          .then(response => {
            this.setState({ Bills: response.data });
          })

          .catch(function(error) {
            console.log(error);
          });
      }
    } else if (this.props.expenseType === "engineOil") {
      if (this.props !== prevProps) {
        API.get("/engineOil/")
          .then(response => {
            this.setState({ Bills: response.data });
          })

          .catch(function(error) {
            console.log(error);
          });
      }
    } else if (this.props.expenseType === "repairParts") {
      if (this.props !== prevProps) {
        API.get("/repairParts/")
          .then(response => {
            this.setState({ Bills: response.data });
          })

          .catch(function(error) {
            console.log(error);
          });
      }
    } else if (this.props.expenseType === "buildingMentainence") {
      if (this.props !== prevProps) {
        API.get("/buildingMentainence/")
          .then(response => {
            this.setState({ Bills: response.data });
          })

          .catch(function(error) {
            console.log(error);
          });
      }
    } else if (this.props.expenseType === "machineryMentainence") {
      if (this.props !== prevProps) {
        API.get("/machineryMentainence/")
          .then(response => {
            this.setState({ Bills: response.data });
          })

          .catch(function(error) {
            console.log(error);
          });
      }
    } else if (this.props.expenseType === "miscellaneousExpenses") {
      if (this.props !== prevProps) {
        API.get("/miscellaneousExpenses/")
          .then(response => {
            this.setState({ Bills: response.data });
          })

          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
  handleChange = e => {
    this.setState({ search: e.target.value });
  };
  render() {
    const { Bills } = this.state;
    const { classes, expenseType } = this.props;

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={4} md={6} lg={8} />
          <Grid item xs={6} md={4} lg={3}>
            <div className={classes.search}>
              <Paper>
                <SearchIcon />

                <TextField
                  id="standard-number"
                  value={this.state.search}
                  onChange={this.handleChange}
                  type="text"
                  className={classes.textField}
                />
              </Paper>
            </div>
          </Grid>
          <Grid item xs={2} md={2} lg={1}>
            <Link to="/addExpense">
              <Fab aria-label="Add" className={classes.fab}>
                <AddIcon />
              </Fab>
            </Link>
          </Grid>
        </Grid>
        {/*  <TableList List={Bills} id={expenseType} search={this.state.search} />
         */}{" "}
      </div>
    );
  }
}
export default withStyles(styles)(GetExpenses);
