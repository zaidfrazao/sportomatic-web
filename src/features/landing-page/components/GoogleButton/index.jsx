import React, { Component } from "react";
import { orange } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  button: {
    width: "100%",
    backgroundColor: orange[900],
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: orange[700]
    }
  }
});

class GoogleButton extends Component {
  render() {
    const { classes } = this.props;

    return (
      <button className={classes.button}>
        <i className="fab fa-google" /> Sign up free with Google
      </button>
    );
  }
}

export default withStyles(styles)(GoogleButton);
