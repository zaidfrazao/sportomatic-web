import React, { Component } from "react";
import {
  common,
  grey,
  lightBlue
} from "../../../../../../../../../../utils/colours";
import injectStyles from "react-jss";

const styles = {
  switchLeft: {
    flexGrow: 1,
    fontSize: 16,
    lineHeight: "23px",
    padding: "8px 14px",
    backgroundColor: common["white"],
    border: `1px solid ${grey[300]}`,
    textAlign: "center",
    cursor: "pointer",
    transition: "0.25s",
    "&:hover": {
      backgroundColor: grey[300]
    }
  },
  switchRight: {
    flexGrow: 1,
    fontSize: 16,
    lineHeight: "23px",
    backgroundColor: common["white"],
    border: `1px solid ${grey[300]}`,
    textAlign: "center",
    cursor: "pointer",
    padding: "8px 14px",
    transition: "0.25s",
    "&:hover": {
      backgroundColor: grey[300]
    }
  },
  switchSelectedLeft: {
    flexGrow: 1,
    padding: "8px 14px",
    fontSize: 16,
    lineHeight: "23px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.25s",
    color: common["white"],
    backgroundColor: lightBlue[500],
    border: `1px solid ${lightBlue[500]}`,
    "&:hover": {
      border: `1px solid ${lightBlue[400]}`,
      backgroundColor: lightBlue[400]
    }
  },
  switchSelectedRight: {
    flexGrow: 1,
    fontSize: 16,
    lineHeight: "23px",
    textAlign: "center",
    cursor: "pointer",
    padding: "8px 14px",
    transition: "0.25s",
    color: common["white"],
    backgroundColor: lightBlue[500],
    border: `1px solid ${lightBlue[500]}`,
    "&:hover": {
      border: `1px solid ${lightBlue[400]}`,
      backgroundColor: lightBlue[400]
    }
  },
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  }
};

type Props = {
  classes: {
    wrapper: string
  }
};

class Switch extends Component<Props> {
  render() {
    const { classes, selected, toggleHomeAway } = this.props;

    return (
      <div className={classes.wrapper}>
        <span
          className={
            selected === "home"
              ? classes.switchSelectedLeft
              : classes.switchLeft
          }
          onClick={() => toggleHomeAway("home")}
        >
          Home
        </span>
        <span
          className={
            selected === "away"
              ? classes.switchSelectedRight
              : classes.switchRight
          }
          onClick={() => toggleHomeAway("away")}
        >
          Away
        </span>
      </div>
    );
  }
}

export default injectStyles(styles)(Switch);
