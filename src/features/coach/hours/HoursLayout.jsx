// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import { CircularProgress } from "material-ui/Progress";
import InProgressIcon from "material-ui-icons/Autorenew";
import AwaitingApprovalIcon from "material-ui-icons/MoreHoriz";
import HoursCard from "./components/HoursCard";
import TimeLogger from "./components/TimeLogger";
import LeaderboardAd from "../../../components/LeaderboardAd";
import HoursHistory from "./components/HoursHistory";
import HistoryIcon from "material-ui-icons/History";
import Typography from "material-ui/Typography";
import _ from "lodash";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentWrapper: {
    width: "100%",
    height: "100%"
  },
  tabsWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  historyWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
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
  historyTableWrapper: {
    flexGrow: 1,
    display: "flex"
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
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: "24px 24px 0 24px",
    "@media (max-width: 960px)": {
      width: "100%",
      padding: "0 24px",
      margin: "24px 0"
    }
  },
  noEventsAwaitingApprovalWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  coachName: {
    margin: "24px 0",
    width: "100%",
    textAlign: "center"
  }
});

class HoursLayout extends Component {
  componentWillMount() {
    const { userID, activeInstitutionID } = this.props;
    const { loadEvents } = this.props.actions;

    loadEvents(activeInstitutionID, userID);
  }

  componentWillReceiveProps(nextProps) {
    const { userID, activeInstitutionID } = this.props;
    const { loadEvents } = this.props.actions;

    if (
      userID !== nextProps.userID ||
      activeInstitutionID !== nextProps.activeInstitutionID
    ) {
      loadEvents(nextProps.activeInstitutionID, nextProps.userID);
    }
  }

  renderInProgressTab() {
    const {
      classes,
      isTablet,
      events,
      userID,
      activeInstitutionID
    } = this.props;
    const { signIn, signOut } = this.props.actions;

    const currentDate = new Date(Date.now()).toISOString().slice(0, 10);
    let currentTime = new Date(Date.now());
    currentTime.setHours(currentTime.getHours() + 2);
    currentTime = currentTime.toISOString().slice(11, 16);

    let inProgressEvent = {};
    _.toPairs(events).map(([year, months]) => {
      _.toPairs(months).map(([month, events]) => {
        _.toPairs(events).map(([id, info]) => {
          if (
            info.coaches[userID] &&
            info.coaches[userID].hours.status !== "APPROVED" &&
            info.coaches[userID].hours.status !== "AWAITING_APPROVAL" &&
            info.metadata.date === currentDate &&
            currentTime <= info.metadata.endTime &&
            currentTime > info.metadata.startTime
          ) {
            return (inProgressEvent = { eventID: id, ...info });
          }
        });
      });
    });

    return (
      <div className={classes.inProgressWrapper}>
        <div className={classes.adWrapper}>
          <LeaderboardAd />
        </div>
        {!inProgressEvent.metadata ? (
          <div className={classes.noEventsAwaitingApprovalWrapper}>
            <Typography type="subheading" component="h3">
              No events in progress.
            </Typography>
          </div>
        ) : (
          <TimeLogger
            isTablet={isTablet}
            institutionID={activeInstitutionID}
            info={{
              eventID: inProgressEvent.eventID,
              eventTitle: inProgressEvent.metadata.title,
              date: inProgressEvent.metadata.date,
              startTime: inProgressEvent.metadata.startTime,
              endTime: inProgressEvent.metadata.endTime,
              notes: inProgressEvent.metadata.additionalInfo.notes,
              year: inProgressEvent.metadata.date.slice(0, 4),
              month: inProgressEvent.metadata.date.slice(5, 7)
            }}
            coachInfo={{
              id: userID,
              status: inProgressEvent.coaches[userID].hours.status,
              signInTime: inProgressEvent.coaches[userID].hours.signInTime,
              signOutTime: inProgressEvent.coaches[userID].hours.signOutTime,
              standardHourlyRate:
                inProgressEvent.coaches[userID].hours.standardHourlyRate,
              overtimeHourlyRate:
                inProgressEvent.coaches[userID].hours.overtimeHourlyRate
            }}
            actions={{
              signIn,
              signOut
            }}
          />
        )}
      </div>
    );
  }

  renderAwaitingApprovalTab() {
    const {
      classes,
      isTablet,
      events,
      userID,
      activeInstitutionID
    } = this.props;
    const { signIn, signOut } = this.props.actions;

    const currentDate = new Date(Date.now()).toISOString().slice(0, 10);
    let eventsList = [];
    _.toPairs(events).map(([year, months]) => {
      _.toPairs(months).map(([month, events]) => {
        _.toPairs(events).map(([id, info]) => {
          if (
            info.coaches[userID] &&
            info.coaches[userID].hours.status !== "APPROVED" &&
            info.metadata.date <= currentDate
          ) {
            return eventsList.push({ eventID: id, ...info });
          }
        });
      });
    });

    return (
      <div className={classes.awaitingApprovalWrapper}>
        <div className={classes.adWrapper}>
          <LeaderboardAd />
        </div>
        {eventsList.length === 0 ? (
          <div className={classes.noEventsAwaitingApprovalWrapper}>
            <Typography type="subheading" component="h3">
              No hours awaiting approval.
            </Typography>
          </div>
        ) : (
          <div>
            {eventsList.map((eventInfo, index) => (
              <HoursCard
                key={index}
                institutionID={activeInstitutionID}
                eventInfo={{
                  eventID: eventInfo.eventID,
                  eventTitle: eventInfo.metadata.title,
                  date: eventInfo.metadata.date,
                  startTime: eventInfo.metadata.startTime,
                  endTime: eventInfo.metadata.endTime,
                  year: eventInfo.metadata.date.slice(0, 4),
                  month: eventInfo.metadata.date.slice(5, 7)
                }}
                coachInfo={{
                  coachID: userID,
                  status: eventInfo.coaches[userID].hours.status,
                  signInTime: eventInfo.coaches[userID].hours.signInTime,
                  signOutTime: eventInfo.coaches[userID].hours.signOutTime,
                  standardHourlyRate:
                    eventInfo.coaches[userID].hours.standardHourlyRate,
                  overtimeHourlyRate:
                    eventInfo.coaches[userID].hours.overtimeHourlyRate
                }}
                actions={{
                  signIn,
                  signOut
                }}
                isTablet={isTablet}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  renderHistoryTab() {
    const { classes, isMobile, isTablet, events, userID } = this.props;

    let eventsList = {};
    _.toPairs(events).map(([year, months]) => {
      _.toPairs(months).map(([month, events]) => {
        _.toPairs(events).map(([id, info]) => {
          if (
            info.coaches[userID] &&
            info.coaches[userID].hours.status === "APPROVED"
          ) {
            if (eventsList[year]) {
              return (eventsList[year][month] = {
                ...eventsList[year][month],
                [id]: { eventID: id, ...info }
              });
            } else {
              return (eventsList[year] = {
                [month]: {
                  [id]: { eventID: id, ...info }
                }
              });
            }
          }
        });
      });
    });

    return (
      <div className={classes.historyWrapper}>
        <div className={classes.adWrapper}>
          <LeaderboardAd />
        </div>
        <div className={classes.historyTableWrapper}>
          <HoursHistory
            isMobile={isMobile}
            isTablet={isTablet}
            events={eventsList}
            coachID={userID}
          />
        </div>
      </div>
    );
  }

  render() {
    const { classes, isMobile } = this.props;
    const { isEventsLoading } = this.props.loadingStatus;
    const { currentTab } = this.props.uiConfig;
    const { updateTab } = this.props.actions;

    return (
      <div className={classes.root}>
        {isEventsLoading ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        ) : (
          <div className={classes.contentWrapper}>
            <div className={classes.tabsWrapper}>
              <AppBar position="static" color="default">
                {isMobile ? (
                  <Tabs
                    value={currentTab}
                    onChange={(event, newTab) => updateTab(newTab)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab value="IN_PROGRESS" icon={<InProgressIcon />} />
                    <Tab
                      value="AWAITING_APPROVAL"
                      icon={<AwaitingApprovalIcon />}
                    />
                    <Tab value="HISTORY" icon={<HistoryIcon />} />
                  </Tabs>
                ) : (
                  <Tabs
                    value={currentTab}
                    onChange={(event, newTab) => updateTab(newTab)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab
                      label="In Progress"
                      value="IN_PROGRESS"
                      icon={<InProgressIcon />}
                    />
                    <Tab
                      label="Awaiting Approval"
                      value="AWAITING_APPROVAL"
                      icon={<AwaitingApprovalIcon />}
                    />
                    <Tab
                      label="History"
                      value="HISTORY"
                      icon={<HistoryIcon />}
                    />
                  </Tabs>
                )}
              </AppBar>
              {currentTab === "IN_PROGRESS" && this.renderInProgressTab()}
              {currentTab === "AWAITING_APPROVAL" &&
                this.renderAwaitingApprovalTab()}
              {currentTab === "HISTORY" && this.renderHistoryTab()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

HoursLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoursLayout);
