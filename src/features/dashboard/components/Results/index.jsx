import React, { Component } from "react";
import injectStyles from "react-jss";
import EmptyState from "../../../../components/EmptyState";
import { grey } from "../../../../utils/colours";

const styles = {
  actionsBar: {
    marginBottom: 24,
    backgroundColor: grey[200],
    display: "flex",
    justifyContent: "center"
  },
  flexGrow: {
    flexGrow: 1
  },
  iconAdjacentText: {
    marginRight: 8
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
        <EmptyState message="Coming Soon" />
      </div>
    );
  }
}

export default injectStyles(styles)(Results);
