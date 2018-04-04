import React, { Component } from "react";
import { grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";
import AppBar from "./components/AppBar";
import Banner from "./components/Banner";
import Features from "./components/Features";
import Footer from "./components/Footer";
import RoleSwitcher from "./components/RoleSwitcher";

const styles = theme => ({
  peopleContent: {
    padding: "160px 0 180px 0",
    maxWidth: 800,
    margin: "0 auto"
  },
  peopleHeadline: {
    color: "white",
    width: "100%",
    textAlign: "center"
  },
  peopleSplurg: {
    color: grey[100],
    maxWidth: 640,
    margin: "0 auto 28px auto"
  },
  peopleWrapper: {
    padding: "0 54px",
    background: `linear-gradient(${lightBlue[200]}, ${lightBlue[500]})`,
    position: "relative"
  },
  roleBuffer: {
    height: 160,
    backgroundColor: "white"
  },
  roleSwitcherPositioning: {
    position: "absolute",
    top: "75%",
    width: 600,
    left: "calc(50% - 300px)",
    "@media (max-width: 700px)": {
      top: "80%",
      width: 400,
      left: "calc(50% - 200px)"
    },
    "@media (max-width: 450px)": {
      top: "85%",
      width: 300,
      left: "calc(50% - 150px)"
    }
  }
});

class SignInLayout extends Component {
  goToSignUp() {
    const { history } = this.props;
    history.push("home/sign-up");
  }

  render() {
    const { classes } = this.props;
    const { roleIndex } = this.props.uiConfig;
    const { updateRoleIndex } = this.props.actions;

    return (
      <div className={classes.wrapper}>
        <AppBar actions={{ goToSignUp: () => this.goToSignUp() }} />
        <Banner actions={{ goToSignUp: () => this.goToSignUp() }} />
        <div className={classes.peopleWrapper}>
          <div className={classes.peopleContent}>
            <h1 className={classes.peopleHeadline}>
              Connect Your Sports Community
            </h1>
            <p className={classes.peopleSplurg}>
              Sportomatic is a system built to allow everyone involved in sports
              within a community to interact in sensible ways. Sports directors,
              team managers, coaches, athletes, parents and supporters each get
              functionality to suite their needs.
            </p>
            <div className={classes.roleSwitcherPositioning}>
              <RoleSwitcher actions={{ updateRoleIndex }} />
            </div>
          </div>
        </div>
        <div className={classes.roleBuffer} />
        <Features
          roleIndex={roleIndex}
          actions={{ goToSignUp: () => this.goToSignUp() }}
        />
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(SignInLayout);
