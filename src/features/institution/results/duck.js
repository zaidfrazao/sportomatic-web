import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/admin/results";

export const UPDATE_TAB = `${NAMESPACE}/UPDATE_TAB`;
export const REQUEST_TEAMS = `${NAMESPACE}/REQUEST_TEAMS`;
export const RECEIVE_TEAMS = `${NAMESPACE}/RECEIVE_TEAMS`;
export const ERROR_LOADING_TEAMS = `${NAMESPACE}/ERROR_LOADING_TEAMS`;
export const REQUEST_EVENTS_BY_DATE = `${NAMESPACE}/REQUEST_EVENTS_BY_DATE`;
export const RECEIVE_EVENTS_BY_DATE = `${NAMESPACE}/RECEIVE_EVENTS_BY_DATE`;
export const ERROR_LOADING_EVENTS_BY_DATE = `${NAMESPACE}/ERROR_LOADING_EVENTS_BY_DATE`;
export const REQUEST_EVENTS_BY_TEAM = `${NAMESPACE}/REQUEST_EVENTS_BY_TEAM`;
export const RECEIVE_EVENTS_BY_TEAM = `${NAMESPACE}/RECEIVE_EVENTS_BY_TEAM`;
export const ERROR_LOADING_EVENTS_BY_TEAM = `${NAMESPACE}/ERROR_LOADING_EVENTS_BY_TEAM`;
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

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentTab: "OVERVIEW",
  lastVisible: ""
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
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
  isEventsByDateLoading: false,
  isEventsByTeamLoading: false
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

export const resultsReducer = combineReducers({
  uiConfig: uiConfigReducer,
  teams: teamsReducer,
  loadingStatus: loadingStatusReducer,
  eventsByDate: eventsByDateReducer,
  eventsByTeam: eventsByTeamReducer,
  filters: filterReducer
});

// Selectors

const uiConfig = state => state.institution.results.uiConfig;
const teams = state => state.institution.results.teams;
const loadingStatus = state => state.institution.results.loadingStatus;
const eventsByDate = state => state.institution.results.eventsByDate;
const eventsByTeam = state => state.institution.results.eventsByTeam;
const filters = state => state.institution.results.filters;

export const selector = createStructuredSelector({
  uiConfig,
  teams,
  loadingStatus,
  eventsByDate,
  eventsByTeam,
  filters
});

// Action Creators

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
        .limit(5)
        .where("requiredInfo.isCompetitive", "==", true)
        .where("requiredInfo.status", "==", "ACTIVE")
        .where("institutionID", "==", institutionID)
        .where("requiredInfo.times.start", "<", new Date(Date.now()));
    } else {
      eventsRef = firebase
        .firestore()
        .collection("events")
        .orderBy("requiredInfo.times.start", "desc")
        .startAfter(startAfter)
        .limit(5)
        .where("requiredInfo.isCompetitive", "==", true)
        .where("requiredInfo.status", "==", "ACTIVE")
        .where("institutionID", "==", institutionID)
        .where("requiredInfo.times.start", "<", new Date(Date.now()));
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
  signOutTime
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
            overtime: overtimeHours
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
