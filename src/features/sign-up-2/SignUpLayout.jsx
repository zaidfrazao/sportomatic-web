import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import injectSheet from "react-jss";
import { isValidEmail } from "../../utils/validation";
import CreateCommunity from "./components/CreateCommunity";
import CreateOrJoin from "./components/CreateOrJoin";
import EmailEntry from "./components/EmailEntry";
import JoinCommunity from "./components/JoinCommunity";
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
  getStep() {
    const { currentStep } = this.props.match.params;
    const { email } = this.props.formInfo;
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
      updatePassword
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
        return (
          <NameEntry
            actions={{
              handleNextClick: (newFirstName, newLastName) => {
                updateFirstName(newFirstName);
                updateLastName(newLastName);
                this.updateStep("create-or-join");
              }
            }}
          />
        );
      case "create-or-join":
        return (
          <CreateOrJoin
            actions={{
              handleCreateClick: () => this.updateStep("create-community"),
              handleJoinClick: () => this.updateStep("join-community")
            }}
          />
        );
      case "create-community":
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
      case "join-community":
        return (
          <JoinCommunity
            actions={{
              handleBackClick: () => this.goBack()
            }}
          />
        );
      case "password-entry":
        return (
          <PasswordEntry
            actions={{
              handleSignUpClick: newPassword => {
                updatePassword(newPassword);
                this.updateStep("create-or-join");
              }
            }}
          />
        );
      default:
        return (
          <EmailEntry
            actions={{ handleNextClick: () => this.updateStep("name-entry") }}
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
          communityName.length === 0
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
    const { updateEmail } = this.props.actions;

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
        }
      } else {
        return "/sign-up/new/email-entry";
      }
    } else if (initiation !== "new") {
      return `/sign-up/new/${currentStep}`;
    } else if (!this.checkAppropriateCurrentStep(currentStep)) {
      return "/sign-up/new/email-entry";
    } else {
      return "no-redirect";
    }
  }

  render() {
    const { classes } = this.props;

    const redirectTo = this.shouldRedirectTo();

    if (redirectTo !== "no-redirect") {
      return <Redirect to={redirectTo} />;
    } else {
      return <div className={classes.wrapper}>{this.getStep()}</div>;
    }
  }
}

export default injectSheet(styles)(SignUpLayout);
