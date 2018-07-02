/* eslint-disable array-callback-return */
import _ from "lodash";
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
export const REQUEST_INCOMPLETE_EVENTS = `${NAMESPACE}/REQUEST_INCOMPLETE_EVENTS`;
export const RECEIVE_INCOMPLETE_EVENTS = `${NAMESPACE}/RECEIVE_INCOMPLETE_EVENTS`;
export const ERROR_LOADING_INCOMPLETE_EVENTS = `${NAMESPACE}/ERROR_LOADING_INCOMPLETE_EVENTS`;
export const REQUEST_TEAMS = `${NAMESPACE}/REQUEST_TEAMS`;
export const RECEIVE_TEAMS = `${NAMESPACE}/RECEIVE_TEAMS`;
export const ERROR_LOADING_TEAMS = `${NAMESPACE}/ERROR_LOADING_TEAMS`;
export const REQUEST_NOTIFICATIONS = `${NAMESPACE}/REQUEST_READ_NOTIFICATIONS`;
export const RECEIVE_NOTIFICATIONS = `${NAMESPACE}/RECEIVE_READ_NOTIFICATIONS`;
export const REQUEST_MARK_NOTIFICATION_READ = `${NAMESPACE}/REQUEST_MARK_NOTIFICATION_READ`;
export const RECEIVE_MARK_NOTIFICATION_READ = `${NAMESPACE}/RECEIVE_MARK_NOTIFICATION_READ`;
export const ERROR_MARKING_NOTIFICATION_READ = `${NAMESPACE}/ERROR_MARKING_NOTIFICATION_READ`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  earliestLoadedResult: undefined,
  isLastResult: false
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return uiConfigInitialState;
    case RECEIVE_RECENT_RESULTS:
      return {
        ...state,
        earliestLoadedResult: action.payload.lastVisible,
        isLastResult: action.payload.lastVisible === undefined
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isRecentResultsLoading: false,
  isTodaysEventsLoading: false,
  isIncompleteEventsLoading: false,
  isTeamsLoading: false,
  isNotificationsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_NOTIFICATIONS:
      return {
        ...state,
        isNotificationsLoading: true
      };
    case RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        isNotificationsLoading: false
      };
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
    case REQUEST_INCOMPLETE_EVENTS:
      return {
        ...state,
        isIncompleteEventsLoading: true
      };
    case RECEIVE_INCOMPLETE_EVENTS:
    case ERROR_LOADING_INCOMPLETE_EVENTS:
      return {
        ...state,
        isIncompleteEventsLoading: false
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

function recentResultsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return {};
    case RECEIVE_RECENT_RESULTS:
      return {
        ...state,
        ...action.payload.events
      };
    default:
      return state;
  }
}

function incompleteEventsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_INCOMPLETE_EVENTS:
    case SIGN_OUT:
      return {};
    case RECEIVE_INCOMPLETE_EVENTS:
      return action.payload.events;
    default:
      return state;
  }
}

function notificationsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_NOTIFICATIONS:
    case SIGN_OUT:
      return {};
    case RECEIVE_NOTIFICATIONS:
      return action.payload.notifications;
    default:
      return state;
  }
}

export const dashboardReducer = combineReducers({
  uiConfig: uiConfigReducer,
  loadingStatus: loadingStatusReducer,
  teams: teamsReducer,
  todaysEvents: todaysEventsReducer,
  recentResults: recentResultsReducer,
  incompleteEvents: incompleteEventsReducer,
  notifications: notificationsReducer
});

// Selectors

const uiConfig = state => state.dashboard.uiConfig;
const loadingStatus = state => state.dashboard.loadingStatus;
const teams = state => state.dashboard.teams;
const todaysEvents = state => state.dashboard.todaysEvents;
const recentResults = state => state.dashboard.recentResults;
const incompleteEvents = state => state.dashboard.incompleteEvents;
const notifications = state => state.dashboard.notifications;

export const selector = createStructuredSelector({
  uiConfig,
  loadingStatus,
  teams,
  todaysEvents,
  recentResults,
  incompleteEvents,
  notifications
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

export function requestRecentResults() {
  return {
    type: REQUEST_RECENT_RESULTS
  };
}

function checkIfResultsLogged(eventTeams) {
  let isResultsLogged = true;

  _.toPairs(eventTeams).map(([teamID, teamInfo]) => {
    isResultsLogged = isResultsLogged && teamInfo.resultsStatus === "FINALISED";
  });

  return isResultsLogged;
}

export function receiveRecentResults(events, lastVisible) {
  const confirmedResults = _.fromPairs(
    _.toPairs(events).filter(([eventID, eventInfo]) => {
      if (eventInfo.requiredInfo.status !== "ACTIVE") {
        return false;
      }
      return checkIfResultsLogged(eventInfo.teams);
    })
  );

  return {
    type: RECEIVE_RECENT_RESULTS,
    payload: {
      lastVisible,
      events: confirmedResults
    }
  };
}

export function loadRecentResults(institutionID, lastVisible) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestRecentResults());

    if (lastVisible) {
      let eventsRef = {};
      eventsRef = firebase
        .firestore()
        .collection("events")
        .orderBy("requiredInfo.times.start", "desc")
        .where("institutionID", "==", institutionID)
        .where("requiredInfo.isCompetitive", "==", true)
        .where("requiredInfo.status", "==", "ACTIVE")
        .startAfter(lastVisible)
        .limit(20);

      return eventsRef.onSnapshot(querySnapshot => {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        let events = {};
        querySnapshot.forEach(doc => {
          events[doc.id] = doc.data();
        });
        dispatch(receiveRecentResults(events, lastVisible));
      });
    } else {
      const startsAt = moment()
        .endOf("day")
        .toDate();

      let eventsRef = {};
      eventsRef = firebase
        .firestore()
        .collection("events")
        .orderBy("requiredInfo.times.start", "desc")
        .where("institutionID", "==", institutionID)
        .where("requiredInfo.times.start", "<=", startsAt)
        .where("requiredInfo.isCompetitive", "==", true)
        .where("requiredInfo.status", "==", "ACTIVE")
        .limit(20);

      return eventsRef.onSnapshot(querySnapshot => {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        let events = {};
        querySnapshot.forEach(doc => {
          events[doc.id] = doc.data();
        });
        dispatch(receiveRecentResults(events, lastVisible));
      });
    }
  };
}

export function requestIncompleteEvents() {
  return {
    type: REQUEST_INCOMPLETE_EVENTS
  };
}

export function receiveIncompleteEvents(events) {
  return {
    type: RECEIVE_INCOMPLETE_EVENTS,
    payload: {
      events
    }
  };
}

export function errorLoadingIncompleteEvents(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_INCOMPLETE_EVENTS,
    payload: {
      error
    }
  };
}

export function loadIncompleteEvents(communityID, userID, isUserAdmin) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestIncompleteEvents());

    const loadIncompleteEvents = firebase
      .functions()
      .httpsCallable("loadIncompleteEvents");

    return loadIncompleteEvents({
      communityID,
      userID,
      isUserAdmin
    })
      .then(result => {
        dispatch(receiveIncompleteEvents(result.data));
      })
      .catch(error => {
        dispatch(errorLoadingIncompleteEvents(error));
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

export function requestNotifications() {
  return {
    type: REQUEST_NOTIFICATIONS
  };
}

export function receiveNotifications(notifications) {
  return {
    type: RECEIVE_NOTIFICATIONS,
    payload: {
      notifications
    }
  };
}

export function loadNotifications(userID, communityID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestNotifications());

    const notificationsRef = firebase
      .firestore()
      .collection("notifications")
      .where("recipient", "==", userID)
      .where("communityID", "==", communityID)
      .orderBy("metadata.creationDate", "desc");

    return notificationsRef.onSnapshot(querySnapshot => {
      let notifications = {};
      querySnapshot.forEach(doc => {
        notifications[doc.id] = doc.data();
      });
      dispatch(receiveNotifications(notifications));
    });
  };
}

export function requestMarkNotificationRead() {
  return {
    type: REQUEST_MARK_NOTIFICATION_READ
  };
}

export function receiveMarkNotificationRead() {
  return {
    type: RECEIVE_MARK_NOTIFICATION_READ
  };
}

export function errorMarkingNotificationRead(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_MARKING_NOTIFICATION_READ,
    payload: {
      error
    }
  };
}

export function markNotificationRead(notificationID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestMarkNotificationRead());
    const db = firebase.firestore();
    const notificationRef = db.collection("notifications").doc(notificationID);

    return notificationRef
      .update({
        "metadata.isRead": true
      })
      .then(() => dispatch(receiveMarkNotificationRead()))
      .catch(error => dispatch(errorMarkingNotificationRead(error)));
  };
}
