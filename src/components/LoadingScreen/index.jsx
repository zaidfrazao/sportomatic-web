import React, { Component } from "react";
import injectStyles from "react-jss";
import logo from "./images/logo.png";
import Loader from "../Loader";

const mobileBreakpoint = 800;

const styles = theme => ({
  itemsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    width: 240,
    height: "auto",
    marginBottom: 12,
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      width: "100%"
    }
  },
  wrapper: {
    width: "calc(100% - 48px)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 24px"
  }
});

class LoadingScreen extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.itemsWrapper}>
          <img src={logo} alt="Sportomatic logo" className={classes.logo} />
          <Loader />
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(LoadingScreen);
