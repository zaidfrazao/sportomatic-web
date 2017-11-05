/* eslint-disable array-callback-return */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import { CircularProgress } from "material-ui/Progress";
import HoursCard from "./components/HoursCard";
import TimeLogger from "./components/TimeLogger";
import LeaderboardAd from "../../../components/LeaderboardAd";
import BannerAd from "../../../components/BannerAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
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
  inProgressWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 960px)": {
      display: "block",
      overflow: "auto"
    }
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
      inProgress,
      isTablet,
      events,
      userID,
      activeInstitutionID,
      isMobile
    } = this.props;
    const { signIn, signOut, approveHours } = this.props.actions;

    const currentDate = new Date(Date.now()).toISOString().slice(0, 10);
    let currentTime = new Date(Date.now());
    currentTime.setHours(currentTime.getHours() + 2);
    currentTime = currentTime.toISOString().slice(11, 16);

    let inProgressEvent = {};
    _.toPairs(events).map(([year, months]) => {
      _.toPairs(months).map(([month, events]) => {
        _.toPairs(events).map(([id, info]) => {
          let hasUnapprovedHours = false;
          _.toPairs(info.coaches).map(([coachID, coachInfo]) => {
            if (coachInfo.hours.status !== "APPROVED") {
              hasUnapprovedHours = true;
            }
          });
          if (
            hasUnapprovedHours &&
            info.metadata.date === currentDate &&
            currentTime <= info.metadata.endTime &&
            currentTime > info.metadata.startTime &&
            info.managers[userID]
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
        <div className={classes.adWrapper}>{ad}</div>
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
            institutionID={activeInstitutionID}
            eventInfo={{
              eventID: inProgressEvent.eventID,
              eventTitle: inProgressEvent.metadata.title,
              date: inProgressEvent.metadata.date,
              startTime: inProgressEvent.metadata.startTime,
              endTime: inProgressEvent.metadata.endTime,
              notes: inProgressEvent.metadata.additionalInfo.notes,
              year: inProgressEvent.metadata.date.slice(0, 4),
              month: inProgressEvent.metadata.date.slice(5, 7),
              coaches: inProgressEvent.coaches
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
    const {
      classes,
      isTablet,
      events,
      userID,
      activeInstitutionID,
      isMobile
    } = this.props;
    const { signIn, signOut, approveHours } = this.props.actions;

    const currentDate = new Date(Date.now()).toISOString().slice(0, 10);
    let eventsList = [];
    _.toPairs(events).map(([year, months]) => {
      _.toPairs(months).map(([month, events]) => {
        _.toPairs(events).map(([id, info]) => {
          let hasUnapprovedHours = false;
          _.toPairs(info.coaches).map(([coachID, coachInfo]) => {
            if (coachInfo.hours.status !== "APPROVED") {
              hasUnapprovedHours = true;
            }
          });
          if (
            hasUnapprovedHours &&
            info.metadata.date <= currentDate &&
            info.managers[userID]
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
        <div className={classes.adWrapper}>{ad}</div>
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
                  month: eventInfo.metadata.date.slice(5, 7),
                  coaches: eventInfo.coaches
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

  render() {
    const { classes } = this.props;
    const { isStaffLoading, isEventsLoading } = this.props.loadingStatus;
    const { currentTab } = this.props.uiConfig;
    const { updateTab } = this.props.actions;

    return (
      <div className={classes.root}>
        {isStaffLoading || isEventsLoading ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        ) : (
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
                  <Tab label="In Progress" value="IN_PROGRESS" />
                  <Tab label="Pending" value="AWAITING_APPROVAL" />
                </Tabs>
              </AppBar>
              {currentTab === "IN_PROGRESS" && this.renderInProgressTab()}
              {currentTab === "AWAITING_APPROVAL" &&
                this.renderAwaitingApprovalTab()}
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
