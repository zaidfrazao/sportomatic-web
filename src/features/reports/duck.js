import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import "firebase/functions";

// Actions

const NAMESPACE = "sportomatic-web/reports";

export const REQUEST_STAFF = `${NAMESPACE}/REQUEST_STAFF`;
export const RECEIVE_STAFF = `${NAMESPACE}/RECEIVE_STAFF`;
export const REQUEST_ADMIN = `${NAMESPACE}/REQUEST_ADMIN`;
export const RECEIVE_ADMIN = `${NAMESPACE}/RECEIVE_ADMIN`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;
export const REQUEST_WAGES = `${NAMESPACE}/REQUEST_WAGES`;
export const RECEIVE_WAGES = `${NAMESPACE}/RECEIVE_WAGES`;
export const ERROR_LOADING_WAGES = `${NAMESPACE}/ERROR_LOADING_WAGES`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

function usersReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return {};
    case RECEIVE_ADMIN:
    case RECEIVE_STAFF:
      return {
        ...state,
        ...action.payload.people
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isStaffLoading: false,
  isWagesLoading: false
};

function loadingStatusListReducer(
  state = loadingStatusInitialState,
  action = {}
) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_WAGES:
      return {
        ...state,
        isWagesLoading: true
      };
    case ERROR_LOADING_WAGES:
    case RECEIVE_WAGES:
      return {
        ...state,
        isWagesLoading: false
      };
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
    default:
      return state;
  }
}

function wagesReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_WAGES:
    case SIGN_OUT:
      return {};
    case RECEIVE_WAGES:
      return action.payload.wages;
    default:
      return state;
  }
}

export const reportsReducer = combineReducers({
  users: usersReducer,
  loadingStatus: loadingStatusListReducer,
  wages: wagesReducer
});

// Selectors

const users = state => state.reports.users;
const loadingStatus = state => state.reports.loadingStatus;
const wages = state => state.reports.wages;

export const selector = createStructuredSelector({
  users,
  loadingStatus,
  wages
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function requestAdmins() {
  return {
    type: REQUEST_ADMIN
  };
}

export function receiveAdmins(people) {
  return {
    type: RECEIVE_ADMIN,
    payload: {
      people
    }
  };
}

export function loadAdmins(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAdmins());

    const adminRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.status`, "==", "ADMIN");

    return adminRef.onSnapshot(querySnapshot => {
      let admins = {};
      querySnapshot.forEach(doc => {
        admins[doc.id] = doc.data();
      });
      dispatch(receiveAdmins(admins));
    });
  };
}

export function requestStaff() {
  return {
    type: REQUEST_STAFF
  };
}

export function receiveStaff(people) {
  return {
    type: RECEIVE_STAFF,
    payload: {
      people
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

export function requestWages() {
  return {
    type: REQUEST_WAGES
  };
}

export function receiveWages(wages) {
  return {
    type: RECEIVE_WAGES,
    payload: {
      wages
    }
  };
}

export function errorLoadingWages(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_WAGES,
    payload: {
      error
    }
  };
}

export function loadWages(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestWages());

    let wagesRef = firebase
      .firestore()
      .collection("wages")
      .orderBy("date", "desc")
      .where("institutionID", "==", institutionID);

    return wagesRef.onSnapshot(querySnapshot => {
      let wages = {};
      querySnapshot.forEach(doc => {
        wages[doc.id] = doc.data();
      });
      dispatch(receiveWages(wages));
    });
  };
}
