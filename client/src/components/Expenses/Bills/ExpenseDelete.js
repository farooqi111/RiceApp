import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import API from "../../Api/API";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
let expneseType = "";
class ExpenseDelete extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  componentDidMount() {}
  deleteExpense = () => {
    const id = this.props.match.params.id;
    expneseType = this.props.history.location.state.expenseType;

    if (expneseType === "ebill") {
      console.log(this.props);

      API.delete("/electricitybills/delete/" + id).then(res => {
        this.props.history.push("/Expenses");
      });
    } else if (expneseType === "gbill") {
      API.delete("/gasbills/delete/" + id).then(res => {
        this.props.history.push("/Expenses");
      });
    } else if (expneseType === "fuel") {
      API.delete("/fuel/delete/" + id).then(res => {
        this.props.history.push("/Expenses");
      });
    } else if (expneseType === "motorRepair") {
      API.delete("/motorRepair/delete/" + id).then(res => {
        this.props.history.push("/Expenses");
      });
    } else if (expneseType === "engineOil") {
      API.delete("/engineOil/delete/" + id).then(res => {
        this.props.history.push("/Expenses");
      });
    } else if (expneseType === "repairParts") {
      API.delete("/repairParts/delete/" + id).then(res => {
        this.props.history.push("/Expenses");
      });
    } else if (expneseType === "buildingMentainence") {
      API.delete("/buildingMentainence/delete/" + id).then(res => {
        this.props.history.push("/Expenses");
      });
    } else if (expneseType === "machineryMentainence") {
      API.delete("/machineryMentainence/delete/" + id).then(res => {
        this.props.history.push("/Expenses");
      });
    }
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push("/Expenses");
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
            Delete Request
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do you really want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/Expenses">
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
export default ExpenseDelete;
