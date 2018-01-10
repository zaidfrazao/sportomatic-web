import React, { Component } from "react";
import AddIcon from "material-ui-icons/Add";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/Edit";
import { lightBlue, orange } from "material-ui/colors";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import AddEventDialog from "./components/AddEventDialog";
import BannerAd from "../../../components/BannerAd";
import Calendar from "./components/Calendar";
import DecisionModal from "../../../components/DecisionModal";
import EditEventDialog from "./components/EditEventDialog";
import EventInfo from "./components/EventInfo";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../components/LeaderboardAd";
import NotificationModal from "../../../components/NotificationModal";

const styles = theme => ({
  adWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: 24,
    right: 24,
    zIndex: 1
  },
  competitiveEvent: {
    width: 12,
    height: 12,
    color: orange[500]
  },
  contentWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  desktopCalendar: {
    width: "60%"
  },
  desktopEventsList: {
    width: "40%",
    height: "100%"
  },
  eventsListWrapper: {
    height: "calc(100% - 98px)"
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  nonCompetitiveEvent: {
    width: 12,
    height: 12,
    color: lightBlue[500]
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tabletEventsListWrapper: {
    height: "100%"
  }
});

class ScheduleLayout extends Component {
  componentWillMount() {
    const { userID } = this.props;
    const {
      loadEvents,
      fetchCreationDate,
      loadCoaches,
      loadManagers,
      loadTeams,
      updateView
    } = this.props.actions;
    const { eventID } = this.props.match.params;

    if (userID !== "") {
      loadCoaches(userID);
      loadManagers(userID);
      loadEvents(userID);
      loadTeams(userID);
      fetchCreationDate(userID);
    }

    if (eventID) {
      updateView("EVENT_INFO");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userID } = this.props;
    const {
      loadEvents,
      fetchCreationDate,
      loadCoaches,
      loadManagers,
      loadTeams
    } = this.props.actions;

    if (userID !== nextProps.userID) {
      loadCoaches(nextProps.userID);
      loadManagers(nextProps.userID);
      loadEvents(nextProps.userID);
      loadTeams(nextProps.userID);
      fetchCreationDate(nextProps.userID);
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
    const {
      currentView,
      errorType,
      selectedEventInfo,
      minDate
    } = this.props.uiConfig;
    const {
      updateView,
      openAddEventDialog,
      closeAddEventDialog,
      openEditEventDialog,
      closeEditEventDialog,
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
      isEditEventDialogLoading,
      isCreationDateLoading,
      isCoachesLoading,
      isManagersLoading,
      isTeamsLoading
    } = this.props.loadingStatus;
    const {
      isAddEventDialogOpen,
      isCancelEventAlertOpen,
      isUncancelEventAlertOpen,
      isEditEventDialogOpen,
      isEventErrorAlertOpen
    } = this.props.dialogs;

    const currentDate = new Date(Date.now());
    if (!dateSelected) {
      return (
        <Redirect
          to={`/admin/schedule/${currentDate.toISOString().slice(0, 10)}`}
        />
      );
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

    const ad = this.createAd();

    if (currentView === "EVENT_INFO") {
      return (
        <div className={classes.contentWrapper}>
          <EventInfo
            coaches={coaches}
            managers={managers}
            teams={teams}
            info={events[eventID]}
            isInfoLoading={isEventsLoading}
            isCoachesLoading={isCoachesLoading}
            isManagersLoading={isManagersLoading}
            isTeamsLoading={isTeamsLoading}
            isMobile={isMobile}
            isTablet={isTablet}
            actions={{ updateView }}
          />
          <Button
            fab
            color="accent"
            aria-label="edit event"
            className={classes.button}
            onClick={() => {
              openEditEventDialog();
            }}
          >
            <EditIcon />
          </Button>
          {false && (
            <EditEventDialog
              isOpen={isEditEventDialogOpen}
              isLoading={isEditEventDialogLoading}
              minDate={currentDate.toISOString().slice(0, 10)}
              initialDate={dateSelected}
              teams={teams}
              coaches={coaches}
              managers={managers}
              initialEventInfo={events[eventID]}
              initialEventID={eventID}
              institutionID={userID}
              actions={{
                handleClose: closeEditEventDialog,
                editEvent,
                openEventErrorAlert
              }}
            />
          )}
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
          {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
          <Calendar
            events={events}
            minDate={minDate}
            dateSelected={dateSelected}
            isMobile={isMobile}
            isTablet={isTablet}
            institutionID={userID}
            currentView={currentView}
            isEventsLoading={isEventsLoading}
            isMinDateLoading={isCreationDateLoading}
            actions={{
              updateView,
              openCancelEventAlert,
              openUncancelEventAlert,
              cancelEvent
            }}
          />
          <Button
            fab
            color="accent"
            aria-label="add event"
            className={classes.button}
            onClick={() => {
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

export default withStyles(styles)(ScheduleLayout);
