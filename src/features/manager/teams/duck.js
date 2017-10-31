import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import _ from "lodash";

// Actions

export const REQUEST_STAFF = "sportomatic-web/manager/teams/REQUEST_STAFF";
export const RECEIVE_STAFF = "sportomatic-web/manager/teams/RECEIVE_STAFF";
export const ERROR_LOADING_STAFF =
  "sportomatic-web/manager/teams/ERROR_LOADING_STAFF";
export const REQUEST_OPTIONS = "sportomatic-web/manager/teams/REQUEST_OPTIONS";
export const RECEIVE_OPTIONS = "sportomatic-web/manager/teams/RECEIVE_OPTIONS";
export const ERROR_LOADING_OPTIONS =
  "sportomatic-web/manager/teams/ERROR_LOADING_OPTIONS";
export const REQUEST_TEAMS = "sportomatic-web/manager/teams/REQUEST_TEAMS";
export const RECEIVE_TEAMS = "sportomatic-web/manager/teams/RECEIVE_TEAMS";
export const ERROR_LOADING_TEAMS =
  "sportomatic-web/manager/teams/ERROR_LOADING_TEAMS";
export const OPEN_EDIT_TEAM_ALERT =
  "sportomatic-web/manager/teams/OPEN_EDIT_TEAM_ALERT";
export const CLOSE_EDIT_TEAM_ALERT =
  "sportomatic-web/manager/teams/CLOSE_EDIT_TEAM_ALERT";

// Reducers

export const dialogsInitialState = {
  isEditTeamAlertOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case OPEN_EDIT_TEAM_ALERT:
      return {
        ...state,
        isEditTeamAlertOpen: true
      };
    case CLOSE_EDIT_TEAM_ALERT:
      return {
        ...state,
        isEditTeamAlertOpen: false
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isTeamsLoading: false
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
  dialogs: dialogsReducer,
  teamsList: teamsListReducer,
  coaches: coachesReducer,
  managers: managersReducer,
  loadingStatus: loadingStatusReducer
});

// Selectors

const dialogs = state => state.manager.teams.dialogs;
const teams = state => state.manager.teams.teamsList;
const coaches = state => state.manager.teams.coaches;
const managers = state => state.manager.teams.managers;
const loadingStatus = state => state.manager.teams.loadingStatus;

export const selector = createStructuredSelector({
  dialogs,
  teams,
  coaches,
  managers,
  loadingStatus
});

// Action Creators

export function openEditTeamAlert() {
  return {
    type: OPEN_EDIT_TEAM_ALERT
  };
}

export function closeEditTeamAlert() {
  return {
    type: CLOSE_EDIT_TEAM_ALERT
  };
}

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

export function requestOptions() {
  return {
    type: REQUEST_OPTIONS
  };
}

export function receiveOptions(institutionInfo) {
  const ageGroups = _.fromPairs(
    institutionInfo.metadata.ageGroups.map(ageGroup => {
      if (typeof ageGroup === "number") {
        return [ageGroup, `U/${ageGroup}`];
      } else {
        return [ageGroup, ageGroup];
      }
    })
  );
  const divisions = _.fromPairs(
    institutionInfo.metadata.divisions.map(division => [division, division])
  );
  const sports = _.fromPairs(
    _.toPairs(institutionInfo.sportsOffered).map(keyValuePair => [
      keyValuePair[0],
      keyValuePair[1].name
    ])
  );
  const genderType = institutionInfo.metadata.gender;

  return {
    type: RECEIVE_OPTIONS,
    payload: {
      ageGroups,
      divisions,
      sports,
      genderType
    }
  };
}

export function errorLoadingOptions(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_OPTIONS,
    payload: {
      error
    }
  };
}

export function loadOptions(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestOptions());
    const institutionInfoRef = firebase
      .database()
      .ref(`institution/${institutionID}/public`);

    return institutionInfoRef.on("value", snapshot => {
      const institutionInfo = snapshot.val();
      dispatch(receiveOptions(institutionInfo));
    });
  };
}
