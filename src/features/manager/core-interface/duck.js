// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

export const TOGGLE_SIDE_MENU =
  "sportomatic-web/manager/core-interface/TOGGLE_SIDE_MENU";
export const UPDATE_APP_BAR_TITLE =
  "sportomatic-web/manager/core-interface/UPDATE_APP_BAR_TITLE";
export const UPDATE_BOTTOM_NAV_VALUE =
  "sportomatic-web/manager/core-interface/UPDATE_BOTTOM_NAV_VALUE";
export const SIGN_OUT = "sportomatic-web/manager/core-interface/SIGN_OUT";
export const INIT_USER = "sportomatic-web/manager/core-interface/INIT_USER";
export const OPEN_SWITCH_INSTITUTIONS_DIALOG =
  "sportomatic-web/manager/core-interface/OPEN_SWITCH_INSTITUTIONS_DIALOG";
export const CLOSE_SWITCH_INSTITUTIONS_DIALOG =
  "sportomatic-web/manager/core-interface/CLOSE_SWITCH_INSTITUTIONS_DIALOG";

// Reducers

export const uiConfigInitialState = {
  appBarTitle: "Dashboard",
  bottomNavValue: "dashboard",
  isSideMenuOpen: false,
  isLoggedIn: true,
  activeInstitution: {},
  type: "MANAGER"
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case INIT_USER:
      return {
        ...state,
        isLoggedIn: action.payload.user.isLoggedIn,
        activeInstitution: action.payload.user.activeInstitution,
        type: action.payload.user.type
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
  isSwitchInstitutionsDialogOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case OPEN_SWITCH_INSTITUTIONS_DIALOG:
      return {
        ...state,
        isSwitchInstitutionsDialogOpen: true
      };
    case CLOSE_SWITCH_INSTITUTIONS_DIALOG:
      return {
        ...state,
        isSwitchInstitutionsDialogOpen: false
      };
    default:
      return state;
  }
}

export const coreInterfaceReducer = combineReducers({
  uiConfig: uiConfigReducer,
  dialogs: dialogsReducer
});

// Selectors

const uiConfig = state => state.manager.coreInterface.uiConfig;
const dialogs = state => state.manager.coreInterface.dialogs;

export const selector = createStructuredSelector({
  uiConfig,
  dialogs
});

// Action Creators

export function initUser() {
  const user = {
    userID: localStorage.userID || "",
    email: localStorage.email || "",
    isLoggedIn: localStorage.isLoggedIn === "true" || false,
    type: localStorage.type || "",
    activeInstitution: JSON.parse(localStorage.activeInstitution) || {}
  };

  return {
    type: INIT_USER,
    payload: {
      user
    }
  };
}

export function openSwitchInstitutionsDialog() {
  return {
    type: OPEN_SWITCH_INSTITUTIONS_DIALOG
  };
}

export function closeSwitchInstitutionsDialog() {
  return {
    type: CLOSE_SWITCH_INSTITUTIONS_DIALOG
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
