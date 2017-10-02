// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { lightBlue } from "material-ui/colors";
import { CircularProgress } from "material-ui/Progress";
import AddIcon from "material-ui-icons/Add";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/Edit";
import Paper from "material-ui/Paper";
import LeaderboardAd from "../../../components/LeaderboardAd";
import Calendar from "./components/Calendar";
import EventInfo from "./components/EventInfo";
import EventsList from "./components/EventsList";
import AddEventDialog from "./components/AddEventDialog";
import NotificationModal from "../../../components/NotificationModal";

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
    backgroundColor: lightBlue[700]
  },
  desktopCalendar: {
    width: "40%"
  },
  desktopEventsList: {
    flexGrow: 1
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
    const { userID } = this.props;
    const { loadEvents } = this.props.actions;
    loadEvents(userID);
  }

  componentWillReceiveProps(nextProps) {
    const { userID } = this.props;
    const { loadEvents } = this.props.actions;

    if (userID !== nextProps.userID) {
      loadEvents(nextProps.userID);
    }
  }

  renderView() {
    const {
      isTablet,
      isMobile,
      classes,
      userID,
      teams,
      coaches,
      managers,
      events
    } = this.props;
    const { dateSelected, eventID } = this.props.match.params;
    const { currentView, errorType } = this.props.uiConfig;
    const {
      updateView,
      openAddEventDialog,
      closeAddEventDialog,
      loadTeams,
      loadStaff,
      addEvent,
      openAddEventErrorAlert,
      closeAddEventErrorAlert
    } = this.props.actions;
    const {
      isEventsLoading,
      isAddEventDialogLoading
    } = this.props.loadingStatus;
    const {
      isAddEventDialogOpen,
      isAddEventErrorAlertOpen
    } = this.props.dialogs;

    const currentDate = new Date(Date.now());
    let yearSelected = "";
    let monthSelected = "";

    if (!dateSelected) {
      return (
        <Redirect
          to={`/institution/schedule/${currentDate.toISOString().slice(0, 10)}`}
        />
      );
    } else {
      yearSelected = dateSelected.slice(0, 4);
      monthSelected = dateSelected.slice(5, 7);
    }

    let addEventErrorAlertHeading = "Event Title Required";
    let addEventErrorAlertMessage =
      "You need to specify a title for this event before saving it.";
    if (errorType === "DATE") {
      addEventErrorAlertHeading = "Date Invalid";
      addEventErrorAlertMessage =
        "You cannot create an event scheduled for a date that has already passed.";
    }
    if (errorType === "LOADING") {
      addEventErrorAlertHeading = "Network Issue";
      addEventErrorAlertMessage =
        "You have lost your connection to the internet. Please check your connectivity and try again.";
    }
    if (errorType === "EVENT_TYPE") {
      addEventErrorAlertHeading = "Event Type Required";
      addEventErrorAlertMessage =
        "Please specify a name for your custom event type.";
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
              actions={{ updateView }}
            />
          )}
          <Button
            fab
            color="accent"
            aria-label="edit event"
            className={classes.button}
          >
            <EditIcon />
          </Button>
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
                actions={{ updateView }}
              />
            )}
            <Button
              fab
              color="accent"
              aria-label="add event"
              className={classes.button}
              onClick={() => {
                loadTeams(userID);
                loadStaff(userID);
                openAddEventDialog();
              }}
            >
              <AddIcon />
            </Button>
            <AddEventDialog
              isOpen={isAddEventDialogOpen}
              isLoading={isAddEventDialogLoading}
              minDate={currentDate.toISOString().slice(0, 10)}
              initialDate={dateSelected}
              teams={teams}
              coaches={coaches}
              managers={managers}
              actions={{
                handleClose: closeAddEventDialog,
                addEvent,
                openAddEventErrorAlert
              }}
            />
            <NotificationModal
              isOpen={isAddEventErrorAlertOpen}
              handleOkClick={closeAddEventErrorAlert}
              heading={addEventErrorAlertHeading}
              message={addEventErrorAlertMessage}
            />
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
                  actions={{ updateView }}
                />
              </div>
            </Paper>
          )}
          <Button
            fab
            color="accent"
            aria-label="add event"
            className={classes.button}
            onClick={() => {
              loadTeams(userID);
              loadStaff(userID);
              openAddEventDialog();
            }}
          >
            <AddIcon />
          </Button>
          <AddEventDialog
            isOpen={isAddEventDialogOpen}
            isLoading={isAddEventDialogLoading}
            minDate={currentDate.toISOString().slice(0, 10)}
            initialDate={dateSelected}
            institutionID={userID}
            teams={teams}
            coaches={coaches}
            managers={managers}
            actions={{
              handleClose: closeAddEventDialog,
              addEvent,
              openAddEventErrorAlert
            }}
          />
          <NotificationModal
            isOpen={isAddEventErrorAlertOpen}
            handleOkClick={closeAddEventErrorAlert}
            heading={addEventErrorAlertHeading}
            message={addEventErrorAlertMessage}
          />
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
