/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectStyles from "react-jss";
import moment from "moment";
import AddTeamModal from "./components/AddTeamModal";
import BannerAd from "../../components/BannerAd";
import Button from "../../components/Button";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import PersonalAllSwitch from "./components/PersonalAllSwitch";
import SeasonSetupDialog from "./components/SeasonSetupDialog";
import TeamInfo from "./components/TeamInfo";
import TeamsList from "./components/TeamsList";

const mobileBreakpoint = 800;

const styles = {
  actionsBar: {
    display: "flex",
    justifyContent: "center",
    margin: "24px 24px 0 24px",
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  buttonSeparator: {
    height: 12
  },
  fabPosition: {
    color: "#fff",
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
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  teamCards: {
    flexGrow: 1,
    overflow: "auto"
  }
};

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
    const { loadTeams, loadStaff, loadSeasons } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadTeams(activeInstitutionID);
      loadStaff(activeInstitutionID);
      loadSeasons(activeInstitutionID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, teams } = nextProps;
    const { loadTeams, loadStaff, resetState, loadSeasons } = nextProps.actions;

    if (activeInstitutionID !== this.props.activeInstitutionID) {
      resetState();
      loadTeams(activeInstitutionID);
      loadStaff(activeInstitutionID);
      loadSeasons(activeInstitutionID);
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

  getTeamsList(teams, seasons) {
    return _.toPairs(teams).map(([id, info]) => {
      let seasonStatus = "OUT_OF_SEASON";
      const teamSeasons = _.toPairs(seasons)
        .filter(([seasonID, seasonInfo]) => {
          return seasonInfo.teamID === id;
        })
        .map(([seasonID, seasonInfo]) => {
          const currentMoment = moment();
          const seasonStartMoment = moment(
            seasonInfo.dates.start,
            "DD MMM YYYY"
          );
          const seasonEndMoment = moment(seasonInfo.dates.end, "DD MMM YYYY");

          if (currentMoment.isBetween(seasonStartMoment, seasonEndMoment)) {
            seasonStatus = "IN_SEASON";
          } else if (currentMoment.isBefore(seasonStartMoment)) {
            seasonStatus = "UPCOMING_SEASON";
          }

          return {
            id: seasonID,
            ...seasonInfo
          };
        });

      return {
        id,
        seasonStatus,
        seasons: teamSeasons,
        ...info.info
      };
    });
  }

  filterTeams(seasons) {
    const { gender, division, ageGroup, showDeletedTeams } = this.props.filters;
    const { teams, userID, meAllFilter, sportFilter } = this.props;

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

        if (meAllFilter === "me") {
          let coaches = {};
          let managers = {};
          _.toPairs(seasons)
            .filter(([seasonID, seasonInfo]) => {
              return seasonInfo.teamID === teamID;
            })
            .map(([seasonID, seasonInfo]) => {
              coaches = { ...coaches, ...seasonInfo.coaches };
              managers = { ...managers, ...seasonInfo.managers };
              return {
                id: seasonID,
                ...seasonInfo
              };
            });
          roleMatch = false;
          const teamCoaches = _.keys(coaches);
          const teamManagers = _.keys(managers);

          if (teamCoaches.includes(userID) || teamManagers.includes(userID)) {
            roleMatch = roleMatch || true;
          }
        }

        if (gender !== "All") {
          allowThroughFilter =
            allowThroughFilter && teamInfo.info.gender === gender;
        }
        if (sportFilter !== "all") {
          allowThroughFilter =
            allowThroughFilter && teamInfo.info.sport.includes(sportFilter);
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
      staff,
      activeInstitutionID,
      isMobile,
      isAdmin,
      navigateTo,
      goBack,
      teamOptions,
      userID,
      userEmail,
      userFirstName,
      userLastName,
      seasons,
      meAllFilter,
      changeMeAllFilter,
      institutionCreationDate
    } = this.props;
    const {
      isAddTeamLoading,
      isCreateSeasonLoading
    } = this.props.loadingStatus;
    const {
      openAddTeamDialog,
      closeAddTeamDialog,
      openEditTeamDialog,
      openSeasonSetupDialog,
      closeSeasonSetupDialog,
      addTeam,
      createSeason
    } = this.props.actions;
    const { isAddTeamDialogOpen, seasonSetupDialog } = this.props.dialogs;
    const { teamID, infoTab } = this.props.match.params;

    const ad = this.createAd();
    const teamsList = this.getTeamsList(teams, seasons);
    const hasTeamsCreated = teamsList.length > 0;
    const filteredTeams = this.getTeamsList(this.filterTeams(seasons), seasons);

    if (teamID) {
      const teamSeasons = _.fromPairs(
        _.toPairs(seasons)
          .filter(([seasonID, seasonInfo]) => {
            return seasonInfo.teamID === teamID;
          })
          .map(([seasonID, seasonInfo]) => {
            return [seasonID, seasonInfo];
          })
      );

      return (
        <div className={classes.root}>
          <div className={classes.infoWrapper}>
            <TeamInfo
              staff={staff}
              info={teams[teamID]}
              seasons={teamSeasons}
              teamID={teamID}
              isMobile={isMobile}
              isUserAdmin={isAdmin}
              institutionCreationDate={institutionCreationDate}
              infoTab={infoTab}
              actions={{
                navigateTo,
                goBack,
                editTeam: () => {
                  openEditTeamDialog();
                }
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <div className={classes.teamCards}>
            <div className={classes.adWrapper}>{ad}</div>
            <div className={classes.actionsBar}>
              <PersonalAllSwitch
                isMobile={isMobile}
                meAllFilter={meAllFilter}
                changeMeAllFilter={changeMeAllFilter}
              />
              {isMobile && <div className={classes.buttonSeparator} />}
              <div className={classes.flexGrow} />
              {isAdmin && (
                <Button
                  colour="primary"
                  filled
                  slim
                  fullWidth={isMobile}
                  handleClick={() => openAddTeamDialog()}
                >
                  <i className={`fas fa-plus ${classes.iconAdjacentText}`} />
                  Add new team
                </Button>
              )}
            </div>
            <TeamsList
              teams={filteredTeams}
              isUserAdmin={isAdmin}
              hasTeamsCreated={hasTeamsCreated}
              setUpSeason={(name, id) => openSeasonSetupDialog(name, id)}
              navigateTo={navigateTo}
            />
          </div>
          <AddTeamModal
            isOpen={isAddTeamDialogOpen}
            isLoading={isAddTeamLoading}
            options={teamOptions}
            actions={{
              addTeam: (ageGroup, division, sport, gender, name) =>
                addTeam(
                  activeInstitutionID,
                  ageGroup,
                  division,
                  gender,
                  sport,
                  name
                ),
              closeModal: () => closeAddTeamDialog()
            }}
          />
          <SeasonSetupDialog
            isOpen={seasonSetupDialog.isOpen}
            teamName={seasonSetupDialog.teamName}
            userID={userID}
            userEmail={userEmail}
            userFirstName={userFirstName}
            userLastName={userLastName}
            people={staff}
            closeDialog={() => closeSeasonSetupDialog()}
            isLoading={isCreateSeasonLoading}
            createSeason={seasonInfo =>
              createSeason(
                seasonSetupDialog.teamID,
                activeInstitutionID,
                userID,
                `${userFirstName} ${userLastName}`,
                seasonInfo
              )}
          />
        </div>
      );
    }
  }
}

export default injectStyles(styles)(TeamsLayout);
