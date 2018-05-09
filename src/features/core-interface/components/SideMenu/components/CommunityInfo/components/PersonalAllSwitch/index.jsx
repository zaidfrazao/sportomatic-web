import React, { Component } from "react";
import { common, grey, lightBlue } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  button: {
    borderRadius: 8,
    backgroundColor: lightBlue[800],
    color: common["white"],
    padding: 12,
    margin: 8,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  switchLeft: {
    borderRadius: "8px 0 0 8px",
    backgroundColor: grey[100],
    textAlign: "center",
    cursor: "pointer",
    height: "100%",
    padding: "8px 0",
    width: "50%",
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
    width: "50%",
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
    const {
      classes,
      meAllFilter,
      changeMeAllFilter,
      switchCommunities
    } = this.props;

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
            Me
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
        <div className={classes.button} onClick={() => switchCommunities()}>
          <i className="fas fa-exchange-alt" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PersonalAllSwitch);
