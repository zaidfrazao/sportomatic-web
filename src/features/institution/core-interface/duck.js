/* eslint-disable array-callback-return */
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/admin/core-interface";

export const TOGGLE_SIDE_MENU = `${NAMESPACE}/TOGGLE_SIDE_MENU`;
export const UPDATE_APP_BAR_TITLE = `${NAMESPACE}/UPDATE_APP_BAR_TITLE`;
export const UPDATE_BOTTOM_NAV_VALUE = `${NAMESPACE}/UPDATE_BOTTOM_NAV_VALUE`;
export const SIGN_OUT = `${NAMESPACE}/SIGN_OUT`;
export const INIT_USER = `${NAMESPACE}/INIT_USER`;
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

// Reducers

export const uiConfigInitialState = {
  appBarTitle: "Dashboard",
  bottomNavValue: "dashboard",
  isSideMenuOpen: false,
  isLoggedIn: true,
  type: "ADMIN",
  userID: "",
  accountInfo: {
    lastAccessed: {
      institutionID: "",
      type: "ADMIN"
    }
  }
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case INIT_USER:
      return {
        ...state,
        isLoggedIn: action.payload.user.isLoggedIn,
        type: action.payload.user.type,
        userID: action.payload.user.id,
        accountInfo: action.payload.user.accountInfo
      };
    case SIGN_OUT:
      return {
        ...state,
        isLoggedIn: false
      };
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        isSideMenuOpen: !state.isSideMenuOpen
      };
    case UPDATE_APP_BAR_TITLE:
      return {
        ...state,
        appBarTitle: action.payload.newTitle
      };
    case UPDATE_BOTTOM_NAV_VALUE:
      return {
        ...state,
        bottomNavValue: action.payload.newValue
      };
    default:
      return state;
  }
}

export const dialogsInitialState = {
  isSettingsAlertOpen: false,
  isLogOutModalOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isNotificationsLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export const unreadNotificationsInitialState = [];

function unreadNotificationsReducer(
  state = unreadNotificationsInitialState,
  action = {}
) {
  switch (action.type) {
    case RECEIVE_UNREAD_NOTIFICATIONS:
      return action.payload.notifications;
    default:
      return state;
  }
}

export const readNotificationsInitialState = [];

function readNotificationsReducer(
  state = readNotificationsInitialState,
  action = {}
) {
  switch (action.type) {
    case RECEIVE_READ_NOTIFICATIONS:
      return action.payload.notifications;
    default:
      return state;
  }
}

export const coreInterfaceReducer = combineReducers({
  uiConfig: uiConfigReducer,
  dialogs: dialogsReducer,
  loadingStatus: loadingStatusReducer,
  unreadNotifications: unreadNotificationsReducer,
  readNotifications: readNotificationsReducer
});

// Selectors

const uiConfig = state => state.institution.coreInterface.uiConfig;
const dialogs = state => state.institution.coreInterface.dialogs;
const loadingStatus = state => state.institution.coreInterface.loadingStatus;
const unreadNotifications = state =>
  state.institution.coreInterface.unreadNotifications;
const readNotifications = state =>
  state.institution.coreInterface.readNotifications;

export const selector = createStructuredSelector({
  uiConfig,
  dialogs,
  loadingStatus,
  unreadNotifications,
  readNotifications
});

// Action Creators

export function initUser() {
  let accountInfo = {};
  if (localStorage.accountInfo) {
    accountInfo = JSON.parse(localStorage.accountInfo);
  }
  const user = {
    accountInfo,
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

export function updateAppBarTitle(newTitle) {
  return {
    type: UPDATE_APP_BAR_TITLE,
    payload: {
      newTitle
    }
  };
}

export function updateBottomNavValue(newValue) {
  return {
    type: UPDATE_BOTTOM_NAV_VALUE,
    payload: {
      newValue
    }
  };
}

export function signOut() {
  localStorage.setItem("isLoggedIn", "false");
  return {
    type: SIGN_OUT
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
