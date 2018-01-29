/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import BackIcon from "material-ui-icons/ArrowBack";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import { grey, lightBlue } from "material-ui/colors";
import IconButton from "material-ui/IconButton";
import moment from "moment";
import Paper from "material-ui/Paper";
import { Route } from "react-router-dom";
import Tabs, { Tab } from "material-ui/Tabs";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../components/BannerAd";
import TeamsList from "./components/TeamsList";
import FiltersToolbar from "./components/FiltersToolbar";
import ResultCard from "./components/ResultCard";
import ResultInfo from "./components/ResultInfo";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";

const styles = theme => ({
  actionsBar: {
    backgroundColor: grey[200]
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    overflow: "auto"
  },
  dateHeader: {
    padding: 16,
    backgroundColor: lightBlue[900],
    color: grey[50]
  },
  dateWrapper: {
    margin: 24,
    width: "calc(100% - 24px)",
    maxWidth: 970
  },
  hoursByDateWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  innerWrapper: {
    flexGrow: 1,
    overflow: "auto"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  loadMoreButton: {
    margin: 24
  },
  name: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
  },
  outerWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  resultInfoWrapper: {
    maxWidth: 970,
    margin: "0 auto"
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tabs: {
    height: 72
  },
  tabsWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

class ResultsLayout extends Component {
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
    const {
      loadTeams,
      loadEventsByDate,
      fetchInstitutionEmblem,
      loadEventsByTeam
    } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadTeams(activeInstitutionID);
      loadEventsByDate(activeInstitutionID);
      fetchInstitutionEmblem(activeInstitutionID);
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
      loadEventsByDate,
      loadEventsByTeam,
      fetchInstitutionEmblem
    } = nextProps.actions;

    if (
      teamID !== this.props.match.params.teamID &&
      teamID &&
      activeInstitutionID !== ""
    ) {
      loadEventsByTeam(activeInstitutionID, teamID);
    }

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      loadTeams(activeInstitutionID);
      loadEventsByDate(activeInstitutionID);
      fetchInstitutionEmblem(activeInstitutionID);
      if (teamID) {
        loadEventsByTeam(activeInstitutionID, teamID);
      }
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

  renderResultsByDate() {
    const {
      classes,
      eventsByDate,
      activeInstitutionID,
      isMobile,
      isTablet,
      teams
    } = this.props;
    const { lastVisible, institutionEmblemURL } = this.props.uiConfig;
    const { isTeamsLoading, isEventsByDateLoading } = this.props.loadingStatus;
    const {
      loadEventsByDate,
      startLogging,
      finaliseResults,
      editResult
    } = this.props.actions;

    if (isTeamsLoading || activeInstitutionID === "") {
      return (
        <div className={classes.loaderWrapper}>
          <CircularProgress />
        </div>
      );
    } else {
      let groupedByDate = {};
      _.toPairs(eventsByDate).map(([id, info]) => {
        const hoursDate = moment(info.requiredInfo.times.start).format(
          "YYYY-MM-DD"
        );
        if (_.keys(info.teams).length > 0) {
          if (groupedByDate[hoursDate]) {
            groupedByDate[hoursDate] = {
              ...groupedByDate[hoursDate],
              [id]: info
            };
          } else {
            groupedByDate[hoursDate] = {
              [id]: info
            };
          }
        }
      });

      return (
        <div className={classes.hoursByDateWrapper}>
          {_.toPairs(groupedByDate).map(([date, events]) => {
            const currentDate = moment(new Date(Date.now())).format(
              "YYYY-MM-DD"
            );
            return (
              <Paper className={classes.dateWrapper} key={date}>
                <div className={classes.dateHeader}>
                  {date === currentDate
                    ? "Today"
                    : moment(date).format("dddd, MMMM Do YYYY")}
                </div>
                <div>
                  {_.toPairs(events).map(([eventID, eventInfo]) => {
                    return (
                      <ResultCard
                        key={`results-${eventID}`}
                        teams={teams}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        eventID={eventID}
                        eventInfo={eventInfo}
                        institutionEmblemURL={institutionEmblemURL}
                        actions={{
                          startLogging,
                          finaliseResults,
                          editResult
                        }}
                      />
                    );
                  })}
                </div>
              </Paper>
            );
          })}
          {isEventsByDateLoading && (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          )}
          <Button
            disabled={isEventsByDateLoading || activeInstitutionID === ""}
            className={classes.loadMoreButton}
            raised
            onClick={() => loadEventsByDate(activeInstitutionID, lastVisible)}
          >
            Load more...
          </Button>
        </div>
      );
    }
  }

  renderLogs() {
    const { classes, activeInstitutionID } = this.props;
    const { teamID } = this.props.match.params;
    const { isTeamsLoading } = this.props.loadingStatus;

    const ad = this.createAd();
    const filteredTeams = this.getTeamsList(this.filterTeams());

    if (isTeamsLoading || activeInstitutionID === "") {
      return (
        <div>
          <div className={classes.adWrapper}>{ad}</div>
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        </div>
      );
    } else {
      if (teamID) {
      } else {
        return (
          <div>
            <div className={classes.adWrapper}>{ad}</div>
            <TeamsList teams={filteredTeams} />
          </div>
        );
      }
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
    const { teams } = this.props;

    return _.fromPairs(
      _.toPairs(teams).filter(([teamID, teamInfo]) => {
        let allowThroughFilter = true;
        let titleMatch = true;

        if (teamInfo.status === "DELETED" && !showDeletedTeams) {
          allowThroughFilter = false;
        }

        if (searchText !== "") {
          const teamName = _.toLower(teamInfo.info.name);
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

        allowThroughFilter = allowThroughFilter && titleMatch;

        return allowThroughFilter;
      })
    );
  }

  render() {
    const {
      classes,
      isMobile,
      isTablet,
      eventsByTeam,
      teams,
      filters,
      activeInstitutionID
    } = this.props;
    const { currentTab, institutionEmblemURL } = this.props.uiConfig;
    const {
      updateTab,
      updateSearch,
      applyFilters,
      startLogging,
      editResult,
      finaliseResults
    } = this.props.actions;
    const { teamID, eventID } = this.props.match.params;
    const { isEventsByTeamLoading, isTeamsLoading } = this.props.loadingStatus;

    const ad = this.createAd();

    let groupedByDate = {};
    _.toPairs(eventsByTeam).map(([id, info]) => {
      const hoursDate = moment(info.requiredInfo.times.start).format(
        "YYYY-MM-DD"
      );
      if (_.keys(info.teams).length > 0) {
        if (groupedByDate[hoursDate]) {
          groupedByDate[hoursDate] = {
            ...groupedByDate[hoursDate],
            [id]: info
          };
        } else {
          groupedByDate[hoursDate] = {
            [id]: info
          };
        }
      }
    });

    if (teamID) {
      if (eventID) {
        return (
          <div className={classes.outerWrapper}>
            <AppBar position="static" color="default">
              {isEventsByTeamLoading ||
              !eventsByTeam[eventID] ||
              activeInstitutionID === "" ? (
                <Typography
                  className={classes.name}
                  type="title"
                  component="h2"
                >
                  Loading...
                </Typography>
              ) : (
                <Typography
                  className={classes.name}
                  type="title"
                  component="h2"
                >
                  {eventsByTeam[eventID].requiredInfo.title}
                </Typography>
              )}
            </AppBar>
            <div className={classes.innerWrapper}>
              <Toolbar className={classes.actionsBar}>
                <Route
                  render={({ history }) => (
                    <Tooltip title="Back" placement="bottom">
                      <IconButton
                        aria-label="back"
                        onClick={() => {
                          history.goBack();
                        }}
                      >
                        <BackIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                />
              </Toolbar>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.resultInfoWrapper}>
                {isEventsByTeamLoading ||
                isTeamsLoading ||
                !eventsByTeam[eventID] ? (
                  <div className={classes.loaderWrapper}>
                    <CircularProgress />
                  </div>
                ) : (
                  <ResultInfo
                    teamID={teamID}
                    teamInfo={teams[teamID]}
                    teamEventInfo={eventsByTeam[eventID].teams[teamID]}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    eventID={eventID}
                    institutionEmblemURL={institutionEmblemURL}
                  />
                )}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={classes.outerWrapper}>
            <AppBar position="static" color="default">
              {isTeamsLoading ||
              !teams[teamID] ||
              activeInstitutionID === "" ? (
                <Typography
                  className={classes.name}
                  type="title"
                  component="h2"
                >
                  Loading...
                </Typography>
              ) : (
                <Typography
                  className={classes.name}
                  type="title"
                  component="h2"
                >
                  {teams[teamID].info.name}
                </Typography>
              )}
            </AppBar>
            <div className={classes.innerWrapper}>
              <Toolbar className={classes.actionsBar}>
                <Route
                  render={({ history }) => (
                    <Tooltip title="Back" placement="bottom">
                      <IconButton
                        aria-label="back"
                        onClick={() => {
                          history.goBack();
                        }}
                      >
                        <BackIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                />
              </Toolbar>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.hoursByDateWrapper}>
                {_.toPairs(groupedByDate).map(([date, events]) => {
                  const currentDate = moment(new Date(Date.now())).format(
                    "YYYY-MM-DD"
                  );
                  return (
                    <Paper className={classes.dateWrapper} key={date}>
                      <div className={classes.dateHeader}>
                        {date === currentDate
                          ? "Today"
                          : moment(date).format("dddd, MMMM Do YYYY")}
                      </div>
                      <div>
                        {_.toPairs(events).map(([eventID, eventInfo]) => {
                          return (
                            <ResultCard
                              key={`results-${eventID}`}
                              teams={teams}
                              isMobile={isMobile}
                              isTablet={isTablet}
                              eventID={eventID}
                              eventInfo={eventInfo}
                              institutionEmblemURL={institutionEmblemURL}
                              actions={{
                                startLogging,
                                finaliseResults,
                                editResult
                              }}
                            />
                          );
                        })}
                      </div>
                    </Paper>
                  );
                })}
                {(isEventsByTeamLoading || activeInstitutionID === "") && (
                  <div className={classes.loaderWrapper}>
                    <CircularProgress />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className={classes.root}>
          <div className={classes.contentWrapper}>
            <div className={classes.tabsWrapper}>
              <AppBar position="static" color="default">
                <Tabs
                  value={currentTab}
                  onChange={(event, newTab) => updateTab(newTab)}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab
                    label="Overview"
                    value="OVERVIEW"
                    className={classes.tabs}
                  />
                  <Tab label="Logs" value="LOGS" className={classes.tabs} />
                </Tabs>
              </AppBar>
              {currentTab === "OVERVIEW" && (
                <div className={classes.contentWrapper}>
                  <div className={classes.adWrapper}>{ad}</div>
                  {this.renderResultsByDate()}
                </div>
              )}
              {currentTab === "LOGS" && (
                <div className={classes.contentWrapper}>
                  <FiltersToolbar
                    genders={_.keys(this.state.genders)}
                    sports={_.keys(this.state.sports)}
                    divisions={_.keys(this.state.divisions)}
                    ageGroups={_.keys(this.state.ageGroups)}
                    showDeletedTeams={this.state.showDeletedTeams}
                    isMobile={isMobile}
                    isLoading={isTeamsLoading}
                    initialFilters={filters}
                    applyFilters={applyFilters}
                    updateSearch={updateSearch}
                  />
                  {this.renderLogs()}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withStyles(styles)(ResultsLayout);
