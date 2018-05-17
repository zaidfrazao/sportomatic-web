import React, { Component } from "react";
import injectStyles from "react-jss";
import EmptyState from "../../../../components/EmptyState";

const styles = {
  wrapper: {
    margin: 24
  }
};

class Results extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <EmptyState message="Coming Soon" />
      </div>
    );
  }
}

export default injectStyles(styles)(Results);
