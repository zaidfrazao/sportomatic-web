/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectStyles from "react-jss";
import {
  common,
  grey,
  lightBlue,
  orange
} from "../../../../../../utils/colours";
import Button from "../../../../../../components/Button";
import defaultProfilePicture from "../../../../image/default-profile-picture.png";

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
    padding: "12px 0",
    textAlign: "center",
    fontWeight: "bold",
    color: grey[400],
    borderRadius: 8,
    margin: "0 12px 12px 12px",
    backgroundColor: grey[100]
  },
  resendButtonWrapper: {
    transition: "0.25s",
    borderRadius: "0 0 16px 16px",
    backgroundColor: orange["A400"],
    "&:hover": {
      backgroundColor: orange["A200"]
    }
  },
  picture: {
    width: "100%",
    height: "auto",
    backgroundColor: grey[300],
    borderRadius: 12
  },
  pictureWrapper: {
    padding: "0 24px 24px 24px"
  },
  roles: {
    color: grey[500],
    padding: 16,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  }
};

class PersonCard extends Component {
  getTeams() {
    const { id, teams } = this.props;

    return _.toPairs(teams)
      .map(([teamID, teamInfo]) => {
        return {
          id: teamID,
          name: teamInfo.info.name,
          coaches: teamInfo.coaches,
          managers: teamInfo.managers
        };
      })
      .filter(teamInfo => teamInfo.coaches[id] || teamInfo.managers[id]);
  }

  getRoles(personTeams) {
    const { id, isAdmin, seasons } = this.props;

    let isManager = false;
    let isCoach = false;
    let isAthlete = false;
    let isParent = false;

    _.toPairs(seasons).map(([seasonID, seasonInfo]) => {
      isCoach = isCoach || seasonInfo.coaches[id];
      isManager = isManager || seasonInfo.managers[id];
      isAthlete = isAthlete || (seasonInfo.athletes && seasonInfo.athletes[id]);
      isParent = isParent || (seasonInfo.parents && seasonInfo.parents[id]);
    });

    let roles = "";

    if (isAdmin) {
      roles = roles === "" ? "Admin" : roles + " | Admin";
    }
    if (isCoach) {
      roles = roles === "" ? "Coach" : roles + " | Coach";
    }
    if (isManager) {
      roles = roles === "" ? "Manager" : roles + " | Manager";
    }
    if (isAthlete) {
      roles = roles === "" ? "Athlete" : roles + " | Athlete";
    }
    if (isParent) {
      roles = roles === "" ? "Parent" : roles + " | Parent";
    }
    if (roles === "") {
      roles = "No Role Assigned";
    }

    return roles;
  }

  render() {
    const {
      classes,
      isUserAdmin,
      name,
      surname,
      profilePictureURL,
      id,
      isSignedUp,
      resendInvite,
      isLoading,
      navigateTo
    } = this.props;

    const teams = this.getTeams();
    const roles = this.getRoles(teams);

    return (
      <div className={classes.card}>
        <div
          className={classes.header}
          onClick={() => navigateTo(`/myaccount/people/${id}`)}
        >{`${name} ${surname}`}</div>
        <div
          className={classes.roles}
          onClick={() => navigateTo(`/myaccount/people/${id}`)}
        >
          {roles}
        </div>
        <div
          className={classes.pictureWrapper}
          onClick={() => navigateTo(`/myaccount/people/${id}`)}
        >
          <img
            className={classes.picture}
            src={
              profilePictureURL === ""
                ? defaultProfilePicture
                : profilePictureURL
            }
            alt={name}
          />
        </div>
        {!isSignedUp && (
          <div
            className={classes.inactiveAlert}
            onClick={() => navigateTo(`/myaccount/people/${id}`)}
          >
            <i className={`fas fa-exclamation ${classes.alertIcon}`} />Not yet
            signed up
          </div>
        )}
        {isUserAdmin &&
          !isSignedUp && (
            <div className={classes.resendButtonWrapper}>
              <Button
                colour="secondary"
                fullWidth
                filled
                loading={isLoading}
                handleClick={() => resendInvite()}
              >
                Resend invite
              </Button>
            </div>
          )}
      </div>
    );
  }
}

export default injectStyles(styles)(PersonCard);
