import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/admin/dashboard";

export const TOGGLE_SIDE_MENU = `${NAMESPACE}/TOGGLE_SIDE_MENU`;
export const REQUEST_INSTITUTION_INFO = `${NAMESPACE}/REQUEST_INSTITUTION_INFO`;
export const RECEIVE_INSTITUTION_INFO = `${NAMESPACE}/RECEIVE_INSTITUTION_INFO`;
export const ERROR_LOADING_INSTITUTION_INFO = `${NAMESPACE}/ERROR_LOADING_INSTITUTION_INFO`;
export const REQUEST_SWITCH_INSTITUTION = `${NAMESPACE}/REQUEST_SWITCH_INSTITUTION`;
export const RECEIVE_SWITCH_INSTITUTION = `${NAMESPACE}/RECEIVE_SWITCH_INSTITUTION`;
export const ERROR_SWITCHING_INSTITUTION = `${NAMESPACE}/ERROR_SWITCHING_INSTITUTION`;
export const REQUEST_SWITCH_ROLE = `${NAMESPACE}/REQUEST_SWITCH_ROLE`;
export const RECEIVE_SWITCH_ROLE = `${NAMESPACE}/RECEIVE_SWITCH_ROLE`;
export const ERROR_SWITCHING_ROLE = `${NAMESPACE}/ERROR_SWITCHING_ROLE`;
export const SIGN_OUT = "sportomatic-web/admin/core-interface/SIGN_OUT";

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

export const loadingStatusInitialState = {
  isInstitutionsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_INSTITUTION_INFO:
      return {
        ...state,
        isInstitutionsLoading: true
      };
    case ERROR_LOADING_INSTITUTION_INFO:
    case RECEIVE_INSTITUTION_INFO:
      return {
        ...state,
        isInstitutionsLoading: false
      };
    default:
      return state;
  }
}

function institutionsReducer(state = {}, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return {};
    case RECEIVE_INSTITUTION_INFO:
      return {
        ...state,
        [action.payload.id]: action.payload.info
      };
    default:
      return state;
  }
}

export const dashboardReducer = combineReducers({
  uiConfig: uiConfigReducer,
  loadingStatus: loadingStatusReducer,
  institutions: institutionsReducer
});

// Selectors

const uiConfig = state => state.institution.dashboard.uiConfig;
const loadingStatus = state => state.institution.dashboard.loadingStatus;
const institutions = state => state.institution.dashboard.institutions;

export const selector = createStructuredSelector({
  uiConfig,
  loadingStatus,
  institutions
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

export function requestInstitutionInfo() {
  return {
    type: REQUEST_INSTITUTION_INFO
  };
}

export function receiveInstitutionInfo(id, info) {
  return {
    type: RECEIVE_INSTITUTION_INFO,
    payload: {
      id,
      info
    }
  };
}

export function errorLoadingInstitutionInfo(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_INSTITUTION_INFO,
    payload: {
      error
    }
  };
}

export function loadInstitutionInfo(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestInstitutionInfo());

    const institutionRef = firebase
      .firestore()
      .collection("institutions")
      .doc(institutionID);

    return institutionRef.onSnapshot(doc => {
      dispatch(receiveInstitutionInfo(doc.id, doc.data().info));
    });
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
