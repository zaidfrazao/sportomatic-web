import React, { Component } from "react";
import { blue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  button: {
    width: "100%",
    backgroundColor: blue[900],
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: blue[700]
    }
  }
});

class FacebookButton extends Component {
  render() {
    const { classes } = this.props;

    return (
      <button className={classes.button}>
        <i className="fab fa-facebook" /> Sign up free with Facebook
      </button>
    );
  }
}

export default withStyles(styles)(FacebookButton);
