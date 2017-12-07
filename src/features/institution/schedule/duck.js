import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import _ from "lodash";

// Actions

export const OPEN_ADD_EVENT_DIALOG =
  "sportomatic-web/institution/schedule/OPEN_ADD_EVENT_DIALOG";
export const CLOSE_ADD_EVENT_DIALOG =
  "sportomatic-web/institution/schedule/CLOSE_ADD_EVENT_DIALOG";
export const REQUEST_EVENTS =
  "sportomatic-web/institution/schedule/REQUEST_EVENTS";
export const RECEIVE_EVENTS =
  "sportomatic-web/institution/schedule/RECEIVE_EVENTS";
export const ERROR_LOADING_EVENTS =
  "sportomatic-web/institution/schedule/ERROR_LOADING_EVENTS";
export const REQUEST_ADD_EVENT =
  "sportomatic-web/institution/schedule/REQUEST_ADD_EVENT";
export const RECEIVE_ADD_EVENT =
  "sportomatic-web/institution/schedule/RECEIVE_ADD_EVENT";
export const ERROR_ADDING_EVENT =
  "sportomatic-web/institution/schedule/ERROR_ADDING_EVENT";
export const REQUEST_EDIT_EVENT =
  "sportomatic-web/institution/schedule/REQUEST_EDIT_EVENT";
export const RECEIVE_EDIT_EVENT =
  "sportomatic-web/institution/schedule/RECEIVE_EDIT_EVENT";
export const ERROR_EDITING_EVENT =
  "sportomatic-web/institution/schedule/ERROR_EDITING_EVENT";
export const OPEN_EDIT_EVENT_DIALOG =
  "sportomatic-web/institution/schedule/OPEN_EDIT_EVENT_DIALOG";
export const CLOSE_EDIT_EVENT_DIALOG =
  "sportomatic-web/institution/schedule/CLOSE_EDIT_EVENT_DIALOG";
export const OPEN_EVENT_ERROR_ALERT =
  "sportomatic-web/institution/schedule/OPEN_EVENT_ERROR_ALERT";
export const CLOSE_EVENT_ERROR_ALERT =
  "sportomatic-web/institution/schedule/CLOSE_EVENT_ERROR_ALERT";
export const OPEN_CANCEL_EVENT_ALERT =
  "sportomatic-web/institution/schedule/OPEN_CANCEL_EVENT_ALERT";
export const CLOSE_CANCEL_EVENT_ALERT =
  "sportomatic-web/institution/schedule/CLOSE_CANCEL_EVENT_ALERT";
export const OPEN_UNCANCEL_EVENT_ALERT =
  "sportomatic-web/institution/schedule/OPEN_UNCANCEL_EVENT_ALERT";
export const CLOSE_UNCANCEL_EVENT_ALERT =
  "sportomatic-web/institution/schedule/CLOSE_UNCANCEL_EVENT_ALERT";
export const UPDATE_CURRENT_VIEW =
  "sportomatic-web/institution/schedule/UPDATE_CURRENT_VIEW";
export const REQUEST_STAFF =
  "sportomatic-web/institution/schedule/REQUEST_STAFF";
export const RECEIVE_STAFF =
  "sportomatic-web/institution/schedule/RECEIVE_STAFF";
export const ERROR_LOADING_STAFF =
  "sportomatic-web/institution/schedule/ERROR_LOADING_STAFF";
export const REQUEST_TEAMS =
  "sportomatic-web/institution/schedule/REQUEST_TEAMS";
export const RECEIVE_TEAMS =
  "sportomatic-web/institution/schedule/RECEIVE_TEAMS";
export const ERROR_LOADING_TEAMS =
  "sportomatic-web/institution/schedule/ERROR_LOADING_TEAMS";
export const REQUEST_CANCEL_EVENT =
  "sportomatic-web/institution/schedule/REQUEST_CANCEL_EVENT";
export const RECEIVE_CANCEL_EVENT =
  "sportomatic-web/institution/schedule/RECEIVE_CANCEL_EVENT";
export const ERROR_CANCELLING_EVENT =
  "sportomatic-web/institution/schedule/ERROR_CANCELLING_EVENT";
export const REQUEST_UNCANCEL_EVENT =
  "sportomatic-web/institution/schedule/REQUEST_UNCANCEL_EVENT";
export const RECEIVE_UNCANCEL_EVENT =
  "sportomatic-web/institution/schedule/RECEIVE_UNCANCEL_EVENT";
export const ERROR_UNCANCELLING_EVENT =
  "sportomatic-web/institution/schedule/ERROR_UNCANCELLING_EVENT";
export const REQUEST_CREATION_DATE =
  "sportomatic-web/institution/schedule/REQUEST_CREATION_DATE";
export const RECEIVE_CREATION_DATE =
  "sportomatic-web/institution/schedule/RECEIVE_CREATION_DATE";
export const ERROR_FETCHING_CREATION_DATE =
  "sportomatic-web/institution/schedule/ERROR_FETCHING_CREATION_DATE";

// Reducers

export const uiConfigInitialState = {
  currentView: "SCHEDULE",
  errorType: "NONE",
  minDate: new Date(2017, 1, 1),
  selectedEventInfo: {
    institutionID: "",
    eventID: "",
    managerIDs: [],
    coachIDs: [],
    year: "",
    month: ""
  }
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RECEIVE_CREATION_DATE:
      return {
        ...state,
        minDate: action.payload.date
      };
    case UPDATE_CURRENT_VIEW:
      return {
        ...state,
        currentView: action.payload.newView
      };
    case OPEN_EVENT_ERROR_ALERT:
      return {
        ...state,
        errorType: action.payload.errorType
      };
    case ERROR_ADDING_EVENT:
      return {
        ...state,
        errorType: "LOADING"
      };
    case OPEN_CANCEL_EVENT_ALERT:
      return {
        ...state,
        selectedEventInfo: {
          ...action.payload
        }
      };
    case OPEN_UNCANCEL_EVENT_ALERT:
      return {
        ...state,
        selectedEventInfo: {
          ...action.payload
        }
      };
    default:
      return state;
  }
}

export const dialogsInitialState = {
  isAddEventDialogOpen: false,
  isEditEventDialogOpen: false,
  isCancelEventAlertOpen: false,
  isUncancelEventAlertOpen: false,
  isEventErrorAlertOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case OPEN_ADD_EVENT_DIALOG:
      return {
        ...state,
        isAddEventDialogOpen: true
      };
    case RECEIVE_ADD_EVENT:
    case CLOSE_ADD_EVENT_DIALOG:
      return {
        ...state,
        isAddEventDialogOpen: false
      };
    case ERROR_ADDING_EVENT:
      return {
        ...state,
        isAddEventDialogOpen: false,
        isEventErrorAlertOpen: true
      };
    case OPEN_EDIT_EVENT_DIALOG:
      return {
        ...state,
        isEditEventDialogOpen: true
      };
    case RECEIVE_EDIT_EVENT:
    case CLOSE_EDIT_EVENT_DIALOG:
      return {
        ...state,
        isEditEventDialogOpen: false
      };
    case OPEN_CANCEL_EVENT_ALERT:
      return {
        ...state,
        isCancelEventAlertOpen: true
      };
    case CLOSE_CANCEL_EVENT_ALERT:
      return {
        ...state,
        isCancelEventAlertOpen: false
      };
    case OPEN_UNCANCEL_EVENT_ALERT:
      return {
        ...state,
        isUncancelEventAlertOpen: true
      };
    case CLOSE_UNCANCEL_EVENT_ALERT:
      return {
        ...state,
        isUncancelEventAlertOpen: false
      };
    case OPEN_EVENT_ERROR_ALERT:
      return {
        ...state,
        isEventErrorAlertOpen: true
      };
    case CLOSE_EVENT_ERROR_ALERT:
      return {
        ...state,
        isEventErrorAlertOpen: false
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isAddEventDialogLoading: false,
  isEditEventDialogLoading: false,
  isEventsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case REQUEST_STAFF:
    case REQUEST_TEAMS:
      return {
        ...state,
        isAddEventDialogLoading: true,
        isEditEventDialogLoading: true
      };
    case ERROR_LOADING_TEAMS:
    case RECEIVE_TEAMS:
    case ERROR_LOADING_STAFF:
    case RECEIVE_STAFF:
      return {
        ...state,
        isAddEventDialogLoading: false,
        isEditEventDialogLoading: false
      };
    case REQUEST_ADD_EVENT:
      return {
        ...state,
        isAddEventDialogLoading: true
      };
    case ERROR_ADDING_EVENT:
    case RECEIVE_ADD_EVENT:
      return {
        ...state,
        isAddEventDialogLoading: false
      };
    case REQUEST_EDIT_EVENT:
      return {
        ...state,
        isEditEventDialogLoading: true
      };
    case ERROR_EDITING_EVENT:
    case RECEIVE_EDIT_EVENT:
      return {
        ...state,
        isEditEventDialogLoading: false
      };
    case REQUEST_CREATION_DATE:
    case REQUEST_EVENTS:
      return {
        ...state,
        isEventsLoading: true
      };
    case RECEIVE_CREATION_DATE:
    case ERROR_FETCHING_CREATION_DATE:
    case ERROR_LOADING_EVENTS:
    case RECEIVE_EVENTS:
      return {
        ...state,
        isEventsLoading: false
      };
    default:
      return state;
  }
}

function eventsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.payload.events;
    default:
      return state;
  }
}

function coachesReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_STAFF:
      return action.payload.coaches;
    default:
      return state;
  }
}

function managersReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_STAFF:
      return action.payload.managers;
    default:
      return state;
  }
}

function teamsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_TEAMS:
      return action.payload.teams;
    default:
      return state;
  }
}

export const scheduleReducer = combineReducers({
  uiConfig: uiConfigReducer,
  dialogs: dialogsReducer,
  events: eventsReducer,
  loadingStatus: loadingStatusReducer,
  teams: teamsReducer,
  coaches: coachesReducer,
  managers: managersReducer
});

// Selectors

const uiConfig = state => state.institution.schedule.uiConfig;
const dialogs = state => state.institution.schedule.dialogs;
const events = state => state.institution.schedule.events;
const loadingStatus = state => state.institution.schedule.loadingStatus;
const teams = state => state.institution.schedule.teams;
const coaches = state => state.institution.schedule.coaches;
const managers = state => state.institution.schedule.managers;

export const selector = createStructuredSelector({
  uiConfig,
  dialogs,
  events,
  loadingStatus,
  teams,
  coaches,
  managers
});

// Action Creators

export function updateView(newView) {
  return {
    type: UPDATE_CURRENT_VIEW,
    payload: {
      newView
    }
  };
}

export function openEventErrorAlert(errorType) {
  return {
    type: OPEN_EVENT_ERROR_ALERT,
    payload: {
      errorType
    }
  };
}

export function closeEventErrorAlert() {
  return {
    type: CLOSE_EVENT_ERROR_ALERT
  };
}

export function openEditEventDialog() {
  return {
    type: OPEN_EDIT_EVENT_DIALOG
  };
}

export function closeEditEventDialog() {
  return {
    type: CLOSE_EDIT_EVENT_DIALOG
  };
}

export function openCancelEventAlert(
  institutionID,
  eventID,
  managerIDs,
  coachIDs,
  year,
  month
) {
  return {
    type: OPEN_CANCEL_EVENT_ALERT,
    payload: {
      institutionID,
      eventID,
      managerIDs,
      coachIDs,
      year,
      month
    }
  };
}

export function closeCancelEventAlert() {
  return {
    type: CLOSE_CANCEL_EVENT_ALERT
  };
}

export function openUncancelEventAlert(
  institutionID,
  eventID,
  managerIDs,
  coachIDs,
  year,
  month
) {
  return {
    type: OPEN_UNCANCEL_EVENT_ALERT,
    payload: {
      institutionID,
      eventID,
      managerIDs,
      coachIDs,
      year,
      month
    }
  };
}

export function closeUncancelEventAlert() {
  return {
    type: CLOSE_UNCANCEL_EVENT_ALERT
  };
}

export function openAddEventDialog() {
  return {
    type: OPEN_ADD_EVENT_DIALOG
  };
}

export function closeAddEventDialog() {
  return {
    type: CLOSE_ADD_EVENT_DIALOG
  };
}

export function requestEvents() {
  return {
    type: REQUEST_EVENTS
  };
}

export function receiveEvents(events) {
  return {
    type: RECEIVE_EVENTS,
    payload: {
      events
    }
  };
}

export function errorLoadingEvents(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_EVENTS,
    payload: {
      error
    }
  };
}

export function loadEvents(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEvents());
    const teamsRef = firebase
      .database()
      .ref(`institution/${institutionID}/private/events`);

    return teamsRef.on("value", snapshot => {
      const teams = snapshot.val();
      if (teams === null) {
        dispatch(receiveEvents({}));
      } else {
        dispatch(receiveEvents(teams));
      }
    });
  };
}

export function requestAddEvent() {
  return {
    type: REQUEST_ADD_EVENT
  };
}

export function receiveAddEvent() {
  return {
    type: RECEIVE_ADD_EVENT
  };
}

export function errorAddingEvent(error: { code: string, message: string }) {
  return {
    type: ERROR_ADDING_EVENT,
    payload: {
      error
    }
  };
}

export function getManagerUpdates(
  institutionID,
  managers,
  year,
  month,
  newEventID,
  newEventInfo
) {
  return _.fromPairs(
    _.toPairs(managers).map(([managerID, managerInfo]) => {
      return [
        `manager/${managerID}/private/institutions/${institutionID}/events/${year}/${month}/${newEventID}`,
        newEventInfo
      ];
    })
  );
}

export function getCoachUpdates(
  institutionID,
  coaches,
  year,
  month,
  newEventID,
  newEventInfo
) {
  return _.fromPairs(
    _.toPairs(coaches).map(([coachID, coachInfo]) => {
      return [
        `coach/${coachID}/private/institutions/${institutionID}/events/${year}/${month}/${newEventID}`,
        newEventInfo
      ];
    })
  );
}

export function addEvent(
  institutionID,
  eventInfo,
  recurrencePattern,
  teams,
  managers,
  coaches
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAddEvent());

    // Distill required info from coaches & managers
    const eventCoaches = _.fromPairs(
      _.toPairs(coaches).map(([coachID, coachInfo]) => {
        return [
          coachID,
          {
            name: coachInfo.metadata.name,
            surname: coachInfo.metadata.surname,
            profilePictureURL: coachInfo.metadata.profilePictureURL,
            phoneNumber: coachInfo.metadata.phoneNumber,
            hours: {
              status: "AWAITING_SIGN_IN",
              type: coachInfo.paymentDefaults.type,
              standardHourlyRate: coachInfo.paymentDefaults.standardHourlyRate,
              overtimeHourlyRate: coachInfo.paymentDefaults.overtimeHourlyRate
            }
          }
        ];
      })
    );
    const eventManagers = _.fromPairs(
      _.toPairs(managers).map(([managerID, managerInfo]) => {
        return [
          managerID,
          {
            name: managerInfo.metadata.name,
            surname: managerInfo.metadata.surname,
            profilePictureURL: managerInfo.metadata.profilePictureURL,
            phoneNumber: managerInfo.metadata.phoneNumber
          }
        ];
      })
    );

    // Set up recurring events
    let instances = [];
    let eventsToCreate = [];
    for (let i = 0; i < recurrencePattern.numberOfEvents; i++) {
      const newEventID = firebase
        .database()
        .ref(`institution/${institutionID}/private/events`)
        .push().key;

      let date = new Date(eventInfo.date);
      if (recurrencePattern.frequency === "WEEKLY") {
        date = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 7 * i
        );
      } else if (recurrencePattern.frequency === "MONTHLY") {
        date = new Date(
          date.getFullYear(),
          date.getMonth() + 1 * i,
          date.getDate()
        );
      }
      const year = date.toISOString().slice(0, 4);
      const month = date.toISOString().slice(5, 7);
      date.setHours(date.getHours() + 2);
      instances.push({ date: date.toISOString().slice(0, 10), id: newEventID });
      date.setHours(date.getHours() + 2);
      eventsToCreate.push({
        id: newEventID,
        date: date.toISOString().slice(0, 10),
        year,
        month
      });
    }

    // Create events
    let updates = {};
    let managerUpdates = {};
    let coachUpdates = {};
    for (let i = 0; i < eventsToCreate.length; i++) {
      const newEventInfo = {
        status: "ACTIVE",
        metadata: { ...eventInfo, date: eventsToCreate[i].date },
        recurrencePattern: {
          ...recurrencePattern,
          instances
        },
        teams,
        coaches: eventCoaches,
        managers: eventManagers
      };
      managerUpdates = getManagerUpdates(
        institutionID,
        managers,
        eventsToCreate[i].year,
        eventsToCreate[i].month,
        eventsToCreate[i].id,
        newEventInfo
      );
      coachUpdates = getCoachUpdates(
        institutionID,
        coaches,
        eventsToCreate[i].year,
        eventsToCreate[i].month,
        eventsToCreate[i].id,
        newEventInfo
      );
      updates = {
        ...updates,
        [`institution/${institutionID}/private/events/${eventsToCreate[i]
          .year}/${eventsToCreate[i].month}/${eventsToCreate[i]
          .id}`]: newEventInfo,
        ...coachUpdates,
        ...managerUpdates
      };
    }

    // Save events to database
    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => dispatch(receiveAddEvent()))
      .catch(error => dispatch(errorAddingEvent(error)));
  };
}

export function requestEditEvent() {
  return {
    type: REQUEST_EDIT_EVENT
  };
}

export function receiveEditEvent() {
  return {
    type: RECEIVE_EDIT_EVENT
  };
}

export function errorEditingEvent(error: { code: string, message: string }) {
  return {
    type: ERROR_EDITING_EVENT,
    payload: {
      error
    }
  };
}

export function editEvent(
  institutionID,
  eventInfo,
  recurrencePattern,
  teams,
  managers,
  coaches,
  shouldEditAllEvents
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEditEvent());

    // Distill required info from coaches & managers
    const eventCoaches = _.fromPairs(
      _.toPairs(coaches).map(([coachID, coachInfo]) => {
        return [
          coachID,
          {
            name: coachInfo.metadata.name,
            surname: coachInfo.metadata.surname,
            profilePictureURL: coachInfo.metadata.profilePictureURL,
            phoneNumber: coachInfo.metadata.phoneNumber,
            hours: {
              status: "AWAITING_SIGN_IN",
              type: coachInfo.paymentDefaults.type,
              standardHourlyRate: coachInfo.paymentDefaults.standardHourlyRate,
              overtimeHourlyRate: coachInfo.paymentDefaults.overtimeHourlyRate
            }
          }
        ];
      })
    );
    const eventManagers = _.fromPairs(
      _.toPairs(managers).map(([managerID, managerInfo]) => {
        return [
          managerID,
          {
            name: managerInfo.metadata.name,
            surname: managerInfo.metadata.surname,
            profilePictureURL: managerInfo.metadata.profilePictureURL,
            phoneNumber: managerInfo.metadata.phoneNumber
          }
        ];
      })
    );

    // Set up recurring events
    let instances = recurrencePattern.instances;
    let eventsToEdit = [];

    if (shouldEditAllEvents) {
      let currentDate = new Date(Date.now());
      currentDate.setHours(currentDate.getHours() + 2);
      currentDate = currentDate.toISOString().slice(0, 10);
      for (let i = 0; i < recurrencePattern.instances.length; i++) {
        if (instances[i].date >= currentDate) {
          const date = instances[i].date;
          const year = date.slice(0, 4);
          const month = date.slice(5, 7);
          eventsToEdit.push({
            id: instances[i].id,
            date,
            year,
            month
          });
        }
      }
    } else {
      const date = eventInfo.date;
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      eventsToEdit.push({
        id: eventInfo.id,
        date,
        year,
        month
      });
    }

    // Create events
    let updates = {};
    let managerUpdates = {};
    let coachUpdates = {};
    for (let i = 0; i < eventsToEdit.length; i++) {
      const newEventInfo = {
        status: "ACTIVE",
        metadata: { ...eventInfo, date: eventsToEdit[i].date },
        recurrencePattern,
        teams,
        coaches: eventCoaches,
        managers: eventManagers
      };
      managerUpdates = getManagerUpdates(
        institutionID,
        managers,
        eventsToEdit[i].year,
        eventsToEdit[i].month,
        eventsToEdit[i].id,
        newEventInfo
      );
      coachUpdates = getCoachUpdates(
        institutionID,
        coaches,
        eventsToEdit[i].year,
        eventsToEdit[i].month,
        eventsToEdit[i].id,
        newEventInfo
      );
      updates = {
        ...updates,
        [`institution/${institutionID}/private/events/${eventsToEdit[i]
          .year}/${eventsToEdit[i].month}/${eventsToEdit[i].id}`]: newEventInfo,
        ...coachUpdates,
        ...managerUpdates
      };
    }

    // Save events to database
    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => dispatch(receiveEditEvent()))
      .catch(error => dispatch(errorEditingEvent(error)));
  };
}

export function requestStaff() {
  return {
    type: REQUEST_STAFF
  };
}

export function receiveStaff(staff) {
  const managers = _.fromPairs(
    _.toPairs(staff).filter(
      keyValuePairs => keyValuePairs[1].metadata.type === "MANAGER"
    )
  );
  const coaches = _.fromPairs(
    _.toPairs(staff).filter(
      keyValuePairs => keyValuePairs[1].metadata.type === "COACH"
    )
  );
  return {
    type: RECEIVE_STAFF,
    payload: {
      managers,
      coaches
    }
  };
}

export function errorLoadingStaff(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_STAFF,
    payload: {
      error
    }
  };
}

export function loadStaff(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestStaff());
    const staffRef = firebase
      .database()
      .ref(`institution/${institutionID}/private/staff`);

    return staffRef.on("value", snapshot => {
      const staff = snapshot.val();
      if (staff === null) {
        dispatch(receiveStaff({}));
      } else {
        dispatch(receiveStaff(staff));
      }
    });
  };
}

export function requestTeams() {
  return {
    type: REQUEST_TEAMS
  };
}

export function receiveTeams(teams) {
  return {
    type: RECEIVE_TEAMS,
    payload: {
      teams
    }
  };
}

export function errorLoadingTeams(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_TEAMS,
    payload: {
      error
    }
  };
}

export function requestCancelEvent() {
  return {
    type: REQUEST_CANCEL_EVENT
  };
}

export function receiveCancelEvent() {
  return {
    type: RECEIVE_CANCEL_EVENT
  };
}

export function errorCancellingEvent(error: { code: string, message: string }) {
  return {
    type: ERROR_CANCELLING_EVENT,
    payload: {
      error
    }
  };
}

export function requestUncancelEvent() {
  return {
    type: REQUEST_UNCANCEL_EVENT
  };
}

export function receiveUncancelEvent() {
  return {
    type: RECEIVE_UNCANCEL_EVENT
  };
}

export function errorUncancellingEvent(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_UNCANCELLING_EVENT,
    payload: {
      error
    }
  };
}

export function loadTeams(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestTeams());
    const teamsRef = firebase
      .database()
      .ref(`institution/${institutionID}/private/teams`);

    return teamsRef.on("value", snapshot => {
      const teams = snapshot.val();
      if (teams === null) {
        dispatch(receiveTeams({}));
      } else {
        dispatch(receiveTeams(teams));
      }
    });
  };
}

export function cancelEvent(
  institutionID,
  eventID,
  managerIDs,
  coachIDs,
  year,
  month
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCancelEvent());
    const managerUpdates = _.fromPairs(
      managerIDs.map(id => [
        `manager/private/${id}/institutions/${institutionID}/events/${year}/${month}/${eventID}/status`,
        "CANCELLED"
      ])
    );
    const coachUpdates = _.fromPairs(
      coachIDs.map(id => [
        `coach/private/${id}/institutions/${institutionID}/events/${year}/${month}/${eventID}/status`,
        "CANCELLED"
      ])
    );
    const updates = {
      [`institution/${institutionID}/private/events/${year}/${month}/${eventID}/status`]: "CANCELLED",
      ...managerUpdates,
      ...coachUpdates
    };

    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => dispatch(receiveCancelEvent()))
      .catch(error => dispatch(errorCancellingEvent(error)));
  };
}

export function uncancelEvent(
  institutionID,
  eventID,
  managerIDs,
  coachIDs,
  year,
  month
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUncancelEvent());
    const managerUpdates = _.fromPairs(
      managerIDs.map(id => [
        `manager/private/${id}/institutions/${institutionID}/events/${year}/${month}/${eventID}/status`,
        "ACTIVE"
      ])
    );
    const coachUpdates = _.fromPairs(
      coachIDs.map(id => [
        `coach/private/${id}/institutions/${institutionID}/events/${year}/${month}/${eventID}/status`,
        "ACTIVE"
      ])
    );
    const updates = {
      [`institution/${institutionID}/private/events/${year}/${month}/${eventID}/status`]: "ACTIVE",
      ...managerUpdates,
      ...coachUpdates
    };

    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => dispatch(receiveUncancelEvent()))
      .catch(error => dispatch(errorUncancellingEvent(error)));
  };
}

export function requestCreationDate() {
  return {
    type: REQUEST_CREATION_DATE
  };
}

export function receiveCreationDate(date) {
  return {
    type: RECEIVE_CREATION_DATE,
    payload: {
      date
    }
  };
}

export function errorFetchingCreationDate(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_FETCHING_CREATION_DATE,
    payload: {
      error
    }
  };
}

export function fetchCreationDate(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCreationDate());
    const institutionRef = firebase
      .firestore()
      .collection("institutions")
      .doc(institutionID);

    return institutionRef
      .get()
      .then(doc => {
        const institutionInfo = doc.data();
        dispatch(receiveCreationDate(institutionInfo.metadata.creationDate));
      })
      .catch(error => dispatch(errorFetchingCreationDate(error)));
  };
}
