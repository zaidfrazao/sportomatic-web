import React, { Component } from "react";
import {
  common,
  grey,
  orange
} from "../../../../../../../../../../utils/colours";
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
    backgroundColor: orange["A400"],
    border: `2px solid ${orange["A400"]}`,
    "&:hover": {
      border: `2px solid ${orange["A200"]}`,
      backgroundColor: orange["A200"]
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
    backgroundColor: orange["A400"],
    border: `2px solid ${orange["A400"]}`,
    "&:hover": {
      border: `2px solid ${orange["A200"]}`,
      backgroundColor: orange["A200"]
    }
  },
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    margin: "12px 0"
  }
};

type Props = {
  classes: {
    wrapper: string
  }
};

class Switch extends Component<Props> {
  render() {
    const { classes, selected, toggleSelected } = this.props;

    return (
      <div className={classes.wrapper}>
        <span
          className={
            selected === "yes" ? classes.switchSelectedLeft : classes.switchLeft
          }
          onClick={() => toggleSelected("yes")}
        >
          Track optional stats
        </span>
        <span
          className={
            selected === "no"
              ? classes.switchSelectedRight
              : classes.switchRight
          }
          onClick={() => toggleSelected("no")}
        >
          Don't track
        </span>
      </div>
    );
  }
}

export default injectStyles(styles)(Switch);
