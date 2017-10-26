// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import { Route } from "react-router-dom";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import HoursCard from "./components/HoursCard";
import TimeLogger from "./components/TimeLogger";
import LeaderboardAd from "../../../components/LeaderboardAd";
import BannerAd from "../../../components/BannerAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import CoachesList from "./components/CoachesList";
import HoursHistory from "./components/HoursHistory";

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
  eventsAwaitingApprovalWrapper: {
    flexGrow: 1,
    overflow: "auto"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: 24,
    "@media (max-width: 600px)": {
      width: "calc(100% - 48px)"
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
    const { userID } = this.props;
    const { loadStaff, loadEvents } = this.props.actions;

    loadEvents(userID);
    loadStaff(userID);
  }

  componentWillReceiveProps(nextProps) {
    const { userID } = this.props;
    const { loadStaff, loadEvents } = this.props.actions;

    if (userID !== nextProps.userID) {
      loadStaff(nextProps.userID);
      loadEvents(nextProps.userID);
    }
  }

  renderInProgressTab() {
    const {
      classes,
      inProgress,
      isTablet,
      events,
      userID,
      coaches,
      isMobile
    } = this.props;
    const { signIn, signOut, approveHours } = this.props.actions;
    const { coachID } = this.props.match.params;

    const currentDate = new Date(Date.now()).toISOString().slice(0, 10);
    let currentTime = new Date(Date.now());
    currentTime.setHours(currentTime.getHours() + 2);
    currentTime = currentTime.toISOString().slice(11, 16);

    let inProgressEvent = {};
    _.toPairs(events).map(([year, months]) => {
      _.toPairs(months).map(([month, events]) => {
        _.toPairs(events).map(([id, info]) => {
          if (
            info.coaches[coachID] &&
            info.coaches[coachID].hours.status !== "APPROVED" &&
            info.metadata.date === currentDate &&
            currentTime <= info.metadata.endTime &&
            currentTime > info.metadata.startTime
          ) {
            return (inProgressEvent = { eventID: id, ...info });
          }
        });
      });
    });

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.inProgressWrapper}>
        <div>
          <Route
            render={({ history }) => (
              <Button
                raised
                className={classes.button}
                onClick={() => history.goBack()}
              >
                Back
              </Button>
            )}
          />
        </div>
        {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
        {!inProgressEvent.metadata ? (
          <div className={classes.noEventsAwaitingApprovalWrapper}>
            <Typography type="subheading" component="h3">
              No events in progress.
            </Typography>
          </div>
        ) : (
          <TimeLogger
            info={inProgress}
            isTablet={isTablet}
            institutionID={userID}
            eventInfo={{
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
              coachID,
              name: coaches[coachID].metadata.name,
              surname: coaches[coachID].metadata.surname,
              profilePictureURL: coaches[coachID].metadata.profilePictureURL,
              status: inProgressEvent.coaches[coachID].hours.status,
              signInTime: inProgressEvent.coaches[coachID].hours.signInTime,
              signOutTime: inProgressEvent.coaches[coachID].hours.signOutTime,
              standardHourlyRate:
                inProgressEvent.coaches[coachID].hours.standardHourlyRate,
              overtimeHourlyRate:
                inProgressEvent.coaches[coachID].hours.overtimeHourlyRate
            }}
            actions={{
              signIn,
              signOut,
              approveHours
            }}
          />
        )}
      </div>
    );
  }

  renderAwaitingApprovalTab() {
    const { classes, isTablet, events, coaches, userID, isMobile } = this.props;
    const { signIn, signOut, approveHours } = this.props.actions;
    const { coachID } = this.props.match.params;

    const currentDate = new Date(Date.now()).toISOString().slice(0, 10);
    let eventsList = [];
    _.toPairs(events).map(([year, months]) => {
      _.toPairs(months).map(([month, events]) => {
        _.toPairs(events).map(([id, info]) => {
          if (
            info.coaches[coachID] &&
            info.coaches[coachID].hours.status !== "APPROVED" &&
            info.metadata.date <= currentDate
          ) {
            return eventsList.push({ eventID: id, ...info });
          }
        });
      });
    });

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.awaitingApprovalWrapper}>
        <div>
          <Route
            render={({ history }) => (
              <Button
                raised
                className={classes.button}
                onClick={() => history.goBack()}
              >
                Back
              </Button>
            )}
          />
        </div>
        {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
        {eventsList.length === 0 ? (
          <div className={classes.noEventsAwaitingApprovalWrapper}>
            <Typography type="subheading" component="h3">
              No hours awaiting approval.
            </Typography>
          </div>
        ) : (
          <div className={classes.eventAwaitingApprovalWrapper}>
            {eventsList.map((eventInfo, index) => (
              <HoursCard
                key={index}
                institutionID={userID}
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
                  coachID,
                  name: coaches[coachID].metadata.name,
                  surname: coaches[coachID].metadata.surname,
                  profilePictureURL:
                    coaches[coachID].metadata.profilePictureURL,
                  status: eventInfo.coaches[coachID].hours.status,
                  signInTime: eventInfo.coaches[coachID].hours.signInTime,
                  signOutTime: eventInfo.coaches[coachID].hours.signOutTime,
                  standardHourlyRate:
                    eventInfo.coaches[coachID].hours.standardHourlyRate,
                  overtimeHourlyRate:
                    eventInfo.coaches[coachID].hours.overtimeHourlyRate
                }}
                actions={{
                  signIn,
                  signOut,
                  approveHours
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
    const { classes, isMobile, isTablet, events } = this.props;
    const { coachID } = this.props.match.params;

    let eventsList = {};
    _.toPairs(events).map(([year, months]) => {
      _.toPairs(months).map(([month, events]) => {
        _.toPairs(events).map(([id, info]) => {
          if (
            info.coaches[coachID] &&
            info.coaches[coachID].hours.status === "APPROVED"
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

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.historyWrapper}>
        <div>
          <Route
            render={({ history }) => (
              <Button
                raised
                className={classes.button}
                onClick={() => history.goBack()}
              >
                Back
              </Button>
            )}
          />
        </div>
        {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
        <div className={classes.historyTableWrapper}>
          <HoursHistory
            isMobile={isMobile}
            isTablet={isTablet}
            events={eventsList}
            coachID={coachID}
          />
        </div>
      </div>
    );
  }

  render() {
    const { classes, isMobile, isTablet, coaches } = this.props;
    const { isStaffLoading, isEventsLoading } = this.props.loadingStatus;
    const { currentTab } = this.props.uiConfig;
    const { updateTab } = this.props.actions;
    const { coachID } = this.props.match.params;

    const coachesList = _.values(
      _.mapValues(coaches, (value, key) => {
        return {
          ...value,
          id: key,
          name: value.metadata.name,
          surname: value.metadata.surname,
          profilePictureURL: value.metadata.profilePictureURL
        };
      })
    ).sort((personA, personB) => {
      if (personA.metadata.name > personB.metadata.name) return +1;
      if (personA.metadata.name < personB.metadata.name) return -1;
      if (personA.metadata.surname > personB.metadata.surname) return +1;
      if (personA.metadata.surname < personB.metadata.surname) return -1;
      return 0;
    });

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
    }

    return (
      <div className={classes.root}>
        {isStaffLoading || isEventsLoading ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        ) : (
          <div className={classes.contentWrapper}>
            {coaches[coachID] ? (
              <div className={classes.tabsWrapper}>
                <AppBar position="static" color="default">
                  <Typography
                    type="title"
                    component="h2"
                    className={classes.coachName}
                  >
                    {`${coaches[coachID].metadata.name} ${coaches[coachID]
                      .metadata.surname}`}
                  </Typography>
                  <Tabs
                    value={currentTab}
                    onChange={(event, newTab) => updateTab(newTab)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab label="In Progress" value="IN_PROGRESS" />
                    <Tab label="Pending" value="AWAITING_APPROVAL" />
                    <Tab label="History" value="HISTORY" />
                  </Tabs>
                </AppBar>
                {currentTab === "IN_PROGRESS" && this.renderInProgressTab()}
                {currentTab === "AWAITING_APPROVAL" &&
                  this.renderAwaitingApprovalTab()}
                {currentTab === "HISTORY" && this.renderHistoryTab()}
              </div>
            ) : (
              <div
                className={
                  coachesList.length > 0
                    ? classes.coachesList
                    : classes.coachesListNoCards
                }
              >
                <div className={classes.adWrapper}>{ad}</div>
                <CoachesList coaches={coachesList} />
              </div>
            )}
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
