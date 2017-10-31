// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

export const UPDATE_TAB = "sportomatic-web/coach/results/UPDATE_TAB";
export const REQUEST_TEAMS = "sportomatic-web/coach/results/REQUEST_TEAMS";
export const RECEIVE_TEAMS = "sportomatic-web/coach/results/RECEIVE_TEAMS";
export const ERROR_LOADING_TEAMS =
  "sportomatic-web/coach/results/ERROR_LOADING_TEAMS";
export const REQUEST_EVENTS = "sportomatic-web/coach/results/REQUEST_EVENTS";
export const RECEIVE_EVENTS = "sportomatic-web/coach/results/RECEIVE_EVENTS";
export const ERROR_LOADING_EVENTS =
  "sportomatic-web/coach/results/ERROR_LOADING_EVENTS";

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

function teamsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_TEAMS:
      return action.payload.teams;
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isTeamsLoading: false,
  isEventsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case REQUEST_TEAMS:
      return {
        ...state,
        isTeamsLoading: true
      };
    case ERROR_LOADING_TEAMS:
    case RECEIVE_TEAMS:
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

export const resultsReducer = combineReducers({
  uiConfig: uiConfigReducer,
  teams: teamsReducer,
  loadingStatus: loadingStatusReducer,
  events: eventsReducer
});

// Selectors

const uiConfig = state => state.coach.results.uiConfig;
const teams = state => state.coach.results.teams;
const loadingStatus = state => state.coach.results.loadingStatus;
const events = state => state.coach.results.events;

export const selector = createStructuredSelector({
  uiConfig,
  teams,
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
