import { combineReducers } from "redux";
import firebase from "firebase";
import { createStructuredSelector } from "reselect";

// Actions

const NAMESPACE = "sportomatic-web/settings";

export const UPDATE_TAB = `${NAMESPACE}/UPDATE_TAB`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;
export const REQUEST_UPDATE_BASIC_INFO = `${NAMESPACE}/REQUEST_UPDATE_BASIC_INFO`;
export const RECEIVE_UPDATE_BASIC_INFO = `${NAMESPACE}/RECEIVE_UPDATE_BASIC_INFO`;
export const ERROR_UPDATING_BASIC_INFO = `${NAMESPACE}/ERROR_UPDATING_BASIC_INFO`;
export const REQUEST_UPDATE_SPORTS = `${NAMESPACE}/REQUEST_UPDATE_SPORTS`;
export const RECEIVE_UPDATE_SPORTS = `${NAMESPACE}/RECEIVE_UPDATE_SPORTS`;
export const ERROR_UPDATING_SPORTS = `${NAMESPACE}/ERROR_UPDATING_SPORTS`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  currentTab: "PERSONAL"
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
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isUpdateBasicInfoLoading: false,
  isUpdateSportsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_UPDATE_BASIC_INFO:
      return {
        ...state,
        isUpdateBasicInfoLoading: true
      };
    case RECEIVE_UPDATE_BASIC_INFO:
    case ERROR_UPDATING_BASIC_INFO:
      return {
        ...state,
        isUpdateBasicInfoLoading: false
      };
    case REQUEST_UPDATE_SPORTS:
      return {
        ...state,
        isUpdateSportsLoading: true
      };
    case RECEIVE_UPDATE_SPORTS:
    case ERROR_UPDATING_SPORTS:
      return {
        ...state,
        isUpdateSportsLoading: false
      };
    default:
      return state;
  }
}

export const settingsReducer = combineReducers({
  uiConfig: uiConfigReducer,
  loadingStatus: loadingStatusReducer
});

// Selectors

const uiConfig = state => state.settings.uiConfig;
const loadingStatus = state => state.settings.loadingStatus;

export const selector = createStructuredSelector({
  uiConfig,
  loadingStatus
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
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

export function requestUpdateBasicInfo() {
  return {
    type: REQUEST_UPDATE_BASIC_INFO
  };
}

export function receiveUpdateBasicInfo() {
  return {
    type: RECEIVE_UPDATE_BASIC_INFO
  };
}

export function errorUpdatingBasicInfo(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_UPDATING_BASIC_INFO,
    payload: {
      error
    }
  };
}

export function updateBasicInfo(
  userID: string,
  name: string,
  surname: string,
  phoneNumber: string
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUpdateBasicInfo());
    const db = firebase.firestore();
    let batch = db.batch();

    const institutionRef = db.collection("institutions").doc(userID);
    batch.update(institutionRef, {
      "info.abbreviation": `${name[0]}${surname[0]}`,
      "info.name": `${name[0]}${surname[0]} Personal`,
      "info.phoneNumber": phoneNumber
    });
    const userRef = db.collection("users").doc(userID);
    batch.update(userRef, {
      "completeness.hasName": true,
      "completeness.hasSurname": true,
      "completeness.hasPhoneNumber": true,
      "info.name": name,
      "info.surname": surname,
      "info.phoneNumber": phoneNumber
    });

    return batch
      .commit()
      .then(user => {
        dispatch(receiveUpdateBasicInfo());
      })
      .catch(error => {
        dispatch(errorUpdatingBasicInfo(error));
      });
  };
}

export function requestUpdateSports() {
  return {
    type: REQUEST_UPDATE_SPORTS
  };
}

export function receiveUpdateSports() {
  return {
    type: RECEIVE_UPDATE_SPORTS
  };
}

export function errorUpdatingSports(error: { code: string, message: string }) {
  return {
    type: ERROR_UPDATING_SPORTS,
    payload: {
      error
    }
  };
}

export function updateSports(userID, sports) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUpdateSports());
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .update({
        "info.sports": sports
      })
      .then(user => {
        dispatch(receiveUpdateSports());
      })
      .catch(error => {
        dispatch(errorUpdatingSports(error));
      });
  };
}
