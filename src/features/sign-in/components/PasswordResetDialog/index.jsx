import React, { Component } from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = {
  emailTextField: {
    margin: 24
  }
};

type Props = {
  isOpen: boolean,
  email: string,
  isLoading: boolean,
  actions: {
    closeDialog: () => void,
    sendEmail: string => void,
    updateEmail: string => void
  }
};

class PasswordResetDialog extends Component<Props> {
  static defaultProps = {
    isOpen: false,
    email: "default@email.com",
    isLoading: true,
    actions: {
      closeDialog: () => {
        console.log("Password reset dialog was closed.");
      },
      sendEmail: email => {
        console.log(`Password reset email sent to "${email}".`);
      },
      updateEmail: newEmail => {
        console.log(`Password reset email address updated to "${newEmail}".`);
      }
    }
  };

  render() {
    const { classes, isOpen, email, isLoading, emailError } = this.props;
    const { closeDialog, sendEmail, updateEmail } = this.props.actions;

    return (
      <Dialog open={isOpen} onRequestClose={() => closeDialog()}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <Typography type="body1" component="p">
            Please specify the email address of the account for which you'd like
            to reset the password.
          </Typography>
          <TextField
            type="email"
            value={email}
            label="Email"
            error={emailError.hasError}
            helperText={emailError.message}
            className={classes.emailTextField}
            onChange={e => updateEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Cancel</Button>
          <Button
            disabled={isLoading}
            color="primary"
            onClick={() => sendEmail(email)}
          >
            {isLoading ? <CircularProgress size={20} /> : "Send"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(PasswordResetDialog);
