// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

export const UPDATE_TAB = "sportomatic-web/coach/hours/UPDATE_TAB";
export const REQUEST_EVENTS = "sportomatic-web/coach/hours/REQUEST_EVENTS";
export const RECEIVE_EVENTS = "sportomatic-web/coach/hours/RECEIVE_EVENTS";
export const ERROR_LOADING_EVENTS =
  "sportomatic-web/coach/hours/ERROR_LOADING_EVENTS";
export const REQUEST_SIGN_IN = "sportomatic-web/coach/hours/REQUEST_SIGN_IN";
export const RECEIVE_SIGN_IN = "sportomatic-web/coach/hours/RECEIVE_SIGN_IN";
export const ERROR_SIGNING_IN = "sportomatic-web/coach/hours/ERROR_SIGNING_IN";
export const REQUEST_SIGN_OUT = "sportomatic-web/coach/hours/REQUEST_SIGN_OUT";
export const RECEIVE_SIGN_OUT = "sportomatic-web/coach/hours/RECEIVE_SIGN_OUT";
export const ERROR_SIGNING_OUT =
  "sportomatic-web/coach/hours/ERROR_SIGNING_OUT";

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentTab: "IN_PROGRESS"
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_TAB:
      return {
        ...state,
        currentTab: action.payload.newTab
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isEventsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
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

export const hoursReducer = combineReducers({
  uiConfig: uiConfigReducer,
  loadingStatus: loadingStatusReducer,
  events: eventsReducer
});

// Selectors

const uiConfig = state => state.coach.hours.uiConfig;
const loadingStatus = state => state.coach.hours.loadingStatus;
const events = state => state.coach.hours.events;

export const selector = createStructuredSelector({
  uiConfig,
  loadingStatus,
  events
});

// Action Creators

export function updateTab(newTab) {
  return {
    type: UPDATE_TAB,
    payload: {
      newTab
    }
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
    const eventsRef = firebase
      .database()
      .ref(`institution/${institutionID}/private/events`);

    return eventsRef.on("value", snapshot => {
      const events = snapshot.val();
      if (events === null) {
        dispatch(receiveEvents({}));
      } else {
        dispatch(receiveEvents(events));
      }
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

export function signIn(institutionID, eventInfo, coachID, signInTime) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSignIn());

    const { year, month, eventID, startTime } = eventInfo;

    const signInTimeDelta =
      (new Date(
        2017,
        1,
        1,
        signInTime.slice(0, 2),
        signInTime.slice(3, 5)
      ).getTime() -
        new Date(
          2017,
          1,
          1,
          startTime.slice(0, 2),
          startTime.slice(3, 5)
        ).getTime()) /
      1000 /
      60;

    let updates = {};
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/signInTime`
    ] = signInTime;
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/signInTimeDelta`
    ] = signInTimeDelta;
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/status`
    ] =
      "AWAITING_SIGN_OUT";

    return firebase
      .database()
      .ref()
      .update(updates)
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

export function signOut(institutionID, eventInfo, coachID, signOutTime) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSignIn());

    const { year, month, eventID, endTime } = eventInfo;

    const signOutTimeDelta =
      (new Date(
        2017,
        1,
        1,
        signOutTime.slice(0, 2),
        signOutTime.slice(3, 5)
      ).getTime() -
        new Date(
          2017,
          1,
          1,
          endTime.slice(0, 2),
          endTime.slice(3, 5)
        ).getTime()) /
      1000 /
      60;

    let updates = {};
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/signOutTime`
    ] = signOutTime;
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/status`
    ] =
      "AWAITING_APPROVAL";
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/signOutTimeDelta`
    ] = signOutTimeDelta;

    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => dispatch(receiveSignOut()))
      .catch(error => dispatch(errorSigningOut(error)));
  };
}
