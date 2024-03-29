import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import moment from "moment";

// Actions

const NAMESPACE = "sportomatic-web/hours";

export const UPDATE_TAB = `${NAMESPACE}/UPDATE_TAB`;
export const REQUEST_STAFF = `${NAMESPACE}/REQUEST_STAFF`;
export const RECEIVE_STAFF = `${NAMESPACE}/RECEIVE_STAFF`;
export const ERROR_LOADING_STAFF = `${NAMESPACE}/ERROR_LOADING_STAFF`;
export const REQUEST_EVENTS_BY_DATE = `${NAMESPACE}/REQUEST_EVENTS_BY_DATE`;
export const RECEIVE_EVENTS_BY_DATE = `${NAMESPACE}/RECEIVE_EVENTS_BY_DATE`;
export const ERROR_LOADING_EVENTS_BY_DATE = `${NAMESPACE}/ERROR_LOADING_EVENTS_BY_DATE`;
export const REQUEST_EVENTS_BY_COACH = `${NAMESPACE}/REQUEST_EVENTS_BY_COACH`;
export const RECEIVE_EVENTS_BY_COACH = `${NAMESPACE}/RECEIVE_EVENTS_BY_COACH`;
export const ERROR_LOADING_EVENTS_BY_COACH = `${NAMESPACE}/ERROR_LOADING_EVENTS_BY_COACH`;
export const REQUEST_SIGN_IN = `${NAMESPACE}/REQUEST_SIGN_IN`;
export const RECEIVE_SIGN_IN = `${NAMESPACE}/RECEIVE_SIGN_IN`;
export const ERROR_SIGNING_IN = `${NAMESPACE}/ERROR_SIGNING_IN`;
export const REQUEST_SIGN_OUT = `${NAMESPACE}/REQUEST_SIGN_OUT`;
export const RECEIVE_SIGN_OUT = `${NAMESPACE}/RECEIVE_SIGN_OUT`;
export const ERROR_SIGNING_OUT = `${NAMESPACE}/ERROR_SIGNING_OUT`;
export const REQUEST_APPROVE_HOURS = `${NAMESPACE}/REQUEST_APPROVE_HOURS`;
export const RECEIVE_APPROVE_HOURS = `${NAMESPACE}/RECEIVE_APPROVE_HOURS`;
export const ERROR_APPROVING_HOURS = `${NAMESPACE}/ERROR_APPROVING_HOURS`;
export const APPLY_FILTERS = `${NAMESPACE}/APPLY_FILTERS`;
export const UPDATE_SEARCH = `${NAMESPACE}/UPDATE_SEARCH`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;
export const OPEN_MARK_ABSENT_MODAL = `${NAMESPACE}/OPEN_MARK_ABSENT_MODAL`;
export const CLOSE_MARK_ABSENT_MODAL = `${NAMESPACE}/CLOSE_MARK_ABSENT_MODAL`;
export const REQUEST_ABSENT_UPDATE = `${NAMESPACE}/REQUEST_ABSENT_UPDATE`;
export const RECEIVE_ABSENT_UPDATE = `${NAMESPACE}/RECEIVE_ABSENT_UPDATE`;
export const ERROR_UPDATING_ABSENT = `${NAMESPACE}/ERROR_UPDATING_ABSENT`;
export const OPEN_UNMARK_ABSENT_MODAL = `${NAMESPACE}/OPEN_UNMARK_ABSENT_MODAL`;
export const CLOSE_UNMARK_ABSENT_MODAL = `${NAMESPACE}/CLOSE_UNMARK_ABSENT_MODAL`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentTab: "OVERVIEW",
  lastVisible: "",
  selectedCoach: "",
  selectedEvent: "",
  newAbsentStatus: false
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return uiConfigInitialState;
    case UPDATE_TAB:
      return {
        ...state,
        currentTab: action.payload.newTab
      };
    case RECEIVE_EVENTS_BY_DATE:
      return {
        ...state,
        lastVisible: action.payload.lastVisible
      };
    case OPEN_MARK_ABSENT_MODAL:
      return {
        ...state,
        selectedCoach: action.payload.coachID,
        selectedEvent: action.payload.eventID,
        newAbsentStatus: action.payload.newStatus
      };
    case OPEN_UNMARK_ABSENT_MODAL:
      return {
        ...state,
        selectedCoach: action.payload.coachID,
        selectedEvent: action.payload.eventID,
        newAbsentStatus: action.payload.newStatus
      };
    default:
      return state;
  }
}

export const dialogsInitialState = {
  isMarkAbsentModalOpen: false,
  isUnmarkAbsentModalOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return dialogsInitialState;
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
    default:
      return state;
  }
}

function staffReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_STAFF:
    case SIGN_OUT:
      return {};
    case RECEIVE_STAFF:
      return action.payload.staff;
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isStaffLoading: false,
  isEventsByDateLoading: false,
  isEventsByCoachLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_STAFF:
      return {
        ...state,
        isStaffLoading: true
      };
    case ERROR_LOADING_STAFF:
    case RECEIVE_STAFF:
      return {
        ...state,
        isStaffLoading: false
      };
    case REQUEST_EVENTS_BY_DATE:
      return {
        ...state,
        isEventsByDateLoading: true
      };
    case ERROR_LOADING_EVENTS_BY_DATE:
    case RECEIVE_EVENTS_BY_DATE:
      return {
        ...state,
        isEventsByDateLoading: false
      };
    case REQUEST_EVENTS_BY_COACH:
      return {
        ...state,
        isEventsByCoachLoading: true
      };
    case ERROR_LOADING_EVENTS_BY_COACH:
    case RECEIVE_EVENTS_BY_COACH:
      return {
        ...state,
        isEventsByCoachLoading: false
      };
    default:
      return state;
  }
}

function eventsByDateReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return {};
    case RECEIVE_EVENTS_BY_DATE:
      return {
        ...state,
        ...action.payload.events
      };
    default:
      return state;
  }
}

function eventsByCoachReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_EVENTS_BY_COACH:
    case SIGN_OUT:
      return {};
    case RECEIVE_EVENTS_BY_COACH:
      return action.payload.events;
    default:
      return state;
  }
}

export const filtersInitialState = {
  sport: "All",
  searchText: ""
};

function filterReducer(state = filtersInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
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

export const hoursReducer = combineReducers({
  uiConfig: uiConfigReducer,
  staff: staffReducer,
  loadingStatus: loadingStatusReducer,
  eventsByDate: eventsByDateReducer,
  eventsByCoach: eventsByCoachReducer,
  filters: filterReducer,
  dialogs: dialogsReducer
});

// Selectors

const uiConfig = state => state.hours.uiConfig;
const staff = state => state.hours.staff;
const loadingStatus = state => state.hours.loadingStatus;
const eventsByDate = state => state.hours.eventsByDate;
const eventsByCoach = state => state.hours.eventsByCoach;
const filters = state => state.hours.filters;
const dialogs = state => state.hours.dialogs;

export const selector = createStructuredSelector({
  uiConfig,
  staff,
  loadingStatus,
  eventsByDate,
  eventsByCoach,
  filters,
  dialogs
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function openMarkAbsentModal(eventID, coachID) {
  return {
    type: OPEN_MARK_ABSENT_MODAL,
    payload: {
      eventID,
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

export function openUnmarkAbsentModal(eventID, coachID) {
  return {
    type: OPEN_UNMARK_ABSENT_MODAL,
    payload: {
      eventID,
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

export function applyFilters(sport) {
  return {
    type: APPLY_FILTERS,
    payload: {
      sport
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

export function updateTab(newTab) {
  return {
    type: UPDATE_TAB,
    payload: {
      newTab
    }
  };
}

export function requestStaff() {
  return {
    type: REQUEST_STAFF
  };
}

export function receiveStaff(staff) {
  return {
    type: RECEIVE_STAFF,
    payload: {
      staff
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

export function requestEventsByDate() {
  return {
    type: REQUEST_EVENTS_BY_DATE
  };
}

export function receiveEventsByDate(events, lastVisible) {
  return {
    type: RECEIVE_EVENTS_BY_DATE,
    payload: {
      events,
      lastVisible
    }
  };
}

export function errorLoadingEventsByDate(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_EVENTS_BY_DATE,
    payload: {
      error
    }
  };
}

export function loadEventsByDate(institutionID, startAfter = "") {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEventsByDate());

    let eventsRef = {};
    if (startAfter === "") {
      eventsRef = firebase
        .firestore()
        .collection("events")
        .orderBy("requiredInfo.times.start", "desc")
        .limit(10)
        .where("requiredInfo.status", "==", "ACTIVE")
        .where("institutionID", "==", institutionID)
        .where(
          "requiredInfo.times.start",
          "<",
          moment()
            .endOf("day")
            .toDate()
        );
    } else {
      eventsRef = firebase
        .firestore()
        .collection("events")
        .orderBy("requiredInfo.times.start", "desc")
        .startAfter(startAfter)
        .limit(10)
        .where("requiredInfo.status", "==", "ACTIVE")
        .where("institutionID", "==", institutionID)
        .where(
          "requiredInfo.times.start",
          "<",
          moment()
            .endOf("day")
            .toDate()
        );
    }

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receiveEventsByDate(events, lastVisible));
    });
  };
}

export function requestEventsByCoach() {
  return {
    type: REQUEST_EVENTS_BY_COACH
  };
}

export function receiveEventsByCoach(events) {
  return {
    type: RECEIVE_EVENTS_BY_COACH,
    payload: {
      events
    }
  };
}

export function errorLoadingEventsByCoach(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_EVENTS_BY_COACH,
    payload: {
      error
    }
  };
}

export function loadEventsByCoach(institutionID, coachID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEventsByCoach());

    let eventsRef = firebase
      .firestore()
      .collection("events")
      .where("institutionID", "==", institutionID)
      .where("requiredInfo.status", "==", "ACTIVE")
      .where(`coaches.${coachID}.hours.status`, "==", "APPROVED");

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receiveEventsByCoach(events));
    });
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

export function signIn(eventID, coachID, signInTime, newStatus) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSignIn());

    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    return eventRef
      .update({
        [`coaches.${coachID}.hours.times.signIn`]: signInTime,
        [`coaches.${coachID}.hours.status`]: newStatus
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

export function signOut(eventID, coachID, signOutTime, newStatus) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSignOut());

    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    return eventRef
      .update({
        [`coaches.${coachID}.hours.times.signOut`]: signOutTime,
        [`coaches.${coachID}.hours.status`]: newStatus
      })
      .then(() => dispatch(receiveSignOut()))
      .catch(error => dispatch(errorSigningOut(error)));
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
  coachID,
  paymentInfo,
  eventInfo,
  signInTime,
  signOutTime,
  maxOvertimeHours
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestApproveHours());

    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    let batch = db.batch();
    batch.update(eventRef, {
      [`coaches.${coachID}.hours.status`]: "APPROVED"
    });

    if (paymentInfo.type === "HOURLY") {
      const newWageRef = db.collection("wages").doc();

      let standardHours = 0;
      let overtimeHours = 0;
      let exceededMaxOvertimeHours = false;
      const startTime = moment(eventInfo.requiredInfo.times.start);
      const endTime = moment(eventInfo.requiredInfo.times.end);
      if (startTime.isBefore(signInTime)) {
        if (endTime.isBefore(signOutTime)) {
          standardHours = Math.round(endTime.diff(signInTime, "hours", true));
          overtimeHours = Math.round(signOutTime.diff(endTime, "hours", true));
        } else {
          standardHours = Math.round(
            signOutTime.diff(signInTime, "hours", true)
          );
        }
      } else {
        if (endTime.isBefore(signOutTime)) {
          standardHours = Math.round(endTime.diff(startTime, "hours", true));
          overtimeHours = Math.round(signOutTime.diff(endTime, "hours", true));
        } else {
          standardHours = Math.round(
            signOutTime.diff(startTime, "hours", true)
          );
        }
      }

      if (overtimeHours > maxOvertimeHours) {
        overtimeHours = maxOvertimeHours;
        exceededMaxOvertimeHours = true;
      }

      const wage =
        standardHours * paymentInfo.rates.standard +
        overtimeHours * paymentInfo.rates.overtime;

      if (wage > 0) {
        batch.set(newWageRef, {
          coachID,
          institutionID,
          wage,
          currency: "ZAR",
          date: eventInfo.requiredInfo.times.start,
          hours: {
            standard: standardHours,
            overtime: overtimeHours,
            exceededMaxOvertimeHours
          },
          rates: paymentInfo.rates,
          title: eventInfo.requiredInfo.title,
          type: "HOURLY"
        });
      }
    }

    return batch
      .commit()
      .then(() => dispatch(receiveApproveHours()))
      .catch(error => dispatch(errorApprovingHours(error)));
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

export function updateAbsent(
  eventID,
  coachID,
  newStatus,
  isPastEvent,
  rating = "NEUTRAL",
  reason = ""
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAbsentUpdate());
    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    let updates = {
      [`coaches.${coachID}.absenteeism.rating`]: rating,
      [`coaches.${coachID}.absenteeism.reason`]: reason
    };
    if (isPastEvent) {
      updates[`coaches.${coachID}.attendance.didAttend`] = newStatus;
    } else {
      updates[`coaches.${coachID}.attendance.didAttend`] = newStatus;
      updates[`coaches.${coachID}.attendance.willAttend`] = newStatus;
      if (newStatus) {
        updates[`coaches.${coachID}.attendance.hasSubstitute`] = false;
        updates[`coaches.${coachID}.attendance.substitute`] = "";
      }
    }

    return eventRef
      .update(updates)
      .then(() => dispatch(receiveAbsentUpdate()))
      .catch(error => dispatch(errorUpdatingAbsent(error)));
  };
}
