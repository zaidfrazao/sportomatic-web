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
  section: {
    margin: 16
  }
};

class UpdatesDialog extends Component {
  render() {
    const { isOpen, classes, isMobile } = this.props;
    const { handleClose } = this.props.actions;

    return (
      <Dialog open={isOpen} fullScreen={isMobile} onRequestClose={handleClose}>
        <DialogTitle>Software Updates</DialogTitle>
        <DialogContent>
          <Typography type="title" component="h2">
            {"v0.9.9 (Current)"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>Admins can edit their institution settings.</li>
              <li>Permissions have been implemented across app.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.8"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>User can edit their personal settings.</li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Move settings navigation to side menu.</li>
              <li>Fix "Soccer / Footbal" typo.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.7"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              New Features
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                New user invited to an institution can complete the sign up
                process via the email sent to them.
              </li>
            </Typography>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Update Terms and Conditions.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.6"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Fix crash that occurs when reloading the team info page.</li>
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Make spacing around ads consistent.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.5"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>
                Attempt to resolve time inconsistencies when scheduling events
                in Safari.
              </li>
              <li>Add software updates log to home.</li>
            </Typography>
          </div>
          <Typography type="title" component="h2">
            {"v0.9.4"}
          </Typography>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Bug Fixes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Fix bug that caused crashed when user roles were changed.</li>
              <li>Fix schedule searching.</li>
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography type="subheading" component="h3">
              Minor Changes
            </Typography>
            <Typography type="body1" component="ul">
              <li>Make all empty lists in team info show "None".</li>
            </Typography>
          </div>
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
