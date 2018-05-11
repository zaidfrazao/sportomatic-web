/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AddIcon from "material-ui-icons/Add";
import { CircularProgress } from "material-ui/Progress";
import EditIcon from "material-ui-icons/Edit";
import MuiButton from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import AddTeamDialog from "./components/AddTeamDialog";
import BannerAd from "../../components/BannerAd";
import Button from "../../components/Button";
import EditTeamDialog from "./components/EditTeamDialog";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import NotificationModal from "../../components/NotificationModal";
import TeamInfo from "./components/TeamInfo";
import TeamsList from "./components/TeamsList";

const mobileBreakpoint = 800;

const styles = theme => ({
  actionsBar: {
    display: "flex",
    justifyContent: "center",
    margin: "0 24px 24px 24px"
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
    [`@media (min-width: ${mobileBreakpoint}px)`]: {
      bottom: 24
    }
  },
  fabPosition: {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    zIndex: 10
  },
  flexGrow: {
    flexGrow: 1
  },
  iconAdjacentText: {
    marginRight: 8
  },
  infoWrapper: {
    width: "100%",
    height: "100%"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 24
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
    showDeletedTeams: false
  };

  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const { teamID } = this.props.match.params;
    const { loadTeams, loadStaff, loadEventsByTeam } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadTeams(activeInstitutionID);
      loadStaff(activeInstitutionID);

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
      loadStaff,
      loadEventsByTeam,
      resetState
    } = nextProps.actions;

    if (activeInstitutionID !== this.props.activeInstitutionID) {
      resetState();
      loadTeams(activeInstitutionID);
      loadStaff(activeInstitutionID);

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

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
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
      division,
      ageGroup,
      searchText,
      showDeletedTeams
    } = this.props.filters;
    const { teams, staff, userID, role, meAllFilter, sportFilter } = this.props;

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
              staff[coachID].info.name
            )} ${_.toLower(staff[coachID].info.surname)}`;
            coachMatch =
              coachMatch && coachName.includes(_.toLower(searchText));
          });
          teamManagers.map(managerID => {
            const managerName = `${_.toLower(
              staff[managerID].info.name
            )} ${_.toLower(staff[managerID].info.surname)}`;
            managerMatch =
              managerMatch && managerName.includes(_.toLower(searchText));
          });

          if (teamCoaches.length === 0) coachMatch = false;
          if (teamManagers.length === 0) managerMatch = false;
          titleMatch = teamName.includes(_.toLower(searchText));
        }

        if (role === "coach" && meAllFilter === "me") {
          const teamCoaches = _.keys(teamInfo.coaches);
          roleMatch = false;
          roleMatch = roleMatch || teamCoaches.includes(userID);
        }

        if (role === "manager" && meAllFilter === "me") {
          const teamManagers = _.keys(teamInfo.managers);
          roleMatch = false;
          roleMatch = roleMatch || teamManagers.includes(userID);
        }

        if (gender !== "All") {
          allowThroughFilter =
            allowThroughFilter && teamInfo.info.gender === gender;
        }
        if (sportFilter !== "all") {
          if (sportFilter === "other") {
            let teamSport = teamInfo.info.sport;
            if (teamSport === "Soccer / Football") {
              teamSport = "soccer";
            }
            const supportedSports = ["netball", "rugby", "soccer"];
            allowThroughFilter =
              allowThroughFilter &&
              !supportedSports.includes(_.lowerCase(teamSport));
          } else {
            allowThroughFilter =
              allowThroughFilter &&
              _.lowerCase(teamInfo.info.sport).includes(sportFilter);
          }
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
    const {
      classes,
      teams,
      options,
      staff,
      activeInstitutionID,
      isMobile,
      isTablet,
      eventsByTeam,
      role,
      permissions
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
      isStaffLoading,
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
      loadOptions,
      openTeamErrorAlert,
      closeTeamErrorAlert,
      editTeam
    } = this.props.actions;
    const { errorType } = this.props.uiConfig;
    const { teamID } = this.props.match.params;

    const ad = this.createAd();
    const hasTeamsCreated = this.getTeamsList(teams).length > 0;
    const filteredTeams = this.getTeamsList(this.filterTeams());

    const coaches = _.fromPairs(
      _.toPairs(staff).filter(([id, info]) => {
        if (info.institutions[activeInstitutionID]) {
          return (
            info.institutions[activeInstitutionID].roles.coach === "APPROVED"
          );
        } else {
          return false;
        }
      })
    );
    const managers = _.fromPairs(
      _.toPairs(staff).filter(([id, info]) => {
        if (info.institutions[activeInstitutionID]) {
          return (
            info.institutions[activeInstitutionID].roles.manager === "APPROVED"
          );
        } else {
          return false;
        }
      })
    );

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
              canEdit={
                role === "admin" ||
                (role === "coach" && permissions.coaches.teams.canEdit) ||
                (role === "manager" && permissions.managers.teams.canEdit)
              }
              isTeamsLoading={isTeamsLoading || activeInstitutionID === ""}
              isCoachesLoading={isStaffLoading}
              isManagersLoading={isStaffLoading}
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
            {role === "admin" &&
              isMobile && (
                <MuiButton
                  fab
                  color="accent"
                  aria-label="edit team"
                  className={classes.fabPosition}
                  onClick={() => openEditTeamDialog()}
                >
                  <EditIcon />
                </MuiButton>
              )}
          </div>
        ) : (
          <div
            className={
              filteredTeams.length > 0 ? classes.teamCards : classes.teamNoCards
            }
          >
            {role === "admin" &&
              !isMobile && (
                <div className={classes.actionsBar}>
                  <div className={classes.flexGrow} />
                  <Button
                    colour="secondary"
                    filled
                    handleClick={() => openAddTeamDialog()}
                  >
                    <i className={`fas fa-plus ${classes.iconAdjacentText}`} />
                    Add new team
                  </Button>
                </div>
              )}
            <div className={classes.adWrapper}>{ad}</div>
            {isTeamsLoading || activeInstitutionID === "" ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <TeamsList
                  teams={filteredTeams}
                  hasTeamsCreated={hasTeamsCreated}
                  actions={{ openDeleteTeamAlert }}
                />
                {role === "admin" &&
                  isMobile && (
                    <MuiButton
                      fab
                      color="accent"
                      aria-label="add new team"
                      className={classes.fabPosition}
                      onClick={() => openAddTeamDialog()}
                    >
                      <AddIcon />
                    </MuiButton>
                  )}
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
