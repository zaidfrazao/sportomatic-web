/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import MuiButton from "material-ui/Button";
import { Redirect } from "react-router-dom";
import AddEventDialog from "./components/AddEventDialog";
import Button from "../../components/Button";
import Calendar from "./components/Calendar";
import { common } from "../../utils/colours";
import DecisionModal from "../../components/DecisionModal";
import EditEventDialog from "./components/EditEventDialog";
import EventInfo from "./components/EventInfo";
import NotificationModal from "../../components/NotificationModal";

const styles = {
  actionsBar: {
    display: "flex",
    justifyContent: "center",
    margin: "0 24px 24px 24px"
  },
  contentWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  calendarWrapper: {
    flexGrow: 1
  },
  fabPosition: {
    color: common["white"],
    position: "fixed",
    right: 24,
    bottom: 24,
    zIndex: 10
  },
  flexGrow: {
    flexGrow: 1
  },
  iconAdjacentText: {
    marginRight: 8
  },
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  }
};

class ScheduleLayout extends Component {
  state = {
    genders: {},
    eventTypes: {},
    sports: {},
    divisions: {},
    ageGroups: {}
  };

  componentWillMount() {
    const { activeInstitutionID } = this.props;
    const {
      loadEvents,
      fetchCreationDate,
      loadStaff,
      loadTeams,
      updateView
    } = this.props.actions;
    const { eventID, dateSelected } = this.props.match.params;

    if (dateSelected && activeInstitutionID !== "") {
      const minDate = moment(dateSelected)
        .startOf("month")
        .toDate();
      const maxDate = moment(dateSelected)
        .endOf("month")
        .toDate();
      loadEvents(activeInstitutionID, minDate, maxDate);
    }

    if (activeInstitutionID !== "") {
      loadStaff(activeInstitutionID);
      loadTeams(activeInstitutionID);
      fetchCreationDate(activeInstitutionID);
    }

    if (eventID) {
      updateView("EVENT_INFO");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, events, teams } = nextProps;
    const { dateSelected, eventID } = nextProps.match.params;
    const {
      loadEvents,
      fetchCreationDate,
      loadStaff,
      loadTeams,
      updateView
    } = nextProps.actions;

    if (dateSelected !== this.props.match.params.dateSelected && dateSelected) {
      const minDate = moment(dateSelected)
        .startOf("month")
        .toDate();
      const maxDate = moment(dateSelected)
        .endOf("month")
        .toDate();

      if (
        _.keys(events).length === 0 ||
        !moment(dateSelected).isSame(
          moment(this.props.match.params.dateSelected),
          "month"
        )
      ) {
        loadEvents(activeInstitutionID, minDate, maxDate);
      }
    }

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      if (dateSelected) {
        const minDate = moment(dateSelected)
          .startOf("month")
          .toDate();
        const maxDate = moment(dateSelected)
          .endOf("month")
          .toDate();
        loadEvents(activeInstitutionID, minDate, maxDate);
      }

      loadStaff(activeInstitutionID);
      loadTeams(activeInstitutionID);
      fetchCreationDate(activeInstitutionID);
    }

    let genders = this.state.genders;
    let eventTypes = this.state.eventTypes;
    let sports = this.state.sports;
    let divisions = this.state.divisions;
    let ageGroups = this.state.ageGroups;

    if (events !== this.props.events) {
      eventTypes = {};
      _.toPairs(events).map(([id, info]) => {
        eventTypes = {
          ...eventTypes,
          [info.requiredInfo.type]: true
        };
      });
    }

    if (teams !== this.props.teams) {
      genders = {};
      sports = {};
      divisions = {};
      ageGroups = {};
      _.toPairs(teams).map(([id, info]) => {
        genders = {
          ...genders,
          [info.info.gender]: true
        };
        sports = {
          ...sports,
          [info.info.sport]: true
        };
        divisions = {
          ...divisions,
          [info.info.division]: true
        };
        ageGroups = {
          ...ageGroups,
          [info.info.ageGroup]: true
        };
      });
    }

    if (eventID !== this.props.match.params.eventID) {
      if (eventID) {
        updateView("EVENT_INFO");
      } else {
        updateView("EVENTS_LIST");
      }
    }

    this.setState({
      genders,
      eventTypes,
      sports,
      divisions,
      ageGroups
    });
  }

  componentWillUnmount() {
    const { resetState } = this.props.actions;
    resetState();
  }

  filterEvents() {
    const { sportFilter } = this.props;
    const {
      eventType,
      division,
      ageGroup,
      gender,
      searchText
    } = this.props.filters;
    const { events, teams, staff, userID, meAllFilter } = this.props;

    return _.fromPairs(
      _.toPairs(events).filter(([id, info]) => {
        let allowThroughFilter = true;
        let titleMatch = true;
        let coachMatch = true;
        let managerMatch = true;
        let roleMatch = true;

        if (searchText !== "") {
          const eventTitle = _.toLower(info.requiredInfo.title);
          titleMatch = eventTitle.includes(_.toLower(searchText));
        }

        if (meAllFilter === "me") {
          const eventCoaches = _.keys(info.coaches);
          const eventManagers = _.keys(info.managers);

          roleMatch = false;
          roleMatch = roleMatch || eventCoaches.includes(userID);
          roleMatch = roleMatch || eventManagers.includes(userID);
        }

        if (searchText !== "") {
          const eventCoaches = _.keys(info.coaches);
          const eventManagers = _.keys(info.managers);
          eventCoaches.map(coachID => {
            const coachName = `${_.toLower(
              staff[coachID].info.name
            )} ${_.toLower(staff[coachID].info.surname)}`;
            coachMatch =
              coachMatch && coachName.includes(_.toLower(searchText));
          });
          eventManagers.map(managerID => {
            const managerName = `${_.toLower(
              staff[managerID].info.name
            )} ${_.toLower(staff[managerID].info.surname)}`;
            managerMatch =
              managerMatch && managerName.includes(_.toLower(searchText));
          });
          if (eventCoaches.length === 0) coachMatch = false;
          if (eventManagers.length === 0) managerMatch = false;
        }

        if (eventType !== "All") {
          allowThroughFilter =
            allowThroughFilter && info.requiredInfo.type === eventType;
        }
        _.keys(info.teams).map(teamID => {
          if (teams[teamID] && sportFilter !== "all") {
            if (sportFilter === "other") {
              let teamSport = teams[teamID].info.sport;
              if (teamSport === "Soccer / Football") {
                teamSport = "soccer";
              }
              const supportedSports = ["netball", "rugby", "soccer"];
              allowThroughFilter =
                allowThroughFilter &&
                !supportedSports.includes(_.lowerCase(teamSport));
            } else {
              allowThroughFilter =
                allowThroughFilter &&
                _.lowerCase(teams[teamID].info.sport).includes(sportFilter);
            }
          }
          if (teams[teamID] && division !== "All") {
            allowThroughFilter =
              allowThroughFilter && teams[teamID].info.division === division;
          }
          if (teams[teamID] && ageGroup !== "All") {
            allowThroughFilter =
              allowThroughFilter && teams[teamID].info.ageGroup === ageGroup;
          }
          if (teams[teamID] && gender !== "All") {
            allowThroughFilter =
              allowThroughFilter && teams[teamID].info.gender === gender;
          }
        });
        if (_.keys(info.teams).length === 0) {
          if (
            sportFilter !== "all" ||
            division !== "All" ||
            ageGroup !== "All" ||
            gender !== "All"
          ) {
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

  checkIfShouldRedirect() {
    const { dateSelected } = this.props.match.params;

    return !dateSelected;
  }

  getEventErrorAlert() {
    const { errorType } = this.props.uiConfig;

    let heading = "Event Title Required";
    let message =
      "You need to specify a title for this event before saving it.";
    if (errorType === "DATE") {
      heading = "Date Invalid";
      message =
        "You cannot create an event scheduled for a date that has already passed.";
    }
    if (errorType === "LOADING") {
      heading = "Network Issue";
      message =
        "You have lost your connection to the internet. Please check your connectivity and try again.";
    }
    if (errorType === "EVENT_TYPE") {
      heading = "Event Type Required";
      message = "Please specify a name for your custom event type.";
    }

    return {
      heading,
      message
    };
  }

  getPermissions() {
    const { role, permissions } = this.props;

    const canCreate = role === "admin";
    const canEdit =
      role === "admin" ||
      (role === "coach" && permissions.coaches.events.canEdit) ||
      (role === "manager" && permissions.managers.events.canEdit);
    const canCancel =
      role === "admin" ||
      (role === "coach" && permissions.coaches.events.canCancel) ||
      (role === "manager" && permissions.managers.events.canCancel);

    return {
      canCreate,
      canEdit,
      canCancel
    };
  }

  getCoaches() {
    const { activeInstitutionID, staff } = this.props;

    return _.fromPairs(
      _.toPairs(staff).filter(([id, info]) => {
        if (
          info.institutions[activeInstitutionID] &&
          info.institutions[activeInstitutionID].roles.coach === "APPROVED"
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getManagers() {
    const { activeInstitutionID, staff } = this.props;

    return _.fromPairs(
      _.toPairs(staff).filter(([id, info]) => {
        if (
          info.institutions[activeInstitutionID] &&
          info.institutions[activeInstitutionID].roles.manager === "APPROVED"
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  checkIfEventPassed() {
    const { events } = this.props;
    const { eventID } = this.props.match.params;

    if (events[eventID]) {
      const eventDate = new Date(events[eventID].requiredInfo.times.start);
      const currentDate = new Date(Date.now());
      return eventDate < currentDate;
    }
    return false;
  }

  getEventListView(canCreate) {
    const {
      isTablet,
      isMobile,
      classes,
      activeInstitutionID,
      teams,
      navigateTo
    } = this.props;
    const { dateSelected } = this.props.match.params;
    const { currentView, minDate } = this.props.uiConfig;
    const {
      updateView,
      openAddEventDialog,
      closeAddEventDialog,
      addEvent,
      openEventErrorAlert,
      closeEventErrorAlert
    } = this.props.actions;
    const {
      isEventsLoading,
      isAddEventDialogLoading,
      isCreationDateLoading,
      isStaffLoading,
      isTeamsLoading
    } = this.props.loadingStatus;
    const { isAddEventDialogOpen, isEventErrorAlertOpen } = this.props.dialogs;

    const currentDate = new Date(Date.now());
    const filteredEvents = this.filterEvents();
    const coaches = this.getCoaches();
    const managers = this.getManagers();
    const eventErrorAlert = this.getEventErrorAlert();

    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          {!isMobile &&
            canCreate && (
              <div className={classes.actionsBar}>
                <div className={classes.flexGrow} />
                <Button
                  colour="secondary"
                  filled
                  handleClick={() => openAddEventDialog()}
                >
                  <i className={`fas fa-plus ${classes.iconAdjacentText}`} />
                  Add new event
                </Button>
              </div>
            )}
          <div className={classes.calendarWrapper}>
            <Calendar
              events={filteredEvents}
              minDate={minDate}
              dateSelected={dateSelected}
              isMobile={isMobile}
              isTablet={isTablet}
              institutionID={activeInstitutionID}
              currentView={currentView}
              isEventsLoading={isEventsLoading || activeInstitutionID === ""}
              isMinDateLoading={
                isCreationDateLoading || activeInstitutionID === ""
              }
              actions={{
                updateView,
                navigateTo,
                addEvent: () => openAddEventDialog()
              }}
            />
          </div>
          <AddEventDialog
            isOpen={isAddEventDialogOpen}
            isMobile={isTablet}
            isLoading={
              isAddEventDialogLoading ||
              isEventsLoading ||
              isStaffLoading ||
              isTeamsLoading ||
              activeInstitutionID === ""
            }
            minDate={moment(currentDate).format("YYYY-MM-DD")}
            initialDate={dateSelected}
            institutionID={activeInstitutionID}
            teams={teams}
            coaches={coaches}
            managers={managers}
            actions={{
              handleClose: closeAddEventDialog,
              addEvent,
              openEventErrorAlert
            }}
          />
          <NotificationModal
            isOpen={isEventErrorAlertOpen}
            handleOkClick={closeEventErrorAlert}
            heading={eventErrorAlert.heading}
            message={eventErrorAlert.message}
          />
          {canCreate &&
            isMobile && (
              <MuiButton
                fab
                color="accent"
                className={classes.fabPosition}
                onClick={() => openAddEventDialog()}
              >
                <i className="fas fa-plus" />
              </MuiButton>
            )}
        </div>
      </div>
    );
  }

  getEventInfoView(canEdit, canCancel) {
    const {
      isTablet,
      isMobile,
      classes,
      activeInstitutionID,
      teams,
      events,
      role,
      userID,
      navigateTo,
      goBack
    } = this.props;
    const { dateSelected, eventID, infoTab } = this.props.match.params;
    const {
      updateView,
      openEditEventDialog,
      closeEditEventDialog,
      openEventErrorAlert,
      closeEventErrorAlert,
      openCancelEventAlert,
      closeCancelEventAlert,
      openUncancelEventAlert,
      closeUncancelEventAlert,
      cancelEvent,
      uncancelEvent,
      editEvent,
      signIn,
      signOut,
      updateTimes,
      approveHours,
      updateAbsent
    } = this.props.actions;
    const {
      isEventsLoading,
      isEditEventDialogLoading,
      isStaffLoading,
      isTeamsLoading
    } = this.props.loadingStatus;
    const {
      isCancelEventAlertOpen,
      isUncancelEventAlertOpen,
      isEditEventDialogOpen,
      isEventErrorAlertOpen
    } = this.props.dialogs;

    const currentDate = new Date(Date.now());
    const coaches = this.getCoaches();
    const managers = this.getManagers();
    const isPastEvent = this.checkIfEventPassed();
    const eventErrorAlert = this.getEventErrorAlert();
    const eventInfo = events[eventID];

    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <EventInfo
            userID={userID}
            role={role}
            canEdit={canEdit}
            canCancel={canCancel}
            coaches={coaches}
            managers={managers}
            teams={teams}
            info={eventInfo}
            eventID={eventID}
            isInfoLoading={isEventsLoading || activeInstitutionID === ""}
            isCoachesLoading={isStaffLoading || activeInstitutionID === ""}
            isManagersLoading={isStaffLoading || activeInstitutionID === ""}
            isTeamsLoading={isTeamsLoading || activeInstitutionID === ""}
            isPastEvent={isPastEvent}
            dateSelected={dateSelected}
            isMobile={isMobile}
            isTablet={isTablet}
            infoTab={infoTab}
            actions={{
              updateView,
              navigateTo,
              goBack,
              signIn: (coachID, signInTime) =>
                signIn(eventID, coachID, signInTime),
              signOut: (coachID, signOutTime) =>
                signOut(eventID, coachID, signOutTime),
              updateTimes: (coachID, signInTime, signOutTime) =>
                updateTimes(eventID, coachID, signInTime, signOutTime),
              approveHours: (coachID, shouldCreateWage, wage, wageType) =>
                approveHours(
                  activeInstitutionID,
                  eventID,
                  eventInfo.requiredInfo.title,
                  eventInfo.requiredInfo.times.start,
                  coachID,
                  shouldCreateWage,
                  wage,
                  wageType
                ),
              updateAbsent: (coachID, rating) =>
                updateAbsent(eventID, coachID, rating),
              editEvent: openEditEventDialog,
              cancelEvent: openCancelEventAlert,
              uncancelEvent: openUncancelEventAlert
            }}
          />
          {canEdit &&
            !isPastEvent &&
            isMobile && (
              <MuiButton
                fab
                color="accent"
                className={classes.fabPosition}
                onClick={() => openEditEventDialog()}
              >
                <i className="fas fa-edit" />
              </MuiButton>
            )}
          <EditEventDialog
            isOpen={isEditEventDialogOpen}
            isLoading={
              isEditEventDialogLoading ||
              isEventsLoading ||
              isStaffLoading ||
              isTeamsLoading ||
              activeInstitutionID === ""
            }
            isMobile={isMobile}
            isTablet={isTablet}
            minDate={moment(currentDate).format("YYYY-MM-DD")}
            initialDate={dateSelected}
            teams={teams}
            coaches={coaches}
            managers={managers}
            initialEventInfo={events[eventID]}
            initialEventID={eventID}
            institutionID={activeInstitutionID}
            actions={{
              handleClose: closeEditEventDialog,
              editEvent,
              openEventErrorAlert
            }}
          />
          <NotificationModal
            isOpen={isEventErrorAlertOpen}
            handleOkClick={closeEventErrorAlert}
            heading={eventErrorAlert.heading}
            message={eventErrorAlert.message}
          />
          <DecisionModal
            isOpen={isCancelEventAlertOpen}
            handleYesClick={() => {
              cancelEvent(eventID);
              closeCancelEventAlert();
            }}
            handleNoClick={closeCancelEventAlert}
            heading="Cancel Event"
            message="Are you sure you want to cancel this event?"
          />
          <DecisionModal
            isOpen={isUncancelEventAlertOpen}
            handleYesClick={() => {
              uncancelEvent(eventID);
              closeUncancelEventAlert();
            }}
            handleNoClick={closeUncancelEventAlert}
            heading="Uncancel Event"
            message="Are you sure you want to uncancel this event?"
          />
        </div>
      </div>
    );
  }

  render() {
    const { currentView } = this.props.uiConfig;
    const { updateView } = this.props.actions;

    const permissions = this.getPermissions();
    const currentDate = new Date(Date.now());
    const shouldRedirect = this.checkIfShouldRedirect();

    if (shouldRedirect) {
      updateView("EVENTS_LIST");
      return (
        <Redirect
          to={`/myaccount/schedule/${moment(currentDate).format("YYYY-MM-DD")}`}
        />
      );
    }

    switch (currentView) {
      case "EVENT_LIST":
      case "SCHEDULE":
        return this.getEventListView(permissions.canCreate);
      case "EVENT_INFO":
        return this.getEventInfoView(
          permissions.canEdit,
          permissions.canCancel
        );
      default:
        return this.getEventListView(permissions.canCreate);
    }
  }
}

export default injectSheet(styles)(ScheduleLayout);
