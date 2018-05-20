import React, { Component } from "react";
import injectStyles from "react-jss";
import Button from "../../../../components/Button";
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
    const { classes, goBack, isMobile } = this.props;

    return (
      <div className={classes.wrapper}>
        {isMobile && (
          <div className={classes.actionsBar}>
            <div className={classes.buttonWrapper}>
              <Button colour="secondary" slim handleClick={() => goBack()}>
                <i
                  className={`fas fa-caret-left ${classes.iconAdjacentText}`}
                />
                Back
              </Button>
            </div>
            <div className={classes.flexGrow} />
          </div>
        )}
        <EmptyState message="Coming Soon" />
      </div>
    );
  }
}

export default injectStyles(styles)(Results);
