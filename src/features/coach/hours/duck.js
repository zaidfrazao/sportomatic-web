// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

export const TOGGLE_SIDE_MENU = "sportomatic-web/coach/hours/TOGGLE_SIDE_MENU";

// Reducers

export const uiConfigInitialState = {
  isLoading: false
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

export const hoursReducer = combineReducers({
  uiConfig: uiConfigReducer
});

// Selectors

const uiConfig = state => state.coach.hours.uiConfig;

export const selector = createStructuredSelector({
  uiConfig
});

// Action Creators

export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}
