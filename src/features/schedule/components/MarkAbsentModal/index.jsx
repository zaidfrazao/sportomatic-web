import React, { Component } from "react";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import { FormControl } from "material-ui/Form";
import { green, grey, red } from "material-ui/colors";
import TextField from "material-ui/TextField";
import ThumbsDownIcon from "material-ui-icons/ThumbDown";
import ThumbsUpIcon from "material-ui-icons/ThumbUp";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  badButton: {
    width: "46%",
    margin: "0 2%",
    color: grey[50],
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[500]
    }
  },
  button: {
    width: "46%",
    margin: "0 2%",
    backgroundColor: grey[200]
  },
  buttonsWrapper: {
    height: 80,
    display: "flex",
    flexDirection: "row",
    margin: 10
  },
  goodButton: {
    width: "46%",
    margin: "0 2%",
    color: grey[50],
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[500]
    }
  },
  icon: {
    marginRight: 6
  }
});

class MarkAbsentModal extends Component {
  state = {
    rating: "",
    reason: ""
  };

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;

    if (isOpen !== this.props.isOpen && !isOpen) {
      this.resetState();
    }
  }

  resetState() {
    this.setState({
      rating: "",
      reason: ""
    });
  }

  updateRating(newRating) {
    this.setState({
      rating: newRating
    });
  }

  updateReason(newReason) {
    this.setState({
      reason: newReason
    });
  }

  resetState() {
    this.setState({
      rating: "",
      reason: ""
    });
  }

  render() {
    const { isOpen, coachName, classes } = this.props;
    const { closeModal, markAbsent } = this.props.actions;
    const { rating, reason } = this.state;

    return (
      <Dialog open={isOpen}>
        <DialogTitle>Mark as Absent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`${coachName} will be marked as absent. Please select whether they have a good or bad reason to be absent:`}
          </DialogContentText>
          <div className={classes.buttonsWrapper}>
            <Button
              className={
                rating === "GOOD" ? classes.goodButton : classes.button
              }
              onClick={() => this.updateRating("GOOD")}
            >
              <ThumbsUpIcon className={classes.icon} /> Good
            </Button>
            <Button
              className={rating === "BAD" ? classes.badButton : classes.button}
              onClick={() => this.updateRating("BAD")}
            >
              <ThumbsDownIcon className={classes.icon} /> Bad
            </Button>
          </div>
          <FormControl>
            <TextField
              id="reason"
              label="Reason"
              placeholder="Optional"
              value={reason}
              onChange={e => this.updateReason(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeModal();
              this.resetState();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={rating === ""}
            color="primary"
            onClick={() => {
              markAbsent(rating, reason);
              this.resetState();
            }}
          >
            Mark absent
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(MarkAbsentModal);
