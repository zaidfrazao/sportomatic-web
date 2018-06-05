import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/schedule";

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
export const REQUEST_STAFF = `${NAMESPACE}/REQUEST_STAFF`;
export const RECEIVE_STAFF = `${NAMESPACE}/RECEIVE_STAFF`;
export const REQUEST_ADMINS = `${NAMESPACE}/REQUEST_ADMINS`;
export const RECEIVE_ADMINS = `${NAMESPACE}/RECEIVE_ADMINS`;
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
export const REQUEST_ABSENT_UPDATE = `${NAMESPACE}/REQUEST_ABSENT_UPDATE`;
export const RECEIVE_ABSENT_UPDATE = `${NAMESPACE}/RECEIVE_ABSENT_UPDATE`;
export const ERROR_UPDATING_ABSENT = `${NAMESPACE}/ERROR_UPDATING_ABSENT`;
export const OPEN_MARK_ABSENT_MODAL = `${NAMESPACE}/OPEN_MARK_ABSENT_MODAL`;
export const CLOSE_MARK_ABSENT_MODAL = `${NAMESPACE}/CLOSE_MARK_ABSENT_MODAL`;
export const OPEN_UNMARK_ABSENT_MODAL = `${NAMESPACE}/OPEN_UNMARK_ABSENT_MODAL`;
export const CLOSE_UNMARK_ABSENT_MODAL = `${NAMESPACE}/CLOSE_UNMARK_ABSENT_MODAL`;
export const REQUEST_ABSENT_RATING_UPDATE = `${NAMESPACE}/REQUEST_ABSENT_RATING_UPDATE`;
export const RECEIVE_ABSENT_RATING_UPDATE = `${NAMESPACE}/RECEIVE_ABSENT_RATING_UPDATE`;
export const ERROR_UPDATING_ABSENT_RATING = `${NAMESPACE}/ERROR_UPDATING_ABSENT_RATING`;
export const OPEN_EDIT_ABSENT_RATING_MODAL = `${NAMESPACE}/OPEN_EDIT_ABSENT_RATING_MODAL`;
export const CLOSE_EDIT_ABSENT_RATING_MODAL = `${NAMESPACE}/CLOSE_EDIT_ABSENT_RATING_MODAL`;
export const OPEN_REPLACEMENT_COACH_MODAL = `${NAMESPACE}/OPEN_REPLACEMENT_COACH_MODAL`;
export const CLOSE_REPLACEMENT_COACH_MODAL = `${NAMESPACE}/CLOSE_REPLACEMENT_COACH_MODAL`;
export const REQUEST_REPLACEMENT_COACH_UPDATE = `${NAMESPACE}/REQUEST_REPLACEMENT_COACH_UPDATE`;
export const RECEIVE_REPLACEMENT_COACH_UPDATE = `${NAMESPACE}/RECEIVE_REPLACEMENT_COACH_UPDATE`;
export const ERROR_UPDATING_REPLACEMENT_COACH = `${NAMESPACE}/ERROR_UPDATING_REPLACEMENT_COACH`;
export const OPEN_REPLACEMENT_COACH_REMOVAL_MODAL = `${NAMESPACE}/OPEN_REPLACEMENT_COACH_REMOVAL_MODAL`;
export const CLOSE_REPLACEMENT_COACH_REMOVAL_MODAL = `${NAMESPACE}/CLOSE_REPLACEMENT_COACH_REMOVAL_MODAL`;
export const REQUEST_REPLACEMENT_COACH_REMOVAL = `${NAMESPACE}/REQUEST_REPLACEMENT_COACH_REMOVAL`;
export const RECEIVE_REPLACEMENT_COACH_REMOVAL = `${NAMESPACE}/RECEIVE_REPLACEMENT_COACH_REMOVAL`;
export const ERROR_REMOVING_REPLACEMENT_COACH = `${NAMESPACE}/ERROR_REMOVING_REPLACEMENT_COACH`;
export const RESET_SCHEDULE_STATE = `${NAMESPACE}/RESET_SCHEDULE_STATE`;
export const REQUEST_SIGN_IN = `${NAMESPACE}/REQUEST_SIGN_IN`;
export const RECEIVE_SIGN_IN = `${NAMESPACE}/RECEIVE_SIGN_IN`;
export const ERROR_SIGNING_IN = `${NAMESPACE}/ERROR_SIGNING_IN`;
export const REQUEST_SIGN_OUT = `${NAMESPACE}/REQUEST_SIGN_OUT`;
export const RECEIVE_SIGN_OUT = `${NAMESPACE}/RECEIVE_SIGN_OUT`;
export const ERROR_SIGNING_OUT = `${NAMESPACE}/ERROR_SIGNING_OUT`;
export const REQUEST_UPDATE_TIMES = `${NAMESPACE}/REQUEST_UPDATE_TIMES`;
export const RECEIVE_UPDATE_TIMES = `${NAMESPACE}/RECEIVE_UPDATE_TIMES`;
export const ERROR_UPDATING_TIMES = `${NAMESPACE}/ERROR_UPDATING_TIMES`;
export const REQUEST_APPROVE_HOURS = `${NAMESPACE}/REQUEST_APPROVE_HOURS`;
export const RECEIVE_APPROVE_HOURS = `${NAMESPACE}/RECEIVE_APPROVE_HOURS`;
export const ERROR_APPROVING_HOURS = `${NAMESPACE}/ERROR_APPROVING_HOURS`;
export const REQUEST_SEASON_INFO = `${NAMESPACE}/REQUEST_SEASON_INFO`;
export const RECEIVE_SEASON_INFO = `${NAMESPACE}/RECEIVE_SEASON_INFO`;
export const ERROR_FETCHING_SEASON_INFO = `${NAMESPACE}/ERROR_FETCHING_SEASON_INFO`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  currentView: "EVENTS_LIST",
  errorType: "NONE",
  minDate: new Date(2017, 1, 1),
  selectedCoach: "",
  selectedReplacementCoach: "",
  prevReplacementCoachID: "",
  newAbsentStatus: false
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_SCHEDULE_STATE:
    case SIGN_OUT:
      return uiConfigInitialState;
    case OPEN_MARK_ABSENT_MODAL:
      return {
        ...state,
        selectedCoach: action.payload.coachID,
        newAbsentStatus: action.payload.newStatus
      };
    case OPEN_UNMARK_ABSENT_MODAL:
      return {
        ...state,
        selectedCoach: action.payload.coachID,
        newAbsentStatus: action.payload.newStatus
      };
    case OPEN_EDIT_ABSENT_RATING_MODAL:
      return {
        ...state,
        selectedCoach: action.payload.coachID
      };
    case OPEN_REPLACEMENT_COACH_MODAL:
      return {
        ...state,
        selectedCoach: action.payload.coachID,
        prevReplacementCoachID: action.payload.prevReplacementCoachID
      };
    case OPEN_REPLACEMENT_COACH_REMOVAL_MODAL:
      return {
        ...state,
        selectedCoach: action.payload.coachID,
        selectedReplacementCoach: action.payload.replacementCoachID
      };
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
  isEventErrorAlertOpen: false,
  isMarkAbsentModalOpen: false,
  isUnmarkAbsentModalOpen: false,
  isEditAbsentRatingModalOpen: false,
  isReplacementCoachModalOpen: false,
  isReplacementCoachRemovalModalOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case RESET_SCHEDULE_STATE:
    case SIGN_OUT:
      return dialogsInitialState;
    case OPEN_REPLACEMENT_COACH_REMOVAL_MODAL:
      return {
        ...state,
        isReplacementCoachRemovalModalOpen: true
      };
    case CLOSE_REPLACEMENT_COACH_REMOVAL_MODAL:
      return {
        ...state,
        isReplacementCoachRemovalModalOpen: false
      };
    case OPEN_REPLACEMENT_COACH_MODAL:
      return {
        ...state,
        isReplacementCoachModalOpen: true
      };
    case CLOSE_REPLACEMENT_COACH_MODAL:
      return {
        ...state,
        isReplacementCoachModalOpen: false
      };
    case OPEN_EDIT_ABSENT_RATING_MODAL:
      return {
        ...state,
        isEditAbsentRatingModalOpen: true
      };
    case CLOSE_EDIT_ABSENT_RATING_MODAL:
      return {
        ...state,
        isEditAbsentRatingModalOpen: false
      };
    case OPEN_MARK_ABSENT_MODAL:
      return {
        ...state,
        isMarkAbsentModalOpen: true
      };
    case CLOSE_MARK_ABSENT_MODAL:
      return {
        ...state,
        isMarkAbsentModalOpen: false
      };
    case OPEN_UNMARK_ABSENT_MODAL:
      return {
        ...state,
        isUnmarkAbsentModalOpen: true
      };
    case CLOSE_UNMARK_ABSENT_MODAL:
      return {
        ...state,
        isUnmarkAbsentModalOpen: false
      };
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
    case RESET_SCHEDULE_STATE:
    case SIGN_OUT:
      return filtersInitialState;
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
  isStaffLoading: false,
  isSeasonInfoLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case RESET_SCHEDULE_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_SEASON_INFO:
      return {
        ...state,
        isSeasonInfoLoading: true
      };
    case ERROR_FETCHING_SEASON_INFO:
    case RECEIVE_SEASON_INFO:
      return {
        ...state,
        isSeasonInfoLoading: false
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
    case REQUEST_REPLACEMENT_COACH_REMOVAL:
    case REQUEST_REPLACEMENT_COACH_UPDATE:
    case REQUEST_ABSENT_UPDATE:
    case REQUEST_ABSENT_RATING_UPDATE:
    case REQUEST_STAFF:
      return {
        ...state,
        isStaffLoading: true
      };
    case RECEIVE_STAFF:
    case RECEIVE_ABSENT_UPDATE:
    case ERROR_UPDATING_ABSENT:
    case RECEIVE_ABSENT_RATING_UPDATE:
    case ERROR_UPDATING_ABSENT_RATING:
    case RECEIVE_REPLACEMENT_COACH_UPDATE:
    case ERROR_UPDATING_REPLACEMENT_COACH:
    case RECEIVE_REPLACEMENT_COACH_REMOVAL:
    case ERROR_REMOVING_REPLACEMENT_COACH:
      return {
        ...state,
        isStaffLoading: false
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
    case RESET_SCHEDULE_STATE:
    case REQUEST_EVENTS:
    case SIGN_OUT:
      return {};
    case RECEIVE_EVENTS:
      return action.payload.events;
    default:
      return state;
  }
}

function usersReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_SCHEDULE_STATE:
    case SIGN_OUT:
      return {};
    case RECEIVE_ADMINS:
    case RECEIVE_STAFF:
      return {
        ...state,
        ...action.payload.people
      };
    default:
      return state;
  }
}

function teamsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_SCHEDULE_STATE:
    case REQUEST_TEAMS:
    case SIGN_OUT:
      return {};
    case RECEIVE_TEAMS:
      return action.payload.teams;
    default:
      return state;
  }
}

function seasonInfoReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_SCHEDULE_STATE:
    case REQUEST_SEASON_INFO:
    case SIGN_OUT:
      return {};
    case RECEIVE_SEASON_INFO:
      return action.payload.info;
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
  users: usersReducer,
  filters: filterReducer,
  seasonInfo: seasonInfoReducer
});

// Selectors

const uiConfig = state => state.schedule.uiConfig;
const dialogs = state => state.schedule.dialogs;
const events = state => state.schedule.events;
const loadingStatus = state => state.schedule.loadingStatus;
const teams = state => state.schedule.teams;
const users = state => state.schedule.users;
const filters = state => state.schedule.filters;
const seasonInfo = state => state.schedule.seasonInfo;

export const selector = createStructuredSelector({
  uiConfig,
  dialogs,
  events,
  loadingStatus,
  teams,
  users,
  filters,
  seasonInfo
});

// Action Creators

export function resetState() {
  return {
    type: RESET_SCHEDULE_STATE
  };
}

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

export function openReplacementCoachRemovalModal(coachID, replacementCoachID) {
  return {
    type: OPEN_REPLACEMENT_COACH_REMOVAL_MODAL,
    payload: {
      coachID,
      replacementCoachID
    }
  };
}

export function closeReplacementCoachRemovalModal() {
  return {
    type: CLOSE_REPLACEMENT_COACH_REMOVAL_MODAL
  };
}

export function openReplacementCoachModal(coachID, prevReplacementCoachID) {
  return {
    type: OPEN_REPLACEMENT_COACH_MODAL,
    payload: {
      coachID,
      prevReplacementCoachID
    }
  };
}

export function closeReplacementCoachModal() {
  return {
    type: CLOSE_REPLACEMENT_COACH_MODAL
  };
}

export function openEditAbsentRatingModal(coachID) {
  return {
    type: OPEN_EDIT_ABSENT_RATING_MODAL,
    payload: {
      coachID
    }
  };
}

export function closeEditAbsentRatingModal() {
  return {
    type: CLOSE_EDIT_ABSENT_RATING_MODAL
  };
}

export function openMarkAbsentModal(coachID) {
  return {
    type: OPEN_MARK_ABSENT_MODAL,
    payload: {
      coachID,
      newStatus: false
    }
  };
}

export function closeMarkAbsentModal() {
  return {
    type: CLOSE_MARK_ABSENT_MODAL
  };
}

export function openUnmarkAbsentModal(coachID) {
  return {
    type: OPEN_UNMARK_ABSENT_MODAL,
    payload: {
      coachID,
      newStatus: true
    }
  };
}

export function closeUnmarkAbsentModal() {
  return {
    type: CLOSE_UNMARK_ABSENT_MODAL
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

export function requestEvents(institutionID) {
  return {
    type: REQUEST_EVENTS,
    payload: {
      institutionID
    }
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
      const month = format2Digits(eventDate.getMonth());
      const day = format2Digits(eventDate.getDate());
      const start = {
        hours: format2Digits(requiredInfo.times.start.getHours()),
        minutes: format2Digits(requiredInfo.times.start.getMinutes())
      };
      const end = {
        hours: format2Digits(requiredInfo.times.end.getHours()),
        minutes: format2Digits(requiredInfo.times.end.getMinutes())
      };
      const newStart = new Date(year, month, day, start.hours, start.minutes);
      const newEnd = new Date(year, month, day, end.hours, end.minutes);

      const newEventInfo = {
        institutionID,
        requiredInfo: {
          ...requiredInfo,
          times: {
            end: newEnd,
            start: newStart
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
      const month = format2Digits(eventDate.getMonth());
      const day = format2Digits(eventDate.getDate());
      const start = {
        hours: format2Digits(requiredInfo.times.start.getHours()),
        minutes: format2Digits(requiredInfo.times.start.getMinutes())
      };
      const end = {
        hours: format2Digits(requiredInfo.times.end.getHours()),
        minutes: format2Digits(requiredInfo.times.end.getMinutes())
      };
      const newStart = new Date(year, month, day, start.hours, start.minutes);
      const newEnd = new Date(year, month, day, end.hours, end.minutes);

      const newEventInfo = {
        institutionID,
        requiredInfo: {
          ...requiredInfo,
          times: {
            end: newEnd,
            start: newStart
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

export function requestAdmins() {
  return {
    type: REQUEST_ADMINS
  };
}

export function receiveAdmins(people) {
  return {
    type: RECEIVE_ADMINS,
    payload: {
      people
    }
  };
}

export function loadAdmins(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAdmins());

    const adminRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.status`, "==", "ADMIN");

    return adminRef.onSnapshot(querySnapshot => {
      let admins = {};
      querySnapshot.forEach(doc => {
        admins[doc.id] = doc.data();
      });
      dispatch(receiveAdmins(admins));
    });
  };
}

export function requestStaff() {
  return {
    type: REQUEST_STAFF
  };
}

export function receiveStaff(people) {
  return {
    type: RECEIVE_STAFF,
    payload: {
      people
    }
  };
}

export function loadStaff(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestStaff());

    const staffRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.status`, "==", "STAFF");

    return staffRef.onSnapshot(querySnapshot => {
      let staff = {};
      querySnapshot.forEach(doc => {
        staff[doc.id] = doc.data();
      });
      dispatch(receiveStaff(staff));
    });
  };
}

export function requestTeams(institutionID) {
  return {
    type: REQUEST_TEAMS,
    payload: {
      institutionID
    }
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
    dispatch(requestTeams(institutionID));

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

export function requestAbsentUpdate() {
  return {
    type: REQUEST_ABSENT_UPDATE
  };
}

export function receiveAbsentUpdate() {
  return {
    type: RECEIVE_ABSENT_UPDATE
  };
}

export function errorUpdatingAbsent(error: { code: string, message: string }) {
  return {
    type: ERROR_UPDATING_ABSENT,
    payload: {
      error
    }
  };
}

export function updateAbsent(eventID, coachID, rating) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAbsentUpdate());
    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    const updates = {
      [`coaches.${coachID}.absenteeism.rating`]: rating,
      [`coaches.${coachID}.attendance.didAttend`]: false
    };

    return eventRef
      .update(updates)
      .then(() => dispatch(receiveAbsentUpdate()))
      .catch(error => dispatch(errorUpdatingAbsent(error)));
  };
}

export function requestAbsentRatingUpdate() {
  return {
    type: REQUEST_ABSENT_RATING_UPDATE
  };
}

export function receiveAbsentRatingUpdate() {
  return {
    type: RECEIVE_ABSENT_RATING_UPDATE
  };
}

export function errorUpdatingAbsentRating(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_UPDATING_ABSENT_RATING,
    payload: {
      error
    }
  };
}

export function editAbsentRating(eventID, coachID, rating, reason) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAbsentRatingUpdate());
    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    let updates = {
      [`coaches.${coachID}.absenteeism.rating`]: rating,
      [`coaches.${coachID}.absenteeism.reason`]: reason
    };

    return eventRef
      .update(updates)
      .then(() => dispatch(receiveAbsentRatingUpdate()))
      .catch(error => dispatch(errorUpdatingAbsentRating(error)));
  };
}

export function requestReplacementCoachUpdate() {
  return {
    type: REQUEST_REPLACEMENT_COACH_UPDATE
  };
}

export function receiveReplacementCoachUpdate() {
  return {
    type: RECEIVE_REPLACEMENT_COACH_UPDATE
  };
}

export function errorUpdatingReplacementCoach(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_UPDATING_REPLACEMENT_COACH,
    payload: {
      error
    }
  };
}

export function updateReplacementCoach(
  eventID,
  coachID,
  replacementCoachID,
  prevReplacementCoachID
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestReplacementCoachUpdate());
    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    const currentTime = new Date(Date.now());

    let updates = {
      [`coaches.${coachID}.attendance.hasSubstitute`]: true,
      [`coaches.${coachID}.attendance.substitute`]: replacementCoachID,
      [`coaches.${replacementCoachID}`]: {
        absenteeism: {
          rating: "NEUTRAL",
          reason: ""
        },
        attendance: {
          didAttend: true,
          hasSubstitute: false,
          isSubstitute: true,
          substitute: "",
          subbingFor: coachID,
          willAttend: true
        },
        hours: {
          status: "AWAITING_SIGN_IN",
          times: {
            signIn: currentTime,
            signOut: currentTime
          }
        },
        status: "ACTIVE"
      }
    };
    if (prevReplacementCoachID !== "") {
      updates[
        `coaches.${prevReplacementCoachID}`
      ] = firebase.firestore.FieldValue.delete();
    }

    return eventRef
      .update(updates)
      .then(() => dispatch(receiveReplacementCoachUpdate()))
      .catch(error => dispatch(errorUpdatingReplacementCoach(error)));
  };
}

export function requestReplacementCoachRemoval() {
  return {
    type: REQUEST_REPLACEMENT_COACH_REMOVAL
  };
}

export function receiveReplacementCoachRemoval() {
  return {
    type: RECEIVE_REPLACEMENT_COACH_REMOVAL
  };
}

export function errorRemovingReplacementCoach(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_REMOVING_REPLACEMENT_COACH,
    payload: {
      error
    }
  };
}

export function removeReplacementCoach(eventID, coachID, replacementCoachID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestReplacementCoachRemoval());
    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    let updates = {
      [`coaches.${coachID}.attendance.hasSubstitute`]: false,
      [`coaches.${coachID}.attendance.substitute`]: "",
      [`coaches.${replacementCoachID}`]: firebase.firestore.FieldValue.delete()
    };

    return eventRef
      .update(updates)
      .then(() => dispatch(receiveReplacementCoachRemoval()))
      .catch(error => dispatch(errorRemovingReplacementCoach(error)));
  };
}

export function requestSeasonInfo() {
  return {
    type: REQUEST_SEASON_INFO
  };
}

export function receiveSeasonInfo(info) {
  return {
    type: RECEIVE_SEASON_INFO,
    payload: {
      info
    }
  };
}

export function errorFetchingSeasonInfo(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_FETCHING_SEASON_INFO,
    payload: {
      error
    }
  };
}

export function loadSeasonInfo(seasonID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSeasonInfo());
    const seasonRef = firebase
      .firestore()
      .collection("seasons")
      .doc(seasonID);

    return seasonRef
      .get()
      .then(doc => {
        const seasonInfo = doc.data();
        dispatch(receiveSeasonInfo(seasonInfo));
      })
      .catch(error => dispatch(errorFetchingSeasonInfo(error)));
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

export function requestSignIn() {
  return {
    type: REQUEST_SIGN_IN
  };
}

export function receiveSignIn() {
  return {
    type: RECEIVE_SIGN_IN
  };
}

export function errorSigningIn(error: { code: string, message: string }) {
  return {
    type: ERROR_SIGNING_IN,
    payload: {
      error
    }
  };
}

export function signIn(eventID, coachID, signInTime) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSignIn());

    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    return eventRef
      .update({
        [`coaches.${coachID}.hours.times.signIn`]: signInTime,
        [`coaches.${coachID}.hours.status`]: "AWAITING_SIGN_OUT"
      })
      .then(() => dispatch(receiveSignIn()))
      .catch(error => dispatch(errorSigningIn(error)));
  };
}

export function requestSignOut() {
  return {
    type: REQUEST_SIGN_OUT
  };
}

export function receiveSignOut() {
  return {
    type: RECEIVE_SIGN_OUT
  };
}

export function errorSigningOut(error: { code: string, message: string }) {
  return {
    type: ERROR_SIGNING_OUT,
    payload: {
      error
    }
  };
}

export function signOut(eventID, coachID, signOutTime) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSignOut());

    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    return eventRef
      .update({
        [`coaches.${coachID}.hours.times.signOut`]: signOutTime,
        [`coaches.${coachID}.hours.status`]: "AWAITING_APPROVAL"
      })
      .then(() => dispatch(receiveSignOut()))
      .catch(error => dispatch(errorSigningOut(error)));
  };
}

export function requestUpdateTimes() {
  return {
    type: REQUEST_UPDATE_TIMES
  };
}

export function receiveUpdateTimes() {
  return {
    type: RECEIVE_UPDATE_TIMES
  };
}

export function errorUpdatingTimes(error: { code: string, message: string }) {
  return {
    type: ERROR_UPDATING_TIMES,
    payload: {
      error
    }
  };
}

export function updateTimes(eventID, coachID, signInTime, signOutTime) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUpdateTimes());

    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    return eventRef
      .update({
        [`coaches.${coachID}.hours.times.signIn`]: signInTime,
        [`coaches.${coachID}.hours.times.signOut`]: signOutTime,
        [`coaches.${coachID}.hours.status`]: "AWAITING_APPROVAL"
      })
      .then(() => dispatch(receiveUpdateTimes()))
      .catch(error => dispatch(errorUpdatingTimes(error)));
  };
}

export function requestApproveHours() {
  return {
    type: REQUEST_APPROVE_HOURS
  };
}

export function receiveApproveHours() {
  return {
    type: RECEIVE_APPROVE_HOURS
  };
}

export function errorApprovingHours(error: { code: string, message: string }) {
  return {
    type: ERROR_APPROVING_HOURS,
    payload: {
      error
    }
  };
}

export function approveHours(
  institutionID,
  eventID,
  eventTitle,
  eventDate,
  coachID,
  shouldCreateWage,
  wage,
  wageType
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestApproveHours());

    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    let batch = db.batch();
    batch.update(eventRef, {
      [`coaches.${coachID}.hours.status`]: "APPROVED"
    });

    if (shouldCreateWage) {
      const newWageRef = db.collection("wages").doc();

      batch.set(newWageRef, {
        coachID,
        institutionID,
        wage,
        currency: "ZAR",
        date: eventDate,
        title: eventTitle,
        type: wageType
      });
    }

    return batch
      .commit()
      .then(() => dispatch(receiveApproveHours()))
      .catch(error => dispatch(errorApprovingHours(error)));
  };
}
