import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/settings";

export const RESET_SETTINGS_STATE = `${NAMESPACE}/RESET_SETTINGS_STATE`;
export const REQUEST_EDIT_SPORTS = `${NAMESPACE}/REQUEST_EDIT_SPORTS`;
export const RECEIVE_EDIT_SPORTS = `${NAMESPACE}/RECEIVE_EDIT_SPORTS`;
export const ERROR_EDITING_SPORTS = `${NAMESPACE}/ERROR_EDITING_SPORTS`;
export const REQUEST_EDIT_PERSONAL_INFO = `${NAMESPACE}/REQUEST_EDIT_PERSONAL_INFO`;
export const RECEIVE_EDIT_PERSONAL_INFO = `${NAMESPACE}/RECEIVE_EDIT_PERSONAL_INFO`;
export const ERROR_EDITING_PERSONAL_INFO = `${NAMESPACE}/ERROR_EDITING_PERSONAL_INFO`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const loadingStatusInitialState = {
  isEditSportsLoading: false,
  isEditPersonalInfoLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_EDIT_SPORTS:
      return {
        ...state,
        isEditSportsLoading: true
      };
    case RECEIVE_EDIT_SPORTS:
    case ERROR_EDITING_SPORTS:
      return {
        ...state,
        isEditSportsLoading: false
      };
    case REQUEST_EDIT_PERSONAL_INFO:
      return {
        ...state,
        isEditPersonalInfoLoading: true
      };
    case RECEIVE_EDIT_PERSONAL_INFO:
    case ERROR_EDITING_PERSONAL_INFO:
      return {
        ...state,
        isEditPersonalInfoLoading: false
      };
    default:
      return state;
  }
}

export const settingsReducer = combineReducers({
  loadingStatus: loadingStatusReducer
});

// Selectors

const loadingStatus = state => state.settings.loadingStatus;

export const selector = createStructuredSelector({
  loadingStatus
});

// Action Creators

export function resetState() {
  return {
    type: RESET_SETTINGS_STATE
  };
}

export function requestEditSports() {
  return {
    type: REQUEST_EDIT_SPORTS
  };
}

export function receiveEditSports() {
  return {
    type: RECEIVE_EDIT_SPORTS
  };
}

export function errorEditingSports(error: { code: string, message: string }) {
  return {
    type: ERROR_EDITING_SPORTS,
    payload: {
      error
    }
  };
}

export function editSports(userID, sports) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEditSports());

    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .update({
        "info.sports": sports
      })
      .then(() => {
        dispatch(receiveEditSports());
      })
      .catch(error => {
        dispatch(errorEditingSports(error));
      });
  };
}

export function requestEditPersonalInfo() {
  return {
    type: REQUEST_EDIT_PERSONAL_INFO
  };
}

export function receiveEditPersonalInfo() {
  return {
    type: RECEIVE_EDIT_PERSONAL_INFO
  };
}

export function errorEditingPersonalInfo(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_EDITING_PERSONAL_INFO,
    payload: {
      error
    }
  };
}

export function editPersonalInfo(
  userID,
  blob,
  firstName,
  lastName,
  phoneNumber
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEditPersonalInfo());

    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `users/${userID}/profile-picture.jpeg`
    );

    return newImageRef
      .put(blob)
      .then(snapshot => {
        return userRef
          .update({
            "info.name": firstName,
            "info.surname": lastName,
            "info.phoneNumber": phoneNumber,
            "info.profilePictureURL": snapshot.downloadURL
          })
          .then(() => {
            dispatch(receiveEditPersonalInfo());
          })
          .catch(error => {
            dispatch(errorEditingPersonalInfo(error));
          });
      })
      .catch(error => {
        dispatch(errorEditingPersonalInfo(error));
      });
  };
}
