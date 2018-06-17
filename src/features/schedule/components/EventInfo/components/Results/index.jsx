import React, { Component } from "react";
import injectStyles from "react-jss";
import EmptyState from "../../../../../../components/EmptyState";
import { grey } from "../../../../../../utils/colours";

const styles = {
  wrenchIcon: {
    marginRight: 12,
    fontSize: 30,
    color: grey[700]
  },
  wrapper: {
    margin: 24
  }
};

class Results extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <EmptyState>
          <i className={`fas fa-wrench ${classes.wrenchIcon}`} />This feature is
          coming soon.
        </EmptyState>
      </div>
    );
  }
}

export default injectStyles(styles)(Results);
