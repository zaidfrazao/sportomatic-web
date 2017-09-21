// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

class HoursLayout extends Component {
  render() {
    const { classes } = this.props;

    return <div className={classes.root} />;
  }
}

HoursLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoursLayout);
