/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AddIcon from "material-ui-icons/Add";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/Edit";
import { lightBlue, orange } from "material-ui/colors";
import moment from "moment";
import { Redirect } from "react-router-dom";
import Switch from "material-ui/Switch";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import AddEventDialog from "./components/AddEventDialog";
import Calendar from "./components/Calendar";
import DecisionModal from "../../components/DecisionModal";
import EditAbsentRatingModal from "./components/EditAbsentRatingModal";
import EditEventDialog from "./components/EditEventDialog";
import EventInfo from "./components/EventInfo";
import FiltersToolbar from "./components/FiltersToolbar";
import MarkAbsentModal from "./components/MarkAbsentModal";
import NotificationModal from "../../components/NotificationModal";
import ReplacementCoachModal from "./components/ReplacementCoachModal";

const styles = theme => ({
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
  fabPosition: {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    zIndex: 10
  },
  loaderWrapper: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  myEventsSelector: {
    width: "100%",
    maxWidth: 1200,
    margin: "16px auto 0 auto",
    display: "flex",
    alignItems: "center"
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
  state = {
    genders: {},
    eventTypes: {},
    sports: {},
    divisions: {},
    ageGroups: {},
    showAllEvents: false
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
    const {
      eventType,
      sport,
      division,
      ageGroup,
      gender,
      searchText
    } = this.props.filters;
    const { events, teams, staff, userID, role } = this.props;
    const { showAllEvents } = this.state;

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

        if (role === "coach" && !showAllEvents) {
          const eventCoaches = _.keys(info.coaches);
          roleMatch = false;
          roleMatch = roleMatch || eventCoaches.includes(userID);
        }

        if (role === "manager" && !showAllEvents) {
          const eventManagers = _.keys(info.managers);
          roleMatch = false;
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
          if (teams[teamID] && sport !== "All") {
            allowThroughFilter =
              allowThroughFilter && teams[teamID].info.sport === sport;
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
            sport !== "All" ||
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

  renderView() {
    const { showAllEvents } = this.state;
    const {
      isTablet,
      isMobile,
      classes,
      activeInstitutionID,
      teams,
      staff,
      events,
      filters,
      role,
      userID,
      permissions
    } = this.props;
    const { dateSelected, eventID } = this.props.match.params;
    const {
      currentView,
      errorType,
      minDate,
      selectedCoach,
      selectedReplacementCoach,
      prevReplacementCoachID
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
      editEvent,
      applyFilters,
      updateSearch,
      openMarkAbsentModal,
      closeMarkAbsentModal,
      updateAbsent,
      openUnmarkAbsentModal,
      closeUnmarkAbsentModal,
      openEditAbsentRatingModal,
      closeEditAbsentRatingModal,
      editAbsentRating,
      openReplacementCoachModal,
      closeReplacementCoachModal,
      updateReplacementCoach,
      openReplacementCoachRemovalModal,
      closeReplacementCoachRemovalModal,
      removeReplacementCoach
    } = this.props.actions;
    const {
      isEventsLoading,
      isAddEventDialogLoading,
      isEditEventDialogLoading,
      isCreationDateLoading,
      isStaffLoading,
      isTeamsLoading
    } = this.props.loadingStatus;
    const {
      isAddEventDialogOpen,
      isCancelEventAlertOpen,
      isUncancelEventAlertOpen,
      isEditEventDialogOpen,
      isEventErrorAlertOpen,
      isMarkAbsentModalOpen,
      isUnmarkAbsentModalOpen,
      isEditAbsentRatingModalOpen,
      isReplacementCoachModalOpen,
      isReplacementCoachRemovalModalOpen
    } = this.props.dialogs;

    const currentDate = new Date(Date.now());
    if (!dateSelected) {
      return (
        <Redirect
          to={`/myaccount/schedule/${moment(currentDate).format("YYYY-MM-DD")}`}
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

    const filteredEvents = this.filterEvents();
    let isPastEvent = false;
    if (events[eventID]) {
      const eventDate = new Date(events[eventID].requiredInfo.times.start);
      const currentDate = new Date(Date.now());
      isPastEvent = eventDate < currentDate;
    }

    const coaches = _.fromPairs(
      _.toPairs(staff).filter(([id, info]) => {
        if (info.institutions[activeInstitutionID].roles.coach === "APPROVED") {
          return true;
        } else {
          return false;
        }
      })
    );
    const managers = _.fromPairs(
      _.toPairs(staff).filter(([id, info]) => {
        if (
          info.institutions[activeInstitutionID].roles.manager === "APPROVED"
        ) {
          return true;
        } else {
          return false;
        }
      })
    );

    if (currentView === "EVENT_INFO") {
      const canEdit =
        role === "admin" ||
        (role === "coach" && permissions.coaches.events.canEdit) ||
        (role === "manager" && permissions.managers.events.canEdit);

      return (
        <div className={classes.contentWrapper}>
          <EventInfo
            userID={userID}
            role={role}
            canEdit={canEdit}
            canCancel={
              role === "admin" ||
              (role === "coach" && permissions.coaches.events.canCancel) ||
              (role === "manager" && permissions.managers.events.canCancel)
            }
            coaches={coaches}
            managers={managers}
            teams={teams}
            info={events[eventID]}
            eventID={eventID}
            isInfoLoading={isEventsLoading || activeInstitutionID === ""}
            isCoachesLoading={isStaffLoading || activeInstitutionID === ""}
            isManagersLoading={isStaffLoading || activeInstitutionID === ""}
            isTeamsLoading={isTeamsLoading || activeInstitutionID === ""}
            isPastEvent={isPastEvent}
            isMobile={isMobile}
            isTablet={isTablet}
            actions={{
              updateView,
              removeReplacementCoach: openReplacementCoachRemovalModal,
              updateReplacementCoach: openReplacementCoachModal,
              editAbsentRating: openEditAbsentRatingModal,
              markAbsent: openMarkAbsentModal,
              unmarkAbsent: openUnmarkAbsentModal,
              editEvent: openEditEventDialog,
              cancelEvent: openCancelEventAlert,
              uncancelEvent: openUncancelEventAlert
            }}
          />
          {canEdit &&
            !isPastEvent &&
            isMobile && (
              <Button
                fab
                color="accent"
                aria-label="edit event"
                className={classes.fabPosition}
                onClick={() => openEditEventDialog()}
              >
                <EditIcon />
              </Button>
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
            heading={eventErrorAlertHeading}
            message={eventErrorAlertMessage}
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
          {coaches[selectedCoach] &&
            events[eventID] && (
              <div>
                {events[eventID].coaches[selectedCoach].attendance
                  .substitute !== "" && (
                  <DecisionModal
                    isOpen={isReplacementCoachRemovalModalOpen}
                    handleYesClick={() => {
                      removeReplacementCoach(
                        eventID,
                        selectedCoach,
                        selectedReplacementCoach
                      );
                      closeReplacementCoachRemovalModal();
                    }}
                    handleNoClick={closeReplacementCoachRemovalModal}
                    heading="Remove Replacement Coach"
                    message={`Are you sure you want to remove ${coaches[
                      events[eventID].coaches[selectedCoach].attendance
                        .substitute
                    ].info.name} ${coaches[
                      events[eventID].coaches[selectedCoach].attendance
                        .substitute
                    ].info.surname} as the replacement coach?`}
                  />
                )}
                <ReplacementCoachModal
                  isOpen={isReplacementCoachModalOpen}
                  coaches={coaches}
                  coachName={`${coaches[selectedCoach].info.name} ${coaches[
                    selectedCoach
                  ].info.surname}`}
                  initialReplacementCoach={
                    events[eventID].coaches[selectedCoach].attendance.substitute
                  }
                  originalCoachID={selectedCoach}
                  actions={{
                    updateReplacementCoach: replacementCoachID => {
                      updateReplacementCoach(
                        eventID,
                        selectedCoach,
                        replacementCoachID,
                        prevReplacementCoachID
                      );
                      closeReplacementCoachModal();
                    },
                    closeModal: () => closeReplacementCoachModal()
                  }}
                />
                <MarkAbsentModal
                  isOpen={isMarkAbsentModalOpen}
                  coachName={`${coaches[selectedCoach].info.name} ${coaches[
                    selectedCoach
                  ].info.surname}`}
                  actions={{
                    markAbsent: (rating, reason) => {
                      updateAbsent(
                        eventID,
                        selectedCoach,
                        false,
                        isPastEvent,
                        rating,
                        reason
                      );
                      closeMarkAbsentModal();
                    },
                    closeModal: () => closeMarkAbsentModal()
                  }}
                />
                <EditAbsentRatingModal
                  isOpen={isEditAbsentRatingModalOpen}
                  initialInfo={
                    events[eventID].coaches[selectedCoach].absenteeism
                  }
                  coachName={`${coaches[selectedCoach].info.name} ${coaches[
                    selectedCoach
                  ].info.surname}`}
                  actions={{
                    editAbsentRating: (rating, reason) => {
                      editAbsentRating(eventID, selectedCoach, rating, reason);
                      closeEditAbsentRatingModal();
                    },
                    closeModal: () => closeEditAbsentRatingModal()
                  }}
                />
                <DecisionModal
                  isOpen={isUnmarkAbsentModalOpen}
                  handleYesClick={() => {
                    updateAbsent(eventID, selectedCoach, true, isPastEvent);
                    closeUnmarkAbsentModal();
                  }}
                  handleNoClick={closeUnmarkAbsentModal}
                  heading={
                    isPastEvent ? "Mark as Attended" : "Mark as Attending"
                  }
                  message={
                    isPastEvent
                      ? `Are you sure ${coaches[selectedCoach].info
                          .name} ${coaches[selectedCoach].info
                          .surname} did attend?`
                      : `Are you sure ${coaches[selectedCoach].info
                          .name} ${coaches[selectedCoach].info
                          .surname} will attend?`
                  }
                />
              </div>
            )}
        </div>
      );
    } else {
      const canCreate =
        role === "admin" ||
        (role === "coach" && permissions.coaches.events.canCreate) ||
        (role === "manager" && permissions.managers.events.canCreate);

      return (
        <div className={classes.contentWrapper}>
          <FiltersToolbar
            canCreate={canCreate}
            eventTypes={_.keys(this.state.eventTypes)}
            sports={_.keys(this.state.sports)}
            divisions={_.keys(this.state.divisions)}
            ageGroups={_.keys(this.state.ageGroups)}
            genders={_.keys(this.state.genders)}
            isMobile={isMobile}
            initialFilters={filters}
            applyFilters={applyFilters}
            addEvent={openAddEventDialog}
            updateSearch={updateSearch}
          />
          {(role === "coach" || role === "manager") && (
            <div className={classes.myEventsSelector}>
              <Switch
                checked={showAllEvents}
                onChange={(event, checked) =>
                  this.setState({
                    showAllEvents: checked
                  })}
              />
              <Typography component="h3" type="headline">
                {showAllEvents
                  ? "All Events"
                  : role === "coach"
                    ? "Events Where I Coach"
                    : "Events Where I Manage"}
              </Typography>
            </div>
          )}
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
              cancelEvent
            }}
          />
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
            heading={eventErrorAlertHeading}
            message={eventErrorAlertMessage}
          />
          {canCreate &&
            isMobile && (
              <Button
                fab
                color="accent"
                aria-label="add new event"
                className={classes.fabPosition}
                onClick={() => openAddEventDialog()}
              >
                <AddIcon />
              </Button>
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

export default withStyles(styles)(ScheduleLayout);
