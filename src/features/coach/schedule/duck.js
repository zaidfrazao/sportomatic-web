// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

export const REQUEST_EVENTS = "sportomatic-web/coach/schedule/REQUEST_EVENTS";
export const RECEIVE_EVENTS = "sportomatic-web/coach/schedule/RECEIVE_EVENTS";
export const ERROR_LOADING_EVENTS =
  "sportomatic-web/coach/schedule/ERROR_LOADING_EVENTS";
export const UPDATE_CURRENT_VIEW =
  "sportomatic-web/coach/schedule/UPDATE_CURRENT_VIEW";

// Reducers

export const uiConfigInitialState = {
  currentView: "SCHEDULE"
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_CURRENT_VIEW:
      return {
        ...state,
        currentView: action.payload.newView
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

export const scheduleReducer = combineReducers({
  uiConfig: uiConfigReducer,
  events: eventsReducer,
  loadingStatus: loadingStatusReducer
});

// Selectors

const uiConfig = state => state.coach.schedule.uiConfig;
const events = state => state.coach.schedule.events;
const loadingStatus = state => state.coach.schedule.loadingStatus;

export const selector = createStructuredSelector({
  uiConfig,
  events,
  loadingStatus
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

export function loadEvents(institutionID, coachID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEvents());
    const eventsRef = firebase
      .database()
      .ref(`coach/${coachID}/private/institutions/${institutionID}/events`);

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
