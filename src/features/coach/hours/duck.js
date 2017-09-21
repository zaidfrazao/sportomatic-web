// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

export const UPDATE_TAB = "sportomatic-web/coach/hours/UPDATE_TAB";

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentTab: "IN_PROGRESS"
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

export const hoursReducer = combineReducers({
  uiConfig: uiConfigReducer
});

// Selectors

const uiConfig = state => state.coach.hours.uiConfig;

export const selector = createStructuredSelector({
  uiConfig
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
