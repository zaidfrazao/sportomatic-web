import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

const NAMESPACE = "sportomatic-web/landing-page";

export const UPDATE_ROLE_INDEX = `${NAMESPACE}/UPDATE_ROLE_INDEX`;

// Reducers

export const uiConfigInitialState = {
  roleIndex: 0
};

export function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_ROLE_INDEX:
      return {
        ...state,
        roleIndex: action.payload.newIndex
      };
    default:
      return state;
  }
}

export const landingPageReducer = combineReducers({
  uiConfig: uiConfigReducer
});

// Selectors

const uiConfig = state => state.landingPage.uiConfig;

export const selector = createStructuredSelector({
  uiConfig
});

// Action Creators

export function updateRoleIndex(newIndex) {
  return {
    type: UPDATE_ROLE_INDEX,
    payload: {
      newIndex
    }
  };
}
