import React, { Component } from "react";
import _ from "lodash";
import { CircularProgress } from "material-ui/Progress";
import { withStyles } from "material-ui/styles";
import AddTeamDialog from "./components/AddTeamDialog";
import BannerAd from "../../../components/BannerAd";
import FiltersToolbar from "./components/FiltersToolbar";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../components/LeaderboardAd";
import NotificationModal from "../../../components/NotificationModal";
import TeamInfo from "./components/TeamInfo";
import TeamsList from "./components/TeamsList";

const styles = theme => ({
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
  infoWrapper: {
    width: "100%",
    height: "100%"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
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
  state = {
    genders: {},
    sports: {},
    divisions: {},
    ageGroups: {}
  };

  componentWillMount() {
    const { userID } = this.props;
    const { loadTeams, loadCoaches, loadManagers } = this.props.actions;

    if (userID !== "") {
      loadTeams(userID);
      loadCoaches(userID);
      loadManagers(userID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userID, teams } = this.props;
    const { loadTeams, loadCoaches, loadManagers } = this.props.actions;

    if (userID !== nextProps.userID) {
      loadTeams(nextProps.userID);
      loadCoaches(nextProps.userID);
      loadManagers(nextProps.userID);
    }

    let genders = this.state.genders;
    let sports = this.state.sports;
    let divisions = this.state.divisions;
    let ageGroups = this.state.ageGroups;

    if (teams !== nextProps.teams) {
      genders = {};
      sports = {};
      divisions = {};
      ageGroups = {};
      _.toPairs(nextProps.teams).map(([id, info]) => {
        genders = {
          ...genders,
          [info.info.gender]: true
        };
        sports = {
          ...sports,
          [info.info.sport]: true
        };
        divisions = {
          ...divisions,
          [info.info.division]: true
        };
        ageGroups = {
          ...ageGroups,
          [info.info.ageGroup]: true
        };
      });
    }

    this.setState({
      genders,
      sports,
      divisions,
      ageGroups
    });
  }

  createAd() {
    const { isMobile, isTablet } = this.props;

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return ad;
  }

  getTeamsList() {
    const { teams } = this.props;

    return _.toPairs(teams).map(keyValuePair => {
      return {
        id: keyValuePair[0],
        name: keyValuePair[1].info.name,
        sport: keyValuePair[1].info.sport
      };
    });
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
      isTablet,
      filters
    } = this.props;
    const {
      isAddTeamDialogOpen,
      isEditTeamAlertOpen,
      isDeleteTeamAlertOpen
    } = this.props.dialogs;
    const {
      isAddTeamDialogLoading,
      isTeamsLoading,
      isManagersLoading,
      isCoachesLoading
    } = this.props.loadingStatus;
    const {
      openAddTeamDialog,
      closeAddTeamDialog,
      loadStaff,
      loadOptions,
      addTeam,
      openEditTeamAlert,
      closeEditTeamAlert,
      openDeleteTeamAlert,
      closeDeleteTeamAlert,
      applyFilters,
      updateSearch
    } = this.props.actions;
    const { teamID } = this.props.match.params;

    const teamsList = this.getTeamsList();
    const ad = this.createAd();

    return (
      <div className={classes.root}>
        {teamID ? (
          <div className={classes.infoWrapper}>
            <TeamInfo
              isTeamsLoading={isTeamsLoading}
              isCoachesLoading={isCoachesLoading}
              isManagersLoading={isManagersLoading}
              coaches={coaches}
              managers={managers}
              info={teams[teamID]}
              isMobile={isMobile}
              isTablet={isTablet}
              actions={{
                editTeam: openEditTeamAlert
              }}
            />
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
            <FiltersToolbar
              genders={_.keys(this.state.genders)}
              sports={_.keys(this.state.sports)}
              divisions={_.keys(this.state.divisions)}
              ageGroups={_.keys(this.state.ageGroups)}
              initialFilters={filters}
              applyFilters={applyFilters}
              addTeam={openAddTeamDialog}
              updateSearch={updateSearch}
            />
            <div className={classes.adWrapper}>{ad}</div>
            {isTeamsLoading ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <TeamsList teams={teamsList} actions={{ openDeleteTeamAlert }} />
            )}
            <NotificationModal
              isOpen={isDeleteTeamAlertOpen}
              handleOkClick={closeDeleteTeamAlert}
              heading="Unavailable in Beta"
              message="The ability to delete teams is unavailable in this version of the beta."
            />
          </div>
        )}
        {false && (
          <AddTeamDialog
            isOpen={isAddTeamDialogOpen}
            isLoading={isAddTeamDialogLoading}
            institutionID={userID}
            options={options}
            coaches={coaches}
            managers={managers}
            actions={{ handleClose: closeAddTeamDialog, addTeam }}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(TeamsLayout);
