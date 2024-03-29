import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import moment from "moment";

// Actions

const NAMESPACE = "sportomatic-web/dashboard";

export const TOGGLE_SIDE_MENU = `${NAMESPACE}/TOGGLE_SIDE_MENU`;
export const REQUEST_SWITCH_INSTITUTION = `${NAMESPACE}/REQUEST_SWITCH_INSTITUTION`;
export const RECEIVE_SWITCH_INSTITUTION = `${NAMESPACE}/RECEIVE_SWITCH_INSTITUTION`;
export const ERROR_SWITCHING_INSTITUTION = `${NAMESPACE}/ERROR_SWITCHING_INSTITUTION`;
export const REQUEST_SWITCH_ROLE = `${NAMESPACE}/REQUEST_SWITCH_ROLE`;
export const RECEIVE_SWITCH_ROLE = `${NAMESPACE}/RECEIVE_SWITCH_ROLE`;
export const ERROR_SWITCHING_ROLE = `${NAMESPACE}/ERROR_SWITCHING_ROLE`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;
export const OPEN_UPDATES_DIALOG = `${NAMESPACE}/OPEN_UPDATES_DIALOG`;
export const CLOSE_UPDATES_DIALOG = `${NAMESPACE}/CLOSE_UPDATES_DIALOG`;
export const REQUEST_UPCOMING_EVENTS = `${NAMESPACE}/REQUEST_UPCOMING_EVENTS`;
export const RECEIVE_UPCOMING_EVENTS = `${NAMESPACE}/RECEIVE_UPCOMING_EVENTS`;
export const ERROR_LOADING_UPCOMING_EVENTS = `${NAMESPACE}/ERROR_LOADING_UPCOMING_EVENTS`;
export const REQUEST_PAST_EVENTS = `${NAMESPACE}/REQUEST_PAST_EVENTS`;
export const RECEIVE_PAST_EVENTS = `${NAMESPACE}/RECEIVE_PAST_EVENTS`;
export const ERROR_LOADING_PAST_EVENTS = `${NAMESPACE}/ERROR_LOADING_PAST_EVENTS`;
export const REQUEST_RECENT_WAGES = `${NAMESPACE}/REQUEST_RECENT_WAGES`;
export const RECEIVE_RECENT_WAGES = `${NAMESPACE}/RECEIVE_RECENT_WAGES`;
export const ERROR_LOADING_RECENT_WAGES = `${NAMESPACE}/ERROR_LOADING_RECENT_WAGES`;
export const REQUEST_STAFF = `${NAMESPACE}/REQUEST_STAFF`;
export const RECEIVE_STAFF = `${NAMESPACE}/RECEIVE_STAFF`;
export const ERROR_LOADING_STAFF = `${NAMESPACE}/ERROR_LOADING_STAFF`;
export const REQUEST_TEAMS = `${NAMESPACE}/REQUEST_TEAMS`;
export const RECEIVE_TEAMS = `${NAMESPACE}/RECEIVE_TEAMS`;
export const ERROR_LOADING_TEAMS = `${NAMESPACE}/ERROR_LOADING_TEAMS`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  appBarTitle: "Dashboard",
  bottomNavValue: "dashboard",
  isSideMenuOpen: false,
  earliestLoadedEvent: "",
  latestLoadedEvent: ""
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return uiConfigInitialState;
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        isSideMenuOpen: !state.isSideMenuOpen
      };
    case RECEIVE_PAST_EVENTS:
      return {
        ...state,
        earliestLoadedEvent: action.payload.lastVisible
      };
    case RECEIVE_UPCOMING_EVENTS:
      return {
        ...state,
        latestLoadedEvent: action.payload.lastVisible
      };
    default:
      return state;
  }
}

export const dialogsInitialState = {
  isUpdatesDialogOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return dialogsInitialState;
    case OPEN_UPDATES_DIALOG:
      return {
        ...state,
        isUpdatesDialogOpen: true
      };
    case CLOSE_UPDATES_DIALOG:
      return {
        ...state,
        isUpdatesDialogOpen: false
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isUpcomingEventsLoading: false,
  isPastEventsLoading: false,
  isRecentWagesLoading: false,
  isStaffLoading: false,
  isTeamsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return dialogsInitialState;
    case REQUEST_PAST_EVENTS:
      return {
        ...state,
        isPastEventsLoading: true
      };
    case RECEIVE_PAST_EVENTS:
    case ERROR_LOADING_PAST_EVENTS:
      return {
        ...state,
        isPastEventsLoading: false
      };
    case REQUEST_UPCOMING_EVENTS:
      return {
        ...state,
        isUpcomingEventsLoading: true
      };
    case RECEIVE_UPCOMING_EVENTS:
    case ERROR_LOADING_UPCOMING_EVENTS:
      return {
        ...state,
        isUpcomingEventsLoading: false
      };
    case REQUEST_RECENT_WAGES:
      return {
        ...state,
        isRecentWagesLoading: true
      };
    case RECEIVE_RECENT_WAGES:
    case ERROR_LOADING_RECENT_WAGES:
      return {
        ...state,
        isRecentWagesLoading: false
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

function recentWagesReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_RECENT_WAGES:
    case SIGN_OUT:
      return {};
    case RECEIVE_RECENT_WAGES:
      return action.payload.wages;
    default:
      return state;
  }
}

function upcomingEventsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_UPCOMING_EVENTS:
    case SIGN_OUT:
      return {};
    case RECEIVE_UPCOMING_EVENTS:
      return action.payload.events;
    default:
      return state;
  }
}

function pastEventsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_PAST_EVENTS:
    case SIGN_OUT:
      return {};
    case RECEIVE_PAST_EVENTS:
      return action.payload.events;
    default:
      return state;
  }
}

export const dashboardReducer = combineReducers({
  uiConfig: uiConfigReducer,
  dialogs: dialogsReducer,
  loadingStatus: loadingStatusReducer,
  recentWages: recentWagesReducer,
  staff: staffReducer,
  teams: teamsReducer,
  upcomingEvents: upcomingEventsReducer,
  pastEvents: pastEventsReducer
});

// Selectors

const uiConfig = state => state.dashboard.uiConfig;
const dialogs = state => state.dashboard.dialogs;
const loadingStatus = state => state.dashboard.loadingStatus;
const staff = state => state.dashboard.staff;
const teams = state => state.dashboard.teams;
const recentWages = state => state.dashboard.recentWages;
const upcomingEvents = state => state.dashboard.upcomingEvents;
const pastEvents = state => state.dashboard.pastEvents;

export const selector = createStructuredSelector({
  uiConfig,
  dialogs,
  loadingStatus,
  staff,
  teams,
  recentWages,
  upcomingEvents,
  pastEvents
});

// Action Creators

export function openUpdatesDialog() {
  return {
    type: OPEN_UPDATES_DIALOG
  };
}

export function closeUpdatesDialog() {
  return {
    type: CLOSE_UPDATES_DIALOG
  };
}

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}

export function createInstitution(info) {
  return function(dispatch: DispatchAlias) {
    const db = firebase.firestore();

    return db.collection("institutions").add(info);
  };
}

export function requestSwitchInstitution() {
  return {
    type: REQUEST_SWITCH_INSTITUTION
  };
}

export function receiveSwitchInstitution() {
  return {
    type: RECEIVE_SWITCH_INSTITUTION
  };
}

export function errorSwitchingInstitution(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_SWITCHING_INSTITUTION,
    payload: {
      error
    }
  };
}

export function switchInstitution(userID, institutionID, role) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSwitchInstitution());

    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .update({
        lastAccessed: {
          institutionID,
          role
        }
      })
      .then(() => dispatch(receiveSwitchInstitution()))
      .catch(error => dispatch(errorSwitchingInstitution(error)));
  };
}

export function requestSwitchRole() {
  return {
    type: REQUEST_SWITCH_ROLE
  };
}

export function receiveSwitchRole() {
  return {
    type: RECEIVE_SWITCH_ROLE
  };
}

export function errorSwitchingRole(error: { code: string, message: string }) {
  return {
    type: ERROR_SWITCHING_ROLE,
    payload: {
      error
    }
  };
}

export function switchRole(userID, role) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSwitchInstitution());

    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .update({
        "lastAccessed.role": role
      })
      .then(() => dispatch(receiveSwitchInstitution()))
      .catch(error => dispatch(errorSwitchingInstitution(error)));
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

    const coachesRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.status`, "==", "STAFF");

    return coachesRef.onSnapshot(querySnapshot => {
      let staff = {};
      querySnapshot.forEach(doc => {
        staff[doc.id] = doc.data();
      });
      dispatch(receiveStaff(staff));
    });
  };
}

export function requestRecentWages() {
  return {
    type: REQUEST_RECENT_WAGES
  };
}

export function receiveRecentWages(wages) {
  return {
    type: RECEIVE_RECENT_WAGES,
    payload: {
      wages
    }
  };
}

export function errorLoadingRecentWages(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_RECENT_WAGES,
    payload: {
      error
    }
  };
}

export function loadRecentWages(institutionID, coachID = "") {
  return function(dispatch: DispatchAlias) {
    dispatch(requestRecentWages());

    let wagesRef = {};
    if (coachID === "") {
      wagesRef = firebase
        .firestore()
        .collection("wages")
        .orderBy("date", "desc")
        .limit(5)
        .where("institutionID", "==", institutionID)
        .where("date", "<", moment().toDate());
    } else {
      wagesRef = firebase
        .firestore()
        .collection("wages")
        .orderBy("date", "desc")
        .limit(5)
        .where("institutionID", "==", institutionID)
        .where("coachID", "==", coachID)
        .where("date", "<", moment().toDate());
    }

    return wagesRef.onSnapshot(querySnapshot => {
      let wages = {};
      querySnapshot.forEach(doc => {
        wages[doc.id] = doc.data();
      });
      dispatch(receiveRecentWages(wages));
    });
  };
}

export function requestPastEvents() {
  return {
    type: REQUEST_PAST_EVENTS
  };
}

export function receivePastEvents(events) {
  return {
    type: RECEIVE_PAST_EVENTS,
    payload: {
      events
    }
  };
}

export function errorLoadingPastEvents(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_PAST_EVENTS,
    payload: {
      error
    }
  };
}

export function loadPastEvents(institutionID, userID = "", role = "admin") {
  return function(dispatch: DispatchAlias) {
    dispatch(requestPastEvents());

    let eventsRef = {};
    eventsRef = firebase
      .firestore()
      .collection("events")
      .orderBy("requiredInfo.times.start", "desc")
      .limit(20)
      .where("institutionID", "==", institutionID)
      .where("requiredInfo.times.start", "<", moment().toDate());

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receivePastEvents(events));
    });
  };
}

export function requestUpcomingEvents() {
  return {
    type: REQUEST_UPCOMING_EVENTS
  };
}

export function receiveUpcomingEvents(events) {
  return {
    type: RECEIVE_UPCOMING_EVENTS,
    payload: {
      events
    }
  };
}

export function errorLoadingUpcomingEvents(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_UPCOMING_EVENTS,
    payload: {
      error
    }
  };
}

export function loadUpcomingEvents(institutionID, userID = "", role = "admin") {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUpcomingEvents());

    let eventsRef = {};
    eventsRef = firebase
      .firestore()
      .collection("events")
      .orderBy("requiredInfo.times.start", "asc")
      .limit(20)
      .where("institutionID", "==", institutionID)
      .where("requiredInfo.times.start", ">", moment().toDate());

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receiveUpcomingEvents(events));
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
