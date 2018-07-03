/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import { Redirect } from "react-router-dom";
import BannerAd from "../../components/BannerAd";
import Button from "../../components/Button";
import { common, lightBlue } from "../../utils/colours";
import Dialog from "../../components/Dialog";
import EmptyState from "../../components/EmptyState";
import EventsList from "./components/EventsList";
import EventInfo from "./components/EventInfo";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";
import PersonalAllSwitch from "./components/PersonalAllSwitch";

const mobileBreakpoint = 800;

const styles = {
  adWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  actionsBar: {
    display: "flex",
    justifyContent: "center",
    margin: "24px 24px 0 24px",
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  buttonSeparator: {
    height: 12
  },
  contentWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  emptyState: {
    padding: 24
  },
  emptyStateButton: {
    transition: "0.25s",
    fontSize: 18,
    margin: "0 8px",
    cursor: "pointer",
    color: common["black"],
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      textAlign: "center"
    },
    "&:hover": {
      color: lightBlue[500]
    }
  },
  emptyStateButtonIcon: {
    marginRight: 8,
    width: 25,
    height: 25
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
      loadAdmins,
      loadStaff,
      loadTeams
    } = this.props.actions;
    const { dateSelected } = this.props.match.params;

    if (dateSelected && activeInstitutionID !== "") {
      const minDate = moment(dateSelected, "YYYY-MM-DD")
        .subtract(1, "weeks")
        .toDate();
      const maxDate = moment(dateSelected, "YYYY-MM-DD")
        .add(1, "weeks")
        .toDate();
      loadEvents(activeInstitutionID, minDate, maxDate);
    }

    if (activeInstitutionID !== "") {
      loadAdmins(activeInstitutionID);
      loadStaff(activeInstitutionID);
      loadTeams(activeInstitutionID);
      fetchCreationDate(activeInstitutionID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeInstitutionID, events, teams } = nextProps;
    const { dateSelected } = nextProps.match.params;
    const {
      loadEvents,
      fetchCreationDate,
      loadAdmins,
      loadStaff,
      loadTeams
    } = nextProps.actions;

    if (dateSelected !== this.props.match.params.dateSelected && dateSelected) {
      const minDate = moment(dateSelected, "YYYY-MM-DD")
        .subtract(1, "weeks")
        .toDate();
      const maxDate = moment(dateSelected, "YYYY-MM-DD")
        .add(1, "weeks")
        .toDate();

      loadEvents(activeInstitutionID, minDate, maxDate);
    }

    if (
      activeInstitutionID !== this.props.activeInstitutionID &&
      activeInstitutionID !== ""
    ) {
      if (dateSelected) {
        const minDate = moment(dateSelected, "YYYY-MM-DD")
          .subtract(1, "weeks")
          .toDate();
        const maxDate = moment(dateSelected, "YYYY-MM-DD")
          .add(1, "weeks")
          .toDate();
        loadEvents(activeInstitutionID, minDate, maxDate);
      }

      loadAdmins(activeInstitutionID);
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
    const { sportFilter } = this.props;
    const { eventType, division, ageGroup, gender } = this.props.filters;
    const { events, teams, userID, meAllFilter } = this.props;

    return _.fromPairs(
      _.toPairs(events).filter(([id, info]) => {
        let allowThroughFilter = true;
        let titleMatch = true;
        let roleMatch = true;

        if (meAllFilter === "me") {
          const eventCoaches = _.keys(info.coaches);
          const eventManagers = _.keys(info.managers);
          const eventAthletes = _.keys(info.athletes);
          const eventParents = _.keys(info.parents);

          roleMatch = false;
          roleMatch = roleMatch || eventCoaches.includes(userID);
          roleMatch = roleMatch || eventManagers.includes(userID);
          roleMatch = roleMatch || eventAthletes.includes(userID);
          roleMatch = roleMatch || eventParents.includes(userID);
        }

        if (eventType !== "All") {
          allowThroughFilter =
            allowThroughFilter && info.requiredInfo.type === eventType;
        }
        _.keys(info.teams).map(teamID => {
          if (teams[teamID] && sportFilter !== "all") {
            allowThroughFilter =
              allowThroughFilter &&
              teams[teamID].info.sport.includes(sportFilter);
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

        allowThroughFilter = allowThroughFilter && titleMatch && roleMatch;

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
      roles,
      isTablet,
      isMobile,
      classes,
      navigateTo,
      meAllFilter,
      changeMeAllFilter,
      institutionCreationDate
    } = this.props;
    const { dateSelected } = this.props.match.params;

    const filteredEvents = this.filterEvents();
    const ad = this.createAd();

    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <div className={classes.adWrapper}>{ad}</div>
          <div className={classes.actionsBar}>
            <PersonalAllSwitch
              isMobile={isMobile}
              meAllFilter={meAllFilter}
              changeMeAllFilter={changeMeAllFilter}
            />
            {isMobile && <div className={classes.buttonSeparator} />}
            <div className={classes.flexGrow} />
            {false &&
              roles.admin && (
                <Button colour="primary" filled slim fullWidth={isMobile}>
                  <i className={`fas fa-plus ${classes.iconAdjacentText}`} />
                  Add new event
                </Button>
              )}
          </div>
          <EventsList
            canCreate={canCreate}
            isMobile={isMobile}
            isTablet={isTablet}
            events={filteredEvents}
            dateSelectedString={dateSelected}
            institutionCreationDate={institutionCreationDate}
            navigateTo={navigateTo}
          />
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
      users,
      teams,
      events,
      role,
      userID,
      navigateTo,
      goBack,
      roles,
      emblem
    } = this.props;
    const { dateSelected, eventID, infoTab } = this.props.match.params;
    const {
      openEditEventDialog,
      openCancelEventAlert,
      closeCancelEventAlert,
      openUncancelEventAlert,
      closeUncancelEventAlert,
      signIn,
      signOut,
      updateTimes,
      approveHours,
      updateAbsent,
      cancelEvent,
      uncancelEvent,
      startLogging,
      toggleOptionalStats,
      finaliseResults,
      editResult,
      editDetails,
      editOpponents
    } = this.props.actions;
    const {
      isCancelEventAlertOpen,
      isUncancelEventAlertOpen
    } = this.props.dialogs;
    const {
      isEventsLoading,
      isStaffLoading,
      isTeamsLoading,
      isEditDetailsLoading,
      isEditOpponentLoading
    } = this.props.loadingStatus;

    const isPastEvent = this.checkIfEventPassed();
    const eventInfo = events[eventID];

    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <EventInfo
            userID={userID}
            role={role}
            canEdit={canEdit}
            canCancel={canCancel}
            coaches={users}
            managers={users}
            athletes={users}
            teams={teams}
            info={eventInfo}
            eventID={eventID}
            isInfoLoading={isEventsLoading || activeInstitutionID === ""}
            isCoachesLoading={isStaffLoading || activeInstitutionID === ""}
            isManagersLoading={isStaffLoading || activeInstitutionID === ""}
            isTeamsLoading={isTeamsLoading || activeInstitutionID === ""}
            isEditDetailsLoading={isEditDetailsLoading}
            isEditOpponentLoading={isEditOpponentLoading}
            isPastEvent={isPastEvent}
            dateSelected={dateSelected}
            isAdmin={roles.admin}
            isMobile={isMobile}
            isTablet={isTablet}
            infoTab={infoTab}
            emblem={emblem}
            actions={{
              navigateTo,
              goBack,
              cancelEvent: () => openCancelEventAlert(),
              uncancelEvent: () => openUncancelEventAlert(),
              editDetails: (times, homeAway, venue, notes) =>
                editDetails(eventID, times, homeAway, venue, notes),
              editResult: (teamID, opponentID, newResult) =>
                editResult(eventID, teamID, opponentID, newResult),
              editOpponents: (teamID, opponentID, newName) =>
                editOpponents(eventID, teamID, opponentID, newName),
              startLogging: (teamID, structure, opponentIDs) =>
                startLogging(eventID, teamID, structure, opponentIDs),
              toggleOptionalStats: (teamID, opponentID, newState) =>
                toggleOptionalStats(eventID, teamID, opponentID, newState),
              finaliseResults: teamID => finaliseResults(eventID, teamID),
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
              editEvent: openEditEventDialog
            }}
          />
          <Dialog
            isOpen={isCancelEventAlertOpen}
            heading="Cancel Event"
            type="decision"
            handleNoClick={() => closeCancelEventAlert()}
            handleYesClick={() => {
              cancelEvent(eventID);
              closeCancelEventAlert();
            }}
          >
            Are you sure you want to cancel this event?
          </Dialog>
          <Dialog
            isOpen={isUncancelEventAlertOpen}
            heading="Uncancel Event"
            type="decision"
            handleNoClick={() => closeUncancelEventAlert()}
            handleYesClick={() => {
              uncancelEvent(eventID);
              closeUncancelEventAlert();
            }}
          >
            Is this event back on?
          </Dialog>
        </div>
      </div>
    );
  }

  render() {
    const { classes, communityProgress, navigateTo, roles } = this.props;
    const { eventID } = this.props.match.params;

    const shouldRedirect = this.checkIfShouldRedirect();

    if (shouldRedirect) {
      const currentDate = moment(new Date(Date.now())).format("YYYY-MM-DD");

      return <Redirect to={`/myaccount/schedule/${currentDate}`} />;
    }

    if (!communityProgress.hasSports) {
      return (
        <div className={classes.root}>
          <div className={classes.outerWrapper}>
            <div className={classes.emptyState}>
              <EmptyState>
                Set up your first sport in the{" "}
                <span
                  className={classes.emptyStateButton}
                  onClick={() => navigateTo("/myaccount/community/")}
                >
                  <i
                    className={`fas fa-users ${classes.emptyStateButtonIcon}`}
                  />
                  Community
                </span>{" "}
                section.
              </EmptyState>
            </div>
          </div>
        </div>
      );
    } else if (!communityProgress.hasSeasons) {
      return (
        <div className={classes.root}>
          <div className={classes.outerWrapper}>
            <div className={classes.emptyState}>
              <EmptyState>
                Next you should set up a team's season in the{" "}
                <span
                  className={classes.emptyStateButton}
                  onClick={() => navigateTo("/myaccount/teams/")}
                >
                  <i
                    className={`fas fa-user-friends ${classes.emptyStateButtonIcon}`}
                  />
                  Teams
                </span>{" "}
                section.
              </EmptyState>
            </div>
          </div>
        </div>
      );
    } else {
      if (eventID) {
        return this.getEventInfoView(roles.admin, roles.admin);
      } else {
        return this.getEventListView(roles.admin);
      }
    }
  }
}

export default injectSheet(styles)(ScheduleLayout);
