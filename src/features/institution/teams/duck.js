import _ from "lodash";
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import { SportomaticFirebaseAPI } from "../../../api/sportmatic-firebase-api";

// Actions

export const OPEN_ADD_TEAM_DIALOG =
  "sportomatic-web/admin/teams/OPEN_ADD_TEAM_DIALOG";
export const CLOSE_ADD_TEAM_DIALOG =
  "sportomatic-web/admin/teams/CLOSE_ADD_TEAM_DIALOG";
export const REQUEST_COACHES = "sportomatic-web/admin/teams/REQUEST_COACHES";
export const RECEIVE_COACHES = "sportomatic-web/admin/teams/RECEIVE_COACHES";
export const ERROR_LOADING_COACHES =
  "sportomatic-web/admin/teams/ERROR_LOADING_COACHES";
export const REQUEST_MANAGERS = "sportomatic-web/admin/teams/REQUEST_MANAGERS";
export const RECEIVE_MANAGERS = "sportomatic-web/admin/teams/RECEIVE_MANAGERS";
export const ERROR_LOADING_MANAGERS =
  "sportomatic-web/admin/teams/ERROR_LOADING_MANAGERS";
export const REQUEST_OPTIONS = "sportomatic-web/admin/teams/REQUEST_OPTIONS";
export const RECEIVE_OPTIONS = "sportomatic-web/admin/teams/RECEIVE_OPTIONS";
export const ERROR_LOADING_OPTIONS =
  "sportomatic-web/admin/teams/ERROR_LOADING_OPTIONS";
export const REQUEST_ADD_TEAM = "sportomatic-web/admin/teams/REQUEST_ADD_TEAM";
export const RECEIVE_ADD_TEAM = "sportomatic-web/admin/teams/RECEIVE_ADD_TEAM";
export const ERROR_ADDING_TEAM =
  "sportomatic-web/admin/teams/ERROR_ADDING_TEAM";
export const REQUEST_TEAMS = "sportomatic-web/admin/teams/REQUEST_TEAMS";
export const RECEIVE_TEAMS = "sportomatic-web/admin/teams/RECEIVE_TEAMS";
export const ERROR_LOADING_TEAMS =
  "sportomatic-web/admin/teams/ERROR_LOADING_TEAMS";
export const OPEN_EDIT_TEAM_ALERT =
  "sportomatic-web/admin/teams/OPEN_EDIT_TEAM_ALERT";
export const CLOSE_EDIT_TEAM_ALERT =
  "sportomatic-web/admin/teams/CLOSE_EDIT_TEAM_ALERT";
export const OPEN_DELETE_TEAM_ALERT =
  "sportomatic-web/admin/teams/OPEN_DELETE_TEAM_ALERT";
export const CLOSE_DELETE_TEAM_ALERT =
  "sportomatic-web/admin/teams/CLOSE_DELETE_TEAM_ALERT";

// Reducers

export const dialogsInitialState = {
  isAddTeamDialogOpen: false,
  isErrorAddingTeamAlertOpen: false,
  isEditTeamAlertOpen: false,
  isDeleteTeamAlertOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case OPEN_ADD_TEAM_DIALOG:
      return {
        ...state,
        isAddTeamDialogOpen: true
      };
    case RECEIVE_ADD_TEAM:
    case CLOSE_ADD_TEAM_DIALOG:
      return {
        ...state,
        isAddTeamDialogOpen: false
      };
    case ERROR_ADDING_TEAM:
      return {
        ...state,
        isAddTeamDialogOpen: false,
        isErrorAddingTeamAlertOpen: true
      };
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
    case OPEN_DELETE_TEAM_ALERT:
      return {
        ...state,
        isDeleteTeamAlertOpen: true
      };
    case CLOSE_DELETE_TEAM_ALERT:
      return {
        ...state,
        isDeleteTeamAlertOpen: false
      };
    default:
      return state;
  }
}

export const optionsInitialState = {
  ageGroups: { "12": "U/12" },
  divisions: { A: "A" },
  sports: { "-Kcb7s4Qhl4H4W0sTxA-": "Athletics" },
  genderType: "MIXED"
};

function optionsReducer(state = optionsInitialState, action = {}) {
  switch (action.type) {
    case RECEIVE_OPTIONS:
      return action.payload;
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isAddTeamDialogLoading: false,
  isTeamsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case REQUEST_ADD_TEAM:
    case REQUEST_OPTIONS:
      return {
        ...state,
        isAddTeamDialogLoading: true
      };
    case ERROR_ADDING_TEAM:
    case RECEIVE_ADD_TEAM:
    case ERROR_LOADING_OPTIONS:
    case RECEIVE_OPTIONS:
      return {
        ...state,
        isAddTeamDialogLoading: false
      };
    case REQUEST_COACHES:
    case REQUEST_MANAGERS:
    case REQUEST_TEAMS:
      return {
        ...state,
        isTeamsLoading: true,
        isAddTeamDialogLoading: true
      };
    case RECEIVE_COACHES:
    case ERROR_LOADING_COACHES:
    case RECEIVE_MANAGERS:
    case ERROR_LOADING_MANAGERS:
    case ERROR_LOADING_TEAMS:
    case RECEIVE_TEAMS:
      return {
        ...state,
        isTeamsLoading: false,
        isAddTeamDialogLoading: false
      };
    default:
      return state;
  }
}

function coachesReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_COACHES:
      return {
        ...state,
        ...action.payload.coaches
      };
    default:
      return state;
  }
}

function managersReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_MANAGERS:
      return {
        ...state,
        ...action.payload.managers
      };
    default:
      return state;
  }
}

function teamsListReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_TEAMS:
      return {
        ...state,
        ...action.payload.teams
      };
    default:
      return state;
  }
}

export const teamsReducer = combineReducers({
  dialogs: dialogsReducer,
  teamsList: teamsListReducer,
  options: optionsReducer,
  coaches: coachesReducer,
  managers: managersReducer,
  loadingStatus: loadingStatusReducer
});

// Selectors

const dialogs = state => state.institution.teams.dialogs;
const teams = state => state.institution.teams.teamsList;
const options = state => state.institution.teams.options;
const coaches = state => state.institution.teams.coaches;
const managers = state => state.institution.teams.managers;
const loadingStatus = state => state.institution.teams.loadingStatus;

export const selector = createStructuredSelector({
  dialogs,
  teams,
  options,
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

export function openDeleteTeamAlert() {
  return {
    type: OPEN_DELETE_TEAM_ALERT
  };
}

export function closeDeleteTeamAlert() {
  return {
    type: CLOSE_DELETE_TEAM_ALERT
  };
}

export function openAddTeamDialog() {
  return {
    type: OPEN_ADD_TEAM_DIALOG
  };
}

export function closeAddTeamDialog() {
  return {
    type: CLOSE_ADD_TEAM_DIALOG
  };
}

export function requestCoaches() {
  return {
    type: REQUEST_COACHES
  };
}

export function receiveCoaches(coaches) {
  return {
    type: RECEIVE_COACHES,
    payload: {
      coaches
    }
  };
}

export function errorLoadingCoaches(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_COACHES,
    payload: {
      error
    }
  };
}

export function loadCoaches(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCoaches());

    const coachesRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.coachStatus`, "==", "APPROVED");

    return coachesRef.onSnapshot(querySnapshot => {
      let coaches = {};
      querySnapshot.forEach(doc => {
        coaches[doc.id] = doc.data();
      });
      dispatch(receiveCoaches(coaches));
    });
  };
}

export function requestManagers() {
  return {
    type: REQUEST_MANAGERS
  };
}

export function receiveManagers(managers) {
  return {
    type: RECEIVE_MANAGERS,
    payload: {
      managers
    }
  };
}

export function errorLoadingManagers(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_MANAGERS,
    payload: {
      error
    }
  };
}

export function loadManagers(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestManagers());

    const managersRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.managerStatus`, "==", "APPROVED");

    return managersRef.onSnapshot(querySnapshot => {
      let managers = {};
      querySnapshot.forEach(doc => {
        managers[doc.id] = doc.data();
      });
      dispatch(receiveManagers(managers));
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
    return SportomaticFirebaseAPI.getTeamOptions(institutionID)
      .then(options => {
        dispatch(receiveOptions(options));
      })
      .catch(err => {
        dispatch(errorLoadingOptions(err));
      });
  };
}

export function requestAddTeam() {
  return {
    type: REQUEST_ADD_TEAM
  };
}

export function receiveAddTeam() {
  return {
    type: RECEIVE_ADD_TEAM
  };
}

export function errorAddingTeam(error: { code: string, message: string }) {
  return {
    type: ERROR_ADDING_TEAM,
    payload: {
      error
    }
  };
}

export function addTeam(institutionID, teamInfo, managers, coaches) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAddTeam());
    return SportomaticFirebaseAPI.getNewTeamID(institutionID)
      .then(newTeamID => {
        const newTeamInfo = {
          status: "ACTIVE",
          metadata: { ...teamInfo },
          coaches,
          managers
        };
        const managerUpdates = _.fromPairs(
          _.toPairs(managers).map(([managerID, managerInfo]) => {
            return [
              `manager/${managerID}/private/institutions/${institutionID}/teams/${newTeamID}`,
              newTeamInfo
            ];
          })
        );
        const managerStaffUpdates = _.fromPairs(
          _.toPairs(managers).map(([managerID, managerInfo]) => {
            return [
              `institution/${institutionID}/private/staff/${managerID}/teams/${newTeamID}`,
              {
                status: newTeamInfo.status,
                name: newTeamInfo.metadata.name,
                sport: newTeamInfo.metadata.sport
              }
            ];
          })
        );
        const coachUpdates = _.fromPairs(
          _.toPairs(coaches).map(([coachID, coachInfo]) => {
            return [
              `coach/${coachID}/private/institutions/${institutionID}/teams/${newTeamID}`,
              newTeamInfo
            ];
          })
        );
        const coachStaffUpdates = _.fromPairs(
          _.toPairs(coaches).map(([coachID, coachInfo]) => {
            return [
              `institution/${institutionID}/private/staff/${coachID}/teams/${newTeamID}`,
              {
                status: newTeamInfo.status,
                name: newTeamInfo.metadata.name,
                sport: newTeamInfo.metadata.sport
              }
            ];
          })
        );
        const updates = {
          [`institution/${institutionID}/private/teams/${newTeamID}`]: newTeamInfo,
          ...coachUpdates,
          ...coachStaffUpdates,
          ...managerUpdates,
          ...managerStaffUpdates
        };

        return SportomaticFirebaseAPI.addTeam(updates)
          .then(() => dispatch(receiveAddTeam()))
          .catch(error => dispatch(errorAddingTeam(error)));
      })
      .catch(error => errorAddingTeam(error));
  };
}
