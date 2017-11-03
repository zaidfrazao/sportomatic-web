import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

export const TOGGLE_SIDE_MENU =
  "sportomatic-web/coach/core-interface/TOGGLE_SIDE_MENU";
export const UPDATE_APP_BAR_TITLE =
  "sportomatic-web/coach/core-interface/UPDATE_APP_BAR_TITLE";
export const UPDATE_BOTTOM_NAV_VALUE =
  "sportomatic-web/coach/core-interface/UPDATE_BOTTOM_NAV_VALUE";
export const SIGN_OUT = "sportomatic-web/coach/core-interface/SIGN_OUT";
export const INIT_USER = "sportomatic-web/coach/core-interface/INIT_USER";
export const OPEN_SWITCH_INSTITUTIONS_DIALOG =
  "sportomatic-web/coach/core-interface/OPEN_SWITCH_INSTITUTIONS_DIALOG";
export const CLOSE_SWITCH_INSTITUTIONS_DIALOG =
  "sportomatic-web/coach/core-interface/CLOSE_SWITCH_INSTITUTIONS_DIALOG";
export const OPEN_SETTINGS_ALERT =
  "sportomatic-web/coach/core-interface/OPEN_SETTINGS_ALERT";
export const CLOSE_SETTINGS_ALERT =
  "sportomatic-web/coach/core-interface/CLOSE_SETTINGS_ALERT";
export const OPEN_LOG_OUT_MODAL =
  "sportomatic-web/coach/core-interface/OPEN_LOG_OUT_MODAL";
export const CLOSE_LOG_OUT_MODAL =
  "sportomatic-web/coach/core-interface/CLOSE_LOG_OUT_MODAL";

// Reducers

export const uiConfigInitialState = {
  appBarTitle: "Dashboard",
  bottomNavValue: "dashboard",
  isSideMenuOpen: false,
  isLoggedIn: true,
  activeInstitution: {},
  type: "COACH",
  userID: ""
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case INIT_USER:
      return {
        ...state,
        isLoggedIn: action.payload.user.isLoggedIn,
        activeInstitution: action.payload.user.activeInstitution,
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
    default:
      return state;
  }
}

export const dialogsInitialState = {
  isSwitchInstitutionsDialogOpen: false,
  isSettingsAlertOpen: false,
  isLogOutModalOpen: false
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

export const coreInterfaceReducer = combineReducers({
  uiConfig: uiConfigReducer,
  dialogs: dialogsReducer
});

// Selectors

const uiConfig = state => state.coach.coreInterface.uiConfig;
const dialogs = state => state.coach.coreInterface.dialogs;

export const selector = createStructuredSelector({
  uiConfig,
  dialogs
});

// Action Creators

export function initUser() {
  const user = {
    id: localStorage.userID || "",
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
