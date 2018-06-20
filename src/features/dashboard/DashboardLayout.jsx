/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import injectStyles from "react-jss";
import Button from "../../components/Button";
import BannerAd from "../../components/BannerAd";
import { common, grey, lightBlue, red } from "../../utils/colours";
import EmptyState from "../../components/EmptyState";
import Incomplete from "./components/Incomplete";
import Results from "./components/Results";
import Today from "./components/Today";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import PersonalAllSwitch from "./components/PersonalAllSwitch";
import Tabs from "../../components/Tabs";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  backButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: lightBlue[800],
    color: common["white"],
    cursor: "pointer",
    textAlign: "center",
    fontSize: 24,
    padding: "18px 24px",
    borderRadius: "16px 0 0 16px",
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  buttonSeparator: {
    height: 12
  },
  count: {
    margin: "0 8px",
    padding: "4px 8px",
    backgroundColor: red[500],
    borderRadius: 8,
    color: common["white"]
  },
  countLight: {
    margin: "0 8px",
    padding: "4px 8px",
    backgroundColor: common["white"],
    borderRadius: 8,
    fontWeight: "bold",
    color: red[500]
  },
  emptyState: {
    padding: 24
  },
  emptyStateButton: {
    transition: "0.25s",
    fontSize: 18,
    margin: "0 8px",
    cursor: "pointer",
    color: common["black"],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center"
    },
    "&:hover": {
      color: lightBlue[500]
    }
  },
  emptyStateButtonIcon: {
    marginRight: 8,
    width: 25,
    height: 25
  },
  flexGrow: {
    flexGrow: 1
  },
  header: {
    display: "flex",
    border: `1px solid ${grey[300]}`,
    margin: "0 24px 24px 24px",
    borderRadius: 16,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: grey[800],
    backgroundColor: common["white"]
  },
  headerInnerWrapper: {
    flexGrow: 1,
    textAlign: "center",
    padding: 24
  },
  loadMoreButtonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 24
  },
  loadMoreIcon: {
    marginRight: 8
  },
  menuButtonWrapper: {
    margin: "0 24px"
  },
  outerWrapper: {
    flexGrow: 1,
    overflow: "auto"
  },
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tabsWrapper: {
    margin: "0 24px 24px 24px"
  }
};

class DashboardLayout extends Component {
  state = {
    tabSelected: "today"
  };

  componentWillMount() {
    const { activeInstitutionID, userID, isAdmin } = this.props;
    const { lastVisible } = this.props.uiConfig;
    const {
      loadTodaysEvents,
      loadIncompleteEvents,
      loadRecentResults,
      loadTeams
    } = this.props.actions;

    if (activeInstitutionID !== "") {
      loadTeams(activeInstitutionID);
      loadTodaysEvents(activeInstitutionID);
      loadRecentResults(activeInstitutionID, lastVisible);
      loadIncompleteEvents(activeInstitutionID, userID, isAdmin);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, userID, isAdmin } = nextProps;
    const { lastVisible } = nextProps.uiConfig;
    const {
      loadTeams,
      loadTodaysEvents,
      loadIncompleteEvents,
      loadRecentResults
    } = nextProps.actions;

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      loadTeams(activeInstitutionID);
      loadTodaysEvents(activeInstitutionID);
      loadRecentResults(activeInstitutionID, lastVisible);
      loadIncompleteEvents(activeInstitutionID, userID, isAdmin);
    }
  }

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
  }

  filterEvents(events) {
    const { userID, meAllFilter, sportFilter, teams } = this.props;

    return _.fromPairs(
      _.toPairs(events).filter(([id, info]) => {
        let allowThroughFilter = true;
        let titleMatch = true;
        let coachMatch = true;
        let managerMatch = true;
        let roleMatch = true;

        if (meAllFilter === "me") {
          const eventCoaches = _.keys(info.coaches);
          const eventManagers = _.keys(info.managers);

          roleMatch = false;
          roleMatch = roleMatch || eventCoaches.includes(userID);
          roleMatch = roleMatch || eventManagers.includes(userID);
        }

        _.keys(info.teams).map(teamID => {
          if (teams[teamID] && sportFilter !== "all") {
            allowThroughFilter =
              allowThroughFilter &&
              teams[teamID].info.sport.includes(sportFilter);
          }
        });

        if (_.keys(info.teams).length === 0) {
          if (sportFilter !== "all") {
            allowThroughFilter = false;
          }
        }

        allowThroughFilter =
          allowThroughFilter &&
          (titleMatch || coachMatch || managerMatch) &&
          roleMatch;

        return allowThroughFilter;
      })
    );
  }

  updateTabSelected(newTab) {
    this.setState({
      tabSelected: newTab
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

  checkIfPersonalProfileComplete() {
    const { personalInfo } = this.props;

    let personalProfileProgress = 4;
    if (personalInfo.email === "") {
      personalProfileProgress = personalProfileProgress - 1;
    }
    if (personalInfo.phoneNumber === "") {
      personalProfileProgress = personalProfileProgress - 1;
    }
    if (personalInfo.profilePicture === "") {
      personalProfileProgress = personalProfileProgress - 1;
    }
    if (personalInfo.preferredSports.length === 0) {
      personalProfileProgress = personalProfileProgress - 1;
    }

    return (personalProfileProgress / 4 * 100).toFixed(0);
  }

  checkIfCommunityProfileComplete() {
    const { communityInfo } = this.props;

    let communityProfileProgress = 5;
    if (communityInfo.publicEmail === "") {
      communityProfileProgress = communityProfileProgress - 1;
    }
    if (communityInfo.phoneNumber === "") {
      communityProfileProgress = communityProfileProgress - 1;
    }
    if (communityInfo.emblem === "") {
      communityProfileProgress = communityProfileProgress - 1;
    }
    if (communityInfo.physicalAddress === "") {
      communityProfileProgress = communityProfileProgress - 1;
    }
    if (communityInfo.sports.length === 0) {
      communityProfileProgress = communityProfileProgress - 1;
    }

    return (communityProfileProgress / 5 * 100).toFixed(0);
  }

  getSectionDisplay() {
    const {
      classes,
      isMobile,
      navigateTo,
      todaysEvents,
      goBack,
      recentResults,
      incompleteEvents,
      personalInfo,
      communityInfo,
      isAdmin,
      activeInstitutionID,
      meAllFilter,
      changeMeAllFilter,
      teams
    } = this.props;
    const { earliestLoadedResult, isLastResult } = this.props.uiConfig;
    const { loadRecentResults } = this.props.actions;
    const { infoTab } = this.props.match.params;
    const { tabSelected } = this.state;

    const ad = this.createAd();

    const personalProfileProgress = this.checkIfPersonalProfileComplete();
    const communityProfileProgress = this.checkIfCommunityProfileComplete();

    const filteredTodaysEvents = this.filterEvents(todaysEvents);
    const filteredRecentResults = this.filterEvents(recentResults);
    const filteredIncompleteEvents = this.filterEvents(incompleteEvents);

    const todayCount = _.keys(filteredTodaysEvents).length;
    let incompleteCount = _.keys(filteredIncompleteEvents).length;
    const notificationCount = 0;

    if (personalProfileProgress !== "100") {
      incompleteCount = incompleteCount + 1;
    }
    if (communityProfileProgress !== "100" && isAdmin) {
      incompleteCount = incompleteCount + 1;
    }

    if (isMobile) {
      switch (infoTab) {
        case "today":
          return (
            <div>
              <div className={classes.header}>
                <div className={classes.backButton} onClick={() => goBack()}>
                  <div>
                    <i className="fas fa-caret-left" />
                  </div>
                </div>
                <div className={classes.headerInnerWrapper}>
                  {todayCount > 0 && (
                    <span className={classes.count}>{todayCount}</span>
                  )}Today
                </div>
              </div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                <PersonalAllSwitch
                  isMobile={isMobile}
                  meAllFilter={meAllFilter}
                  changeMeAllFilter={changeMeAllFilter}
                />
                {isMobile && <div className={classes.buttonSeparator} />}
                <div className={classes.flexGrow} />
              </div>
              <Today
                isMobile={isMobile}
                events={filteredTodaysEvents}
                navigateTo={navigateTo}
                meAllFilter={meAllFilter}
                isUserAdmin={isAdmin}
              />
            </div>
          );
        case "results":
          return (
            <div>
              <div className={classes.header}>
                <div className={classes.backButton} onClick={() => goBack()}>
                  <div>
                    <i className="fas fa-caret-left" />
                  </div>
                </div>
                <div className={classes.headerInnerWrapper}>Results</div>
              </div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                <PersonalAllSwitch
                  isMobile={isMobile}
                  meAllFilter={meAllFilter}
                  changeMeAllFilter={changeMeAllFilter}
                />
                {isMobile && <div className={classes.buttonSeparator} />}
                <div className={classes.flexGrow} />
              </div>
              <Results
                teams={teams}
                isMobile={isMobile}
                emblem={communityInfo.emblem}
                events={filteredRecentResults}
                navigateTo={navigateTo}
                meAllFilter={meAllFilter}
              />
              {!isLastResult && (
                <div className={classes.loadMoreButtonWrapper}>
                  <Button
                    handleClick={() =>
                      loadRecentResults(
                        activeInstitutionID,
                        earliestLoadedResult
                      )}
                  >
                    <i className={`fas fa-redo ${classes.loadMoreIcon}`} />Load
                    more
                  </Button>
                </div>
              )}
            </div>
          );
        case "incomplete":
          return (
            <div>
              <div className={classes.header}>
                <div className={classes.backButton} onClick={() => goBack()}>
                  <div>
                    <i className="fas fa-caret-left" />
                  </div>
                </div>
                <div className={classes.headerInnerWrapper}>
                  {incompleteCount > 0 && (
                    <span className={classes.count}>{incompleteCount}</span>
                  )}Incomplete
                </div>
              </div>
              <div className={classes.adWrapper}>{ad}</div>
              <Incomplete
                isAdmin={isAdmin}
                communityInfo={communityInfo}
                personalProfileProgress={personalProfileProgress}
                communityProfileProgress={communityProfileProgress}
                personalInfo={personalInfo}
                events={filteredIncompleteEvents}
                navigateTo={navigateTo}
                meAllFilter={meAllFilter}
              />
            </div>
          );
        case "notifications":
          return (
            <div>
              <div className={classes.header}>
                <div className={classes.backButton} onClick={() => goBack()}>
                  <div>
                    <i className="fas fa-caret-left" />
                  </div>
                </div>
                <div className={classes.headerInnerWrapper}>
                  {notificationCount > 0 && (
                    <span className={classes.count}>{notificationCount}</span>
                  )}Notifications
                </div>
              </div>
              <div className={classes.adWrapper}>{ad}</div>
            </div>
          );
        default:
          return (
            <div>
              <div className={classes.menuButtonWrapper}>
                <Button
                  type="dark"
                  colour="primary"
                  filled
                  fullWidth
                  handleClick={() => navigateTo("/myaccount/overview/today")}
                >
                  {todayCount > 0 && (
                    <span className={classes.countLight}>{todayCount}</span>
                  )}Today
                </Button>
              </div>
              <div className={classes.buttonSeparator} />
              <div className={classes.menuButtonWrapper}>
                <Button
                  type="dark"
                  colour="primary"
                  filled
                  fullWidth
                  handleClick={() => navigateTo("/myaccount/overview/results")}
                >
                  Results
                </Button>
              </div>
              <div>
                <div className={classes.buttonSeparator} />
                <div className={classes.menuButtonWrapper}>
                  <Button
                    type="dark"
                    colour="primary"
                    filled
                    fullWidth
                    handleClick={() =>
                      navigateTo("/myaccount/overview/incomplete")}
                  >
                    {incompleteCount > 0 && (
                      <span className={classes.countLight}>
                        {incompleteCount}
                      </span>
                    )}Incomplete
                  </Button>
                </div>
              </div>
              <div>
                <div className={classes.buttonSeparator} />
                <div className={classes.menuButtonWrapper}>
                  <Button
                    type="dark"
                    colour="primary"
                    filled
                    fullWidth
                    handleClick={() =>
                      navigateTo("/myaccount/overview/notifications")}
                  >
                    {notificationCount > 0 && (
                      <span className={classes.countLight}>
                        {notificationCount}
                      </span>
                    )}Notifications
                  </Button>
                </div>
              </div>
            </div>
          );
      }
    } else {
      switch (tabSelected) {
        case "today":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                <PersonalAllSwitch
                  isMobile={isMobile}
                  meAllFilter={meAllFilter}
                  changeMeAllFilter={changeMeAllFilter}
                />
                {isMobile && <div className={classes.buttonSeparator} />}
                <div className={classes.flexGrow} />
              </div>
              <Today
                isMobile={isMobile}
                events={filteredTodaysEvents}
                navigateTo={navigateTo}
                meAllFilter={meAllFilter}
                isUserAdmin={isAdmin}
              />
            </div>
          );
        case "results":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <div className={classes.actionsBar}>
                <PersonalAllSwitch
                  isMobile={isMobile}
                  meAllFilter={meAllFilter}
                  changeMeAllFilter={changeMeAllFilter}
                />
                {isMobile && <div className={classes.buttonSeparator} />}
                <div className={classes.flexGrow} />
              </div>
              <Results
                teams={teams}
                isMobile={isMobile}
                emblem={communityInfo.emblem}
                events={filteredRecentResults}
                navigateTo={navigateTo}
                meAllFilter={meAllFilter}
              />
              {!isLastResult && (
                <div className={classes.loadMoreButtonWrapper}>
                  <Button
                    handleClick={() =>
                      loadRecentResults(
                        activeInstitutionID,
                        earliestLoadedResult
                      )}
                  >
                    <i className={`fas fa-redo ${classes.loadMoreIcon}`} />Load
                    more
                  </Button>
                </div>
              )}
            </div>
          );
        case "incomplete":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
              <Incomplete
                isAdmin={isAdmin}
                communityInfo={communityInfo}
                communityProfileProgress={communityProfileProgress}
                personalProfileProgress={personalProfileProgress}
                personalInfo={personalInfo}
                events={filteredIncompleteEvents}
                navigateTo={navigateTo}
                meAllFilter={meAllFilter}
              />
            </div>
          );
        case "notifications":
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
            </div>
          );
        default:
          return (
            <div>
              <div className={classes.adWrapper}>{ad}</div>
            </div>
          );
      }
    }
  }

  getTabs() {
    const { todaysEvents, incompleteEvents, isAdmin } = this.props;

    const personalProfileProgress = this.checkIfPersonalProfileComplete();
    const communityProfileProgress = this.checkIfCommunityProfileComplete();

    const filteredTodaysEvents = this.filterEvents(todaysEvents);
    const filteredIncompleteEvents = this.filterEvents(incompleteEvents);

    const todayCount = _.keys(filteredTodaysEvents).length;
    let incompleteCount = _.keys(filteredIncompleteEvents).length;
    const notificationCount = 0;

    if (personalProfileProgress !== "100") {
      incompleteCount = incompleteCount + 1;
    }
    if (communityProfileProgress !== "100" && isAdmin) {
      incompleteCount = incompleteCount + 1;
    }

    return [
      {
        key: "today",
        label: "Today",
        count: todayCount
      },
      {
        key: "results",
        label: "Results"
      },
      {
        key: "incomplete",
        label: "Incomplete",
        count: incompleteCount
      },
      {
        key: "notifications",
        label: "Notifications",
        count: notificationCount
      }
    ];
  }

  render() {
    const { classes, isMobile, communityProgress, navigateTo } = this.props;
    const { infoTab } = this.props.match.params;
    const { tabSelected } = this.state;

    if (!isMobile && infoTab) {
      return <Redirect to="/myaccount/overview/" />;
    }

    const sectionDisplay = this.getSectionDisplay();
    const tabs = this.getTabs();

    if (!communityProgress.hasSports) {
      return (
        <div className={classes.root}>
          <div className={classes.outerWrapper}>
            <div className={classes.emptyState}>
              <EmptyState>
                Set up your first sport in the{" "}
                <span
                  className={classes.emptyStateButton}
                  onClick={() => navigateTo("/myaccount/community/")}
                >
                  <i
                    className={`fas fa-users ${classes.emptyStateButtonIcon}`}
                  />
                  Community
                </span>{" "}
                section.
              </EmptyState>
            </div>
          </div>
        </div>
      );
    } else if (!communityProgress.hasSeasons) {
      return (
        <div className={classes.root}>
          <div className={classes.outerWrapper}>
            <div className={classes.emptyState}>
              <EmptyState>
                Next, you should set up a team's season in the{" "}
                <span
                  className={classes.emptyStateButton}
                  onClick={() => navigateTo("/myaccount/teams/")}
                >
                  <i
                    className={`fas fa-user-friends ${classes.emptyStateButtonIcon}`}
                  />
                  Teams
                </span>{" "}
                section.
              </EmptyState>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <div className={classes.outerWrapper}>
            {!isMobile && (
              <div className={classes.tabsWrapper}>
                <Tabs
                  tabs={tabs}
                  selected={tabSelected}
                  handleClick={newTab => this.updateTabSelected(newTab)}
                />
              </div>
            )}
            {sectionDisplay}
          </div>
        </div>
      );
    }
  }
}

export default injectStyles(styles)(DashboardLayout);
