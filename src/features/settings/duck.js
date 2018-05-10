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
export const REQUEST_UPDATE_LOGIN_DETAILS = `${NAMESPACE}/REQUEST_UPDATE_LOGIN_DETAILS`;
export const RECEIVE_UPDATE_LOGIN_DETAILS = `${NAMESPACE}/RECEIVE_UPDATE_LOGIN_DETAILS`;
export const ERROR_UPDATING_LOGIN_DETAILS = `${NAMESPACE}/ERROR_UPDATING_LOGIN_DETAILS`;
export const REQUEST_UPDATE_PAYMENT_DEFAULTS = `${NAMESPACE}/REQUEST_UPDATE_PAYMENT_DEFAULTS`;
export const RECEIVE_UPDATE_PAYMENT_DEFAULTS = `${NAMESPACE}/RECEIVE_UPDATE_PAYMENT_DEFAULTS`;
export const ERROR_UPDATING_PAYMENT_DEFAULTS = `${NAMESPACE}/ERROR_UPDATING_PAYMENT_DEFAULTS`;
export const REQUEST_UPDATE_PERMISSIONS = `${NAMESPACE}/REQUEST_UPDATE_PERMISSIONS`;
export const RECEIVE_UPDATE_PERMISSIONS = `${NAMESPACE}/RECEIVE_UPDATE_PERMISSIONS`;
export const ERROR_UPDATING_PERMISSIONS = `${NAMESPACE}/ERROR_UPDATING_PERMISSIONS`;
export const REQUEST_UPDATE_PROFILE_PICTURE = `${NAMESPACE}/REQUEST_UPDATE_PROFILE_PICTURE`;
export const RECEIVE_UPDATE_PROFILE_PICTURE = `${NAMESPACE}/RECEIVE_UPDATE_PROFILE_PICTURE`;
export const ERROR_UPDATING_PROFILE_PICTURE = `${NAMESPACE}/ERROR_UPDATING_PROFILE_PICTURE`;

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
  isUpdateSportsLoading: false,
  isUpdateLoginDetailsLoading: false,
  isUpdatePermissionsLoading: false,
  isUpdatePaymentDefaultsLoading: false,
  isUpdateProfilePictureLoading: false
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
    case REQUEST_UPDATE_LOGIN_DETAILS:
      return {
        ...state,
        isUpdateLoginDetailsLoading: true
      };
    case RECEIVE_UPDATE_LOGIN_DETAILS:
    case ERROR_UPDATING_LOGIN_DETAILS:
      return {
        ...state,
        isUpdateLoginDetailsLoading: false
      };
    case REQUEST_UPDATE_PAYMENT_DEFAULTS:
      return {
        ...state,
        isUpdatePaymentDefaultsLoading: true
      };
    case RECEIVE_UPDATE_PAYMENT_DEFAULTS:
    case ERROR_UPDATING_PAYMENT_DEFAULTS:
      return {
        ...state,
        isUpdatePaymentDefaultsLoading: false
      };
    case REQUEST_UPDATE_PERMISSIONS:
      return {
        ...state,
        isUpdatePermissionsLoading: true
      };
    case RECEIVE_UPDATE_PERMISSIONS:
    case ERROR_UPDATING_PERMISSIONS:
      return {
        ...state,
        isUpdatePermissionsLoading: false
      };
    case REQUEST_UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        isUpdateProfilePictureLoading: true
      };
    case RECEIVE_UPDATE_PROFILE_PICTURE:
    case ERROR_UPDATING_PROFILE_PICTURE:
      return {
        ...state,
        isUpdateProfilePictureLoading: false
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

export function requestUpdateLoginDetails() {
  return {
    type: REQUEST_UPDATE_LOGIN_DETAILS
  };
}

export function receiveUpdateLoginDetails() {
  return {
    type: RECEIVE_UPDATE_LOGIN_DETAILS
  };
}

export function errorUpdatingLoginDetails(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_UPDATING_LOGIN_DETAILS,
    payload: {
      error
    }
  };
}

export function updateLoginDetails(userID, email, password) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUpdateLoginDetails());
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return firebase
      .auth()
      .currentUser.updatePassword(password)
      .then(() => {
        firebase
          .auth()
          .currentUser.updateEmail(email)
          .then(() => {
            userRef
              .update({
                "info.email": email
              })
              .then(() => {
                dispatch(receiveUpdateLoginDetails());
              })
              .catch(error => {
                dispatch(errorUpdatingLoginDetails(error));
              });
          })
          .catch(error => {
            dispatch(errorUpdatingLoginDetails(error));
          });
      })
      .catch(error => {
        dispatch(errorUpdatingLoginDetails(error));
      });
  };
}

export function requestUpdatePermissions() {
  return {
    type: REQUEST_UPDATE_PERMISSIONS
  };
}

export function receiveUpdatePermissions() {
  return {
    type: RECEIVE_UPDATE_PERMISSIONS
  };
}

export function errorUpdatingPermissions(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_UPDATING_PERMISSIONS,
    payload: {
      error
    }
  };
}

export function updatePermissions(institutionID, permissions) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUpdatePermissions());
    const db = firebase.firestore();
    const institutionRef = db.collection("institutions").doc(institutionID);

    return institutionRef
      .update({
        permissions
      })
      .then(user => {
        dispatch(receiveUpdatePermissions());
      })
      .catch(error => {
        dispatch(errorUpdatingPermissions(error));
      });
  };
}

export function requestUpdatePaymentDefaults() {
  return {
    type: REQUEST_UPDATE_PAYMENT_DEFAULTS
  };
}

export function receiveUpdatePaymentDefaults() {
  return {
    type: RECEIVE_UPDATE_PAYMENT_DEFAULTS
  };
}

export function errorUpdatingPaymentDefaults(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_UPDATING_PAYMENT_DEFAULTS,
    payload: {
      error
    }
  };
}

export function updatePaymentDefaults(institutionID, paymentDefaults) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUpdatePaymentDefaults());
    const db = firebase.firestore();
    const institutionRef = db.collection("institutions").doc(institutionID);

    return institutionRef
      .update({
        paymentDefaults
      })
      .then(user => {
        dispatch(receiveUpdatePaymentDefaults());
      })
      .catch(error => {
        dispatch(errorUpdatingPaymentDefaults(error));
      });
  };
}

export function requestUpdateProfilePicture() {
  return {
    type: REQUEST_UPDATE_PROFILE_PICTURE
  };
}

export function receiveUpdateProfilePicture() {
  return {
    type: RECEIVE_UPDATE_PROFILE_PICTURE
  };
}

export function errorUpdatingProfilePicture(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_UPDATING_PROFILE_PICTURE,
    payload: {
      error
    }
  };
}

export function updateProfilePicture(userID, blob) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUpdateProfilePicture());

    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `users/${userID}/profile-picture.jpeg`
    );

    return newImageRef
      .put(blob)
      .then(snapshot => {
        let batch = db.batch();

        batch.update(userRef, {
          "info.profilePictureURL": snapshot.downloadURL
        });

        batch
          .commit()
          .then(() => dispatch(receiveUpdateProfilePicture()))
          .catch(error => dispatch(errorUpdatingProfilePicture(error)));
      })
      .catch(error => {
        dispatch(errorUpdatingProfilePicture(error));
      });
  };
}
