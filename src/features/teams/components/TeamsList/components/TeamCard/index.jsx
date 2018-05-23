import React, { Component } from "react";
import injectStyles from "react-jss";
import Button from "../../../../../../components/Button";
import { grey, lightBlue } from "../../../../../../utils/colours";

const styles = {
  alertIcon: {
    marginRight: 12
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "0 0 16px 16px",
    backgroundColor: lightBlue[500],
    "&:hover": {
      backgroundColor: lightBlue[400]
    }
  },
  header: {
    fontSize: 18,
    borderRadius: "16px 16px 0 0",
    padding: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: grey[100]
  },
  inactiveAlert: {
    fontSize: 14,
    padding: "12px 0",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[400],
    backgroundColor: grey[300]
  },
  setupButtonWrapper: {
    margin: 12
  }
};

class TeamCard extends Component {
  render() {
    const {
      classes,
      name,
      id,
      isInSeason,
      isUserAdmin,
      navigateTo
    } = this.props;

    return (
      <div className={classes.card}>
        <div className={classes.header}>{name}</div>
        {!isInSeason && (
          <div className={classes.inactiveAlert}>
            <i className={`fas fa-exclamation ${classes.alertIcon}`} />Not in
            season
          </div>
        )}
        {isUserAdmin &&
          !isInSeason && (
            <div className={classes.setupButtonWrapper}>
              <Button colour="secondary" slim fullWidth>
                Set up new season
              </Button>
            </div>
          )}
        <div className={classes.buttons}>
          <Button
            colour="primary"
            filled
            fullWidth
            handleClick={() => navigateTo(`/myaccount/teams/${id}`)}
          >
            View
          </Button>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(TeamCard);
