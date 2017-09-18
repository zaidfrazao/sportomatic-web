// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";

const styles = theme => ({
  root: {
    height: "100%",
    backgroundColor: grey[500]
  }
});

class EventsList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h2>EventsList</h2>
      </div>
    );
  }
}

EventsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventsList);
