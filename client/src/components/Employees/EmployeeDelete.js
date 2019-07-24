import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import API from "../Api/API";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class EemployeeDelete extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }
  deleteExpense = () => {
    const id = this.props.match.params.id;
    API.delete("/employees/delete/" + id).then(res => {
      this.props.history.push("/Employees");
    });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push("/Employees");
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Delete Employee
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do you really want to delete employee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/Employees">
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
            </Link>

            <Button onClick={this.deleteExpense} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default EemployeeDelete;
