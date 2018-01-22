/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import { grey, lightBlue } from "material-ui/colors";
import moment from "moment";
import Paper from "material-ui/Paper";
import Tabs, { Tab } from "material-ui/Tabs";
import { withStyles } from "material-ui/styles";
import BannerAd from "../../../components/BannerAd";
import HoursCard from "./components/HoursCard";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../components/LeaderboardAd";

const styles = theme => ({
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
  noEventsAwaitingApprovalWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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

  render() {
    const { classes } = this.props;
    const { currentTab } = this.props.uiConfig;
    const { updateTab } = this.props.actions;

    const ad = this.createAd();

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
            {currentTab === "LOGS" && <div />}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HoursLayout);
