import React, { Component } from "react";
import injectSheet from "react-jss";
import { green, grey } from "../../utils/colours";

const styles = theme => ({
  bar: {
    height: "100%",
    backgroundColor: green[500],
    borderRadius: 16,
    width: props => `${props.progress}%`
  },
  wrapper: {
    height: 24,
    backgroundColor: grey[300],
    borderRadius: 16,
    width: "100%"
  }
});

class ProgressBar extends Component {
  static defaultProps = {
    progress: 50
  };

  render() {
    const { classes, progress } = this.props;

    console.log(progress);

    return (
      <div className={classes.wrapper}>
        <div className={classes.bar} />
      </div>
    );
  }
}

export default injectSheet(styles)(ProgressBar);
