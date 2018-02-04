import React, { Component } from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = {
  versionNumber: {
    margin: "16px 0"
  }
};

class UpdatesDialog extends Component {
  render() {
    const { isOpen, classes } = this.props;
    const { handleClose } = this.props.actions;

    return (
      <Dialog open={isOpen} onRequestClose={handleClose}>
        <DialogTitle>Software Updates</DialogTitle>
        <DialogContent>
          <Typography
            type="title"
            component="h2"
            className={classes.versionNumber}
          >
            {"v0.9.5 (Current)"}
          </Typography>
          <Typography type="subheading" component="h3">
            Bug Fixes
          </Typography>
          <Typography type="body1" component="ul">
            <li>
              Attempt to resolve time inconsistencies when scheduling events in
              Safari.
            </li>
            <li>Add software updates log to home.</li>
          </Typography>
          <Typography
            type="title"
            component="h2"
            className={classes.versionNumber}
          >
            {"v0.9.4"}
          </Typography>
          <Typography type="subheading" component="h3">
            Bug Fixes
          </Typography>
          <Typography type="body1" component="ul">
            <li>Fix bug that caused crashed when user roles were changed.</li>
            <li>Fix schedule searching.</li>
          </Typography>
          <Typography type="subheading" component="h3">
            Minor Changes
          </Typography>
          <Typography type="body1" component="ul">
            <li>Make all empty lists in team info show "None".</li>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleClose()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(UpdatesDialog);
