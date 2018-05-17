import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import injectSheet from "react-jss";
import logo from "./images/logo.png";
import Button from "../../components/Button";
import { common, grey, lightBlue } from "../../utils/colours";
import LoadingScreen from "../../components/LoadingScreen";
// import NotificationModal from "../../components/NotificationModal";
// import PasswordResetDialog from "./components/PasswordResetDialog";
import TextField from "../../components/TextField";

const mobileBreakpoint = 800;

const styles = theme => ({
  button: {
    margin: 10
  },
  buttons: {
    width: 260,
    margin: "18px 0"
  },
  buttonSeparator: {
    height: 14
  },
  content: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "auto"
  },
  footer: {
    borderRadius: "0 0 16px 16px",
    display: "block",
    width: "100%",
    height: 60,
    backgroundColor: grey[200],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      display: "none"
    }
  },
  forgotPasswordLink: {
    width: "100%",
    textAlign: "center",
    margin: 10,
    fontSize: 16,
    color: grey[900],
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
    backgroundColor: grey[200],
    height: 60,
    borderRadius: "16px 16px 0 0",
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      display: "none"
    }
  },
  logo: {
    width: 240,
    height: "auto",
    margin: "24px auto 12px auto"
  },
  paper: {
    borderRadius: 0,
    backgroundColor: common["white"],
    textAlign: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      maxWidth: 480,
      height: "auto",
      borderRadius: 16
    }
  },
  orLine: {
    height: 1,
    flex: 1,
    backgroundColor: grey[400]
  },
  orText: {
    color: grey[400],
    margin: "0 12px"
  },
  separator: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  signUpButtonWrapper: {
    margin: "14px 0"
  },
  socialSignUpForm: {
    width: 260,
    paddingBottom: 12
  },
  textFieldsWrapper: {
    width: 260,
    margin: "12px 0"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: `linear-gradient(${lightBlue[300]}, ${lightBlue[500]})`
  }
});

class SignInLayout extends Component {
  componentWillMount() {
    const { social } = this.props.match.params;
    const { initUser, signInWithSocial } = this.props.actions;

    switch (social) {
      case "google":
      case "facebook":
        signInWithSocial();
        break;
      default:
        initUser();
        break;
    }
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
    const { social } = this.props.match.params;
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
      sendPasswordResetEmail,
      promptGoogleSignIn,
      promptFacebookSignIn
    } = this.props.actions;
    const {
      isSignInLoading,
      isSocialSignInLoading,
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
      triggerSocialSignup
    } = this.props.userInfo;

    if (!pathname.includes("sign-in")) {
      return <Redirect to="/sign-in" />;
    }

    if (isLoggedIn) {
      return <Redirect to="/myaccount/home" />;
    }

    if (isSocialSignInLoading) {
      return <LoadingScreen />;
    }

    if (social && triggerSocialSignup) {
      return (
        <Redirect to={`/sign-up/social/create-or-join/${social}/pullInfo`} />
      );
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.paper}>
          <div className={classes.header} />
          <div className={classes.content}>
            <img src={logo} alt="Sportomatic Logo" className={classes.logo} />
            <div className={classes.socialSignUpForm}>
              <div className={classes.signUpButtonWrapper}>
                <Button
                  type="google"
                  filled
                  fullWidth
                  slim
                  handleClick={() => {
                    history.push("/sign-in/google");
                    promptGoogleSignIn();
                  }}
                >
                  Sign in with Google
                </Button>
              </div>
              <div className={classes.signUpButtonWrapper}>
                <Button
                  type="facebook"
                  filled
                  fullWidth
                  slim
                  handleClick={() => {
                    history.push("/sign-in/facebook");
                    promptFacebookSignIn();
                  }}
                >
                  Sign in with Facebook
                </Button>
              </div>
            </div>
            <form className={classes.form}>
              <div className={classes.separator}>
                <div className={classes.orLine} />
                <div className={classes.orText}>Or</div>
                <div className={classes.orLine} />
              </div>
              <div>
                <div className={classes.textFieldsWrapper}>
                  <TextField
                    type="email"
                    placeholder="Email"
                    value={email}
                    validation={emailErrors.hasError ? "error" : "default"}
                    helperText={emailErrors.message}
                    handleChange={value => updateEmail(value)}
                    handleBlur={value => checkEmail(value)}
                  />
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
                    handleClick={() => this.handleSubmit()}
                  >
                    Sign in
                  </Button>
                  <div className={classes.buttonSeparator} />
                  <Button
                    colour="primary"
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
        </div>
        {/*<PasswordResetDialog
          isOpen={isPasswordResetDialogOpen}
          closeDialog={closePasswordResetDialog}
          email={passwordResetEmail}
          updateEmail={updatePasswordResetEmail}
          isLoading={isPasswordResetLoading}
          sendEmail={sendPasswordResetEmail}
          emailError={passwordResetEmailErrors}
        />*/}
        {/*<NotificationModal
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
        />*/}
      </div>
    );
  }
}

export default injectSheet(styles)(SignInLayout);
