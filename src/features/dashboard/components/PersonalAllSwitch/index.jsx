import React, { Component } from "react";
import { common, grey, lightBlue } from "../../../../utils/colours";
import injectStyles from "react-jss";

const styles = {
  switchLeft: {
    flexGrow: 1,
    fontSize: 16,
    lineHeight: "23px",
    padding: "8px 14px",
    borderRadius: "8px 0 0 8px",
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
    borderRadius: "0 8px 8px 0",
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
    borderRadius: "8px 0 0 8px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.25s",
    color: common["white"],
    backgroundColor: lightBlue[500],
    border: `2px solid ${lightBlue[500]}`,
    "&:hover": {
      border: `2px solid ${lightBlue[400]}`,
      backgroundColor: lightBlue[400]
    }
  },
  switchSelectedRight: {
    flexGrow: 1,
    borderRadius: "0 8px 8px 0",
    fontSize: 16,
    lineHeight: "23px",
    textAlign: "center",
    cursor: "pointer",
    padding: "8px 14px",
    transition: "0.25s",
    color: common["white"],
    backgroundColor: lightBlue[500],
    border: `2px solid ${lightBlue[500]}`,
    "&:hover": {
      border: `2px solid ${lightBlue[400]}`,
      backgroundColor: lightBlue[400]
    }
  },
  wrapper: {
    width: props => (props.isMobile ? "100%" : "auto"),
    display: "flex",
    alignItems: "center"
  }
};

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
        <span
          className={
            meAllFilter === "me"
              ? classes.switchSelectedLeft
              : classes.switchLeft
          }
          onClick={() => changeMeAllFilter("me")}
        >
          My Events
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
    );
  }
}

export default injectStyles(styles)(PersonalAllSwitch);
