/* eslint-disable array-callback-return */
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/results";

export const UPDATE_TAB = `${NAMESPACE}/UPDATE_TAB`;
export const REQUEST_TEAMS = `${NAMESPACE}/REQUEST_TEAMS`;
export const RECEIVE_TEAMS = `${NAMESPACE}/RECEIVE_TEAMS`;
export const ERROR_LOADING_TEAMS = `${NAMESPACE}/ERROR_LOADING_TEAMS`;
export const REQUEST_STAFF = `${NAMESPACE}/REQUEST_STAFF`;
export const RECEIVE_STAFF = `${NAMESPACE}/RECEIVE_STAFF`;
export const ERROR_LOADING_STAFF = `${NAMESPACE}/ERROR_LOADING_STAFF`;
export const REQUEST_EVENTS_BY_DATE = `${NAMESPACE}/REQUEST_EVENTS_BY_DATE`;
export const RECEIVE_EVENTS_BY_DATE = `${NAMESPACE}/RECEIVE_EVENTS_BY_DATE`;
export const ERROR_LOADING_EVENTS_BY_DATE = `${NAMESPACE}/ERROR_LOADING_EVENTS_BY_DATE`;
export const REQUEST_EVENTS_BY_TEAM = `${NAMESPACE}/REQUEST_EVENTS_BY_TEAM`;
export const RECEIVE_EVENTS_BY_TEAM = `${NAMESPACE}/RECEIVE_EVENTS_BY_TEAM`;
export const ERROR_LOADING_EVENTS_BY_TEAM = `${NAMESPACE}/ERROR_LOADING_EVENTS_BY_TEAM`;
export const REQUEST_START_LOGGING = `${NAMESPACE}/REQUEST_START_LOGGING`;
export const RECEIVE_START_LOGGING = `${NAMESPACE}/RECEIVE_START_LOGGING`;
export const ERROR_STARTING_LOGGING = `${NAMESPACE}/ERROR_STARTING_LOGGING`;
export const REQUEST_FINALISE_RESULTS = `${NAMESPACE}/REQUEST_FINALISE_RESULTS`;
export const RECEIVE_FINALISE_RESULTS = `${NAMESPACE}/RECEIVE_FINALISE_RESULTS`;
export const ERROR_FINALISING_RESULTS = `${NAMESPACE}/ERROR_FINALISING_RESULTS`;
export const REQUEST_EDIT_RESULT = `${NAMESPACE}/REQUEST_EDIT_RESULT`;
export const RECEIVE_EDIT_RESULT = `${NAMESPACE}/RECEIVE_EDIT_RESULT`;
export const ERROR_EDITTING_RESULT = `${NAMESPACE}/ERROR_EDITTING_RESULT`;
export const REQUEST_INSTITUTION_EMBLEM = `${NAMESPACE}/REQUEST_INSTITUTION_EMBLEM`;
export const RECEIVE_INSTITUTION_EMBLEM = `${NAMESPACE}/RECEIVE_INSTITUTION_EMBLEM`;
export const ERROR_FETCHING_INSTITUTION_EMBLEM = `${NAMESPACE}/ERROR_FETCHING_INSTITUTION_EMBLEM`;
export const APPLY_FILTERS = `${NAMESPACE}/APPLY_FILTERS`;
export const UPDATE_SEARCH = `${NAMESPACE}/UPDATE_SEARCH`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentTab: "OVERVIEW",
  lastVisible: "",
  institutionEmblemURL: ""
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
    case RECEIVE_INSTITUTION_EMBLEM:
      return {
        ...state,
        institutionEmblemURL: action.payload.emblemURL
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

export const loadingStatusInitialState = {
  isTeamsLoading: false,
  isStaffLoading: false,
  isEventsByDateLoading: false,
  isEventsByTeamLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
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
    case REQUEST_STAFF:
      return {
        ...state,
        isStaffLoading: true
      };
    case RECEIVE_STAFF:
    case ERROR_LOADING_STAFF:
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
    case REQUEST_EVENTS_BY_TEAM:
      return {
        ...state,
        isEventsByTeamLoading: true
      };
    case ERROR_LOADING_EVENTS_BY_TEAM:
    case RECEIVE_EVENTS_BY_TEAM:
      return {
        ...state,
        isEventsByTeamLoading: false
      };
    default:
      return state;
  }
}

function eventsByDateReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_EVENTS_BY_DATE:
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

function eventsByTeamReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_EVENTS_BY_TEAM:
    case SIGN_OUT:
      return {};
    case RECEIVE_EVENTS_BY_TEAM:
      return action.payload.events;
    default:
      return state;
  }
}

export const filtersInitialState = {
  gender: "All",
  sport: "All",
  division: "All",
  ageGroup: "All",
  searchText: "",
  showDeletedTeams: false
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

export const resultsReducer = combineReducers({
  uiConfig: uiConfigReducer,
  teams: teamsReducer,
  staff: staffReducer,
  loadingStatus: loadingStatusReducer,
  eventsByDate: eventsByDateReducer,
  eventsByTeam: eventsByTeamReducer,
  filters: filterReducer
});

// Selectors

const uiConfig = state => state.results.uiConfig;
const teams = state => state.results.teams;
const loadingStatus = state => state.results.loadingStatus;
const eventsByDate = state => state.results.eventsByDate;
const eventsByTeam = state => state.results.eventsByTeam;
const filters = state => state.results.filters;
const staff = state => state.results.staff;

export const selector = createStructuredSelector({
  uiConfig,
  teams,
  loadingStatus,
  eventsByDate,
  eventsByTeam,
  filters,
  staff
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function applyFilters(
  showDeletedTeams,
  gender,
  sport,
  division,
  ageGroup
) {
  return {
    type: APPLY_FILTERS,
    payload: {
      showDeletedTeams,
      gender,
      sport,
      division,
      ageGroup
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

export function requestInstitutionEmblem() {
  return {
    type: REQUEST_INSTITUTION_EMBLEM
  };
}

export function receiveInstitutionEmblem(emblemURL) {
  return {
    type: RECEIVE_INSTITUTION_EMBLEM,
    payload: {
      emblemURL
    }
  };
}

export function errorFetchingInstitutionEmblem(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_FETCHING_INSTITUTION_EMBLEM,
    payload: {
      error
    }
  };
}

export function fetchInstitutionEmblem(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestInstitutionEmblem());

    const institutionRef = firebase
      .firestore()
      .collection("institutions")
      .doc(institutionID);

    return institutionRef.onSnapshot(doc => {
      dispatch(receiveInstitutionEmblem(doc.data().info.emblemURL));
    });
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
        .where("requiredInfo.isCompetitive", "==", true)
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
        .where("requiredInfo.isCompetitive", "==", true)
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

export function requestEventsByTeam() {
  return {
    type: REQUEST_EVENTS_BY_TEAM
  };
}

export function receiveEventsByTeam(events) {
  return {
    type: RECEIVE_EVENTS_BY_TEAM,
    payload: {
      events
    }
  };
}

export function errorLoadingEventsByTeam(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_EVENTS_BY_TEAM,
    payload: {
      error
    }
  };
}

export function loadEventsByTeam(institutionID, teamID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEventsByTeam());

    let eventsRef = firebase
      .firestore()
      .collection("events")
      .where("institutionID", "==", institutionID)
      .where("requiredInfo.isCompetitive", "==", true)
      .where("requiredInfo.status", "==", "ACTIVE")
      .where(`teams.${teamID}.resultsStatus`, "==", "FINALISED");

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receiveEventsByTeam(events));
    });
  };
}

export function requestStartLogging() {
  return {
    type: REQUEST_START_LOGGING
  };
}

export function receiveStartLogging() {
  return {
    type: RECEIVE_START_LOGGING
  };
}

export function errorStartingLogging(error: { code: string, message: string }) {
  return {
    type: ERROR_STARTING_LOGGING,
    payload: {
      error
    }
  };
}

export function startLogging(eventID, teamID, structure, opponentIDs) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestStartLogging());

    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    let updates = {
      [`teams.${teamID}.resultsStatus`]: "AWAITING_FINALISE"
    };

    opponentIDs.map(id => {
      updates[`teams.${teamID}.opponents.${id}.ourScore`] = structure;
      updates[`teams.${teamID}.opponents.${id}.theirScore`] = structure;
    });

    return eventRef
      .update(updates)
      .then(() => dispatch(receiveStartLogging()))
      .catch(error => dispatch(errorStartingLogging(error)));
  };
}

export function requestFinaliseResults() {
  return {
    type: REQUEST_FINALISE_RESULTS
  };
}

export function receiveFinaliseResults() {
  return {
    type: RECEIVE_FINALISE_RESULTS
  };
}

export function errorFinalisingResults(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_FINALISING_RESULTS,
    payload: {
      error
    }
  };
}

export function finaliseResults(eventID, teamID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestFinaliseResults());

    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    return eventRef
      .update({
        [`teams.${teamID}.resultsStatus`]: "FINALISED"
      })
      .then(() => dispatch(receiveFinaliseResults()))
      .catch(error => dispatch(errorFinalisingResults(error)));
  };
}

export function requestEditResult() {
  return {
    type: REQUEST_EDIT_RESULT
  };
}

export function receiveEditResult() {
  return {
    type: RECEIVE_EDIT_RESULT
  };
}

export function errorEdittingResult(error: { code: string, message: string }) {
  return {
    type: ERROR_EDITTING_RESULT,
    payload: {
      error
    }
  };
}

export function editResult(eventID, teamID, opponentID, newResult) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEditResult());

    const db = firebase.firestore();
    const eventRef = db.collection("events").doc(eventID);

    return eventRef
      .update({
        [`teams.${teamID}.opponents.${opponentID}.commentary`]: newResult.commentary,
        [`teams.${teamID}.opponents.${opponentID}.ourScore`]: newResult.ourScore,
        [`teams.${teamID}.opponents.${opponentID}.theirScore`]: newResult.theirScore
      })
      .then(() => dispatch(receiveEditResult()))
      .catch(error => dispatch(errorEdittingResult(error)));
  };
}
