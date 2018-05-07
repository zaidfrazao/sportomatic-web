import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import injectSheet from "react-jss";
import { isValidEmail } from "../../utils/validation";
import CreateCommunity from "./components/CreateCommunity";
import CreateOrJoin from "./components/CreateOrJoin";
import EmailEntry from "./components/EmailEntry";
import JoinCommunity from "./components/JoinCommunity";
import LoadingScreen from "../../components/LoadingScreen";
import NameEntry from "./components/NameEntry";
import PasswordEntry from "./components/PasswordEntry";

const styles = theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }
});

class SignUpLayout extends Component {
  componentWillMount() {
    const { history } = this.props;
    const {
      userID,
      initiation,
      optionalParameters,
      stage
    } = this.props.match.params;
    const {
      loadUserInfo,
      promptGoogleSignIn,
      promptFacebookSignIn,
      signInWithSocial
    } = this.props.actions;

    if (initiation === "social") {
      if (stage === "start") {
        if (optionalParameters === "google") {
          history.push("/sign-up/social/name-entry/google/pullInfo");
          promptGoogleSignIn();
        } else if (optionalParameters === "facebook") {
          history.push("/sign-up/social/name-entry/facebook/pullInfo");
          promptFacebookSignIn();
        } else {
          history.push("/sign-up/new/email-entry/");
        }
      } else if (stage === "pullInfo") {
        history.push("/sign-up/new/name-entry/");
        signInWithSocial(optionalParameters);
      } else {
        history.push("/sign-up/new/email-entry/");
      }
    }

    if (userID) {
      loadUserInfo(userID);
      this.setState({
        step: 0
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { accountSuccessfullyCreated, isJoining } = nextProps.uiConfig;
    const { email, tempPassword } = nextProps.formInfo;
    const { signIn } = nextProps.actions;
    const { history } = nextProps;

    if (email !== this.props.formInfo.email && isJoining) {
      signIn(email, tempPassword);
    }

    if (
      accountSuccessfullyCreated !==
        this.props.uiConfig.accountSuccessfullyCreated &&
      accountSuccessfullyCreated
    ) {
      history.push("/sign-in");
    }
  }

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
  }

  getStep() {
    const { currentStep } = this.props.match.params;
    const { isJoining, invitedUserID } = this.props.uiConfig;
    const {
      email,
      firstName,
      lastName,
      communityType,
      subType,
      otherType,
      communityName,
      abbreviation,
      athleteGender,
      profilePictureURL,
      phoneNumber,
      signInMethod,
      id
    } = this.props.formInfo;
    const { isAccountCreationLoading } = this.props.loadingStatus;
    const {
      updateEmail,
      updateFirstName,
      updateLastName,
      updateCommunityType,
      updateSubType,
      updateOtherType,
      updateCommunityName,
      updateAbbreviation,
      updateAthleteGender,
      updatePassword,
      updateInvitedUser,
      createUser
    } = this.props.actions;

    switch (currentStep) {
      case "email-entry":
        return (
          <EmailEntry
            email={email}
            actions={{
              handleNextClick: newEmail => {
                updateEmail(newEmail);
                this.updateStep("name-entry");
              }
            }}
          />
        );
      case "name-entry":
        let nextStep = "create-or-join";
        if (isJoining) {
          nextStep = "password-entry";
        }
        return (
          <NameEntry
            firstName={firstName}
            lastName={lastName}
            actions={{
              handleNextClick: (newFirstName, newLastName) => {
                updateFirstName(newFirstName);
                updateLastName(newLastName);
                this.updateStep(nextStep);
              }
            }}
          />
        );
      case "create-or-join":
        if (isJoining) {
          return <Redirect to="/sign-up/new/email-entry" />;
        } else {
          return (
            <CreateOrJoin
              actions={{
                handleCreateClick: () => this.updateStep("create-community"),
                handleJoinClick: () => this.updateStep("join-community")
              }}
            />
          );
        }
      case "create-community":
        if (isJoining) {
          return <Redirect to="/sign-up/new/email-entry" />;
        } else {
          return (
            <CreateCommunity
              actions={{
                handleNextClick: (
                  newCommunityType,
                  newSubType,
                  newOtherType,
                  newCommunityName,
                  newAbbreviation,
                  newAthleteGender
                ) => {
                  updateCommunityType(newCommunityType);
                  updateSubType(newSubType);
                  updateOtherType(newOtherType);
                  updateCommunityName(newCommunityName);
                  updateAbbreviation(newAbbreviation);
                  updateAthleteGender(newAthleteGender);
                  this.updateStep("password-entry");
                }
              }}
            />
          );
        }
      case "join-community":
        if (isJoining) {
          return <Redirect to="/sign-up/new/email-entry" />;
        } else {
          return (
            <JoinCommunity
              actions={{
                handleBackClick: () => this.goBack()
              }}
            />
          );
        }
      case "password-entry":
        return (
          <PasswordEntry
            showDots={!isJoining}
            showPasswordEntry={signInMethod === "email"}
            isLoading={isAccountCreationLoading}
            actions={{
              handleSignUpClick: newPassword => {
                updatePassword(newPassword);
                if (isJoining) {
                  updateInvitedUser(
                    email,
                    newPassword,
                    firstName,
                    lastName,
                    invitedUserID
                  );
                } else {
                  createUser(
                    id,
                    email,
                    newPassword,
                    firstName,
                    lastName,
                    profilePictureURL,
                    phoneNumber,
                    signInMethod,
                    {
                      subType,
                      otherType,
                      athleteGender,
                      type: communityType,
                      name: communityName,
                      abbreviation: abbreviation
                    }
                  );
                }
              }
            }}
          />
        );
      default:
        return (
          <EmailEntry
            email={email}
            actions={{
              handleNextClick: newEmail => {
                updateEmail(newEmail);
                this.updateStep("name-entry");
              }
            }}
          />
        );
    }
  }

  updateStep(nextStep) {
    const { history } = this.props;
    const { initiation, optionalParameters } = this.props.match.params;

    if (optionalParameters) {
      history.push(`/sign-up/${initiation}/${nextStep}/${optionalParameters}`);
    } else {
      history.push(`/sign-up/${initiation}/${nextStep}`);
    }
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  checkValidInitiation(initiation) {
    switch (initiation) {
      case "standard":
      case "email":
      case "social":
      case "join":
      case "new":
        return true;
      default:
        return false;
    }
  }

  checkValidCurrentStep(currentStep) {
    switch (currentStep) {
      case "email-entry":
      case "name-entry":
      case "create-or-join":
      case "create-community":
      case "join-community":
      case "password-entry":
        return true;
      default:
        return false;
    }
  }

  checkAppropriateCurrentStep(currentStep) {
    const { email, firstName, lastName, communityName } = this.props.formInfo;
    const { isJoining } = this.props.uiConfig;

    switch (currentStep) {
      case "name-entry":
        if (email.length === 0) {
          return false;
        }
        return true;
      case "create-or-join":
      case "create-community":
        if (
          email.length === 0 ||
          firstName.length === 0 ||
          lastName.length === 0
        ) {
          return false;
        }
        return true;
      case "password-entry":
        if (
          email.length === 0 ||
          firstName.length === 0 ||
          lastName.length === 0 ||
          (!isJoining && communityName.length === 0)
        ) {
          return false;
        }
        return true;
      default:
        return true;
    }
  }

  shouldRedirectTo() {
    const {
      initiation,
      currentStep,
      optionalParameters
    } = this.props.match.params;
    const { isSocialSignInLoading } = this.props.loadingStatus;
    const { updateEmail, loadUserInfo } = this.props.actions;

    if (!initiation) {
      return "/sign-up/new/email-entry";
    } else if (!this.checkValidInitiation(initiation)) {
      return "/sign-up/new/email-entry";
    } else if (!currentStep) {
      return `/sign-up/new/email-entry`;
    } else if (!this.checkValidCurrentStep(currentStep)) {
      return `/sign-up/new/email-entry`;
    } else if (initiation === "email" && currentStep === "name-entry") {
      if (optionalParameters) {
        if (!isValidEmail(optionalParameters)) {
          updateEmail(optionalParameters);
          return "/sign-up/new/email-entry/";
        } else {
          updateEmail(optionalParameters);
          return "/sign-up/new/name-entry/";
        }
      } else {
        return "/sign-up/new/email-entry/";
      }
    } else if (initiation === "join") {
      if (!optionalParameters) {
        return "/sign-up/new/email-entry";
      } else {
        loadUserInfo(optionalParameters);
        return "/sign-up/new/email-entry";
      }
    } else if (initiation === "social") {
      return "no-redirect";
    } else if (initiation !== "new" && initiation !== "social") {
      return `/sign-up/new/${currentStep}`;
    } else if (
      !isSocialSignInLoading &&
      !this.checkAppropriateCurrentStep(currentStep)
    ) {
      return "/sign-up/new/email-entry";
    } else {
      return "no-redirect";
    }
  }

  render() {
    const { classes } = this.props;
    const { stage } = this.props.match.params;
    const {
      isUserInfoLoading,
      isSignInLoading,
      isSocialSignInLoading
    } = this.props.loadingStatus;

    const redirectTo = this.shouldRedirectTo();

    if (redirectTo !== "no-redirect") {
      return <Redirect to={redirectTo} />;
    } else if (
      isUserInfoLoading ||
      isSignInLoading ||
      isSocialSignInLoading ||
      stage === "start" ||
      stage === "pullInfo"
    ) {
      return <LoadingScreen />;
    } else {
      return <div className={classes.wrapper}>{this.getStep()}</div>;
    }
  }
}

export default injectSheet(styles)(SignUpLayout);
