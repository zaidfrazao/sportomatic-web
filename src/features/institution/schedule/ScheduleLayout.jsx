/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import { lightBlue, orange } from "material-ui/colors";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import AddEventDialog from "./components/AddEventDialog";
import BannerAd from "../../../components/BannerAd";
import Calendar from "./components/Calendar";
import DecisionModal from "../../../components/DecisionModal";
import EditAbsentRatingModal from "./components/EditAbsentRatingModal";
import EditEventDialog from "./components/EditEventDialog";
import EventInfo from "./components/EventInfo";
import FiltersToolbar from "./components/FiltersToolbar";
import LargeMobileBannerAd from "../../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../../components/LeaderboardAd";
import MarkAbsentModal from "./components/MarkAbsentModal";
import NotificationModal from "../../../components/NotificationModal";
import ReplacementCoachModal from "./components/ReplacementCoachModal";

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

  filterEvents() {
    const {
      eventType,
      sport,
      division,
      ageGroup,
      gender,
      searchText
    } = this.props.filters;
    const { events, teams, coaches, managers } = this.props;

    return _.fromPairs(
      _.toPairs(events).filter(([id, info]) => {
        let allowThroughFilter = true;
        let titleMatch = true;
        let coachMatch = true;
        let managerMatch = true;

        if (searchText !== "") {
          const eventTitle = _.toLower(info.requiredInfo.title);
          titleMatch = eventTitle.includes(_.toLower(searchText));
        }

        if (eventType !== "All") {
          allowThroughFilter =
            allowThroughFilter && info.requiredInfo.type === eventType;
        }
        _.keys(info.teams).map(teamID => {
          if (teams[teamID] && searchText !== "") {
            const teamCoaches = _.keys(teams[teamID].coaches);
            const teamManagers = _.keys(teams[teamID].managers);
            teamCoaches.map(coachID => {
              const coachName = `${_.toLower(
                coaches[coachID].info.name
              )} ${_.toLower(coaches[coachID].info.surname)}`;
              coachMatch =
                coachMatch && coachName.includes(_.toLower(searchText));
            });
            teamManagers.map(managerID => {
              const managerName = `${_.toLower(
                managers[managerID].info.name
              )} ${_.toLower(managers[managerID].info.surname)}`;
              managerMatch =
                managerMatch && managerName.includes(_.toLower(searchText));
            });
            if (teamCoaches.length === 0) coachMatch = false;
            if (teamManagers.length === 0) managerMatch = false;
          }
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

        allowThroughFilter =
          allowThroughFilter && (titleMatch || coachMatch || managerMatch);

        return allowThroughFilter;
      })
    );
  }

  renderView() {
    const {
      isTablet,
      isMobile,
      classes,
      activeInstitutionID,
      teams,
      staff,
      events,
      filters
    } = this.props;
    const { dateSelected, eventID } = this.props.match.params;
    const {
      currentView,
      errorType,
      minDate,
      selectedCoach
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
          to={`/admin/schedule/${moment(currentDate).format("YYYY-MM-DD")}`}
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
      return (
        <div className={classes.contentWrapper}>
          <EventInfo
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
          {coaches[selectedCoach] && (
            <div>
              {events[eventID].coaches[selectedCoach].attendance.substitute !==
                "" && (
                <DecisionModal
                  isOpen={isReplacementCoachRemovalModalOpen}
                  handleYesClick={() => {
                    removeReplacementCoach(eventID, selectedCoach);
                    closeReplacementCoachRemovalModal();
                  }}
                  handleNoClick={closeReplacementCoachRemovalModal}
                  heading="Remove Replacement Coach"
                  message={`Are you sure you want to remove ${coaches[
                    events[eventID].coaches[selectedCoach].attendance.substitute
                  ].info.name} ${coaches[
                    events[eventID].coaches[selectedCoach].attendance.substitute
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
                      replacementCoachID
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
                initialInfo={events[eventID].coaches[selectedCoach].absenteeism}
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
                heading={isPastEvent ? "Mark as Attended" : "Mark as Attending"}
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
      return (
        <div className={classes.contentWrapper}>
          <FiltersToolbar
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
          {!isMobile && <div className={classes.adWrapper}>{ad}</div>}
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
