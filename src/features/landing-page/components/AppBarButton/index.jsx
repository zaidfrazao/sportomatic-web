import React, { Component } from "react";
import { lightBlue, orange } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  login: {
    padding: "8px 14px",
    margin: "0 8px",
    color: orange["A400"],
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: `2px solid ${orange["A400"]}`,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: orange[50],
      cursor: "pointer"
    }
  },
  signup: {
    padding: "8px 14px",
    margin: "0 8px",
    color: "white",
    backgroundColor: lightBlue[500],
    border: `2px solid ${lightBlue[500]}`,
    borderRadius: 5,
    "&:hover": {
      border: `2px solid ${lightBlue[300]}`,
      backgroundColor: lightBlue[300],
      cursor: "pointer"
    }
  }
});

class AppBarButton extends Component {
  render() {
    const { classes, type } = this.props;

    if (type === "login") {
      return <button className={classes.login}>Log in</button>;
    } else {
      return <button className={classes.signup}>Sign up for free</button>;
    }
  }
}

export default withStyles(styles)(AppBarButton);
