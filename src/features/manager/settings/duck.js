import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import brettPicture from "./images/brett.jpg";

// Actions

export const TOGGLE_SIDE_MENU =
  "sportomatic-web/manager/settings/TOGGLE_SIDE_MENU";

// Reducers

export const uiConfigInitialState = {
  appBarTitle: "Dashboard",
  bottomNavValue: "dashboard",
  isSideMenuOpen: false
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        isSideMenuOpen: !state.isSideMenuOpen
      };
    default:
      return state;
  }
}

export const accountInfoInitialState = {
  name: "Brett",
  surname: "Cook",
  email: "brett@sportomaticapp.com",
  phoneNumber: "(082) 746 - 8382",
  profilePictureURL: brettPicture,
  sports: [
    { name: "Cricket", numberOfTeams: 0 },
    { name: "Rugby", numberOfTeams: 2 },
    { name: "Swimming", numberOfTeams: 0 }
  ]
};

function accountInfoReducer(state = accountInfoInitialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const settingsReducer = combineReducers({
  uiConfig: uiConfigReducer,
  accountInfo: accountInfoReducer
});

// Selectors

const uiConfig = state => state.manager.settings.uiConfig;
const accountInfo = state => state.manager.settings.accountInfo;

export const selector = createStructuredSelector({
  uiConfig,
  accountInfo
});

// Action Creators

export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}
