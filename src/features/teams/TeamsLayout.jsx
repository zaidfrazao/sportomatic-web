/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { CircularProgress } from "material-ui/Progress";
import Switch from "material-ui/Switch";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import AddTeamDialog from "./components/AddTeamDialog";
import BannerAd from "../../components/BannerAd";
import EditTeamDialog from "./components/EditTeamDialog";
import FiltersToolbar from "./components/FiltersToolbar";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import NotificationModal from "../../components/NotificationModal";
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
  myTeamsSelector: {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center"
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
    showDeletedTeams: false,
    showAllTeams: false
  };

  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const { teamID } = this.props.match.params;
    const {
      loadTeams,
      loadCoaches,
      loadManagers,
      loadEventsByTeam
    } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadTeams(activeInstitutionID);
      loadCoaches(activeInstitutionID);
      loadManagers(activeInstitutionID);

      if (teamID) {
        loadEventsByTeam(activeInstitutionID, teamID);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, teams } = nextProps;
    const { teamID } = nextProps.match.params;
    const {
      loadTeams,
      loadCoaches,
      loadManagers,
      loadEventsByTeam
    } = nextProps.actions;

    if (activeInstitutionID !== this.props.activeInstitutionID) {
      loadTeams(activeInstitutionID);
      loadCoaches(activeInstitutionID);
      loadManagers(activeInstitutionID);

      if (teamID) {
        loadEventsByTeam(activeInstitutionID, teamID);
      }
    }

    if (
      activeInstitutionID !== "" &&
      teamID &&
      teamID !== this.props.match.params.teamID
    ) {
      loadEventsByTeam(activeInstitutionID, teamID);
    }

    if (teams !== this.props.teams) {
      let genders = {};
      let sports = {};
      let divisions = {};
      let ageGroups = {};

      _.toPairs(teams).map(([id, info]) => {
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

      this.setState({
        genders,
        sports,
        divisions,
        ageGroups
      });
    }
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
    const { teams, coaches, managers, userID, role } = this.props;
    const { showAllTeams } = this.state;

    return _.fromPairs(
      _.toPairs(teams).filter(([teamID, teamInfo]) => {
        let allowThroughFilter = true;
        let titleMatch = true;
        let coachMatch = true;
        let managerMatch = true;
        let roleMatch = true;

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

        if (role === "coach" && !showAllTeams) {
          const teamCoaches = _.keys(teamInfo.coaches);
          roleMatch = false;
          roleMatch = roleMatch || teamCoaches.includes(userID);
        }

        if (role === "manager" && !showAllTeams) {
          const teamManagers = _.keys(teamInfo.managers);
          roleMatch = false;
          roleMatch = roleMatch || teamManagers.includes(userID);
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
          allowThroughFilter &&
          (titleMatch || coachMatch || managerMatch) &&
          roleMatch;

        return allowThroughFilter;
      })
    );
  }

  render() {
    const { showAllTeams } = this.state;
    const {
      classes,
      teams,
      options,
      coaches,
      managers,
      activeInstitutionID,
      isMobile,
      isTablet,
      filters,
      eventsByTeam,
      role
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
      isOptionsLoading,
      isEventsByTeamLoading
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
              role={role}
              isTeamsLoading={isTeamsLoading || activeInstitutionID === ""}
              isCoachesLoading={isCoachesLoading}
              isManagersLoading={isManagersLoading}
              isEventsByTeamLoading={isEventsByTeamLoading}
              eventsByTeam={eventsByTeam}
              coaches={coaches}
              managers={managers}
              info={teams[teamID]}
              teamID={teamID}
              isMobile={isMobile}
              isTablet={isTablet}
              actions={{
                editTeam: () => {
                  openEditTeamDialog();
                  loadOptions(activeInstitutionID);
                }
              }}
            />
            <EditTeamDialog
              isOpen={isEditTeamDialogOpen}
              isMobile={isMobile}
              isLoading={
                isEditTeamDialogLoading ||
                isOptionsLoading ||
                activeInstitutionID === ""
              }
              teamID={teamID}
              initialTeamInfo={teams[teamID]}
              institutionID={activeInstitutionID}
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
              role={role}
              genders={_.keys(this.state.genders)}
              sports={_.keys(this.state.sports)}
              divisions={_.keys(this.state.divisions)}
              ageGroups={_.keys(this.state.ageGroups)}
              showDeletedTeams={this.state.showDeletedTeams}
              isMobile={isMobile}
              isLoading={isManagersLoading || isCoachesLoading}
              initialFilters={filters}
              applyFilters={applyFilters}
              addTeam={() => {
                openAddTeamDialog();
                loadOptions(activeInstitutionID);
              }}
              updateSearch={updateSearch}
            />
            <div className={classes.adWrapper}>{ad}</div>
            {isTeamsLoading || activeInstitutionID === "" ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                {(role === "coach" || role === "manager") && (
                  <div className={classes.myTeamsSelector}>
                    <Switch
                      checked={showAllTeams}
                      onChange={(event, checked) =>
                        this.setState({
                          showAllTeams: checked
                        })}
                    />
                    <Typography component="h3" type="headline">
                      {showAllTeams
                        ? "All Teams"
                        : role === "coach"
                          ? "Teams That I Coach"
                          : "Teams That I Manage"}
                    </Typography>
                  </div>
                )}
                <TeamsList
                  teams={filteredTeams}
                  actions={{ openDeleteTeamAlert }}
                />
              </div>
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
          isLoading={
            isAddTeamDialogLoading ||
            isOptionsLoading ||
            activeInstitutionID === ""
          }
          institutionID={activeInstitutionID}
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
