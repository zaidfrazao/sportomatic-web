// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

export const UPDATE_TAB = "sportomatic-web/coach/hours/UPDATE_TAB";

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentTab: "HISTORY"
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_TAB:
      return {
        ...state,
        currentTab: action.payload.newTab
      };
    default:
      return state;
  }
}

export const HoursHistoryInitialState = {
  "2017": {
    "8": {
      total: 8,
      records: [
        {
          id: "0",
          date: 1508328000000,
          event: "U/16 A Rugby Boys Match",
          signInTime: "2:00 pm",
          signOutTime: "4:00 pm",
          hours: 2
        },
        {
          id: "1",
          date: 1508328000000,
          event: "U/16 A Rugby Boys Match",
          signInTime: "2:00 pm",
          signOutTime: "4:00 pm",
          hours: 2
        },
        {
          id: "2",
          date: 1508328000000,
          event: "U/16 A Rugby Boys Match",
          signInTime: "2:00 pm",
          signOutTime: "4:00 pm",
          hours: 2
        },
        {
          id: "3",
          date: 1508328000000,
          event: "U/16 A Rugby Boys Match",
          signInTime: "2:00 pm",
          signOutTime: "4:00 pm",
          hours: 2
        }
      ]
    }
  }
};

function hoursHistoryReducer(state = HoursHistoryInitialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const hoursReducer = combineReducers({
  uiConfig: uiConfigReducer,
  hoursHistory: hoursHistoryReducer
});

// Selectors

const uiConfig = state => state.coach.hours.uiConfig;
const hoursHistory = state => state.coach.hours.hoursHistory;

export const selector = createStructuredSelector({
  uiConfig,
  hoursHistory
});

// Action Creators

export function updateTab(newTab) {
  return {
    type: UPDATE_TAB,
    payload: {
      newTab
    }
  };
}
