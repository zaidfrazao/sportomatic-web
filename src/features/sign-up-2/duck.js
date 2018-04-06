import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

const NAMESPACE = "sportomatic-web/sign-up";

export const UPDATE_STEP = `${NAMESPACE}/UPDATE_STEP`;

// Reducers

export const uiConfigInitialState = {
  currentStep: "email-entry"
};

export function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_STEP:
      return {
        ...state,
        currentStep: action.payload.newStep
      };
    default:
      return state;
  }
}

export const signUp2Reducer = combineReducers({
  uiConfig: uiConfigReducer
});

// Selectors

const uiConfig = state => state.signUp2.uiConfig;

export const selector = createStructuredSelector({
  uiConfig
});

// Action Creators

export function updateStep(newStep) {
  return {
    type: UPDATE_STEP,
    payload: {
      newStep
    }
  };
}
