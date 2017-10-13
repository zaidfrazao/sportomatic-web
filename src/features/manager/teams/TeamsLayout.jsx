// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/Edit";
import TeamsList from "./components/TeamsList";
import TeamInfo from "./components/TeamInfo";
import LeaderboardAd from "../../../components/LeaderboardAd";
import NotificationModal from "../../../components/NotificationModal";
import _ from "lodash";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: 72,
    right: 24,
    "@media (min-width: 600px)": {
      bottom: 24
    }
  },
  toolbar: {
    backgroundColor: grey[300],
    zIndex: 1
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  teamCards: {
    flexGrow: 1,
    overflow: "auto"
  },
  teamNoCards: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  }
});

class TeamsLayout extends Component {
  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const { loadTeams } = this.props.actions;
    loadTeams(activeInstitutionID);
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID } = this.props;
    const { loadTeams } = this.props.actions;

    if (activeInstitutionID !== nextProps.activeInstitutionID) {
      loadTeams(nextProps.activeInstitutionID);
    }
  }

  render() {
    const { classes, teams, userID } = this.props;
    const { isEditTeamAlertOpen } = this.props.dialogs;
    const { isTeamsLoading } = this.props.loadingStatus;
    const { openEditTeamAlert, closeEditTeamAlert } = this.props.actions;
    const { teamID } = this.props.match.params;

    const teamsList = _.toPairs(teams).map(keyValuePair => {
      return {
        id: keyValuePair[0],
        name: keyValuePair[1].metadata.name,
        sport: keyValuePair[1].metadata.sport
      };
    });

    return (
      <div className={classes.root}>
        {teamID && teams[teamID] ? (
          <div>
            <TeamInfo info={teams[teamID]} userID={userID} />
            <Button
              fab
              color="accent"
              aria-label="edit team"
              className={classes.button}
              onClick={() => openEditTeamAlert()}
            >
              <EditIcon />
            </Button>
            <NotificationModal
              isOpen={isEditTeamAlertOpen}
              handleOkClick={closeEditTeamAlert}
              heading="Unavailable in Beta"
              message="The ability to edit teams is unavailable in this version of the beta."
            />
          </div>
        ) : (
          <div
            className={
              teamsList.length > 0 ? classes.teamCards : classes.teamNoCards
            }
          >
            <div className={classes.adWrapper}>
              <LeaderboardAd />
            </div>
            {isTeamsLoading ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <TeamsList teams={teamsList} />
            )}
          </div>
        )}
      </div>
    );
  }
}

TeamsLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamsLayout);
