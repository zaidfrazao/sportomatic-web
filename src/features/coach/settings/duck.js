import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import rowanPicture from "./images/rowan.jpg";

// Actions

export const TOGGLE_SIDE_MENU =
  "sportomatic-web/coach/settings/TOGGLE_SIDE_MENU";

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
  name: "Rowan",
  surname: "Walker-Campbell",
  email: "rowan@sportomaticapp.com",
  phoneNumber: "(079) 507 - 0104",
  profilePictureURL: rowanPicture,
  sports: [
    { name: "Athletics", numberOfTeams: 3 },
    { name: "Cricket", numberOfTeams: 1 },
    { name: "Rugby", numberOfTeams: 0 },
    { name: "Soccer", numberOfTeams: 4 }
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

const uiConfig = state => state.coach.settings.uiConfig;
const accountInfo = state => state.coach.settings.accountInfo;

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
