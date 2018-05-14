/* eslint-disable array-callback-return */
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/core-interface";

export const REQUEST_SWITCH_INSTITUTION = `${NAMESPACE}/REQUEST_SWITCH_INSTITUTION`;
export const RECEIVE_SWITCH_INSTITUTION = `${NAMESPACE}/RECEIVE_SWITCH_INSTITUTION`;
export const ERROR_SWITCHING_INSTITUTION = `${NAMESPACE}/ERROR_SWITCHING_INSTITUTION`;
export const REQUEST_SWITCH_ROLE = `${NAMESPACE}/REQUEST_SWITCH_ROLE`;
export const RECEIVE_SWITCH_ROLE = `${NAMESPACE}/RECEIVE_SWITCH_ROLE`;
export const ERROR_SWITCHING_ROLE = `${NAMESPACE}/ERROR_SWITCHING_ROLE`;
export const TOGGLE_SIDE_MENU = `${NAMESPACE}/TOGGLE_SIDE_MENU`;
export const UPDATE_SIDE_MENU = `${NAMESPACE}/UPDATE_SIDE_MENU`;
export const CHANGE_ME_ALL_FILTER = `${NAMESPACE}/CHANGE_ME_ALL_FILTER`;
export const SIGN_OUT = `${NAMESPACE}/SIGN_OUT`;
export const INIT_USER = `${NAMESPACE}/INIT_USER`;
export const OPEN_MANAGE_INSTITUTIONS_DIALOG = `${NAMESPACE}/OPEN_MANAGE_INSTITUTIONS_DIALOG`;
export const CLOSE_MANAGE_INSTITUTIONS_DIALOG = `${NAMESPACE}/CLOSE_MANAGE_INSTITUTIONS_DIALOG`;
export const OPEN_SETTINGS_ALERT = `${NAMESPACE}/OPEN_SETTINGS_ALERT`;
export const CLOSE_SETTINGS_ALERT = `${NAMESPACE}/CLOSE_SETTINGS_ALERT`;
export const OPEN_LOG_OUT_MODAL = `${NAMESPACE}/OPEN_LOG_OUT_MODAL`;
export const CLOSE_LOG_OUT_MODAL = `${NAMESPACE}/CLOSE_LOG_OUT_MODAL`;
export const REQUEST_UNREAD_NOTIFICATIONS = `${NAMESPACE}/REQUEST_UNREAD_NOTIFICATIONS`;
export const RECEIVE_UNREAD_NOTIFICATIONS = `${NAMESPACE}/RECEIVE_UNREAD_NOTIFICATIONS`;
export const REQUEST_READ_NOTIFICATIONS = `${NAMESPACE}/REQUEST_READ_NOTIFICATIONS`;
export const RECEIVE_READ_NOTIFICATIONS = `${NAMESPACE}/RECEIVE_READ_NOTIFICATIONS`;
export const REQUEST_MARK_NOTIFICATIONS_READ = `${NAMESPACE}/REQUEST_MARK_NOTIFICATIONS_READ`;
export const RECEIVE_MARK_NOTIFICATIONS_READ = `${NAMESPACE}/RECEIVE_MARK_NOTIFICATIONS_READ`;
export const ERROR_MARKING_NOTIFICATIONS_READ = `${NAMESPACE}/ERROR_MARKING_NOTIFICATIONS_READ`;
export const REQUEST_ACCOUNT_INFO = `${NAMESPACE}/REQUEST_ACCOUNT_INFO`;
export const RECEIVE_ACCOUNT_INFO = `${NAMESPACE}/RECEIVE_ACCOUNT_INFO`;
export const ERROR_LOADING_ACCOUNT_INFO = `${NAMESPACE}/ERROR_LOADING_ACCOUNT_INFO`;
export const REQUEST_INSTITUTION_INFO = `${NAMESPACE}/REQUEST_INSTITUTION_INFO`;
export const RECEIVE_INSTITUTION_INFO = `${NAMESPACE}/RECEIVE_INSTITUTION_INFO`;
export const ERROR_LOADING_INSTITUTION_INFO = `${NAMESPACE}/ERROR_LOADING_INSTITUTION_INFO`;
export const REQUEST_INSTITUTION_CREATION = `${NAMESPACE}/REQUEST_INSTITUTION_CREATION`;
export const RECEIVE_INSTITUTION_CREATION = `${NAMESPACE}/RECEIVE_INSTITUTION_CREATION`;
export const ERROR_CREATING_INSTITUTION = `${NAMESPACE}/ERROR_CREATING_INSTITUTION`;
export const REQUEST_VERIFIED_INSTITUTIONS = `${NAMESPACE}/REQUEST_VERIFIED_INSTITUTIONS`;
export const RECEIVE_VERIFIED_INSTITUTIONS = `${NAMESPACE}/RECEIVE_VERIFIED_INSTITUTIONS`;
export const ERROR_LOADING_VERIFIED_INSTITUTIONS = `${NAMESPACE}/ERROR_LOADING_VERIFIED_INSTITUTIONS`;
export const REQUEST_JOIN_INSTITUTION = `${NAMESPACE}/REQUEST_JOIN_INSTITUTION`;
export const RECEIVE_JOIN_INSTITUTION = `${NAMESPACE}/RECEIVE_JOIN_INSTITUTION`;
export const ERROR_JOINING_INSTITUTION = `${NAMESPACE}/ERROR_JOINING_INSTITUTION`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;
export const UPDATE_SPORT = `${NAMESPACE}/UPDATE_SPORT`;

// Reducers

export const uiConfigInitialState = {
  sideMenuItemSelected: "overview",
  isSideMenuOpen: false,
  isLoggedIn: true,
  userID: "",
  sportSelected: "all",
  meAllFilter: "me",
  accountInfo: {
    institutions: {},
    lastAccessed: {
      institutionID: "",
      role: "ADMIN"
    }
  }
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
      return uiConfigInitialState;
    case CHANGE_ME_ALL_FILTER:
      return {
        ...state,
        meAllFilter: action.payload.newFilter
      };
    case UPDATE_SIDE_MENU:
      return {
        ...state,
        sideMenuItemSelected: action.payload.newSelected
      };
    case UPDATE_SPORT:
      return {
        ...state,
        sportSelected: action.payload.newSelected
      };
    case INIT_USER:
      return {
        ...state,
        isLoggedIn: action.payload.user.isLoggedIn,
        type: action.payload.user.type,
        userID: action.payload.user.id
      };
    case RECEIVE_ACCOUNT_INFO:
      return {
        ...state,
        accountInfo: action.payload.info
      };
    case SIGN_OUT:
      return {
        ...uiConfigInitialState,
        isLoggedIn: false
      };
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        isSideMenuOpen: !state.isSideMenuOpen
      };
    default:
      return state;
  }
}

export const dialogsInitialState = {
  isSettingsAlertOpen: false,
  isLogOutModalOpen: false,
  isManageInstitutionsDialogOpen: false,
  isInstitutionCreationSuccessModalOpen: false,
  isInstitutionCreationFailureModalOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return dialogsInitialState;
    case OPEN_MANAGE_INSTITUTIONS_DIALOG:
      return {
        ...state,
        isManageInstitutionsDialogOpen: true
      };
    case CLOSE_MANAGE_INSTITUTIONS_DIALOG:
      return {
        ...state,
        isManageInstitutionsDialogOpen: false
      };
    case OPEN_SETTINGS_ALERT:
      return {
        ...state,
        isSettingsAlertOpen: true
      };
    case CLOSE_SETTINGS_ALERT:
      return {
        ...state,
        isSettingsAlertOpen: false
      };
    case OPEN_LOG_OUT_MODAL:
      return {
        ...state,
        isLogOutModalOpen: true
      };
    case CLOSE_LOG_OUT_MODAL:
      return {
        ...state,
        isLogOutModalOpen: false
      };
    case RECEIVE_INSTITUTION_CREATION:
      return {
        ...state,
        isInstitutionCreationSuccessModalOpen: true,
        isManageInstitutionsDialogOpen: false
      };
    case ERROR_CREATING_INSTITUTION:
      return {
        ...state,
        isInstitutionCreationFailureModalOpen: true,
        isManageInstitutionsDialogOpen: false
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isReadNotificationsLoading: false,
  isAccountInfoLoading: false,
  isInstitutionsLoading: false,
  isInstitutionCreationLoading: false,
  isVerifiedInstitutionsLoading: false,
  isJoinInstitutionLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_READ_NOTIFICATIONS:
    case REQUEST_UNREAD_NOTIFICATIONS:
      return {
        ...state,
        isNotificationsLoading: true
      };
    case RECEIVE_READ_NOTIFICATIONS:
    case RECEIVE_UNREAD_NOTIFICATIONS:
      return {
        ...state,
        isNotificationsLoading: false
      };
    case REQUEST_ACCOUNT_INFO:
      return {
        ...state,
        isAccountInfoLoading: true
      };
    case RECEIVE_ACCOUNT_INFO:
    case ERROR_LOADING_ACCOUNT_INFO:
      return {
        ...state,
        isAccountInfoLoading: false
      };
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
    case REQUEST_INSTITUTION_CREATION:
      return {
        ...state,
        isInstitutionCreationLoading: true
      };
    case ERROR_CREATING_INSTITUTION:
    case RECEIVE_INSTITUTION_CREATION:
      return {
        ...state,
        isInstitutionCreationLoading: false
      };
    case REQUEST_VERIFIED_INSTITUTIONS:
      return {
        ...state,
        isVerifiedInstitutionsLoading: true
      };
    case ERROR_LOADING_VERIFIED_INSTITUTIONS:
    case RECEIVE_VERIFIED_INSTITUTIONS:
      return {
        ...state,
        isVerifiedInstitutionsLoading: false
      };
    case REQUEST_JOIN_INSTITUTION:
      return {
        ...state,
        isJoinInstitutionLoading: true
      };
    case ERROR_JOINING_INSTITUTION:
    case RECEIVE_JOIN_INSTITUTION:
      return {
        ...state,
        isJoinInstitutionLoading: false
      };
    default:
      return state;
  }
}

function unreadNotificationsReducer(state = [], action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_UNREAD_NOTIFICATIONS:
    case SIGN_OUT:
      return [];
    case RECEIVE_UNREAD_NOTIFICATIONS:
      return action.payload.notifications;
    default:
      return state;
  }
}

function readNotificationsReducer(state = [], action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_READ_NOTIFICATIONS:
    case SIGN_OUT:
      return [];
    case RECEIVE_READ_NOTIFICATIONS:
      return action.payload.notifications;
    default:
      return state;
  }
}

function institutionsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
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

function verifiedInstitutionsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_VERIFIED_INSTITUTIONS:
    case SIGN_OUT:
      return {};
    case RECEIVE_VERIFIED_INSTITUTIONS:
      return action.payload.institutions;
    default:
      return state;
  }
}

export const coreInterfaceReducer = combineReducers({
  uiConfig: uiConfigReducer,
  dialogs: dialogsReducer,
  loadingStatus: loadingStatusReducer,
  unreadNotifications: unreadNotificationsReducer,
  readNotifications: readNotificationsReducer,
  institutions: institutionsReducer,
  verifiedInstitutions: verifiedInstitutionsReducer
});

// Selectors

const uiConfig = state => state.coreInterface.uiConfig;
const dialogs = state => state.coreInterface.dialogs;
const loadingStatus = state => state.coreInterface.loadingStatus;
const unreadNotifications = state => state.coreInterface.unreadNotifications;
const readNotifications = state => state.coreInterface.readNotifications;
const institutions = state => state.coreInterface.institutions;
const verifiedInstitutions = state => state.coreInterface.verifiedInstitutions;

export const selector = createStructuredSelector({
  uiConfig,
  dialogs,
  loadingStatus,
  unreadNotifications,
  readNotifications,
  institutions,
  verifiedInstitutions
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function changeMeAllFilter(newFilter) {
  return {
    type: CHANGE_ME_ALL_FILTER,
    payload: {
      newFilter
    }
  };
}

export function updateSideMenu(newSelected) {
  return {
    type: UPDATE_SIDE_MENU,
    payload: {
      newSelected
    }
  };
}

export function updateSport(newSelected) {
  return {
    type: UPDATE_SPORT,
    payload: {
      newSelected
    }
  };
}

export function initUser() {
  const user = {
    id: localStorage.userID || "",
    email: localStorage.email || "",
    isLoggedIn: localStorage.isLoggedIn === "true" || false,
    type: localStorage.type || ""
  };

  return {
    type: INIT_USER,
    payload: {
      user
    }
  };
}

export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}

export function signOut() {
  localStorage.setItem("isLoggedIn", "false");
  return {
    type: SIGN_OUT
  };
}

export function openManageInstitutionsDialog() {
  return {
    type: OPEN_MANAGE_INSTITUTIONS_DIALOG
  };
}

export function closeManageInstitutionsDialog() {
  return {
    type: CLOSE_MANAGE_INSTITUTIONS_DIALOG
  };
}

export function openSettingsAlert() {
  return {
    type: OPEN_SETTINGS_ALERT
  };
}

export function closeSettingsAlert() {
  return {
    type: CLOSE_SETTINGS_ALERT
  };
}

export function openLogOutModal() {
  return {
    type: OPEN_LOG_OUT_MODAL
  };
}

export function closeLogOutModal() {
  return {
    type: CLOSE_LOG_OUT_MODAL
  };
}

export function requestUnreadNotifications() {
  return {
    type: REQUEST_UNREAD_NOTIFICATIONS
  };
}

export function receiveUnreadNotifications(notifications) {
  return {
    type: RECEIVE_UNREAD_NOTIFICATIONS,
    payload: {
      notifications
    }
  };
}

export function loadUnreadNotifications(userID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUnreadNotifications());

    const notificationsRef = firebase
      .firestore()
      .collection("notifications")
      .where("recipient", "==", userID)
      .where("metadata.isRead", "==", false)
      .orderBy("metadata.creationDate", "desc");

    return notificationsRef.onSnapshot(querySnapshot => {
      let notifications = [];
      querySnapshot.forEach(doc => {
        notifications.push({
          ...doc.data(),
          id: doc.id
        });
      });
      dispatch(receiveUnreadNotifications(notifications));
    });
  };
}

export function requestReadNotifications() {
  return {
    type: REQUEST_READ_NOTIFICATIONS
  };
}

export function receiveReadNotifications(notifications) {
  return {
    type: RECEIVE_READ_NOTIFICATIONS,
    payload: {
      notifications
    }
  };
}

export function loadReadNotifications(userID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestReadNotifications());

    const notificationsRef = firebase
      .firestore()
      .collection("notifications")
      .where("recipient", "==", userID)
      .where("metadata.isRead", "==", true)
      .orderBy("metadata.creationDate", "desc")
      .limit(20);

    return notificationsRef.onSnapshot(querySnapshot => {
      let notifications = [];
      querySnapshot.forEach(doc => {
        notifications.push({
          ...doc.data(),
          id: doc.id
        });
      });
      dispatch(receiveReadNotifications(notifications));
    });
  };
}

export function requestMarkNotificationsRead() {
  return {
    type: REQUEST_MARK_NOTIFICATIONS_READ
  };
}

export function receiveMarkNotificationsRead() {
  return {
    type: RECEIVE_MARK_NOTIFICATIONS_READ
  };
}

export function errorMarkingNotificationsRead(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_MARKING_NOTIFICATIONS_READ,
    payload: {
      error
    }
  };
}

export function markNotificationsRead(unreadNotifications) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestMarkNotificationsRead());
    const db = firebase.firestore();

    let batch = db.batch();
    unreadNotifications.map(notification => {
      const notificationRef = db
        .collection("notifications")
        .doc(notification.id);
      batch.update(notificationRef, { "metadata.isRead": true });
    });

    return batch
      .commit()
      .then(() => dispatch(receiveMarkNotificationsRead()))
      .catch(error => dispatch(errorMarkingNotificationsRead(error)));
  };
}

export function requestAccountInfo() {
  return {
    type: REQUEST_ACCOUNT_INFO
  };
}

export function receiveAccountInfo(info) {
  return {
    type: RECEIVE_ACCOUNT_INFO,
    payload: {
      info
    }
  };
}

export function errorLoadingAccountInfo(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_ACCOUNT_INFO,
    payload: {
      error
    }
  };
}

export function loadAccountInfo(userID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAccountInfo());

    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(userID);

    return userRef.onSnapshot(doc => {
      dispatch(receiveAccountInfo(doc.data()));
    });
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
      dispatch(receiveInstitutionInfo(doc.id, doc.data()));
    });
  };
}

export function requestInstitutionCreation() {
  return {
    type: REQUEST_INSTITUTION_CREATION
  };
}

export function receiveInstitutionCreation() {
  return {
    type: RECEIVE_INSTITUTION_CREATION
  };
}

export function errorCreatingInstitution(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_CREATING_INSTITUTION,
    payload: {
      error
    }
  };
}

export function createInstitution(emblemBlob, institutionInfo) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestInstitutionCreation());

    const db = firebase.firestore();
    let batch = db.batch();

    const newInstitutionRef = db.collection("institutions").doc();
    const newInstitutionID = newInstitutionRef._key.path.segments[1];
    const creatorRef = db
      .collection("users")
      .doc(institutionInfo.metadata.createdBy);

    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `institutions/${newInstitutionID}/emblem.jpeg`
    );

    return newImageRef
      .put(emblemBlob)
      .then(snapshot => {
        batch.set(newInstitutionRef, {
          ...institutionInfo,
          info: {
            ...institutionInfo.info,
            emblemURL: snapshot.downloadURL
          }
        });
        batch.update(creatorRef, {
          [`institutions.${newInstitutionID}`]: {
            paymentDefaults: {
              rates: institutionInfo.paymentDefaults.rates,
              type: institutionInfo.paymentDefaults.type
            },
            roles: {
              admin: "APPROVED",
              coach: "N/A",
              manager: "N/A"
            },
            status: "STAFF"
          }
        });
        return batch
          .commit()
          .then(() => dispatch(receiveInstitutionCreation()))
          .catch(error => dispatch(errorCreatingInstitution(error)));
      })
      .catch(error => dispatch(errorCreatingInstitution(error)));
  };
}

export function requestVerifiedInstitutions() {
  return {
    type: REQUEST_VERIFIED_INSTITUTIONS
  };
}

export function receiveVerifiedInstitutions(institutions) {
  return {
    type: RECEIVE_VERIFIED_INSTITUTIONS,
    payload: {
      institutions
    }
  };
}

export function errorLoadingVerifiedInstitutions(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_VERIFIED_INSTITUTIONS,
    payload: {
      error
    }
  };
}

export function loadVerifiedInstitutions() {
  return function(dispatch: DispatchAlias) {
    dispatch(requestVerifiedInstitutions());

    const institutionsRef = firebase
      .firestore()
      .collection("institutions")
      .where("metadata.status", "==", "ACTIVE");

    return institutionsRef.onSnapshot(querySnapshot => {
      let institutions = {};
      querySnapshot.forEach(doc => {
        institutions[doc.id] = doc.data();
      });
      dispatch(receiveVerifiedInstitutions(institutions));
    });
  };
}

export function requestJoinInstitution() {
  return {
    type: REQUEST_JOIN_INSTITUTION
  };
}

export function receiveJoinInstitution() {
  return {
    type: RECEIVE_JOIN_INSTITUTION
  };
}

export function errorJoiningInstitution(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_JOINING_INSTITUTION,
    payload: {
      error
    }
  };
}

export function joinInstitution(userID, institutionID, roles) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestJoinInstitution());

    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .update({
        [`institutions.${institutionID}`]: {
          paymentDefaults: {
            rates: {
              overtime: 150,
              salary: 6000,
              standard: 100
            },
            type: "HOURLY"
          },
          status: "REQUESTED",
          roles
        }
      })
      .then(() => dispatch(receiveJoinInstitution()))
      .catch(error => dispatch(errorJoiningInstitution(error)));
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
    dispatch(requestSwitchRole());

    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .update({
        "lastAccessed.role": role
      })
      .then(() => dispatch(receiveSwitchRole()))
      .catch(error => dispatch(errorSwitchingRole(error)));
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
