// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

export const REQUEST_STAFF = "sportomatic-web/manager/people/REQUEST_STAFF";
export const RECEIVE_STAFF = "sportomatic-web/manager/people/RECEIVE_STAFF";
export const ERROR_LOADING_STAFF =
  "sportomatic-web/manager/people/ERROR_LOADING_STAFF";

// Reducers

function staffReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_STAFF:
      return action.payload.staff;
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isStaffLoading: false
};

function loadingStatusListReducer(
  state = loadingStatusInitialState,
  action = {}
) {
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
    default:
      return state;
  }
}

export const peopleReducer = combineReducers({
  staff: staffReducer,
  loadingStatus: loadingStatusListReducer
});

// Selectors

const staff = state => state.manager.people.staff;
const loadingStatus = state => state.manager.people.loadingStatus;

export const selector = createStructuredSelector({
  staff,
  loadingStatus
});

// Action Creators

export function requestStaff() {
  return {
    type: REQUEST_STAFF
  };
}

export function receiveStaff(staff) {
  return {
    type: RECEIVE_STAFF,
    payload: {
      staff
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
    const staffRef = firebase
      .database()
      .ref(`institution/${institutionID}/private/staff`);

    return staffRef.on("value", snapshot => {
      const staff = snapshot.val();
      if (staff === null) {
        dispatch(receiveStaff({}));
      } else {
        dispatch(receiveStaff(staff));
      }
    });
  };
}
