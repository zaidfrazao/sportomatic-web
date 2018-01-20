import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import { TeamAlias } from "../../../models/aliases";

// Actions

const NAMESPACE = "sportomatic-web/admin/people";

export const UPDATE_TAB = `${NAMESPACE}/UPDATE_TAB`;
export const OPEN_DELETE_PERSON_ALERT = `${NAMESPACE}/OPEN_DELETE_PERSON_ALERT`;
export const CLOSE_DELETE_PERSON_ALERT = `${NAMESPACE}/CLOSE_DELETE_PERSON_ALERT`;
export const OPEN_EDIT_PERSON_DIALOG = `${NAMESPACE}/OPEN_EDIT_PERSON_DIALOG`;
export const CLOSE_EDIT_PERSON_DIALOG = `${NAMESPACE}/CLOSE_EDIT_PERSON_DIALOG`;
export const REQUEST_COACHES = `${NAMESPACE}/REQUEST_COACHES`;
export const RECEIVE_COACHES = `${NAMESPACE}/RECEIVE_COACHES`;
export const REQUEST_MANAGERS = `${NAMESPACE}/REQUEST_MANAGERS`;
export const RECEIVE_MANAGERS = `${NAMESPACE}/RECEIVE_MANAGERS`;
export const REQUEST_ADMINS = `${NAMESPACE}/REQUEST_ADMINS`;
export const RECEIVE_ADMINS = `${NAMESPACE}/RECEIVE_ADMINS`;
export const REQUEST_COACH_REQUESTS = `${NAMESPACE}/REQUEST_COACH_REQUESTS`;
export const RECEIVE_COACH_REQUESTS = `${NAMESPACE}/RECEIVE_COACH_REQUESTS`;
export const REQUEST_MANAGER_REQUESTS = `${NAMESPACE}/REQUEST_MANAGER_REQUESTS`;
export const RECEIVE_MANAGER_REQUESTS = `${NAMESPACE}/RECEIVE_MANAGER_REQUESTS`;
export const REQUEST_ADMIN_REQUESTS = `${NAMESPACE}/REQUEST_ADMIN_REQUESTS`;
export const RECEIVE_ADMIN_REQUESTS = `${NAMESPACE}/RECEIVE_ADMIN_REQUESTS`;
export const REQUEST_TEAMS = `${NAMESPACE}/REQUEST_TEAMS`;
export const RECEIVE_TEAMS = `${NAMESPACE}/RECEIVE_TEAMS`;
export const APPLY_FILTERS = `${NAMESPACE}/APPLY_FILTERS`;
export const UPDATE_SEARCH = `${NAMESPACE}/UPDATE_SEARCH`;
export const OPEN_INVITE_PERSON_MODAL = `${NAMESPACE}/OPEN_INVITE_PERSON_MODAL`;
export const CLOSE_INVITE_PERSON_MODAL = `${NAMESPACE}/CLOSE_INVITE_PERSON_MODAL`;
export const REQUEST_INVITEE = `${NAMESPACE}/REQUEST_INVITEE`;
export const RECEIVE_INVITEE = `${NAMESPACE}/RECEIVE_INVITEE`;
export const ERROR_FETCHING_INVITEE_INFO = `${NAMESPACE}/ERROR_FETCHING_INVITEE_INFO`;
export const REQUEST_CREATE_USER = `${NAMESPACE}/REQUEST_CREATE_USER`;
export const RECEIVE_CREATE_USER = `${NAMESPACE}/RECEIVE_CREATE_USER`;
export const ERROR_CREATING_USER = `${NAMESPACE}/ERROR_CREATING_USER`;
export const REQUEST_INVITE_PERSON = `${NAMESPACE}/REQUEST_INVITE_PERSON`;
export const RECEIVE_INVITE_PERSON = `${NAMESPACE}/RECEIVE_INVITE_PERSON`;
export const ERROR_INVITING_PERSON = `${NAMESPACE}/ERROR_INVITING_PERSON`;
export const REQUEST_EDIT_PERSON = `${NAMESPACE}/REQUEST_EDIT_PERSON`;
export const RECEIVE_EDIT_PERSON = `${NAMESPACE}/RECEIVE_EDIT_PERSON`;
export const ERROR_EDITTING_PERSON = `${NAMESPACE}/ERROR_EDITTING_PERSON`;
export const EDIT_ROLES = `${NAMESPACE}/EDIT_ROLES`;

// Reducers

export const uiConfigInitialState = {
  currentTab: "STAFF",
  inviteeID: "",
  inviteeInfo: {}
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_TAB:
      return {
        ...state,
        currentTab: action.payload.newTab
      };
    case RECEIVE_INVITEE:
      return {
        ...state,
        inviteeID: action.payload.id,
        inviteeInfo: action.payload.info
      };
    default:
      return state;
  }
}

export const filtersInitialState = {
  sport: "All",
  type: "All",
  searchText: ""
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

export const dialogsInitialState = {
  isDeletPersonAlertOpen: false,
  isEditPersonDialogOpen: false,
  isInvitePersonModalOpen: false
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
    case RECEIVE_EDIT_PERSON:
    case ERROR_EDITTING_PERSON:
    case CLOSE_EDIT_PERSON_DIALOG:
      return {
        ...state,
        isEditPersonDialogOpen: false
      };
    case OPEN_INVITE_PERSON_MODAL:
      return {
        ...state,
        isInvitePersonModalOpen: true
      };
    case RECEIVE_INVITE_PERSON:
    case ERROR_INVITING_PERSON:
    case RECEIVE_CREATE_USER:
    case ERROR_CREATING_USER:
    case CLOSE_INVITE_PERSON_MODAL:
      return {
        ...state,
        isInvitePersonModalOpen: false
      };
    case EDIT_ROLES:
      return {
        ...state,
        isEditPersonDialogOpen: true,
        isInvitePersonModalOpen: false
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
    case RECEIVE_ADMINS:
      return {
        ...state,
        ...action.payload.admins
      };
    default:
      return state;
  }
}

function requestsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_COACH_REQUESTS:
      return {
        ...state,
        ...action.payload.coaches
      };
    case RECEIVE_MANAGER_REQUESTS:
      return {
        ...state,
        ...action.payload.managers
      };
    case RECEIVE_ADMIN_REQUESTS:
      return {
        ...state,
        ...action.payload.admins
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
  isCoachesLoading: false,
  isManagersLoading: false,
  isAdminsLoading: false,
  isTeamsLoading: false,
  isInviteeLoading: false,
  isEditPersonLoading: false
};

function loadingStatusListReducer(
  state = loadingStatusInitialState,
  action = {}
) {
  switch (action.type) {
    case REQUEST_COACH_REQUESTS:
    case REQUEST_COACHES:
      return {
        ...state,
        isCoachesLoading: true
      };
    case REQUEST_MANAGER_REQUESTS:
    case REQUEST_MANAGERS:
      return {
        ...state,
        isManagersLoading: true
      };
    case REQUEST_ADMIN_REQUESTS:
    case REQUEST_ADMINS:
      return {
        ...state,
        isAdminsLoading: true
      };
    case RECEIVE_COACH_REQUESTS:
    case RECEIVE_COACHES:
      return {
        ...state,
        isCoachesLoading: false
      };
    case RECEIVE_MANAGER_REQUESTS:
    case RECEIVE_MANAGERS:
      return {
        ...state,
        isManagersLoading: false
      };
    case RECEIVE_ADMIN_REQUESTS:
    case RECEIVE_ADMINS:
      return {
        ...state,
        isAdminsLoading: false
      };
    case REQUEST_TEAMS:
      return {
        ...state,
        isTeamsLoading: true
      };
    case RECEIVE_TEAMS:
      return {
        ...state,
        isTeamsLoading: false
      };
    case REQUEST_EDIT_PERSON:
      return {
        ...state,
        isEditPersonLoading: true
      };
    case RECEIVE_EDIT_PERSON:
    case ERROR_EDITTING_PERSON:
      return {
        ...state,
        isEditPersonLoading: false
      };
    case REQUEST_INVITE_PERSON:
    case REQUEST_CREATE_USER:
    case REQUEST_INVITEE:
      return {
        ...state,
        isInviteeLoading: true
      };
    case RECEIVE_INVITE_PERSON:
    case ERROR_INVITING_PERSON:
    case RECEIVE_CREATE_USER:
    case ERROR_CREATING_USER:
    case RECEIVE_INVITEE:
    case ERROR_FETCHING_INVITEE_INFO:
      return {
        ...state,
        isInviteeLoading: false
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
  teams: teamsReducer,
  requests: requestsReducer,
  filters: filterReducer
});

// Selectors

const uiConfig = state => state.institution.people.uiConfig;
const staff = state => state.institution.people.staff;
const requests = state => state.institution.people.requests;
const teams = state => state.institution.people.teams;
const dialogs = state => state.institution.people.dialogs;
const loadingStatus = state => state.institution.people.loadingStatus;
const filters = state => state.institution.people.filters;

export const selector = createStructuredSelector({
  uiConfig,
  staff,
  dialogs,
  loadingStatus,
  teams,
  requests,
  filters
});

// Action Creators

export function editRoles() {
  return {
    type: EDIT_ROLES
  };
}

export function applyFilters(sport, type) {
  return {
    type: APPLY_FILTERS,
    payload: {
      sport,
      type
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

export function openInvitePersonModal() {
  return {
    type: OPEN_INVITE_PERSON_MODAL
  };
}

export function closeInvitePersonModal() {
  return {
    type: CLOSE_INVITE_PERSON_MODAL
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

export function loadCoaches(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCoaches());

    const coachesRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.roles.coach`, "==", "APPROVED");

    return coachesRef.onSnapshot(querySnapshot => {
      let coaches = {};
      querySnapshot.forEach(doc => {
        coaches[doc.id] = doc.data();
      });
      dispatch(receiveCoaches(coaches));
    });
  };
}

export function requestCoachRequests() {
  return {
    type: REQUEST_COACH_REQUESTS
  };
}

export function receiveCoachRequests(coaches) {
  return {
    type: RECEIVE_COACH_REQUESTS,
    payload: {
      coaches
    }
  };
}

export function loadCoachRequests(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCoachRequests());

    const coachesRef = firebase
      .firestore()
      .collection("users")
      .where(
        `institutions.${institutionID}.roles.coach`,
        "==",
        "AWAITING_APPROVAL"
      );

    return coachesRef.onSnapshot(querySnapshot => {
      let coaches = {};
      querySnapshot.forEach(doc => {
        coaches[doc.id] = doc.data();
      });
      dispatch(receiveCoachRequests(coaches));
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

export function loadManagers(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestManagers());

    const managersRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.roles.manager`, "==", "APPROVED");

    return managersRef.onSnapshot(querySnapshot => {
      let managers = {};
      querySnapshot.forEach(doc => {
        managers[doc.id] = doc.data();
      });
      dispatch(receiveManagers(managers));
    });
  };
}

export function requestManagerRequests() {
  return {
    type: REQUEST_MANAGER_REQUESTS
  };
}

export function receiveManagerRequests(managers) {
  return {
    type: RECEIVE_MANAGER_REQUESTS,
    payload: {
      managers
    }
  };
}

export function loadManagerRequests(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestManagerRequests());

    const managersRef = firebase
      .firestore()
      .collection("users")
      .where(
        `institutions.${institutionID}.roles.manager`,
        "==",
        "AWAITING_APPROVAL"
      );

    return managersRef.onSnapshot(querySnapshot => {
      let managers = {};
      querySnapshot.forEach(doc => {
        managers[doc.id] = doc.data();
      });
      dispatch(receiveManagerRequests(managers));
    });
  };
}

export function requestAdmins() {
  return {
    type: REQUEST_ADMINS
  };
}

export function receiveAdmins(admins) {
  return {
    type: RECEIVE_ADMINS,
    payload: {
      admins
    }
  };
}

export function loadAdmins(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAdmins());

    const adminsRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.roles.admin`, "==", "APPROVED");

    return adminsRef.onSnapshot(querySnapshot => {
      let admins = {};
      querySnapshot.forEach(doc => {
        admins[doc.id] = doc.data();
      });
      dispatch(receiveAdmins(admins));
    });
  };
}

export function requestAdminRequests() {
  return {
    type: REQUEST_ADMIN_REQUESTS
  };
}

export function receiveAdminRequests(admins) {
  return {
    type: RECEIVE_ADMIN_REQUESTS,
    payload: {
      admins
    }
  };
}

export function loadAdminRequests(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAdminRequests());

    const adminsRef = firebase
      .firestore()
      .collection("users")
      .where(
        `institutions.${institutionID}.roles.admin`,
        "==",
        "AWAITING_APPROVAL"
      );

    return adminsRef.onSnapshot(querySnapshot => {
      let admins = {};
      querySnapshot.forEach(doc => {
        admins[doc.id] = doc.data();
      });
      dispatch(receiveAdminRequests(admins));
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

export function requestInvitee() {
  return {
    type: REQUEST_INVITEE
  };
}

export function receiveInvitee(id, info) {
  return {
    type: RECEIVE_INVITEE,
    payload: {
      id,
      info
    }
  };
}

export function errorFetchingInviteeInfo(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_FETCHING_INVITEE_INFO,
    payload: {
      error
    }
  };
}

export function fetchInviteeInfo(email) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestInvitee());

    const inviteeRef = firebase
      .firestore()
      .collection("users")
      .where("info.email", "==", email);

    return inviteeRef
      .get()
      .then(querySnapshot => {
        let info = {};
        let id = "";
        querySnapshot.forEach(doc => {
          id = doc.id;
          info = doc.data();
        });
        dispatch(receiveInvitee(id, info));
      })
      .catch(error => dispatch(errorFetchingInviteeInfo(error)));
  };
}

export function requestCreateUser() {
  return {
    type: REQUEST_CREATE_USER
  };
}

export function receiveCreateUser() {
  return {
    type: RECEIVE_CREATE_USER
  };
}

export function errorCreatingUser(error: { code: string, message: string }) {
  return {
    type: ERROR_CREATING_USER,
    payload: {
      error
    }
  };
}

export function createUser(userInfo) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCreateUser());
    const db = firebase.firestore();

    return db
      .collection("users")
      .add(userInfo)
      .then(() => dispatch(receiveCreateUser()))
      .catch(error => dispatch(errorCreatingUser(error)));
  };
}

export function requestInvitePerson() {
  return {
    type: REQUEST_INVITE_PERSON
  };
}

export function receiveInvitePerson() {
  return {
    type: RECEIVE_INVITE_PERSON
  };
}

export function errorInvitingPerson(error: { code: string, message: string }) {
  return {
    type: ERROR_INVITING_PERSON,
    payload: {
      error
    }
  };
}

export function invitePerson(userID, info) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestInvitePerson());
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .set(info)
      .then(() => dispatch(receiveInvitePerson()))
      .catch(error => dispatch(errorInvitingPerson(error)));
  };
}

export function requestEditPerson() {
  return {
    type: REQUEST_EDIT_PERSON
  };
}

export function receiveEditPerson() {
  return {
    type: RECEIVE_EDIT_PERSON
  };
}

export function errorEdittingPerson(error: { code: string, message: string }) {
  return {
    type: ERROR_EDITTING_PERSON,
    payload: {
      error
    }
  };
}

export function editPerson(userID, info) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEditPerson());
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .set(info)
      .then(() => dispatch(receiveEditPerson()))
      .catch(error => dispatch(errorEdittingPerson(error)));
  };
}
