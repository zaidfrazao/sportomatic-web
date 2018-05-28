import React, { Component } from "react";
import injectStyles from "react-jss";
import Button from "../../../../../../components/Button";
import {
  common,
  grey,
  lightBlue,
  orange
} from "../../../../../../utils/colours";

const styles = {
  alertIcon: {
    marginRight: 12
  },
  card: {
    transition: "0.25s",
    backgroundColor: common["white"],
    borderRadius: 16,
    cursor: "pointer",
    border: `1px solid ${grey[300]}`,
    "&:hover": {
      boxShadow:
        "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
  },
  header: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: common["white"],
    backgroundColor: lightBlue[800]
  },
  inactiveAlert: {
    fontSize: 14,
    padding: 24,
    margin: 12,
    borderRadius: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[500],
    backgroundColor: grey[100],
    border: `1px solid ${grey[300]}`
  },
  setupButtonWrapper: {
    transition: "0.25s",
    borderRadius: "0 0 16px 16px",
    backgroundColor: orange["A400"],
    "&:hover": {
      backgroundColor: orange["A200"]
    }
  }
};

class TeamCard extends Component {
  render() {
    const {
      classes,
      name,
      id,
      seasonStatus,
      isUserAdmin,
      navigateTo,
      setUpSeason
    } = this.props;

    console.log(this.props);

    return (
      <div className={classes.card}>
        <div
          className={classes.header}
          onClick={() => navigateTo(`/myaccount/teams/${id}`)}
        >
          {name}
        </div>
        <div
          className={classes.content}
          onClick={() => navigateTo(`/myaccount/teams/${id}`)}
        >
          {seasonStatus === "OUT_OF_SEASON" && (
            <div className={classes.inactiveAlert}>
              <i className={`fas fa-exclamation ${classes.alertIcon}`} />Not in
              season
            </div>
          )}
          {seasonStatus === "IN_SEASON" && (
            <div className={classes.inactiveAlert}>Season in progress</div>
          )}
          {seasonStatus === "UPCOMING_SEASON" && (
            <div className={classes.inactiveAlert}>Season starting soon</div>
          )}
        </div>
        {isUserAdmin &&
          seasonStatus === "OUT_OF_SEASON" && (
            <div className={classes.setupButtonWrapper}>
              <Button
                colour="secondary"
                filled
                fullWidth
                handleClick={() => setUpSeason(name, id)}
              >
                Set up new season
              </Button>
            </div>
          )}
      </div>
    );
  }
}

export default injectStyles(styles)(TeamCard);
