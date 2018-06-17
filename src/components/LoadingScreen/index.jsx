import React, { Component } from "react";
import injectStyles from "react-jss";
import { lightBlue } from "../../utils/colours";
import Loader from "../Loader";

const styles = theme => ({
  itemsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  wrapper: {
    width: "calc(100% - 48px)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 24px",
    backgroundColor: lightBlue[500]
  }
});

class LoadingScreen extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.itemsWrapper}>
          <Loader />
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(LoadingScreen);
