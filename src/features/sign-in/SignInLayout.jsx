import React, { Component } from "react";
import { lightBlue, red } from "material-ui/colors";
import Paper from "material-ui/Paper";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import logo from "./images/logo.png";
import Button from "../../components/Button";
import NotificationModal from "../../components/NotificationModal";
import PasswordResetDialog from "./components/PasswordResetDialog";
import TextField from "../../components/TextField";

const styles = theme => ({
  button: {
    margin: 10,
    width: "10rem"
  },
  buttons: {
    margin: 20
  },
  buttonSeparator: {
    height: 14
  },
  content: {
    flexGrow: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto"
  },
  footer: {
    display: "block",
    width: "100%",
    height: "4rem",
    textAlign: "right",
    backgroundColor: lightBlue[700],
    borderTop: "1px solid #E0E0E0",
    "@media (max-width: 600px)": {
      display: "none"
    }
  },
  forgotPasswordLink: {
    width: "100%",
    textAlign: "center",
    margin: 10,
    fontSize: "0.9rem",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    display: "block",
    backgroundColor: lightBlue[700],
    height: "4rem",
    color: "#fff",
    paddingTop: "calc((4rem - 50px) / 2)",
    borderBottom: "1px solid #E0E0E0",
    "@media (max-width: 600px)": {
      display: "none"
    }
  },
  loginError: {
    color: red[500],
    textAlign: "center",
    fontSize: "0.9rem"
  },
  logo: {
    width: 240,
    height: "auto",
    margin: "10px auto"
  },
  paper: {
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  paperPositioner: {
    width: "100%",
    height: "100%",
    minWidth: "300px",
    flex: 1,
    "@media (min-width: 768px)": {
      maxWidth: "30rem",
      maxHeight: "40rem"
    }
  },
  textFieldWrapper: {
    width: 260,
    margin: 10
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    transition: "all ease-in-out 0.5s",
    background: `linear-gradient(${lightBlue[300]}, ${lightBlue[500]})`
  }
});

class SignInLayout extends Component {
  componentWillMount() {
    const { initUser } = this.props.actions;

    initUser();
  }

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
  }

  handleSubmit() {
    const { email, password } = this.props.userInfo;
    const { updatePassword, signIn } = this.props.actions;

    updatePassword("");
    signIn(email, password);
  }

  render() {
    const { classes, history } = this.props;
    const { pathname } = this.props.location;
    const {
      updateEmail,
      updatePassword,
      checkEmail,
      checkPassword,
      openPasswordResetDialog,
      closePasswordResetDialog,
      updatePasswordResetEmail,
      closePasswordResetSuccessModal,
      closeNetworkFailureModal,
      sendPasswordResetEmail
    } = this.props.actions;
    const {
      isSignInLoading,
      isPasswordResetLoading
    } = this.props.loadingStatus;
    const {
      emailErrors,
      passwordErrors,
      passwordResetEmailErrors
    } = this.props.errors;
    const {
      isPasswordResetDialogOpen,
      isPasswordResetSuccessModalOpen,
      isNetworkFailureModalOpen
    } = this.props.dialogs;
    const {
      email,
      password,
      passwordResetEmail,
      isLoggedIn
    } = this.props.userInfo;

    if (!pathname.includes("sign-in")) {
      return <Redirect to="/sign-in" />;
    }

    if (isLoggedIn) {
      return <Redirect to="/myaccount/home" />;
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.paperPositioner}>
          <Paper className={classes.paper}>
            <div className={classes.header} />
            <div className={classes.content}>
              <form className={classes.form}>
                <img
                  src={logo}
                  alt="Sportomatic Logo"
                  className={classes.logo}
                />
                <div>
                  <div className={classes.textFieldWrapper}>
                    <TextField
                      type="email"
                      placeholder="Email"
                      value={email}
                      validation={emailErrors.hasError ? "error" : "default"}
                      helperText={emailErrors.message}
                      handleChange={value => updateEmail(value)}
                      handleBlur={value => checkEmail(value)}
                    />
                  </div>
                  <div className={classes.textFieldWrapper}>
                    <TextField
                      type="password"
                      placeholder="Password"
                      value={password}
                      validation={passwordErrors.hasError ? "error" : "default"}
                      helperText={passwordErrors.message}
                      handleChange={value => updatePassword(value)}
                      handleBlur={value => checkPassword(value)}
                    />
                  </div>
                  <div className={classes.buttons}>
                    <Button
                      loading={isSignInLoading}
                      colour="primary"
                      fullWidth
                      filled
                      slim
                      handleClick={() => this.handleSubmit()}
                    >
                      Sign in
                    </Button>
                    <div className={classes.buttonSeparator} />
                    <Button
                      colour="secondary"
                      filled
                      fullWidth
                      slim
                      handleClick={() => history.push("/sign-up")}
                    >
                      Sign up for free
                    </Button>
                    <p
                      className={classes.forgotPasswordLink}
                      onClick={() => openPasswordResetDialog(email)}
                    >
                      Forgot password?
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className={classes.footer} />
          </Paper>
        </div>
        <PasswordResetDialog
          isOpen={isPasswordResetDialogOpen}
          closeDialog={closePasswordResetDialog}
          email={passwordResetEmail}
          updateEmail={updatePasswordResetEmail}
          isLoading={isPasswordResetLoading}
          sendEmail={sendPasswordResetEmail}
          emailError={passwordResetEmailErrors}
        />
        <NotificationModal
          isOpen={isPasswordResetSuccessModalOpen}
          handleOkClick={closePasswordResetSuccessModal}
          heading="Password Reset Email Sent"
          message={`Check your inbox for ${passwordResetEmail} for a password reset email from Sportomatic. Click the link contained in this email to choose a new password.`}
        />
        <NotificationModal
          isOpen={isNetworkFailureModalOpen}
          handleOkClick={closeNetworkFailureModal}
          heading="Network Failure"
          message="You have been disconnected from the internet. Please reconnect and try again."
        />
      </div>
    );
  }
}

export default withStyles(styles)(SignInLayout);
