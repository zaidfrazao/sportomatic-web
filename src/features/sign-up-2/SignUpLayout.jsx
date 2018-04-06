import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
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

class SignInLayout extends Component {
  getStep() {
    const { currentStep } = this.props.match.params;

    switch (currentStep) {
      case "email-entry":
        return (
          <EmailEntry
            actions={{ handleNextClick: () => this.updateStep("name-entry") }}
          />
        );
      case "name-entry":
        return (
          <NameEntry
            actions={{
              handleNextClick: () => this.updateStep("create-or-join")
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
              handleNextClick: () => this.updateStep("password-entry")
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
              handleSignUpClick: () => this.updateStep("")
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
    history.push(`/home/sign-up/${nextStep}`);
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { classes } = this.props;
    const { currentStep } = this.props.match.params;

    if (!currentStep) {
      return <Redirect to="/home/sign-up/email-entry" />;
    } else {
      return <div className={classes.wrapper}>{this.getStep()}</div>;
    }
  }
}

export default withStyles(styles)(SignInLayout);
