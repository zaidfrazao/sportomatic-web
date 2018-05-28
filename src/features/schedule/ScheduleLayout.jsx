/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import moment from "moment";
import { Redirect } from "react-router-dom";
import BannerAd from "../../components/BannerAd";
import { common } from "../../utils/colours";
import Dialog from "../../components/Dialog";
import EventsList from "./components/EventsList";
import EventInfo from "./components/EventInfo";
import LargeMobileBannerAd from "../../components/LargeMobileBannerAd";
import LeaderboardAd from "../../components/LeaderboardAd";

const styles = {
  adWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  actionsBar: {
    display: "flex",
    justifyContent: "center",
    margin: "24px 24px 0 24px"
  },
  contentWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
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
    const {
      eventType,
      division,
      ageGroup,
      gender,
      searchText
    } = this.props.filters;
    const { events, teams, users, userID, meAllFilter } = this.props;

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
              users[coachID].info.name
            )} ${_.toLower(users[coachID].info.surname)}`;
            coachMatch =
              coachMatch && coachName.includes(_.toLower(searchText));
          });
          eventManagers.map(managerID => {
            const managerName = `${_.toLower(
              users[managerID].info.name
            )} ${_.toLower(users[managerID].info.surname)}`;
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
      navigateTo,
      institutionCreationDate
    } = this.props;
    const { dateSelected } = this.props.match.params;

    const filteredEvents = this.filterEvents();
    const ad = this.createAd();

    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <div className={classes.adWrapper}>{ad}</div>
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
      goBack
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
      uncancelEvent
    } = this.props.actions;
    const {
      isCancelEventAlertOpen,
      isUncancelEventAlertOpen
    } = this.props.dialogs;
    const {
      isEventsLoading,
      isStaffLoading,
      isTeamsLoading
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
              navigateTo,
              goBack,
              cancelEvent: () => openCancelEventAlert(),
              uncancelEvent: () => openUncancelEventAlert(),
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
    const { eventID } = this.props.match.params;

    const permissions = this.getPermissions();
    const shouldRedirect = this.checkIfShouldRedirect();

    if (shouldRedirect) {
      const currentDate = moment(new Date(Date.now())).format("YYYY-MM-DD");

      return <Redirect to={`/myaccount/schedule/${currentDate}`} />;
    }

    if (eventID) {
      return this.getEventInfoView(permissions.canEdit, permissions.canCancel);
    } else {
      return this.getEventListView(permissions.canCreate);
    }
  }
}

export default injectSheet(styles)(ScheduleLayout);
