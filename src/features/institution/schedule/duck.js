import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

const NAMESPACE = "sportomatic-web/admin/schedule";

// Actions

export const OPEN_ADD_EVENT_DIALOG = `${NAMESPACE}/OPEN_ADD_EVENT_DIALOG`;
export const CLOSE_ADD_EVENT_DIALOG = `${NAMESPACE}/CLOSE_ADD_EVENT_DIALOG`;
export const REQUEST_EVENTS = `${NAMESPACE}/REQUEST_EVENTS`;
export const RECEIVE_EVENTS = `${NAMESPACE}/RECEIVE_EVENTS`;
export const ERROR_LOADING_EVENTS = `${NAMESPACE}/ERROR_LOADING_EVENTS`;
export const REQUEST_ADD_EVENT = `${NAMESPACE}/REQUEST_ADD_EVENT`;
export const RECEIVE_ADD_EVENT = `${NAMESPACE}/RECEIVE_ADD_EVENT`;
export const ERROR_ADDING_EVENT = `${NAMESPACE}/ERROR_ADDING_EVENT`;
export const REQUEST_EDIT_EVENT = `${NAMESPACE}/REQUEST_EDIT_EVENT`;
export const RECEIVE_EDIT_EVENT = `${NAMESPACE}/RECEIVE_EDIT_EVENT`;
export const ERROR_EDITING_EVENT = `${NAMESPACE}/ERROR_EDITING_EVENT`;
export const OPEN_EDIT_EVENT_DIALOG = `${NAMESPACE}/OPEN_EDIT_EVENT_DIALOG`;
export const CLOSE_EDIT_EVENT_DIALOG = `${NAMESPACE}/CLOSE_EDIT_EVENT_DIALOG`;
export const OPEN_EVENT_ERROR_ALERT = `${NAMESPACE}/OPEN_EVENT_ERROR_ALERT`;
export const CLOSE_EVENT_ERROR_ALERT = `${NAMESPACE}/CLOSE_EVENT_ERROR_ALERT`;
export const OPEN_CANCEL_EVENT_ALERT = `${NAMESPACE}/OPEN_CANCEL_EVENT_ALERT`;
export const CLOSE_CANCEL_EVENT_ALERT = `${NAMESPACE}/CLOSE_CANCEL_EVENT_ALERT`;
export const OPEN_UNCANCEL_EVENT_ALERT = `${NAMESPACE}/OPEN_UNCANCEL_EVENT_ALERT`;
export const CLOSE_UNCANCEL_EVENT_ALERT = `${NAMESPACE}/CLOSE_UNCANCEL_EVENT_ALERT`;
export const UPDATE_CURRENT_VIEW = `${NAMESPACE}/UPDATE_CURRENT_VIEW`;
export const REQUEST_COACHES = `${NAMESPACE}/REQUEST_COACHES`;
export const RECEIVE_COACHES = `${NAMESPACE}/RECEIVE_COACHES`;
export const ERROR_LOADING_COACHES = `${NAMESPACE}/ERROR_LOADING_COACHES`;
export const REQUEST_MANAGERS = `${NAMESPACE}/REQUEST_MANAGERS`;
export const RECEIVE_MANAGERS = `${NAMESPACE}/RECEIVE_MANAGERS`;
export const ERROR_LOADING_MANAGERS = `${NAMESPACE}/ERROR_LOADING_MANAGERS`;
export const REQUEST_TEAMS = `${NAMESPACE}/REQUEST_TEAMS`;
export const RECEIVE_TEAMS = `${NAMESPACE}/RECEIVE_TEAMS`;
export const ERROR_LOADING_TEAMS = `${NAMESPACE}/ERROR_LOADING_TEAMS`;
export const REQUEST_CANCEL_EVENT = `${NAMESPACE}/REQUEST_CANCEL_EVENT`;
export const RECEIVE_CANCEL_EVENT = `${NAMESPACE}/RECEIVE_CANCEL_EVENT`;
export const ERROR_CANCELLING_EVENT = `${NAMESPACE}/ERROR_CANCELLING_EVENT`;
export const REQUEST_UNCANCEL_EVENT = `${NAMESPACE}/REQUEST_UNCANCEL_EVENT`;
export const RECEIVE_UNCANCEL_EVENT = `${NAMESPACE}/RECEIVE_UNCANCEL_EVENT`;
export const ERROR_UNCANCELLING_EVENT = `${NAMESPACE}/ERROR_UNCANCELLING_EVENT`;
export const REQUEST_CREATION_DATE = `${NAMESPACE}/REQUEST_CREATION_DATE`;
export const RECEIVE_CREATION_DATE = `${NAMESPACE}/RECEIVE_CREATION_DATE`;
export const ERROR_FETCHING_CREATION_DATE = `${NAMESPACE}/ERROR_FETCHING_CREATION_DATE`;
export const APPLY_FILTERS = `${NAMESPACE}/APPLY_FILTERS`;
export const UPDATE_SEARCH = `${NAMESPACE}/UPDATE_SEARCH`;

// Reducers

export const uiConfigInitialState = {
  currentView: "SCHEDULE",
  errorType: "NONE",
  minDate: new Date(2017, 1, 1)
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

export const filtersInitialState = {
  eventType: "All",
  sport: "All",
  division: "All",
  ageGroup: "All",
  gender: "All",
  searchText: ""
};

function filterReducer(state = filtersInitialState, action = {}) {
  switch (action.type) {
    case APPLY_FILTERS:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        searchText: action.payload.searchText
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isAddEventDialogLoading: false,
  isEditEventDialogLoading: false,
  isEventsLoading: false,
  isCreationDateLoading: false,
  isTeamsLoading: false,
  isCoachesLoading: false,
  isManagersLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
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
    case REQUEST_COACHES:
      return {
        ...state,
        isCoachesLoading: true
      };
    case RECEIVE_COACHES:
    case ERROR_LOADING_COACHES:
      return {
        ...state,
        isCoachesLoading: false
      };
    case REQUEST_MANAGERS:
      return {
        ...state,
        isManagersLoading: true
      };
    case RECEIVE_MANAGERS:
    case ERROR_LOADING_MANAGERS:
      return {
        ...state,
        isManagersLoading: false
      };
    case REQUEST_TEAMS:
      return {
        ...state,
        isTeamsLoading: true
      };
    case RECEIVE_TEAMS:
    case ERROR_LOADING_TEAMS:
      return {
        ...state,
        isTeamsLoading: false
      };
    case REQUEST_EVENTS:
      return {
        ...state,
        isEventsLoading: true
      };
    case ERROR_LOADING_EVENTS:
    case RECEIVE_EVENTS:
      return {
        ...state,
        isEventsLoading: false
      };
    case REQUEST_CREATION_DATE:
      return {
        ...state,
        isCreationDateLoading: true
      };
    case RECEIVE_CREATION_DATE:
    case ERROR_FETCHING_CREATION_DATE:
      return {
        ...state,
        isCreationDateLoading: false
      };
    default:
      return state;
  }
}

function eventsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return {
        ...state,
        ...action.payload.events
      };
    default:
      return state;
  }
}

function coachesReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_COACHES:
      return { ...state, ...action.payload.coaches };
    default:
      return state;
  }
}

function managersReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_MANAGERS:
      return { ...state, ...action.payload.managers };
    default:
      return state;
  }
}

function teamsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_TEAMS:
      return {
        ...state,
        ...action.payload.teams
      };
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
  managers: managersReducer,
  filters: filterReducer
});

// Selectors

const uiConfig = state => state.institution.schedule.uiConfig;
const dialogs = state => state.institution.schedule.dialogs;
const events = state => state.institution.schedule.events;
const loadingStatus = state => state.institution.schedule.loadingStatus;
const teams = state => state.institution.schedule.teams;
const coaches = state => state.institution.schedule.coaches;
const managers = state => state.institution.schedule.managers;
const filters = state => state.institution.schedule.filters;

export const selector = createStructuredSelector({
  uiConfig,
  dialogs,
  events,
  loadingStatus,
  teams,
  coaches,
  managers,
  filters
});

// Action Creators

export function applyFilters(eventType, sport, division, ageGroup, gender) {
  return {
    type: APPLY_FILTERS,
    payload: {
      eventType,
      sport,
      division,
      ageGroup,
      gender
    }
  };
}

export function updateSearch(searchText) {
  return {
    type: UPDATE_SEARCH,
    payload: {
      searchText
    }
  };
}

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

export function openCancelEventAlert() {
  return {
    type: OPEN_CANCEL_EVENT_ALERT
  };
}

export function closeCancelEventAlert() {
  return {
    type: CLOSE_CANCEL_EVENT_ALERT
  };
}

export function openUncancelEventAlert() {
  return {
    type: OPEN_UNCANCEL_EVENT_ALERT
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

export function loadEvents(institutionID, minDate, maxDate) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEvents());
    const eventsRef = firebase
      .firestore()
      .collection("events")
      .where("institutionID", "==", institutionID)
      .where("requiredInfo.times.start", ">", minDate)
      .where("requiredInfo.times.start", "<", maxDate);

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receiveEvents(events));
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

export function format2Digits(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}

export function addEvent(
  institutionID,
  requiredInfo,
  optionalInfo,
  recurrencePattern,
  teams,
  managers,
  coaches
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAddEvent());
    const db = firebase.firestore();

    // Set up recurring events
    let instances = [];
    let eventsToCreate = [];
    for (let i = 0; i < recurrencePattern.numberOfEvents; i++) {
      const newEventRef = db.collection("events").doc();

      let date = new Date(requiredInfo.times.start);
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
      instances.push({ date, id: newEventRef._key.path.segments[1] });
      eventsToCreate.push({
        ref: newEventRef,
        date
      });
    }

    // Create events
    let batch = db.batch();
    for (let i = 0; i < eventsToCreate.length; i++) {
      let eventDate = eventsToCreate[i].date;
      const year = eventDate.getFullYear();
      const month = format2Digits(eventDate.getMonth() + 1);
      const day = format2Digits(eventDate.getDate());
      const start = {
        hours: format2Digits(requiredInfo.times.start.getHours()),
        minutes: format2Digits(requiredInfo.times.start.getMinutes())
      };
      const end = {
        hours: format2Digits(requiredInfo.times.end.getHours()),
        minutes: format2Digits(requiredInfo.times.end.getMinutes())
      };
      const newStart = `${year}-${month}-${day}T${start.hours}:${start.minutes}:00`;
      const newEnd = `${year}-${month}-${day}T${end.hours}:${end.minutes}:00`;

      const newEventInfo = {
        institutionID,
        requiredInfo: {
          ...requiredInfo,
          times: {
            end: new Date(newEnd),
            start: new Date(newStart)
          }
        },
        optionalInfo,
        teams,
        coaches,
        managers,
        recurrencePattern: {
          ...recurrencePattern,
          instances
        }
      };

      batch.set(eventsToCreate[i].ref, newEventInfo);
    }

    // Save events to database
    return batch
      .commit()
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
  eventID,
  requiredInfo,
  optionalInfo,
  recurrencePattern,
  teams,
  managers,
  coaches,
  shouldEditAllEvents
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEditEvent());
    const db = firebase.firestore();

    // Set up recurring events
    let instances = recurrencePattern.instances;
    let eventsToEdit = [];

    if (shouldEditAllEvents) {
      const currentDate = new Date(Date.now());
      for (let i = 0; i < recurrencePattern.instances.length; i++) {
        if (instances[i].date >= currentDate) {
          const date = instances[i].date;
          eventsToEdit.push({
            ref: db.collection("events").doc(instances[i].id),
            date
          });
        }
      }
    } else {
      const date = requiredInfo.times.start;
      eventsToEdit.push({
        ref: db.collection("events").doc(eventID),
        date
      });
    }

    // Edit events
    let batch = db.batch();
    for (let i = 0; i < eventsToEdit.length; i++) {
      let eventDate = eventsToEdit[i].date;
      const year = eventDate.getFullYear();
      const month = format2Digits(eventDate.getMonth() + 1);
      const day = format2Digits(eventDate.getDate());
      const start = {
        hours: format2Digits(requiredInfo.times.start.getHours()),
        minutes: format2Digits(requiredInfo.times.start.getMinutes())
      };
      const end = {
        hours: format2Digits(requiredInfo.times.end.getHours()),
        minutes: format2Digits(requiredInfo.times.end.getMinutes())
      };
      const newStart = `${year}-${month}-${day}T${start.hours}:${start.minutes}:00`;
      const newEnd = `${year}-${month}-${day}T${end.hours}:${end.minutes}:00`;

      const newEventInfo = {
        institutionID,
        requiredInfo: {
          ...requiredInfo,
          times: {
            end: new Date(newEnd),
            start: new Date(newStart)
          }
        },
        optionalInfo,
        teams,
        coaches,
        managers,
        recurrencePattern: {
          ...recurrencePattern,
          instances
        }
      };

      batch.set(eventsToEdit[i].ref, newEventInfo);
    }

    // Save events to database
    return batch
      .commit()
      .then(() => dispatch(receiveEditEvent()))
      .catch(error => dispatch(errorEditingEvent(error)));
  };
}

export function requestCoaches() {
  return {
    type: REQUEST_COACHES
  };
}

export function receiveCoaches(coaches) {
  return {
    type: RECEIVE_COACHES,
    payload: {
      coaches
    }
  };
}

export function errorLoadingCoaches(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_COACHES,
    payload: {
      error
    }
  };
}

export function loadCoaches(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCoaches());

    const coachesRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.coachStatus`, "==", "APPROVED");

    return coachesRef.onSnapshot(querySnapshot => {
      let coaches = {};
      querySnapshot.forEach(doc => {
        coaches[doc.id] = doc.data();
      });
      dispatch(receiveCoaches(coaches));
    });
  };
}

export function requestManagers() {
  return {
    type: REQUEST_MANAGERS
  };
}

export function receiveManagers(managers) {
  return {
    type: RECEIVE_MANAGERS,
    payload: {
      managers
    }
  };
}

export function errorLoadingManagers(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_MANAGERS,
    payload: {
      error
    }
  };
}

export function loadManagers(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestManagers());

    const managersRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.managerStatus`, "==", "APPROVED");

    return managersRef.onSnapshot(querySnapshot => {
      let managers = {};
      querySnapshot.forEach(doc => {
        managers[doc.id] = doc.data();
      });
      dispatch(receiveManagers(managers));
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

export function loadTeams(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestTeams());

    const teamsRef = firebase
      .firestore()
      .collection("teams")
      .where("institutionID", "==", institutionID);

    return teamsRef.onSnapshot(querySnapshot => {
      let teams = {};
      querySnapshot.forEach(doc => {
        teams[doc.id] = doc.data();
      });
      dispatch(receiveTeams(teams));
    });
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

export function cancelEvent(eventID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCancelEvent());
    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    return eventRef
      .update({
        "requiredInfo.status": "CANCELLED"
      })
      .then(() => dispatch(receiveCancelEvent()))
      .catch(error => dispatch(errorCancellingEvent(error)));
  };
}

export function uncancelEvent(eventID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUncancelEvent());
    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    return eventRef
      .update({
        "requiredInfo.status": "ACTIVE"
      })
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
