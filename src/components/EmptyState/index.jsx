import React, { Component } from "react";
import injectStyles from "react-jss";
import { common, grey } from "../../utils/colours";

const styles = {
  message: {
    flexGrow: 1,
    borderRadius: 16,
    backgroundColor: common["white"],
    color: grey[400],
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: "72px 24px"
  }
};

class EmptyState extends Component {
  render() {
    const { classes, message } = this.props;

    return <div className={classes.message}>{message}</div>;
  }
}

export default injectStyles(styles)(EmptyState);
