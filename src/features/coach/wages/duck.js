// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

export const TOGGLE_SIDE_MENU = "sportomatic-web/coach/wages/TOGGLE_SIDE_MENU";

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

export const wageInfoInitialState = {
  total: 1500,
  records: [
    {
      id: "0",
      date: 1508328000000,
      event: "U/16 A Rugby Boys Match",
      paymentType: "Hourly Rate",
      wage: 250
    },
    {
      id: "1",
      date: 1508328000000,
      event: "U/16 A Rugby Boys Match",
      paymentType: "Hourly Rate",
      wage: 250
    },
    {
      id: "2",
      date: 1508328000000,
      event: "U/16 A Rugby Boys Match",
      paymentType: "Hourly Rate",
      wage: 250
    },
    {
      id: "3",
      date: 1508328000000,
      event: "U/16 A Rugby Boys Match",
      paymentType: "Hourly Rate",
      wage: 250
    },
    {
      id: "4",
      date: 1508328000000,
      event: "U/16 A Rugby Boys Match",
      paymentType: "Hourly Rate",
      wage: 250
    },
    {
      id: "5",
      date: 1508328000000,
      event: "U/16 A Rugby Boys Match",
      paymentType: "Hourly Rate",
      wage: 250
    }
  ]
};

function wageInfoReducer(state = wageInfoInitialState, action = {}) {
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

export const wagesReducer = combineReducers({
  uiConfig: uiConfigReducer,
  wageInfo: wageInfoReducer
});

// Selectors

const uiConfig = state => state.coach.wages.uiConfig;
const wageInfo = state => state.coach.wages.wageInfo;

export const selector = createStructuredSelector({
  uiConfig,
  wageInfo
});

// Action Creators

export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}
