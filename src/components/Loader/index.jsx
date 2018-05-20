import React, { Component } from "react";
import injectStyles from "react-jss";
import { grey, lightBlue } from "../../utils/colours";

const styles = theme => ({
  loader: {
    border: `8px solid ${grey[200]}`,
    borderTop: `8px solid ${lightBlue[500]}`,
    borderRadius: "50%",
    width: 32,
    height: 32,
    margin: 12,
    animation: "spin 2s linear infinite"
  },
  wrapper: {
    color: grey[300],
    fontWeight: "bold",
    fontSize: 24,
    display: "flex",
    alignItems: "center"
  }
});

class Loader extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        Loading<div className={classes.loader} />
      </div>
    );
  }
}

export default injectStyles(styles)(Loader);
