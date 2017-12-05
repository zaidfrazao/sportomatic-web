import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import { TeamAlias } from "../../../models/aliases";
// Actions

export const UPDATE_TAB = "sportomatic-web/admin/people/UPDATE_TAB";
export const OPEN_DELETE_PERSON_ALERT =
  "sportomatic-web/admin/people/OPEN_DELETE_PERSON_ALERT";
export const CLOSE_DELETE_PERSON_ALERT =
  "sportomatic-web/admin/people/CLOSE_DELETE_PERSON_ALERT";
export const OPEN_EDIT_PERSON_DIALOG =
  "sportomatic-web/admin/people/OPEN_EDIT_PERSON_DIALOG";
export const CLOSE_EDIT_PERSON_DIALOG =
  "sportomatic-web/admin/people/CLOSE_EDIT_PERSON_DIALOG";
export const REQUEST_COACHES = "sportomatic-web/admin/people/REQUEST_COACHES";
export const RECEIVE_COACHES = "sportomatic-web/admin/people/RECEIVE_COACHES";
export const ERROR_LOADING_COACHES =
  "sportomatic-web/admin/people/ERROR_LOADING_COACHES";
export const REQUEST_MANAGERS = "sportomatic-web/admin/people/REQUEST_MANAGERS";
export const RECEIVE_MANAGERS = "sportomatic-web/admin/people/RECEIVE_MANAGERS";
export const ERROR_LOADING_MANAGERS =
  "sportomatic-web/admin/people/ERROR_LOADING_MANAGERS";
export const REQUEST_TEAMS = "sportomatic-web/admin/people/REQUEST_TEAMS";
export const RECEIVE_TEAMS = "sportomatic-web/admin/people/RECEIVE_TEAMS";
export const ERROR_LOADING_TEAMS =
  "sportomatic-web/admin/people/ERROR_LOADING_TEAMS";

// Reducers

export const uiConfigInitialState = {
  currentTab: "STAFF"
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

export const dialogsInitialState = {
  isDeletPersonAlertOpen: false,
  isEditPersonDialogOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case OPEN_DELETE_PERSON_ALERT:
      return {
        ...state,
        isDeletPersonAlertOpen: true
      };
    case CLOSE_DELETE_PERSON_ALERT:
      return {
        ...state,
        isDeletPersonAlertOpen: false
      };
    case OPEN_EDIT_PERSON_DIALOG:
      return {
        ...state,
        isEditPersonDialogOpen: true
      };
    case CLOSE_EDIT_PERSON_DIALOG:
      return {
        ...state,
        isEditPersonDialogOpen: false
      };
    default:
      return state;
  }
}

function staffReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_COACHES:
      return {
        ...state,
        ...action.payload.coaches
      };
    case RECEIVE_MANAGERS:
      return {
        ...state,
        ...action.payload.managers
      };
    default:
      return state;
  }
}

function teamsReducer(state = {}, action = {}) {
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

export const loadingStatusInitialState = {
  isStaffLoading: false,
  isTeamsLoading: false
};

function loadingStatusListReducer(
  state = loadingStatusInitialState,
  action = {}
) {
  switch (action.type) {
    case REQUEST_COACHES:
    case REQUEST_MANAGERS:
      return {
        ...state,
        isStaffLoading: true
      };
    case ERROR_LOADING_COACHES:
    case RECEIVE_COACHES:
    case ERROR_LOADING_MANAGERS:
    case RECEIVE_MANAGERS:
      return {
        ...state,
        isStaffLoading: false
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

export const peopleReducer = combineReducers({
  uiConfig: uiConfigReducer,
  staff: staffReducer,
  dialogs: dialogsReducer,
  loadingStatus: loadingStatusListReducer,
  teams: teamsReducer
});

// Selectors

const uiConfig = state => state.institution.people.uiConfig;
const staff = state => state.institution.people.staff;
const teams = state => state.institution.people.teams;
const dialogs = state => state.institution.people.dialogs;
const loadingStatus = state => state.institution.people.loadingStatus;

export const selector = createStructuredSelector({
  uiConfig,
  staff,
  dialogs,
  loadingStatus,
  teams
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

export function openDeletePersonAlert() {
  return {
    type: OPEN_DELETE_PERSON_ALERT
  };
}

export function closeDeletePersonAlert() {
  return {
    type: CLOSE_DELETE_PERSON_ALERT
  };
}

export function openEditPersonDialog() {
  return {
    type: OPEN_EDIT_PERSON_DIALOG
  };
}

export function closeEditPersonDialog() {
  return {
    type: CLOSE_EDIT_PERSON_DIALOG
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

export function receiveTeams(teams: Array<TeamAlias>) {
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
