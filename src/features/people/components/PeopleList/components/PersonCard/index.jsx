import React, { Component } from "react";
import _ from "lodash";
import injectStyles from "react-jss";
import { common, grey, lightBlue, red } from "../../../../../../utils/colours";
import Button from "../../../../../../components/Button";
import defaultProfilePicture from "../../../../image/default-profile-picture.png";

const styles = {
  alertIcon: {
    marginRight: 12
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "0 0 16px 16px",
    backgroundColor: lightBlue[500]
  },
  card: {
    borderRadius: 16,
    maxWidth: 400,
    backgroundColor: common["white"],
    margin: "0 auto"
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
    color: common["white"],
    backgroundColor: red[500]
  },
  resendButtonWrapper: {
    margin: "0 24px 24px 24px"
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
    const { teams, id, isAdmin } = this.props;

    let isManager = false;
    let isCoach = false;

    personTeams.map(personTeamInfo => {
      const completeTeamInfo = teams[personTeamInfo.id];

      if (completeTeamInfo) {
        if (completeTeamInfo.coaches[id]) isCoach = true;
        if (completeTeamInfo.managers[id]) isManager = true;
      }
    });

    if (isAdmin && isManager && isCoach) {
      return "Admin | Manager | Coach";
    } else if (isAdmin && isManager && !isCoach) {
      return "Admin | Manager";
    } else if (isAdmin && !isManager && isCoach) {
      return "Admin | Coach";
    } else if (!isAdmin && isManager && isCoach) {
      return "Manager | Coach";
    } else if (isAdmin && !isManager && !isCoach) {
      return "Admin";
    } else if (!isAdmin && isManager && !isCoach) {
      return "Manager";
    } else if (!isAdmin && !isManager && isCoach) {
      return "Coach";
    } else {
      return "No Role Assigned";
    }
  }

  render() {
    const {
      classes,
      isUserAdmin,
      name,
      surname,
      profilePictureURL,
      id,
      status,
      resendInvite,
      isLoading,
      navigateTo
    } = this.props;

    const teams = this.getTeams();
    const roles = this.getRoles(teams);

    return (
      <div className={classes.card}>
        <div className={classes.header}>{`${name} ${surname}`}</div>
        {status === "INACTIVE" && (
          <div className={classes.inactiveAlert}>
            <i className={`fas fa-exclamation ${classes.alertIcon}`} />Not yet
            signed up
          </div>
        )}
        <div className={classes.roles}>{roles}</div>
        <div className={classes.pictureWrapper}>
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
        {isUserAdmin &&
          status === "INACTIVE" && (
            <div className={classes.resendButtonWrapper}>
              <Button
                colour="secondary"
                slim
                fullWidth
                loading={isLoading}
                handleClick={() => resendInvite()}
              >
                Resend invite
              </Button>
            </div>
          )}
        <div className={classes.buttons}>
          <Button
            colour="primary"
            filled
            fullWidth
            handleClick={() => navigateTo(`/myaccount/people/${id}`)}
          >
            View
          </Button>
        </div>
      </div>
    );
  }
}

export default injectStyles(styles)(PersonCard);
