import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import { SportomaticFirebaseAPI } from "../../../api/sportmatic-firebase-api";
import * as _ from "lodash";

// Actions

export const UPDATE_TAB = "sportomatic-web/institution/people/UPDATE_TAB";
export const OPEN_DELETE_PERSON_ALERT =
  "sportomatic-web/institution/people/OPEN_DELETE_PERSON_ALERT";
export const CLOSE_DELETE_PERSON_ALERT =
  "sportomatic-web/institution/people/CLOSE_DELETE_PERSON_ALERT";
export const OPEN_EDIT_PERSON_DIALOG =
  "sportomatic-web/institution/people/OPEN_EDIT_PERSON_DIALOG";
export const CLOSE_EDIT_PERSON_DIALOG =
  "sportomatic-web/institution/people/CLOSE_EDIT_PERSON_DIALOG";
export const REQUEST_STAFF = "sportomatic-web/institution/people/REQUEST_STAFF";
export const RECEIVE_STAFF = "sportomatic-web/institution/people/RECEIVE_STAFF";
export const ERROR_LOADING_STAFF =
  "sportomatic-web/institution/people/ERROR_LOADING_STAFF";

// Reducers

export const uiConfigInitialState = {
  currentTab: "STAFF"
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

export const dialogsInitialState = {
  isDeletPersonAlertOpen: false,
  isEditPersonDialogOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case OPEN_DELETE_PERSON_ALERT:
      return {
        ...state,
        isDeletPersonAlertOpen: true
      };
    case CLOSE_DELETE_PERSON_ALERT:
      return {
        ...state,
        isDeletPersonAlertOpen: false
      };
    case OPEN_EDIT_PERSON_DIALOG:
      return {
        ...state,
        isEditPersonDialogOpen: true
      };
    case CLOSE_EDIT_PERSON_DIALOG:
      return {
        ...state,
        isEditPersonDialogOpen: false
      };
    default:
      return state;
  }
}

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
  uiConfig: uiConfigReducer,
  staff: staffReducer,
  dialogs: dialogsReducer,
  loadingStatus: loadingStatusListReducer
});

// Selectors

const uiConfig = state => state.institution.people.uiConfig;
const staff = state => state.institution.people.staff;
const dialogs = state => state.institution.people.dialogs;
const loadingStatus = state => state.institution.people.loadingStatus;

export const selector = createStructuredSelector({
  uiConfig,
  staff,
  dialogs,
  loadingStatus
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

export function openDeletePersonAlert() {
  return {
    type: OPEN_DELETE_PERSON_ALERT
  };
}

export function closeDeletePersonAlert() {
  return {
    type: CLOSE_DELETE_PERSON_ALERT
  };
}

export function openEditPersonDialog() {
  return {
    type: OPEN_EDIT_PERSON_DIALOG
  };
}

export function closeEditPersonDialog() {
  return {
    type: CLOSE_EDIT_PERSON_DIALOG
  };
}

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
    return SportomaticFirebaseAPI.getPeople(institutionID)
      .then(people => {
        dispatch(receiveStaff(people));
      })
      .catch(err => {
        dispatch(errorLoadingStaff({ err }));
      });
  };
}

export function performFilter(userType, sport) {
  return function(dispatch: DispatchAlias) {
    let filteredStaff = staff;
    if (userType !== "") {
      filteredStaff = _.fromPairs(
        _.toPairs(filteredStaff).filter(
          keyValuePairs => keyValuePairs[1].metadata.type === userType
        )
      );
    }

    if (sport !== "") {
      filteredStaff = _.fromPairs(
        _.toPairs(filteredStaff).filter(
          keyValuePairs => keyValuePairs[1].preferredSports === sport
        )
      );
    }

    if (filteredStaff === null) {
      dispatch(receiveStaff({}));
    } else {
      dispatch(receiveStaff(filteredStaff));
    }
  };
}
