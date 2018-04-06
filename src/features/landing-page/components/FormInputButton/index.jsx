import React, { Component } from "react";
import { lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  button: {
    width: "100%",
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

class AppBarButton extends Component {
  render() {
    const { classes, text } = this.props;

    return <input type="submit" value={text} className={classes.button} />;
  }
}

export default withStyles(styles)(AppBarButton);
