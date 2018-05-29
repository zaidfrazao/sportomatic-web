import React, { Component } from "react";
import injectStyles from "react-jss";
import logo from "./images/logo.png";
import Loader from "../Loader";

const styles = theme => ({
  itemsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    width: 240,
    height: "auto"
  },
  wrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

class LoadingScreen extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.itemsWrapper}>
          <img src={logo} alt="Sportomatic Logo" className={classes.logo} />
          <Loader />
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(LoadingScreen);
