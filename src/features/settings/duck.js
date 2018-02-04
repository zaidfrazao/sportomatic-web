import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

const NAMESPACE = "sportomatic-web/settings";

export const UPDATE_TAB = `${NAMESPACE}/UPDATE_TAB`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  currentTab: "PERSONAL"
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return uiConfigInitialState;
    case UPDATE_TAB:
      return {
        ...state,
        currentTab: action.payload.newTab
      };
    default:
      return state;
  }
}

export const settingsReducer = combineReducers({
  uiConfig: uiConfigReducer
});

// Selectors

const uiConfig = state => state.settings.uiConfig;

export const selector = createStructuredSelector({
  uiConfig
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function updateTab(newTab) {
  return {
    type: UPDATE_TAB,
    payload: {
      newTab
    }
  };
}
