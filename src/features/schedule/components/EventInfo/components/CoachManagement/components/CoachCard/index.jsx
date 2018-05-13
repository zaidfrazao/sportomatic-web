import React, { Component } from "react";
import {
  common,
  green,
  grey,
  orange,
  red
} from "../../../../../../../../utils/colours";
import injectStyles from "react-jss";
import Button from "../../../../../../../../components/Button";
import defaultProfilePicture from "./images/default-profile-picture.png";

const styles = {
  buttonPrimaryWrapper: {
    borderRadius: "0 0 16px 16px",
    backgroundColor: orange["A400"]
  },
  buttonSecondaryWrapper: {
    padding: 12
  },
  card: {
    borderRadius: 16,
    maxWidth: 400,
    backgroundColor: common["white"],
    margin: "0 auto"
  },
  deltaNegative: {
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    fontSize: 12,
    margin: "0 12px",
    backgroundColor: red[500],
    color: common["white"]
  },
  deltaPositive: {
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    fontSize: 12,
    margin: "0 12px",
    backgroundColor: green[500],
    color: common["white"]
  },
  header: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: 12,
    width: "calc(100% - 24px)",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100],
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  picture: {
    marginRight: 12,
    borderRadius: "50%",
    width: 40,
    height: 40
  },
  timesIconWrapper: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: grey[100],
    width: 80,
    padding: "24px 0"
  },
  timesText: {
    flex: 1,
    paddingLeft: 12,
    color: grey[700]
  },
  timesWrapper: {
    borderTop: `1px solid ${grey[100]}`,
    display: "flex",
    alignItems: "center"
  }
};

class CoachCard extends Component {
  render() {
    const { classes, name, profilePicture } = this.props;

    return (
      <div className={classes.card}>
        <div className={classes.header}>
          <img
            className={classes.picture}
            src={profilePicture === "" ? defaultProfilePicture : profilePicture}
            alt={name}
          />
          {name}
        </div>
        <div className={classes.buttonSecondaryWrapper}>
          <Button colour="primary" slim fullWidth>
            Mark absent
          </Button>
        </div>
        <div className={classes.timesWrapper}>
          <div className={classes.timesIconWrapper}>
            <span>Sign in</span>
          </div>
          <span className={classes.timesText}>{"12:48 PM"}</span>
          <span className={classes.deltaPositive}>{"-12 min"}</span>
        </div>
        <div className={classes.timesWrapper}>
          <div className={classes.timesIconWrapper}>
            <span>Sign out</span>
          </div>
          <span className={classes.timesText}>{"2:32 PM"}</span>
          <span className={classes.deltaNegative}>{"+32 min"}</span>
        </div>
        <div className={classes.buttonPrimaryWrapper}>
          <Button colour="secondary" filled fullWidth>
            Sign in
          </Button>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(CoachCard);
