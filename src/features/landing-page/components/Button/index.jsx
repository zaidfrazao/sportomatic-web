import React, { Component } from "react";
import { lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  button: {
    backgroundColor: lightBlue[500],
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: lightBlue[300]
    }
  }
});

class Button extends Component {
  render() {
    const { classes, children } = this.props;

    return <input type="submit" value={children} className={classes.button} />;
  }
}

export default withStyles(styles)(Button);
