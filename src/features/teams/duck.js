import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/teams";

export const OPEN_ADD_TEAM_DIALOG = `${NAMESPACE}/OPEN_ADD_TEAM_DIALOG`;
export const CLOSE_ADD_TEAM_DIALOG = `${NAMESPACE}/CLOSE_ADD_TEAM_DIALOG`;
export const OPEN_SEASON_SETUP_DIALOG = `${NAMESPACE}/OPEN_SEASON_SETUP_DIALOG`;
export const CLOSE_SEASON_SETUP_DIALOG = `${NAMESPACE}/CLOSE_SEASON_SETUP_DIALOG`;
export const REQUEST_STAFF = `${NAMESPACE}/REQUEST_STAFF`;
export const RECEIVE_STAFF = `${NAMESPACE}/RECEIVE_STAFF`;
export const ERROR_LOADING_STAFF = `${NAMESPACE}/ERROR_LOADING_STAFF`;
export const REQUEST_ADD_TEAM = `${NAMESPACE}/REQUEST_ADD_TEAM`;
export const RECEIVE_ADD_TEAM = `${NAMESPACE}/RECEIVE_ADD_TEAM`;
export const ERROR_ADDING_TEAM = `${NAMESPACE}/ERROR_ADDING_TEAM`;
export const REQUEST_EDIT_TEAM = `${NAMESPACE}/REQUEST_EDIT_TEAM`;
export const RECEIVE_EDIT_TEAM = `${NAMESPACE}/RECEIVE_EDIT_TEAM`;
export const ERROR_EDITTING_TEAM = `${NAMESPACE}/ERROR_EDITTING_TEAM`;
export const REQUEST_TEAMS = `${NAMESPACE}/REQUEST_TEAMS`;
export const RECEIVE_TEAMS = `${NAMESPACE}/RECEIVE_TEAMS`;
export const ERROR_LOADING_TEAMS = `${NAMESPACE}/ERROR_LOADING_TEAMS`;
export const OPEN_EDIT_TEAM_DIALOG = `${NAMESPACE}/OPEN_EDIT_TEAM_DIALOG`;
export const CLOSE_EDIT_TEAM_DIALOG = `${NAMESPACE}/CLOSE_EDIT_TEAM_DIALOG`;
export const OPEN_DELETE_TEAM_ALERT = `${NAMESPACE}/OPEN_DELETE_TEAM_ALERT`;
export const CLOSE_DELETE_TEAM_ALERT = `${NAMESPACE}/CLOSE_DELETE_TEAM_ALERT`;
export const APPLY_FILTERS = `${NAMESPACE}/APPLY_FILTERS`;
export const UPDATE_SEARCH = `${NAMESPACE}/UPDATE_SEARCH`;
export const OPEN_TEAM_ERROR_ALERT = `${NAMESPACE}/OPEN_TEAM_ERROR_ALERT`;
export const CLOSE_TEAM_ERROR_ALERT = `${NAMESPACE}/CLOSE_TEAM_ERROR_ALERT`;
export const REQUEST_EVENTS_BY_TEAM = `${NAMESPACE}/REQUEST_EVENTS_BY_TEAM`;
export const RECEIVE_EVENTS_BY_TEAM = `${NAMESPACE}/RECEIVE_EVENTS_BY_TEAM`;
export const ERROR_LOADING_EVENTS_BY_TEAM = `${NAMESPACE}/ERROR_LOADING_EVENTS_BY_TEAM`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  errorType: "NONE"
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return uiConfigInitialState;
    case OPEN_TEAM_ERROR_ALERT:
      return {
        ...state,
        errorType: action.payload.errorType
      };
    case ERROR_EDITTING_TEAM:
    case ERROR_ADDING_TEAM:
      return {
        ...state,
        errorType: "LOADING"
      };
    default:
      return state;
  }
}

export const dialogsInitialState = {
  isAddTeamDialogOpen: false,
  isSeasonSetupDialogOpen: false,
  isErrorAddingTeamAlertOpen: false,
  isEditTeamDialogOpen: false,
  isDeleteTeamAlertOpen: false,
  isTeamErrorAlertOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return dialogsInitialState;
    case OPEN_TEAM_ERROR_ALERT:
      return {
        ...state,
        isTeamErrorAlertOpen: true
      };
    case CLOSE_TEAM_ERROR_ALERT:
      return {
        ...state,
        isTeamErrorAlertOpen: false
      };
    case OPEN_SEASON_SETUP_DIALOG:
      return {
        ...state,
        isSeasonSetupDialogOpen: true
      };
    case CLOSE_SEASON_SETUP_DIALOG:
      return {
        ...state,
        isSeasonSetupDialogOpen: false
      };
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
        isTeamErrorAlertOpen: true
      };
    case OPEN_EDIT_TEAM_DIALOG:
      return {
        ...state,
        isEditTeamDialogOpen: true
      };
    case RECEIVE_EDIT_TEAM:
    case CLOSE_EDIT_TEAM_DIALOG:
      return {
        ...state,
        isEditTeamDialogOpen: false
      };
    case ERROR_EDITTING_TEAM:
      return {
        ...state,
        isEditTeamDialogOpen: false,
        isTeamErrorAlertOpen: true
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

export const loadingStatusInitialState = {
  isAddTeamLoading: false,
  isEditTeamLoading: false,
  isTeamsLoading: false,
  isStaffLoading: false,
  isEventsByTeamLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_ADD_TEAM:
      return {
        ...state,
        isAddTeamLoading: true
      };
    case ERROR_ADDING_TEAM:
    case RECEIVE_ADD_TEAM:
      return {
        ...state,
        isAddTeamLoading: false
      };
    case REQUEST_EDIT_TEAM:
      return {
        ...state,
        isEditTeamLoading: true
      };
    case ERROR_EDITTING_TEAM:
    case RECEIVE_EDIT_TEAM:
      return {
        ...state,
        isEditTeamLoading: false
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
    case REQUEST_EVENTS_BY_TEAM:
      return {
        ...state,
        isEventsByTeamLoading: true
      };
    case RECEIVE_EVENTS_BY_TEAM:
    case ERROR_LOADING_EVENTS_BY_TEAM:
      return {
        ...state,
        isEventsByTeamLoading: false
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

function teamsListReducer(state = {}, action = {}) {
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

export const teamsReducer = combineReducers({
  dialogs: dialogsReducer,
  teamsList: teamsListReducer,
  staff: staffReducer,
  loadingStatus: loadingStatusReducer,
  filters: filterReducer,
  uiConfig: uiConfigReducer,
  eventsByTeam: eventsByTeamReducer
});

// Selectors

const dialogs = state => state.teams.dialogs;
const teams = state => state.teams.teamsList;
const staff = state => state.teams.staff;
const loadingStatus = state => state.teams.loadingStatus;
const filters = state => state.teams.filters;
const uiConfig = state => state.teams.uiConfig;
const eventsByTeam = state => state.teams.eventsByTeam;

export const selector = createStructuredSelector({
  dialogs,
  teams,
  staff,
  loadingStatus,
  filters,
  uiConfig,
  eventsByTeam
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function openTeamErrorAlert(errorType) {
  return {
    type: OPEN_TEAM_ERROR_ALERT,
    payload: {
      errorType
    }
  };
}

export function closeTeamErrorAlert() {
  return {
    type: CLOSE_TEAM_ERROR_ALERT
  };
}

export function openSeasonSetupDialog() {
  return {
    type: OPEN_SEASON_SETUP_DIALOG
  };
}

export function closeSeasonSetupDialog() {
  return {
    type: CLOSE_SEASON_SETUP_DIALOG
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

export function openEditTeamDialog() {
  return {
    type: OPEN_EDIT_TEAM_DIALOG
  };
}

export function closeEditTeamDialog() {
  return {
    type: CLOSE_EDIT_TEAM_DIALOG
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

export function addTeam(
  institutionID,
  ageGroup,
  division,
  gender,
  sport,
  name
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAddTeam());
    const db = firebase.firestore();

    return db
      .collection("teams")
      .add({
        institutionID,
        info: {
          ageGroup,
          division,
          gender,
          sport,
          name
        },
        coaches: {},
        managers: {},
        seasons: {},
        status: "ACTIVE"
      })
      .then(() => dispatch(receiveAddTeam()))
      .catch(error => dispatch(errorAddingTeam(error)));
  };
}

export function requestEditTeam() {
  return {
    type: REQUEST_EDIT_TEAM
  };
}

export function receiveEditTeam() {
  return {
    type: RECEIVE_EDIT_TEAM
  };
}

export function errorEdittingTeam(error: { code: string, message: string }) {
  return {
    type: ERROR_EDITTING_TEAM,
    payload: {
      error
    }
  };
}

export function editTeam(institutionID, teamID, info, managers, coaches) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEditTeam());
    const db = firebase.firestore();
    const teamRef = db.collection("teams").doc(teamID);

    return teamRef
      .set({
        coaches,
        info,
        institutionID,
        managers
      })
      .then(() => dispatch(receiveEditTeam()))
      .catch(error => dispatch(errorEdittingTeam(error)));
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
      .where("requiredInfo.status", "==", "ACTIVE")
      .where(`teams.${teamID}.status`, "==", "ACTIVE");

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receiveEventsByTeam(events));
    });
  };
}
