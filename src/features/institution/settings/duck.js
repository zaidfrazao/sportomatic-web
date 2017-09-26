// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import sportomaticPicture from "./images/sportomatic.jpg";

// Actions

export const TOGGLE_SIDE_MENU =
  "sportomatic-web/institution/settings/TOGGLE_SIDE_MENU";

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
  name: "Sportomatic Academy",
  abbreviation: "SPCA",
  email: "info@sportomaticapp.com",
  phoneNumber: "(011) 283 - 8492",
  physicalAddress: "63 Alexandra Street, Florida",
  institutionType: "Sports Academy",
  genders: "Mixed",
  emblemURL: sportomaticPicture,
  sports: [
    { name: "Athletics", numberOfTeams: 3 },
    { name: "Cricket", numberOfTeams: 1 },
    { name: "Rugby", numberOfTeams: 0 },
    { name: "Soccer", numberOfTeams: 4 }
  ],
  ageGroups: [
    { name: "U/16", numberOfTeams: 0 },
    { name: "U/18", numberOfTeams: 7 }
  ],
  divisions: [
    { name: "A", numberOfTeams: 2 },
    { name: "B", numberOfTeams: 0 },
    { name: "1st Team", numberOfTeams: 3 },
    { name: "2nd Team", numberOfTeams: 2 }
  ],
  coachPaymentOptions: {
    standardHourlyRate: 100,
    overtimeHourlyRate: 150,
    maxOvertimeHours: 3,
    payDay: "End of the month"
  }
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

const uiConfig = state => state.institution.settings.uiConfig;
const accountInfo = state => state.institution.settings.accountInfo;

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