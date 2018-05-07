import React, { Component } from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import injectSheet from "react-jss";
import Button from "../../../../components/Button";
import TextField from "../../../../components/TextField";

const styles = {
  textFieldWrapper: {
    margin: "24px 0"
  }
};

class PasswordResetDialog extends Component {
  props: {
    isOpen: boolean,
    closeDialog: () => void,
    sendEmail: string => void,
    email: string,
    updateEmail: string => void,
    isLoading: boolean
  };

  static defaultProps = {
    isOpen: false,
    closeDialog: () => {
      console.log("Password reset dialog was closed.");
    },
    sendEmail: email => {
      console.log(`Password reset email sent to "${email}".`);
    },
    email: "default@email.com",
    updateEmail: newEmail => {
      console.log(`Password reset email address updated to "${newEmail}".`);
    },
    isLoading: true
  };

  render() {
    const {
      classes,
      isOpen,
      closeDialog,
      sendEmail,
      email,
      updateEmail,
      isLoading,
      emailError
    } = this.props;

    return (
      <Dialog open={isOpen} onRequestClose={() => closeDialog()}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <Typography type="body1" component="p">
            Please specify the email address of the account for which you'd like
            to reset the password.
          </Typography>
          <div className={classes.textFieldWrapper}>
            <TextField
              type="email"
              value={email}
              placeholder="Email"
              validation={emailError.hasError ? "error" : "default"}
              helperText={emailError.message}
              handleChange={value => updateEmail(value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button colour="primary" slim handleClick={() => closeDialog()}>
            Cancel
          </Button>
          <Button
            loading={isLoading}
            colour="primary"
            slim
            filled
            handleClick={() => sendEmail(email)}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default injectSheet(styles)(PasswordResetDialog);
