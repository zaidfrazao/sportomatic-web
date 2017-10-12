// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

export const TOGGLE_SIDE_MENU =
  "sportomatic-web/institution/core-interface/TOGGLE_SIDE_MENU";
export const UPDATE_APP_BAR_TITLE =
  "sportomatic-web/institution/core-interface/UPDATE_APP_BAR_TITLE";
export const UPDATE_BOTTOM_NAV_VALUE =
  "sportomatic-web/institution/core-interface/UPDATE_BOTTOM_NAV_VALUE";
export const SIGN_OUT = "sportomatic-web/institution/core-interface/SIGN_OUT";
export const INIT_USER = "sportomatic-web/institution/core-interface/INIT_USER";
export const OPEN_SETTINGS_ALERT =
  "sportomatic-web/institution/core-interface/OPEN_SETTINGS_ALERT";
export const CLOSE_SETTINGS_ALERT =
  "sportomatic-web/institution/core-interface/CLOSE_SETTINGS_ALERT";

// Reducers

export const uiConfigInitialState = {
  appBarTitle: "Dashboard",
  bottomNavValue: "dashboard",
  isSideMenuOpen: false,
  isLoggedIn: true,
  type: "INSTITUTION",
  userID: "",
  isSettingsAlertOpen: false
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case INIT_USER:
      return {
        ...state,
        isLoggedIn: action.payload.user.isLoggedIn,
        type: action.payload.user.type,
        userID: action.payload.user.id
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
    default:
      return state;
  }
}

export const coreInterfaceReducer = combineReducers({
  uiConfig: uiConfigReducer
});

// Selectors

const uiConfig = state => state.institution.coreInterface.uiConfig;

export const selector = createStructuredSelector({
  uiConfig
});

// Action Creators

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
