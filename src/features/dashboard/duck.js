import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import moment from "moment";

// Actions

const NAMESPACE = "sportomatic-web/dashboard";

export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;
export const REQUEST_RECENT_RESULTS = `${NAMESPACE}/REQUEST_RECENT_RESULTS`;
export const RECEIVE_RECENT_RESULTS = `${NAMESPACE}/RECEIVE_RECENT_RESULTS`;
export const ERROR_LOADING_RECENT_RESULTS = `${NAMESPACE}/ERROR_LOADING_RECENT_RESULTS`;
export const REQUEST_TODAYS_EVENTS = `${NAMESPACE}/REQUEST_TODAYS_EVENTS`;
export const RECEIVE_TODAYS_EVENTS = `${NAMESPACE}/RECEIVE_TODAYS_EVENTS`;
export const ERROR_LOADING_TODAYS_EVENTS = `${NAMESPACE}/ERROR_LOADING_TODAYS_EVENTS`;
export const REQUEST_TEAMS = `${NAMESPACE}/REQUEST_TEAMS`;
export const RECEIVE_TEAMS = `${NAMESPACE}/RECEIVE_TEAMS`;
export const ERROR_LOADING_TEAMS = `${NAMESPACE}/ERROR_LOADING_TEAMS`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  earliestLoadedResult: ""
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return uiConfigInitialState;
    case RECEIVE_RECENT_RESULTS:
      return {
        ...state,
        earliestLoadedResult: action.payload.lastVisible
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isRecentResultsLoading: false,
  isTodaysEventsLoading: false,
  isStaffLoading: false,
  isTeamsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_RECENT_RESULTS:
      return {
        ...state,
        isRecentResultsLoading: true
      };
    case RECEIVE_RECENT_RESULTS:
    case ERROR_LOADING_RECENT_RESULTS:
      return {
        ...state,
        isRecentResultsLoading: false
      };
    case REQUEST_TODAYS_EVENTS:
      return {
        ...state,
        isTodaysEventsLoading: true
      };
    case RECEIVE_TODAYS_EVENTS:
    case ERROR_LOADING_TODAYS_EVENTS:
      return {
        ...state,
        isTodaysEventsLoading: false
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
    default:
      return state;
  }
}

function teamsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_TEAMS:
    case SIGN_OUT:
      return {};
    case RECEIVE_TEAMS:
      return action.payload.teams;
    default:
      return state;
  }
}

function todaysEventsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_TODAYS_EVENTS:
    case SIGN_OUT:
      return {};
    case RECEIVE_TODAYS_EVENTS:
      return action.payload.events;
    default:
      return state;
  }
}

export const dashboardReducer = combineReducers({
  uiConfig: uiConfigReducer,
  loadingStatus: loadingStatusReducer,
  teams: teamsReducer,
  todaysEvents: todaysEventsReducer
});

// Selectors

const uiConfig = state => state.dashboard.uiConfig;
const loadingStatus = state => state.dashboard.loadingStatus;
const teams = state => state.dashboard.teams;
const todaysEvents = state => state.dashboard.todaysEvents;

export const selector = createStructuredSelector({
  uiConfig,
  loadingStatus,
  teams,
  todaysEvents
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function requestTodaysEvents() {
  return {
    type: REQUEST_TODAYS_EVENTS
  };
}

export function receiveTodaysEvents(events) {
  return {
    type: RECEIVE_TODAYS_EVENTS,
    payload: {
      events
    }
  };
}

export function loadTodaysEvents(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestTodaysEvents());

    const startOfDay = moment()
      .startOf("day")
      .toDate();
    const endOfDay = moment()
      .endOf("day")
      .toDate();

    let eventsRef = {};
    eventsRef = firebase
      .firestore()
      .collection("events")
      .orderBy("requiredInfo.times.start", "asc")
      .where("institutionID", "==", institutionID)
      .where("requiredInfo.times.start", ">", startOfDay)
      .where("requiredInfo.times.start", "<=", endOfDay);

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receiveTodaysEvents(events));
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
