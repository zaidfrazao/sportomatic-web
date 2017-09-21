// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

export const UPDATE_CURRENT_VIEW =
  "sportomatic-web/coach/schedule/UPDATE_CURRENT_VIEW";

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentView: "SCHEDULE"
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_CURRENT_VIEW:
      return {
        ...state,
        currentView: action.payload.newView
      };
    default:
      return state;
  }
}

export const scheduleReducer = combineReducers({
  uiConfig: uiConfigReducer
});

// Selectors

const uiConfig = state => state.coach.schedule.uiConfig;

export const selector = createStructuredSelector({
  uiConfig
});

// Action Creators

export function updateView(newView) {
  return {
    type: UPDATE_CURRENT_VIEW,
    payload: {
      newView
    }
  };
}
