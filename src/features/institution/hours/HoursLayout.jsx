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
import BannerAd from "../../../components/BannerAd";
import CoachesList from "./components/CoachesList";
import FiltersToolbar from "./components/FiltersToolbar";
import HoursCard from "./components/HoursCard";
import HoursHistory from "./components/HoursHistory";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../components/LeaderboardAd";

const styles = theme => ({
  actionsBar: {
    backgroundColor: grey[200]
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  awaitingApprovalWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    "@media (max-width: 960px)": {
      display: "block"
    }
  },
  button: {
    margin: 24,
    "@media (max-width: 600px)": {
      width: "calc(100% - 48px)"
    }
  },
  coachName: {
    margin: 24,
    width: "calc(100% - 48px)",
    textAlign: "center"
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
  eventsAwaitingApprovalWrapper: {
    flexGrow: 1,
    overflow: "auto"
  },
  historyTableWrapper: {
    flexGrow: 1,
    display: "flex"
  },
  historyWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
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
  inProgressWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 960px)": {
      display: "block",
      overflow: "auto"
    }
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
  noEventsAwaitingApprovalWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  outerWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
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

class HoursLayout extends Component {
  componentWillMount() {
    const { userID } = this.props;
    const { loadStaff, loadEventsByDate } = this.props.actions;

    if (userID !== "") {
      loadStaff(userID);
      loadEventsByDate(userID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userID } = nextProps;
    const { loadStaff, loadEventsByDate } = nextProps.actions;

    if (userID !== this.props.userID && userID !== "") {
      loadStaff(userID);
      loadEventsByDate(userID);
    }
  }

  renderHoursByDate() {
    const { classes, eventsByDate, isTablet, staff, userID } = this.props;
    const { lastVisible } = this.props.uiConfig;
    const { isStaffLoading, isEventsByDateLoading } = this.props.loadingStatus;
    const {
      loadEventsByDate,
      signIn,
      signOut,
      approveHours
    } = this.props.actions;

    if (isStaffLoading) {
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
        if (_.keys(info.coaches).length > 0) {
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
            const currentDate = new Date(Date.now()).toISOString().slice(0, 10);
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
                      <HoursCard
                        key={`hourscards-${eventID}`}
                        isTablet={isTablet}
                        eventID={eventID}
                        eventInfo={eventInfo}
                        staff={staff}
                        actions={{
                          signIn,
                          signOut,
                          approveHours
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
            disabled={isEventsByDateLoading}
            className={classes.loadMoreButton}
            raised
            onClick={() => loadEventsByDate(userID, lastVisible)}
          >
            Load more...
          </Button>
        </div>
      );
    }
  }

  renderLogs() {
    const { classes, staff } = this.props;
    const { coachID } = this.props.match.params;
    const { isStaffLoading } = this.props.loadingStatus;

    const ad = this.createAd();
    const filteredStaff = this.getStaffCardsInfo(this.filterPeople(staff));

    if (isStaffLoading) {
      return (
        <div>
          <div className={classes.adWrapper}>{ad}</div>
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        </div>
      );
    } else {
      if (coachID) {
      } else {
        return (
          <div>
            <div className={classes.adWrapper}>{ad}</div>
            <CoachesList people={filteredStaff} />
          </div>
        );
      }
    }
  }

  getStaffCardsInfo(staff) {
    const { userID } = this.props;

    let sortedStaff = [];
    _.values(
      _.mapValues(staff, (value, key) => {
        if (value.institutions[userID].roles.coach === "APPROVED") {
          sortedStaff.push({
            ...value,
            id: key,
            name: value.info.name,
            surname: value.info.surname,
            profilePictureURL: value.info.profilePictureURL
          });
        }
      })
    );

    return sortedStaff.sort((personA, personB) => {
      if (personA.info.name > personB.info.name) return +1;
      if (personA.info.name < personB.info.name) return -1;
      if (personA.info.surname > personB.info.surname) return +1;
      if (personA.info.surname < personB.info.surname) return -1;
      return 0;
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

  filterPeople(staff) {
    const { searchText } = this.props.filters;

    return _.fromPairs(
      _.toPairs(staff).filter(([staffID, personInfo]) => {
        let allowThroughFilter = true;
        let nameMatch = true;

        if (searchText !== "") {
          nameMatch =
            nameMatch &&
            _.toLower(
              `${personInfo.info.name} ${personInfo.info.surname}`
            ).includes(_.toLower(searchText));
        }

        allowThroughFilter = allowThroughFilter && nameMatch;

        return allowThroughFilter;
      })
    );
  }

  render() {
    const {
      classes,
      isMobile,
      isTablet,
      eventsByCoach,
      userID,
      staff
    } = this.props;
    const { currentTab } = this.props.uiConfig;
    const { updateTab, loadEventsByCoach, updateSearch } = this.props.actions;
    const { coachID } = this.props.match.params;
    const { isEventsByCoachLoading, isStaffLoading } = this.props.loadingStatus;

    const ad = this.createAd();

    if (coachID) {
      return (
        <div className={classes.outerWrapper}>
          <AppBar position="static" color="default">
            {isStaffLoading || !staff[coachID] ? (
              <Typography className={classes.name} type="title" component="h2">
                Loading...
              </Typography>
            ) : (
              <Typography className={classes.name} type="title" component="h2">
                {`${staff[coachID].info.name} ${staff[coachID].info.surname}`}
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
            <HoursHistory
              institutionID={userID}
              isLoading={isEventsByCoachLoading}
              isMobile={isMobile}
              isTablet={isTablet}
              events={eventsByCoach}
              coachID={coachID}
              minDate={new Date(2017, 11)}
              actions={{
                loadEvents: loadEventsByCoach
              }}
            />
          </div>
        </div>
      );
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
                  {this.renderHoursByDate()}
                </div>
              )}
              {currentTab === "LOGS" && (
                <div className={classes.contentWrapper}>
                  <FiltersToolbar
                    isMobile={isMobile}
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

export default withStyles(styles)(HoursLayout);
