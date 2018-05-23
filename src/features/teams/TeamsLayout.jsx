/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectStyles from "react-jss";
import AddTeamModal from "./components/AddTeamModal";
import BannerAd from "../../components/BannerAd";
import Button from "../../components/Button";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import TeamInfo from "./components/TeamInfo";
import TeamsList from "./components/TeamsList";

const styles = {
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
  },
  teamNoCards: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
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
    const { loadTeams, loadStaff } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadTeams(activeInstitutionID);
      loadStaff(activeInstitutionID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, teams } = nextProps;
    const { loadTeams, loadStaff, resetState } = nextProps.actions;

    if (activeInstitutionID !== this.props.activeInstitutionID) {
      resetState();
      loadTeams(activeInstitutionID);
      loadStaff(activeInstitutionID);
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
    return _.toPairs(teams).map(([id, info]) => {
      return {
        id,
        name: info.info.name,
        sport: info.info.sport,
        status: info.status
      };
    });
  }

  filterTeams() {
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
          roleMatch = false;
          const teamCoaches = _.keys(teamInfo.coaches);
          const teamManagers = _.keys(teamInfo.managers);

          if (teamCoaches.includes(userID) || teamManagers.includes(userID)) {
            roleMatch = roleMatch || true;
          }
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
      staff,
      activeInstitutionID,
      isMobile,
      isAdmin,
      navigateTo,
      goBack,
      teamOptions
    } = this.props;
    const { isTeamsLoading, isAddTeamLoading } = this.props.loadingStatus;
    const {
      openAddTeamDialog,
      closeAddTeamDialog,
      openEditTeamDialog,
      addTeam
    } = this.props.actions;
    const { isAddTeamDialogOpen } = this.props.dialogs;
    const { teamID, infoTab } = this.props.match.params;

    const ad = this.createAd();
    const hasTeamsCreated = this.getTeamsList(teams).length > 0;
    const filteredTeams = this.getTeamsList(this.filterTeams());

    if (teamID) {
      return (
        <div className={classes.root}>
          <div className={classes.infoWrapper}>
            <TeamInfo
              staff={staff}
              info={teams[teamID]}
              teamID={teamID}
              isMobile={isMobile}
              isUserAdmin={isAdmin}
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
          <div
            className={
              filteredTeams.length > 0 ? classes.teamCards : classes.teamNoCards
            }
          >
            {isAdmin &&
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
              <div className={classes.loaderWrapper} />
            ) : (
              <div>
                <TeamsList
                  teams={filteredTeams}
                  hasTeamsCreated={hasTeamsCreated}
                  navigateTo={navigateTo}
                />
              </div>
            )}
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
        </div>
      );
    }
  }
}

export default injectStyles(styles)(TeamsLayout);
