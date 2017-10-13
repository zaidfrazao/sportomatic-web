// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { lightBlue } from "material-ui/colors";
import { CircularProgress } from "material-ui/Progress";
import Paper from "material-ui/Paper";
import LeaderboardAd from "../../../components/LeaderboardAd";
import Calendar from "./components/Calendar";
import EventInfo from "./components/EventInfo";
import EventsList from "./components/EventsList";

const styles = theme => ({
  root: {
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
  calendarWrapper: {
    margin: "0 40px",
    display: "flex",
    backgroundColor: lightBlue[700],
    height: "calc(100vh - 257px)"
  },
  desktopCalendar: {
    width: "40%"
  },
  desktopEventsList: {
    width: "60%",
    height: "100%"
  },
  tabletEventsListWrapper: {
    height: "100%"
  },
  eventsListWrapper: {
    height: "calc(100% - 98px)"
  },
  button: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: 72,
    right: 24,
    zIndex: 1,
    "@media (min-width: 600px)": {
      bottom: 24
    }
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  contentWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

class ScheduleLayout extends Component {
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

  renderView() {
    const { isTablet, isMobile, classes, userID, events } = this.props;
    const { dateSelected, eventID } = this.props.match.params;
    const { currentView } = this.props.uiConfig;
    const { updateView } = this.props.actions;
    const { isEventsLoading } = this.props.loadingStatus;

    const currentDate = new Date(Date.now());
    let yearSelected = "";
    let monthSelected = "";

    if (!dateSelected) {
      return (
        <Redirect
          to={`/coach/schedule/${currentDate.toISOString().slice(0, 10)}`}
        />
      );
    } else {
      yearSelected = dateSelected.slice(0, 4);
      monthSelected = dateSelected.slice(5, 7);
    }

    if (currentView === "EVENT_INFO") {
      return (
        <div className={classes.contentWrapper}>
          {isEventsLoading ? (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <EventInfo
              info={events[yearSelected][monthSelected][eventID]}
              userID={userID}
              actions={{ updateView }}
            />
          )}
        </div>
      );
    }

    if (isTablet) {
      if (currentView === "EVENTS_LIST") {
        return (
          <div className={classes.tabletEventsListWrapper}>
            {isEventsLoading ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <EventsList
                isTablet={isTablet}
                dateSelected={dateSelected}
                events={
                  (events[yearSelected] &&
                    events[yearSelected][monthSelected]) ||
                  {}
                }
                institutionID={userID}
                actions={{ updateView }}
              />
            )}
          </div>
        );
      } else {
        return (
          <div className={classes.contentWrapper}>
            <div className={classes.adWrapper}>
              <LeaderboardAd />
            </div>
            {isEventsLoading ? (
              <div className={classes.loaderWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <Calendar
                dateSelected={new Date(dateSelected)}
                isMobile={isMobile}
                isTablet={isTablet}
                actions={{ updateView }}
              />
            )}
          </div>
        );
      }
    } else {
      return (
        <div className={classes.contentWrapper}>
          <div className={classes.adWrapper}>
            <LeaderboardAd />
          </div>
          {isEventsLoading ? (
            <div className={classes.loaderWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <Paper className={classes.calendarWrapper}>
              <div className={classes.desktopCalendar}>
                <Calendar
                  dateSelected={new Date(dateSelected)}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  actions={{ updateView }}
                />
              </div>
              <div className={classes.desktopEventsList}>
                <EventsList
                  isTablet={isTablet}
                  dateSelected={dateSelected}
                  events={
                    (events[yearSelected] &&
                      events[yearSelected][monthSelected]) ||
                    {}
                  }
                  institutionID={userID}
                  actions={{ updateView }}
                />
              </div>
            </Paper>
          )}
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.renderView()}</div>;
  }
}

ScheduleLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScheduleLayout);
