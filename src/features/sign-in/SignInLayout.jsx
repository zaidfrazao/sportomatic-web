// @flow
/* eslint-disable flowtype/require-valid-file-annotation */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { lightBlue, red } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import { Redirect, Route } from "react-router-dom";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import PasswordResetDialog from "./components/PasswordResetDialog";
import NotificationModal from "../../components/NotificationModal";
import backgroundImage from "./images/background-image.jpeg";
import logo from "./images/logo.png";

const styles = theme => ({
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
  paper: {
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  logo: {
    width: "300px",
    height: "auto",
    margin: "0 auto"
  },
  button: {
    margin: 10,
    width: "10rem"
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
  buttons: {
    margin: 20
  },
  loginError: {
    color: red[500],
    textAlign: "center",
    fontSize: "0.9rem"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    transition: "all ease-in-out 0.5s",
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#fff"
  },
  header: {
    display: "block",
    backgroundColor: lightBlue[700],
    height: "4rem",
    color: "#fff",
    paddingTop: "calc((4rem - 50px) / 2)",
    borderBottom: "1px solid #E0E0E0"
  },
  footer: {
    display: "block",
    width: "100%",
    height: "4rem",
    textAlign: "right",
    backgroundColor: lightBlue[700],
    borderTop: "1px solid #E0E0E0"
  },
  content: {
    flexGrow: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto"
  },
  textFieldWrapper: {
    width: 260,
    margin: 10
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

class SignInLayout extends Component {
  componentWillMount() {
    const { initUser } = this.props.actions;

    initUser();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.props.userInfo;
    const { updatePassword, signIn } = this.props.actions;

    updatePassword("");
    signIn(email, password);
  }

  render() {
    const { classes } = this.props;
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
      isLoggedIn,
      type
    } = this.props.userInfo;

    if (!pathname.includes("sign-in")) {
      return <Redirect to="/sign-in" />;
    }

    if (isLoggedIn) {
      return <Redirect to={`/${type.toLowerCase()}/dashboard`} />;
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
                      label="Email"
                      value={email}
                      error={emailErrors.hasError}
                      onChange={e => updateEmail(e.target.value)}
                      onBlur={e => checkEmail(e.target.value)}
                      helperText={emailErrors.message}
                    />
                  </div>
                  <div className={classes.textFieldWrapper}>
                    <TextField
                      type="password"
                      label="Password"
                      value={password}
                      error={passwordErrors.hasError}
                      onChange={e => updatePassword(e.target.value)}
                      onBlur={e => checkPassword(e.target.value)}
                      helperText={passwordErrors.message}
                    />
                  </div>
                  <div className={classes.buttons}>
                    <Route
                      render={({ history }) => (
                        <Button
                          raised
                          disabled={isSignInLoading}
                          type="submit"
                          color="primary"
                          className={classes.button}
                          onClick={e => this.handleSubmit(e)}
                        >
                          {isSignInLoading ? (
                            <CircularProgress size={20} />
                          ) : (
                            "Sign in"
                          )}
                        </Button>
                      )}
                    />
                    <br />
                    <Button
                      disabled
                      raised
                      color="accent"
                      className={classes.button}
                    >
                      Create account
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

SignInLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignInLayout);
