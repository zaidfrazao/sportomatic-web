// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { CircularProgress } from "material-ui/Progress";
import AddIcon from "material-ui-icons/Add";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/Edit";
import TeamsList from "./components/TeamsList";
import TeamInfo from "./components/TeamInfo";
import AddTeamDialog from "./components/AddTeamDialog";
import LeaderboardAd from "../../../components/LeaderboardAd";
import BannerAd from "../../../components/BannerAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import NotificationModal from "../../../components/NotificationModal";
import _ from "lodash";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  infoWrapper: {
    width: "100%",
    height: "100%"
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
    const { userID } = this.props;
    const { loadTeams } = this.props.actions;
    loadTeams(userID);
  }

  componentWillReceiveProps(nextProps) {
    const { userID } = this.props;
    const { loadTeams } = this.props.actions;

    if (userID !== nextProps.userID) {
      loadTeams(nextProps.userID);
    }
  }

  render() {
    const {
      classes,
      teams,
      options,
      coaches,
      managers,
      userID,
      isMobile,
      isTablet
    } = this.props;
    const {
      isAddTeamDialogOpen,
      isEditTeamAlertOpen,
      isDeleteTeamAlertOpen
    } = this.props.dialogs;
    const { isAddTeamDialogLoading, isTeamsLoading } = this.props.loadingStatus;
    const {
      openAddTeamDialog,
      closeAddTeamDialog,
      loadStaff,
      loadOptions,
      addTeam,
      openEditTeamAlert,
      closeEditTeamAlert,
      openDeleteTeamAlert,
      closeDeleteTeamAlert
    } = this.props.actions;
    const { teamID } = this.props.match.params;

    const teamsList = _.toPairs(teams).map(keyValuePair => {
      return {
        id: keyValuePair[0],
        name: keyValuePair[1].metadata.name,
        sport: keyValuePair[1].metadata.sport
      };
    });

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.root}>
        {teamID && teams[teamID] ? (
          <div className={classes.infoWrapper}>
            <TeamInfo
              info={teams[teamID]}
              isMobile={isMobile}
              isTablet={isTablet}
            />
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
            <div className={classes.adWrapper}>{ad}</div>
            {isTeamsLoading ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <TeamsList teams={teamsList} actions={{ openDeleteTeamAlert }} />
            )}
            <Button
              fab
              color="accent"
              aria-label="add team"
              className={classes.button}
              onClick={() => {
                loadOptions(userID);
                loadStaff(userID);
                openAddTeamDialog();
              }}
            >
              <AddIcon />
            </Button>
            <NotificationModal
              isOpen={isDeleteTeamAlertOpen}
              handleOkClick={closeDeleteTeamAlert}
              heading="Unavailable in Beta"
              message="The ability to delete teams is unavailable in this version of the beta."
            />
          </div>
        )}
        <AddTeamDialog
          isOpen={isAddTeamDialogOpen}
          isLoading={isAddTeamDialogLoading}
          institutionID={userID}
          options={options}
          coaches={coaches}
          managers={managers}
          actions={{ handleClose: closeAddTeamDialog, addTeam }}
        />
      </div>
    );
  }
}

TeamsLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamsLayout);
