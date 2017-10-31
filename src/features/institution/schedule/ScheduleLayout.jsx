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
import BannerAd from "../../../components/BannerAd";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import Calendar from "./components/Calendar";
import EventInfo from "./components/EventInfo";
import EventsList from "./components/EventsList";
import AddEventDialog from "./components/AddEventDialog";
import EditEventDialog from "./components/EditEventDialog";
import NotificationModal from "../../../components/NotificationModal";
import DecisionModal from "../../../components/DecisionModal";

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
    const { currentView, errorType, selectedEventInfo } = this.props.uiConfig;
    const {
      updateView,
      openAddEventDialog,
      closeAddEventDialog,
      openEditEventDialog,
      closeEditEventDialog,
      loadTeams,
      loadStaff,
      addEvent,
      openEventErrorAlert,
      closeEventErrorAlert,
      openCancelEventAlert,
      closeCancelEventAlert,
      openUncancelEventAlert,
      closeUncancelEventAlert,
      cancelEvent,
      uncancelEvent,
      editEvent
    } = this.props.actions;
    const {
      isEventsLoading,
      isAddEventDialogLoading,
      isEditEventDialogLoading
    } = this.props.loadingStatus;
    const {
      isAddEventDialogOpen,
      isCancelEventAlertOpen,
      isUncancelEventAlertOpen,
      isEditEventDialogOpen,
      isEventErrorAlertOpen
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

    let eventErrorAlertHeading = "Event Title Required";
    let eventErrorAlertMessage =
      "You need to specify a title for this event before saving it.";
    if (errorType === "DATE") {
      eventErrorAlertHeading = "Date Invalid";
      eventErrorAlertMessage =
        "You cannot create an event scheduled for a date that has already passed.";
    }
    if (errorType === "LOADING") {
      eventErrorAlertHeading = "Network Issue";
      eventErrorAlertMessage =
        "You have lost your connection to the internet. Please check your connectivity and try again.";
    }
    if (errorType === "EVENT_TYPE") {
      eventErrorAlertHeading = "Event Type Required";
      eventErrorAlertMessage =
        "Please specify a name for your custom event type.";
    }

    let ad = <LeaderboardAd />;
    if (isMobile) {
      ad = <LargeMobileBannerAd />;
    } else if (isTablet) {
      ad = <BannerAd />;
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
              isMobile={isMobile}
              isTablet={isTablet}
              actions={{ updateView }}
            />
          )}
          <Button
            fab
            color="accent"
            aria-label="edit event"
            className={classes.button}
            onClick={() => {
              loadTeams(userID);
              loadStaff(userID);
              openEditEventDialog();
            }}
          >
            <EditIcon />
          </Button>
          <EditEventDialog
            isOpen={isEditEventDialogOpen}
            isLoading={isEditEventDialogLoading}
            minDate={currentDate.toISOString().slice(0, 10)}
            initialDate={dateSelected}
            teams={teams}
            coaches={coaches}
            managers={managers}
            initialEventInfo={events[yearSelected][monthSelected][eventID]}
            initialEventID={eventID}
            institutionID={userID}
            actions={{
              handleClose: closeEditEventDialog,
              editEvent,
              openEventErrorAlert
            }}
          />
          <NotificationModal
            isOpen={isEventErrorAlertOpen}
            handleOkClick={closeEventErrorAlert}
            heading={eventErrorAlertHeading}
            message={eventErrorAlertMessage}
          />
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
                actions={{
                  updateView,
                  openCancelEventAlert,
                  openUncancelEventAlert,
                  cancelEvent
                }}
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
                openEventErrorAlert
              }}
            />
            <DecisionModal
              isOpen={isCancelEventAlertOpen}
              handleYesClick={() => {
                cancelEvent(
                  selectedEventInfo.institutionID,
                  selectedEventInfo.eventID,
                  selectedEventInfo.managerIDs,
                  selectedEventInfo.coachIDs,
                  selectedEventInfo.year,
                  selectedEventInfo.month
                );
                closeCancelEventAlert();
              }}
              handleNoClick={closeCancelEventAlert}
              heading="Cancel Event"
              message="Are you sure you want to cancel this event?"
            />
            <DecisionModal
              isOpen={isUncancelEventAlertOpen}
              handleYesClick={() => {
                uncancelEvent(
                  selectedEventInfo.institutionID,
                  selectedEventInfo.eventID,
                  selectedEventInfo.managerIDs,
                  selectedEventInfo.coachIDs,
                  selectedEventInfo.year,
                  selectedEventInfo.month
                );
                closeUncancelEventAlert();
              }}
              handleNoClick={closeUncancelEventAlert}
              heading="Uncancel Event"
              message="Are you sure you want to uncancel this event?"
            />
            <NotificationModal
              isOpen={isEventErrorAlertOpen}
              handleOkClick={closeEventErrorAlert}
              heading={eventErrorAlertHeading}
              message={eventErrorAlertMessage}
            />
          </div>
        );
      } else {
        return (
          <div className={classes.contentWrapper}>
            <div className={classes.adWrapper}>{ad}</div>
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
          <div className={classes.adWrapper}>{ad}</div>
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
                  actions={{
                    updateView,
                    openCancelEventAlert,
                    openUncancelEventAlert,
                    cancelEvent
                  }}
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
              openEventErrorAlert
            }}
          />
          <DecisionModal
            isOpen={isCancelEventAlertOpen}
            handleYesClick={() => {
              cancelEvent(
                selectedEventInfo.institutionID,
                selectedEventInfo.eventID,
                selectedEventInfo.managerIDs,
                selectedEventInfo.coachIDs,
                selectedEventInfo.year,
                selectedEventInfo.month
              );
              closeCancelEventAlert();
            }}
            handleNoClick={closeCancelEventAlert}
            heading="Cancel Event"
            message="Are you sure you want to cancel this event?"
          />
          <DecisionModal
            isOpen={isUncancelEventAlertOpen}
            handleYesClick={() => {
              uncancelEvent(
                selectedEventInfo.institutionID,
                selectedEventInfo.eventID,
                selectedEventInfo.managerIDs,
                selectedEventInfo.coachIDs,
                selectedEventInfo.year,
                selectedEventInfo.month
              );
              closeUncancelEventAlert();
            }}
            handleNoClick={closeUncancelEventAlert}
            heading="Uncancel Event"
            message="Are you sure you want to uncancel this event?"
          />
          <NotificationModal
            isOpen={isEventErrorAlertOpen}
            handleOkClick={closeEventErrorAlert}
            heading={eventErrorAlertHeading}
            message={eventErrorAlertMessage}
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
