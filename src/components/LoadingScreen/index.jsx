import React, { Component } from "react";
import { LinearProgress } from "material-ui/Progress";
import injectStyles from "react-jss";
import logo from "./images/logo.png";

const styles = theme => ({
  itemsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  loader: {
    width: 200
  },
  logo: {
    width: 240,
    height: "auto",
    margin: 10
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
          <LinearProgress className={classes.loader} />
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(LoadingScreen);
