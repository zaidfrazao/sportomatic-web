// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import _ from "lodash";

// Actions

export const REQUEST_STAFF = "sportomatic-web/coach/teams/REQUEST_STAFF";
export const RECEIVE_STAFF = "sportomatic-web/coach/teams/RECEIVE_STAFF";
export const ERROR_LOADING_STAFF =
  "sportomatic-web/coach/teams/ERROR_LOADING_STAFF";
export const REQUEST_TEAMS = "sportomatic-web/coach/teams/REQUEST_TEAMS";
export const RECEIVE_TEAMS = "sportomatic-web/coach/teams/RECEIVE_TEAMS";
export const ERROR_LOADING_TEAMS =
  "sportomatic-web/coach/teams/ERROR_LOADING_TEAMS";

// Reducers

export const loadingStatusInitialState = {
  isTeamsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case REQUEST_STAFF:
      return {
        ...state,
        isAddTeamDialogLoading: true
      };
    case ERROR_LOADING_STAFF:
    case RECEIVE_STAFF:
      return {
        ...state,
        isAddTeamDialogLoading: false
      };
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
    default:
      return state;
  }
}

function coachesReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_STAFF:
      return action.payload.coaches;
    default:
      return state;
  }
}

function managersReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_STAFF:
      return action.payload.managers;
    default:
      return state;
  }
}

function teamsListReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_TEAMS:
      return action.payload.teams;
    default:
      return state;
  }
}

export const teamsReducer = combineReducers({
  teamsList: teamsListReducer,
  coaches: coachesReducer,
  managers: managersReducer,
  loadingStatus: loadingStatusReducer
});

// Selectors

const teams = state => state.coach.teams.teamsList;
const coaches = state => state.coach.teams.coaches;
const managers = state => state.coach.teams.managers;
const loadingStatus = state => state.coach.teams.loadingStatus;

export const selector = createStructuredSelector({
  teams,
  coaches,
  managers,
  loadingStatus
});

// Action Creators

export function requestStaff() {
  return {
    type: REQUEST_STAFF
  };
}

export function receiveStaff(staff) {
  const managers = _.fromPairs(
    _.toPairs(staff).filter(
      keyValuePairs => keyValuePairs[1].metadata.type === "MANAGER"
    )
  );
  const coaches = _.fromPairs(
    _.toPairs(staff).filter(
      keyValuePairs => keyValuePairs[1].metadata.type === "COACH"
    )
  );
  return {
    type: RECEIVE_STAFF,
    payload: {
      managers,
      coaches
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
      .database()
      .ref(`institution/${institutionID}/private/staff`);

    return staffRef.on("value", snapshot => {
      const staff = snapshot.val();
      if (staff === null) {
        dispatch(receiveStaff({}));
      } else {
        dispatch(receiveStaff(staff));
      }
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
