// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";

const styles = theme => ({
  root: {
    height: "100%",
    backgroundColor: grey[300]
  }
});

class Calendar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h2>Calendar</h2>
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Calendar);
