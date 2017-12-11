import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import _ from "lodash";
import { SportomaticFirebaseAPI } from "../../../api/sportmatic-firebase-api";
// Actions

export const REQUEST_STAFF = "sportomatic-web/admin/wages/REQUEST_STAFF";
export const RECEIVE_STAFF = "sportomatic-web/admin/wages/RECEIVE_STAFF";
export const ERROR_LOADING_STAFF =
  "sportomatic-web/admin/wages/ERROR_LOADING_STAFF";
export const REQUEST_WAGES = "sportomatic-web/admin/wages/REQUEST_WAGES";
export const RECEIVE_WAGES = "sportomatic-web/admin/wages/RECEIVE_WAGES";
export const ERROR_LOADING_WAGES =
  "sportomatic-web/admin/wages/ERROR_LOADING_WAGES";

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

function coachesReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_STAFF:
      return action.payload.coaches;
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
    case REQUEST_STAFF:
      return {
        ...state,
        isStaffLoading: true
      };
    case ERROR_LOADING_STAFF:
    case RECEIVE_STAFF:
      return {
        ...state,
        isStaffLoading: false
      };
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
  coaches: coachesReducer,
  loadingStatus: loadingStatusReducer,
  coachWages: coachWagesReducer
});

// Selectors

const uiConfig = state => state.institution.wages.uiConfig;
const coaches = state => state.institution.wages.coaches;
const loadingStatus = state => state.institution.wages.loadingStatus;
const coachWages = state => state.institution.wages.coachWages;

export const selector = createStructuredSelector({
  uiConfig,
  coaches,
  loadingStatus,
  coachWages
});

// Action Creators

export function requestStaff() {
  return {
    type: REQUEST_STAFF
  };
}

export function receiveStaff(staff) {
  const coaches = _.fromPairs(
    _.toPairs(staff).filter(([id, info]) => info.metadata.type === "COACH")
  );
  return {
    type: RECEIVE_STAFF,
    payload: {
      coaches
    }
  };
}

export function errorLoadingStaff(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_STAFF,
    payload: {
      error
    }
  };
}

export function loadStaff(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestStaff());
    return SportomaticFirebaseAPI.getPeople(institutionID)
      .then(staff => {
        dispatch(receiveStaff(staff));
      })
      .catch(err => {
        dispatch(errorLoadingStaff(err));
      });
  };
}

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
    return SportomaticFirebaseAPI.getCoachWages(institutionID, coachID)
      .then(wages => {
        dispatch(receiveWages(wages));
      })
      .catch(err => {
        dispatch(errorLoadingWages(err));
      });
  };
}
