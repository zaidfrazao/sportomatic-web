// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import {
  ActionAlias,
  DispatchAlias,
  ErrorAlias,
  EventAlias,
  TeamAlias
} from "../../../models/aliases";

// Actions

const NAMESPACE = "sportomatic-web/admin/results";

export const UPDATE_TAB = `${NAMESPACE}/UPDATE_TAB`;
export const REQUEST_TEAMS = `${NAMESPACE}/REQUEST_TEAMS`;
export const RECEIVE_TEAMS = `${NAMESPACE}/RECEIVE_TEAMS`;
export const ERROR_LOADING_TEAMS = `${NAMESPACE}/ERROR_LOADING_TEAMS`;
export const REQUEST_EVENTS = `${NAMESPACE}/REQUEST_EVENTS`;
export const RECEIVE_EVENTS = `${NAMESPACE}/RECEIVE_EVENTS`;
export const ERROR_LOADING_EVENTS = `${NAMESPACE}/ERROR_LOADING_EVENTS`;

// Reducers

export const uiConfigInitialState = {
  currentTab: "IN_PROGRESS"
};

function uiConfigReducer(
  state = uiConfigInitialState,
  action: ActionAlias = {}
) {
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

function teamsReducer(state = {}, action: ActionAlias = {}) {
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

function loadingStatusReducer(
  state = loadingStatusInitialState,
  action: ActionAlias = {}
) {
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

function eventsReducer(state = {}, action: ActionAlias = {}) {
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

const uiConfig = state => state.institution.results.uiConfig;
const teams = state => state.institution.results.teams;
const loadingStatus = state => state.institution.results.loadingStatus;
const events = state => state.institution.results.events;

export const selector = createStructuredSelector({
  uiConfig,
  teams,
  loadingStatus,
  events
});

// Action Creators

export function updateTab(
  newTab: "IN_PROGRESS" | "AWAITING_APPROVAL" | "HISTORY"
) {
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

export function receiveTeams(teams: { [teamID: string]: TeamAlias }) {
  return {
    type: RECEIVE_TEAMS,
    payload: {
      teams
    }
  };
}

export function errorLoadingTeams(error: ErrorAlias) {
  return {
    type: ERROR_LOADING_TEAMS,
    payload: {
      error
    }
  };
}

export function loadTeams(institutionID: string) {
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

export function requestEvents() {
  return {
    type: REQUEST_EVENTS
  };
}

export function receiveEvents(events: {
  [year: number]: { [month: number]: { [eventID: string]: EventAlias } }
}) {
  return {
    type: RECEIVE_EVENTS,
    payload: {
      events
    }
  };
}

export function errorLoadingEvents(error: ErrorAlias) {
  return {
    type: ERROR_LOADING_EVENTS,
    payload: {
      error
    }
  };
}

export function loadEvents(institutionID: string) {
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
