import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import purple from "@material-ui/core/colors/purple";
import API from "../Api/API";
import TableList from "./TableList";
import "../../index.css";

const accent = purple["A700"];

const styles = {
  fab: {
    backgroundColor: accent
  },
  textField: {
    width: "90%"
  }
};
class GetEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      Employees: [],
      load: false
    };
  }
  componentDidMount() {
    API.get("/employees/Names")
      .then(res => {
        this.setState({ Employees: res.data });
        this.setState({ load: true });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      API.get("/employees/Names")
        .then(res => {
          this.setState({ Employees: res.data });
          this.setState({ load: true });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  handleChange = e => {
    this.setState({ search: e.target.value });
  };
  render() {
    let { classes } = this.props;

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4} lg={4} />

          <Grid item xs={4} md={4} lg={4}>
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
            <Grid item xs={4} md={4} lg={4} />
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Link to="/addEmployee">
              <Fab aria-label="Add" className={classes.fab}>
                <i className="material-icons">person_add</i>
              </Fab>
            </Link>
          </Grid>
        </Grid>
        {console.log(
          this.state.Employees)
        ) /*  {this.state.load && (
          <TableList List={this.state.Employees} search={this.state.search} />
        )} */}
      </div>
    );
  }
}
export default withStyles(styles)(GetEmployees);
