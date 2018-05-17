import React, { Component } from "react";
import { common, grey, lightBlue } from "material-ui/colors";
import injectStyles from "react-jss";

const styles = theme => ({
  switchLeft: {
    borderRadius: "8px 0 0 8px",
    backgroundColor: grey[100],
    textAlign: "center",
    cursor: "pointer",
    height: "100%",
    padding: "8px 0",
    width: "60%",
    "&:hover": {
      backgroundColor: grey[300]
    }
  },
  switchRight: {
    borderRadius: "0 8px 8px 0",
    backgroundColor: grey[100],
    textAlign: "center",
    cursor: "pointer",
    height: "100%",
    padding: "8px 0",
    width: "40%",
    "&:hover": {
      backgroundColor: grey[300]
    }
  },
  switchGroup: {
    flexGrow: 1,
    display: "flex"
  },
  switchSelectedLeft: {
    borderRadius: "8px 0 0 8px",
    textAlign: "center",
    background: lightBlue[800],
    color: common["white"],
    fontWeight: "bold",
    cursor: "pointer",
    padding: "8px 0",
    flexGrow: 1,
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  switchSelectedRight: {
    borderRadius: "0 8px 8px 0",
    textAlign: "center",
    background: lightBlue[800],
    color: common["white"],
    fontWeight: "bold",
    cursor: "pointer",
    padding: "8px 0",
    flexGrow: 1,
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  }
});

type Props = {
  classes: {
    wrapper: string
  }
};

class PersonalAllSwitch extends Component<Props> {
  render() {
    const { classes, meAllFilter, changeMeAllFilter } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.switchGroup}>
          <span
            className={
              meAllFilter === "me"
                ? classes.switchSelectedLeft
                : classes.switchLeft
            }
            onClick={() => changeMeAllFilter("me")}
          >
            My Teams
          </span>
          <span
            className={
              meAllFilter === "all"
                ? classes.switchSelectedRight
                : classes.switchRight
            }
            onClick={() => changeMeAllFilter("all")}
          >
            All
          </span>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(PersonalAllSwitch);
