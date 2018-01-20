/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { CircularProgress } from "material-ui/Progress";
import { withStyles } from "material-ui/styles";
import AddTeamDialog from "./components/AddTeamDialog";
import BannerAd from "../../../components/BannerAd";
import EditTeamDialog from "./components/EditTeamDialog";
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
    ageGroups: {},
    showDeletedTeams: false
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

  getTeamsList(teams) {
    return _.toPairs(teams).map(keyValuePair => {
      return {
        id: keyValuePair[0],
        name: keyValuePair[1].info.name,
        sport: keyValuePair[1].info.sport,
        status: keyValuePair[1].status
      };
    });
  }

  filterTeams() {
    const {
      gender,
      sport,
      division,
      ageGroup,
      searchText,
      showDeletedTeams
    } = this.props.filters;
    const { teams, coaches, managers } = this.props;

    return _.fromPairs(
      _.toPairs(teams).filter(([teamID, teamInfo]) => {
        let allowThroughFilter = true;
        let titleMatch = true;
        let coachMatch = true;
        let managerMatch = true;

        if (teamInfo.status === "DELETED" && !showDeletedTeams) {
          allowThroughFilter = false;
        }

        if (searchText !== "") {
          const teamName = _.toLower(teamInfo.info.name);
          const teamCoaches = _.keys(teamInfo.coaches);
          const teamManagers = _.keys(teamInfo.managers);

          teamCoaches.map(coachID => {
            const coachName = `${_.toLower(
              coaches[coachID].info.name
            )} ${_.toLower(coaches[coachID].info.surname)}`;
            coachMatch =
              coachMatch && coachName.includes(_.toLower(searchText));
          });
          teamManagers.map(managerID => {
            const managerName = `${_.toLower(
              managers[managerID].info.name
            )} ${_.toLower(managers[managerID].info.surname)}`;
            managerMatch =
              managerMatch && managerName.includes(_.toLower(searchText));
          });

          if (teamCoaches.length === 0) coachMatch = false;
          if (teamManagers.length === 0) managerMatch = false;
          titleMatch = teamName.includes(_.toLower(searchText));
        }

        if (gender !== "All") {
          allowThroughFilter =
            allowThroughFilter && teamInfo.info.gender === gender;
        }
        if (sport !== "All") {
          allowThroughFilter =
            allowThroughFilter && teamInfo.info.sport === sport;
        }
        if (division !== "All") {
          allowThroughFilter =
            allowThroughFilter && teamInfo.info.division === division;
        }
        if (ageGroup !== "All") {
          allowThroughFilter =
            allowThroughFilter && teamInfo.info.ageGroup === ageGroup;
        }

        allowThroughFilter =
          allowThroughFilter && (titleMatch || coachMatch || managerMatch);

        return allowThroughFilter;
      })
    );
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
      isEditTeamDialogOpen,
      isDeleteTeamAlertOpen,
      isTeamErrorAlertOpen
    } = this.props.dialogs;
    const {
      isAddTeamDialogLoading,
      isEditTeamDialogLoading,
      isTeamsLoading,
      isManagersLoading,
      isCoachesLoading,
      isOptionsLoading
    } = this.props.loadingStatus;
    const {
      openAddTeamDialog,
      closeAddTeamDialog,
      addTeam,
      openEditTeamDialog,
      closeEditTeamDialog,
      openDeleteTeamAlert,
      closeDeleteTeamAlert,
      applyFilters,
      updateSearch,
      loadOptions,
      openTeamErrorAlert,
      closeTeamErrorAlert,
      editTeam
    } = this.props.actions;
    const { errorType } = this.props.uiConfig;
    const { teamID } = this.props.match.params;

    const ad = this.createAd();
    const filteredTeams = this.getTeamsList(this.filterTeams());

    let teamErrorAlertHeading = "Team Name Required";
    let teamErrorAlertMessage =
      "You need to specify a name for this team before saving it.";
    if (errorType === "LOADING") {
      teamErrorAlertHeading = "Network Issue";
      teamErrorAlertMessage =
        "You have lost your connection to the internet. Please check your connectivity and try again.";
    }

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
                editTeam: () => {
                  openEditTeamDialog();
                  loadOptions(userID);
                }
              }}
            />
            <EditTeamDialog
              isOpen={isEditTeamDialogOpen}
              isMobile={isMobile}
              isLoading={
                isEditTeamDialogLoading ||
                isOptionsLoading ||
                isCoachesLoading ||
                isManagersLoading
              }
              teamID={teamID}
              initialTeamInfo={teams[teamID]}
              institutionID={userID}
              options={options}
              coaches={coaches}
              managers={managers}
              actions={{
                handleClose: closeEditTeamDialog,
                editTeam,
                openTeamErrorAlert
              }}
            />
          </div>
        ) : (
          <div
            className={
              filteredTeams.length > 0 ? classes.teamCards : classes.teamNoCards
            }
          >
            <FiltersToolbar
              genders={_.keys(this.state.genders)}
              sports={_.keys(this.state.sports)}
              divisions={_.keys(this.state.divisions)}
              ageGroups={_.keys(this.state.ageGroups)}
              showDeletedTeams={this.state.showDeletedTeams}
              isLoading={isManagersLoading || isCoachesLoading}
              initialFilters={filters}
              applyFilters={applyFilters}
              addTeam={() => {
                openAddTeamDialog();
                loadOptions(userID);
              }}
              updateSearch={updateSearch}
            />
            <div className={classes.adWrapper}>{ad}</div>
            {isTeamsLoading ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <TeamsList
                teams={filteredTeams}
                actions={{ openDeleteTeamAlert }}
              />
            )}
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
          isMobile={isMobile}
          isSaveTeamLoading={isAddTeamDialogLoading}
          isOptionsLoading={isOptionsLoading}
          institutionID={userID}
          options={options}
          coaches={coaches}
          managers={managers}
          actions={{
            handleClose: closeAddTeamDialog,
            addTeam,
            openTeamErrorAlert
          }}
        />
        <NotificationModal
          isOpen={isTeamErrorAlertOpen}
          handleOkClick={closeTeamErrorAlert}
          heading={teamErrorAlertHeading}
          message={teamErrorAlertMessage}
        />
      </div>
    );
  }
}

export default withStyles(styles)(TeamsLayout);
