import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import { TeamAlias } from "../../models/aliases";

// Actions

const NAMESPACE = "sportomatic-web/people";

export const UPDATE_TAB = `${NAMESPACE}/UPDATE_TAB`;
export const OPEN_DELETE_PERSON_ALERT = `${NAMESPACE}/OPEN_DELETE_PERSON_ALERT`;
export const CLOSE_DELETE_PERSON_ALERT = `${NAMESPACE}/CLOSE_DELETE_PERSON_ALERT`;
export const OPEN_EDIT_PERSON_DIALOG = `${NAMESPACE}/OPEN_EDIT_PERSON_DIALOG`;
export const CLOSE_EDIT_PERSON_DIALOG = `${NAMESPACE}/CLOSE_EDIT_PERSON_DIALOG`;
export const OPEN_REJECT_PERSON_MODAL = `${NAMESPACE}/OPEN_REJECT_PERSON_MODAL`;
export const CLOSE_REJECT_PERSON_MODAL = `${NAMESPACE}/CLOSE_REJECT_PERSON_MODAL`;
export const OPEN_APPROVE_PERSON_MODAL = `${NAMESPACE}/OPEN_APPROVE_PERSON_MODAL`;
export const CLOSE_APPROVE_PERSON_MODAL = `${NAMESPACE}/CLOSE_APPROVE_PERSON_MODAL`;
export const REQUEST_STAFF = `${NAMESPACE}/REQUEST_STAFF`;
export const RECEIVE_STAFF = `${NAMESPACE}/RECEIVE_STAFF`;
export const REQUEST_STAFF_REQUESTS = `${NAMESPACE}/REQUEST_STAFF_REQUESTS`;
export const RECEIVE_STAFF_REQUESTS = `${NAMESPACE}/RECEIVE_STAFF_REQUESTS`;
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
export const REQUEST_EVENTS_BY_COACH = `${NAMESPACE}/REQUEST_EVENTS_BY_COACH`;
export const RECEIVE_EVENTS_BY_COACH = `${NAMESPACE}/RECEIVE_EVENTS_BY_COACH`;
export const ERROR_LOADING_EVENTS_BY_COACH = `${NAMESPACE}/ERROR_LOADING_EVENTS_BY_COACH`;
export const REQUEST_EVENTS_BY_MANAGER = `${NAMESPACE}/REQUEST_EVENTS_BY_MANAGER`;
export const RECEIVE_EVENTS_BY_MANAGER = `${NAMESPACE}/RECEIVE_EVENTS_BY_MANAGER`;
export const ERROR_LOADING_EVENTS_BY_MANAGER = `${NAMESPACE}/ERROR_LOADING_EVENTS_BY_MANAGER`;
export const REQUEST_REJECT_PERSON = `${NAMESPACE}/REQUEST_REJECT_PERSON`;
export const RECEIVE_REJECT_PERSON = `${NAMESPACE}/RECEIVE_REJECT_PERSON`;
export const ERROR_REJECTING_PERSON = `${NAMESPACE}/ERROR_REJECTING_PERSON`;
export const REQUEST_APPROVE_PERSON = `${NAMESPACE}/REQUEST_APPROVE_PERSON`;
export const RECEIVE_APPROVE_PERSON = `${NAMESPACE}/RECEIVE_APPROVE_PERSON`;
export const ERROR_APPROVING_PERSON = `${NAMESPACE}/ERROR_APPROVING_PERSON`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  currentTab: "STAFF",
  inviteeID: "",
  inviteeInfo: {},
  applicantID: "",
  isCoachApplication: false
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
    case RECEIVE_INVITEE:
      return {
        ...state,
        inviteeID: action.payload.id,
        inviteeInfo: action.payload.info
      };
    case OPEN_REJECT_PERSON_MODAL:
      return {
        ...state,
        applicantID: action.payload.applicantID
      };
    case CLOSE_REJECT_PERSON_MODAL:
      return {
        ...state,
        applicantID: ""
      };
    case OPEN_APPROVE_PERSON_MODAL:
      return {
        ...state,
        applicantID: action.payload.applicantID,
        isCoachApplication: action.payload.isCoachApplication
      };
    case CLOSE_APPROVE_PERSON_MODAL:
      return {
        ...state,
        applicantID: "",
        isCoachApplication: false
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

export const dialogsInitialState = {
  isDeletPersonAlertOpen: false,
  isEditPersonDialogOpen: false,
  isInvitePersonModalOpen: false,
  isRejectPersonModalOpen: false,
  isApprovePersonModalOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return dialogsInitialState;
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
    case OPEN_REJECT_PERSON_MODAL:
      return {
        ...state,
        isRejectPersonModalOpen: true
      };
    case CLOSE_REJECT_PERSON_MODAL:
      return {
        ...state,
        isRejectPersonModalOpen: false
      };
    case OPEN_APPROVE_PERSON_MODAL:
      return {
        ...state,
        isApprovePersonModalOpen: true
      };
    case CLOSE_APPROVE_PERSON_MODAL:
      return {
        ...state,
        isApprovePersonModalOpen: false
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

function requestsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_STAFF_REQUESTS:
    case SIGN_OUT:
      return {};
    case RECEIVE_STAFF_REQUESTS:
      return action.payload.requests;
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
  isRequestsLoading: false,
  isTeamsLoading: false,
  isInviteeLoading: false,
  isEditPersonLoading: false,
  isEventsByCoachLoading: false,
  isEventsByManagerLoading: false,
  isApplicantResponseLoading: false
};

function loadingStatusListReducer(
  state = loadingStatusInitialState,
  action = {}
) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_STAFF:
      return {
        ...state,
        isStaffLoading: true
      };
    case RECEIVE_STAFF:
      return {
        ...state,
        isStaffLoading: false
      };
    case REQUEST_STAFF_REQUESTS:
      return {
        ...state,
        isRequestsLoading: true
      };
    case RECEIVE_STAFF_REQUESTS:
      return {
        ...state,
        isRequestsLoading: false
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
    case REQUEST_EVENTS_BY_COACH:
      return {
        ...state,
        isEventsByCoachLoading: true
      };
    case RECEIVE_EVENTS_BY_COACH:
    case ERROR_LOADING_EVENTS_BY_COACH:
      return {
        ...state,
        isEventsByCoachLoading: false
      };
    case REQUEST_EVENTS_BY_MANAGER:
      return {
        ...state,
        isEventsByManagerLoading: true
      };
    case RECEIVE_EVENTS_BY_MANAGER:
    case ERROR_LOADING_EVENTS_BY_MANAGER:
      return {
        ...state,
        isEventsByManagerLoading: false
      };
    case REQUEST_APPROVE_PERSON:
    case REQUEST_REJECT_PERSON:
      return {
        ...state,
        isApplicantResponseLoading: true
      };
    case RECEIVE_APPROVE_PERSON:
    case ERROR_APPROVING_PERSON:
    case RECEIVE_REJECT_PERSON:
    case ERROR_REJECTING_PERSON:
      return {
        ...state,
        isApplicantResponseLoading: false
      };
    default:
      return state;
  }
}

function eventsByCoachReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_EVENTS_BY_COACH:
    case SIGN_OUT:
      return {};
    case RECEIVE_EVENTS_BY_COACH:
      return action.payload.events;
    default:
      return state;
  }
}

function eventsByManagerReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_EVENTS_BY_MANAGER:
    case SIGN_OUT:
      return {};
    case RECEIVE_EVENTS_BY_MANAGER:
      return action.payload.events;
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
  filters: filterReducer,
  eventsByCoach: eventsByCoachReducer,
  eventsByManager: eventsByManagerReducer
});

// Selectors

const uiConfig = state => state.people.uiConfig;
const staff = state => state.people.staff;
const requests = state => state.people.requests;
const teams = state => state.people.teams;
const dialogs = state => state.people.dialogs;
const loadingStatus = state => state.people.loadingStatus;
const filters = state => state.people.filters;
const eventsByCoach = state => state.people.eventsByCoach;
const eventsByManager = state => state.people.eventsByManager;

export const selector = createStructuredSelector({
  uiConfig,
  staff,
  dialogs,
  loadingStatus,
  teams,
  requests,
  filters,
  eventsByCoach,
  eventsByManager
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
  };
}

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

export function openApprovePersonModal(applicantID, isCoachApplication) {
  return {
    type: OPEN_APPROVE_PERSON_MODAL,
    payload: {
      applicantID,
      isCoachApplication
    }
  };
}

export function closeApprovePersonModal() {
  return {
    type: CLOSE_APPROVE_PERSON_MODAL
  };
}

export function openRejectPersonModal(applicantID) {
  return {
    type: OPEN_REJECT_PERSON_MODAL,
    payload: {
      applicantID
    }
  };
}

export function closeRejectPersonModal() {
  return {
    type: CLOSE_REJECT_PERSON_MODAL
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

export function requestStaffRequests() {
  return {
    type: REQUEST_STAFF_REQUESTS
  };
}

export function receiveStaffRequests(requests) {
  return {
    type: RECEIVE_STAFF_REQUESTS,
    payload: {
      requests
    }
  };
}

export function loadStaffRequests(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestStaffRequests());

    const requestsRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.status`, "==", "REQUESTED");

    return requestsRef.onSnapshot(querySnapshot => {
      let requests = {};
      querySnapshot.forEach(doc => {
        requests[doc.id] = doc.data();
      });
      dispatch(receiveStaffRequests(requests));
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

export function createUser(email, password, userInfo) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCreateUser());
    const db = firebase.firestore();

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        db
          .collection("users")
          .doc(user.uid)
          .set(userInfo)
          .then(() => dispatch(receiveCreateUser()))
          .catch(error => dispatch(errorCreatingUser(error)));
      })
      .catch(error => {
        dispatch(errorCreatingUser(error));
      });
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

export function requestRejectPerson() {
  return {
    type: REQUEST_REJECT_PERSON
  };
}

export function receiveRejectPerson() {
  return {
    type: RECEIVE_REJECT_PERSON
  };
}

export function errorRejectingPerson(error: { code: string, message: string }) {
  return {
    type: ERROR_REJECTING_PERSON,
    payload: {
      error
    }
  };
}

export function rejectPerson(userID, institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestRejectPerson());
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .update({
        [`institutions.${institutionID}.status`]: "REJECTED"
      })
      .then(() => dispatch(receiveRejectPerson()))
      .catch(error => dispatch(errorRejectingPerson(error)));
  };
}

export function requestApprovePerson() {
  return {
    type: REQUEST_APPROVE_PERSON
  };
}

export function receiveApprovePerson() {
  return {
    type: RECEIVE_APPROVE_PERSON
  };
}

export function errorApprovingPerson(error: { code: string, message: string }) {
  return {
    type: ERROR_APPROVING_PERSON,
    payload: {
      error
    }
  };
}

export function approvePerson(userID, institutionID, paymentDefaults, roles) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestApprovePerson());
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .update({
        [`institutions.${institutionID}`]: {
          paymentDefaults,
          roles,
          status: "STAFF"
        }
      })
      .then(() => dispatch(receiveApprovePerson()))
      .catch(error => dispatch(errorApprovingPerson(error)));
  };
}

export function requestEventsByCoach() {
  return {
    type: REQUEST_EVENTS_BY_COACH
  };
}

export function receiveEventsByCoach(events) {
  return {
    type: RECEIVE_EVENTS_BY_COACH,
    payload: {
      events
    }
  };
}

export function errorLoadingEventsByCoach(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_EVENTS_BY_COACH,
    payload: {
      error
    }
  };
}

export function loadEventsByCoach(institutionID, coachID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEventsByCoach());

    let eventsRef = firebase
      .firestore()
      .collection("events")
      .where("institutionID", "==", institutionID)
      .where("requiredInfo.status", "==", "ACTIVE")
      .where(`coaches.${coachID}.status`, "==", "ACTIVE");

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receiveEventsByCoach(events));
    });
  };
}

export function requestEventsByManager() {
  return {
    type: REQUEST_EVENTS_BY_MANAGER
  };
}

export function receiveEventsByManager(events) {
  return {
    type: RECEIVE_EVENTS_BY_MANAGER,
    payload: {
      events
    }
  };
}

export function errorLoadingEventsByManager(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_EVENTS_BY_MANAGER,
    payload: {
      error
    }
  };
}

export function loadEventsByManager(institutionID, managerID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEventsByManager());

    let eventsRef = firebase
      .firestore()
      .collection("events")
      .where("institutionID", "==", institutionID)
      .where("requiredInfo.status", "==", "ACTIVE")
      .where(`managers.${managerID}.status`, "==", "ACTIVE");

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receiveEventsByManager(events));
    });
  };
}
