import React, { Component } from "react";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import { lightBlue } from "material-ui/colors";
import Paper from "material-ui/Paper";
import { Redirect, Route } from "react-router-dom";
import TextField from "material-ui/TextField";
import { withStyles } from "material-ui/styles";
import backgroundImage from "./images/background-image.jpeg";
import logo from "./images/logo.png";
import NotificationModal from "../../components/NotificationModal";
import PasswordResetDialog from "./components/PasswordResetDialog";

const styles = theme => ({
  button: {
    margin: 10,
    width: "10rem"
  },
  buttons: {
    margin: 20
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
    borderTop: "1px solid #E0E0E0"
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
    borderBottom: "1px solid #E0E0E0"
  },
  logo: {
    width: "240px",
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
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#fff"
  }
});

class SignInLayout extends Component {
  componentWillMount() {
    const { initUser } = this.props.actions;

    initUser();
  }

  handleSubmit(e) {
    const { email, password } = this.props.userInfo;
    const { updatePassword, signIn } = this.props.actions;

    e.preventDefault();
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

export default withStyles(styles)(SignInLayout);
