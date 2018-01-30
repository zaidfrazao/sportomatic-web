import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/dashboard";

export const TOGGLE_SIDE_MENU = `${NAMESPACE}/TOGGLE_SIDE_MENU`;
export const REQUEST_SWITCH_INSTITUTION = `${NAMESPACE}/REQUEST_SWITCH_INSTITUTION`;
export const RECEIVE_SWITCH_INSTITUTION = `${NAMESPACE}/RECEIVE_SWITCH_INSTITUTION`;
export const ERROR_SWITCHING_INSTITUTION = `${NAMESPACE}/ERROR_SWITCHING_INSTITUTION`;
export const REQUEST_SWITCH_ROLE = `${NAMESPACE}/REQUEST_SWITCH_ROLE`;
export const RECEIVE_SWITCH_ROLE = `${NAMESPACE}/RECEIVE_SWITCH_ROLE`;
export const ERROR_SWITCHING_ROLE = `${NAMESPACE}/ERROR_SWITCHING_ROLE`;
export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  appBarTitle: "Dashboard",
  bottomNavValue: "dashboard",
  isSideMenuOpen: false
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return uiConfigInitialState;
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        isSideMenuOpen: !state.isSideMenuOpen
      };
    default:
      return state;
  }
}

export const dashboardReducer = combineReducers({
  uiConfig: uiConfigReducer
});

// Selectors

const uiConfig = state => state.dashboard.uiConfig;

export const selector = createStructuredSelector({
  uiConfig
});

// Action Creators

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
