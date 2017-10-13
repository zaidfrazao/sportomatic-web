// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

export const REQUEST_WAGES = "sportomatic-web/coach/wages/REQUEST_WAGES";
export const RECEIVE_WAGES = "sportomatic-web/coach/wages/RECEIVE_WAGES";
export const ERROR_LOADING_WAGES =
  "sportomatic-web/coach/wages/ERROR_LOADING_WAGES";

// Reducers

export const uiConfigInitialState = {
  isLoading: false
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isStaffLoading: false,
  isWagesLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case REQUEST_WAGES:
      return {
        ...state,
        isWagesLoading: true
      };
    case ERROR_LOADING_WAGES:
    case RECEIVE_WAGES:
      return {
        ...state,
        isWagesLoading: false
      };
    default:
      return state;
  }
}

function coachWagesReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_WAGES:
      return action.payload.wages;
    default:
      return state;
  }
}

export const wagesReducer = combineReducers({
  uiConfig: uiConfigReducer,
  loadingStatus: loadingStatusReducer,
  coachWages: coachWagesReducer
});

// Selectors

const uiConfig = state => state.coach.wages.uiConfig;
const loadingStatus = state => state.coach.wages.loadingStatus;
const coachWages = state => state.coach.wages.coachWages;

export const selector = createStructuredSelector({
  uiConfig,
  loadingStatus,
  coachWages
});

// Action Creators

export function requestWages() {
  return {
    type: REQUEST_WAGES
  };
}

export function receiveWages(wages) {
  return {
    type: RECEIVE_WAGES,
    payload: {
      wages
    }
  };
}

export function errorLoadingWages(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_WAGES,
    payload: {
      error
    }
  };
}

export function loadCoachWages(institutionID, coachID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestWages());
    const wagesRef = firebase
      .database()
      .ref(`institution/${institutionID}/private/wages/${coachID}`);

    return wagesRef.on("value", snapshot => {
      const wages = snapshot.val();
      if (wages === null) {
        dispatch(receiveWages({}));
      } else {
        dispatch(receiveWages(wages));
      }
    });
  };
}
