import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
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
export const REQUEST_COACHES =
  "sportomatic-web/institution/people/REQUEST_COACHES";
export const RECEIVE_COACHES =
  "sportomatic-web/institution/people/RECEIVE_COACHES";
export const ERROR_LOADING_COACHES =
  "sportomatic-web/institution/people/ERROR_LOADING_COACHES";
export const REQUEST_MANAGERS =
  "sportomatic-web/institution/people/REQUEST_MANAGERS";
export const RECEIVE_MANAGERS =
  "sportomatic-web/institution/people/RECEIVE_MANAGERS";
export const ERROR_LOADING_MANAGERS =
  "sportomatic-web/institution/people/ERROR_LOADING_MANAGERS";

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
    case RECEIVE_COACHES:
      return {
        ...state,
        ...action.payload.coaches
      };
    case RECEIVE_MANAGERS:
      return {
        ...state,
        ...action.payload.managers
      };
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
    case REQUEST_COACHES:
    case REQUEST_MANAGERS:
      return {
        ...state,
        isStaffLoading: true
      };
    case ERROR_LOADING_COACHES:
    case RECEIVE_COACHES:
    case ERROR_LOADING_MANAGERS:
    case RECEIVE_MANAGERS:
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

export function requestCoaches() {
  return {
    type: REQUEST_COACHES
  };
}

export function receiveCoaches(coaches) {
  return {
    type: RECEIVE_COACHES,
    payload: {
      coaches
    }
  };
}

export function errorLoadingCoaches(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_COACHES,
    payload: {
      error
    }
  };
}

export function loadCoaches(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCoaches());

    const coachesRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.coachStatus`, "==", "APPROVED");

    return coachesRef.onSnapshot(querySnapshot => {
      let coaches = {};
      querySnapshot.forEach(doc => {
        coaches[doc.id] = doc.data();
      });
      dispatch(receiveCoaches(coaches));
    });
  };
}

export function requestManagers() {
  return {
    type: REQUEST_MANAGERS
  };
}

export function receiveManagers(managers) {
  return {
    type: RECEIVE_MANAGERS,
    payload: {
      managers
    }
  };
}

export function errorLoadingManagers(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_MANAGERS,
    payload: {
      error
    }
  };
}

export function loadManagers(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestManagers());

    const managersRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.managerStatus`, "==", "APPROVED");

    return managersRef.onSnapshot(querySnapshot => {
      let managers = {};
      querySnapshot.forEach(doc => {
        managers[doc.id] = doc.data();
      });
      dispatch(receiveManagers(managers));
    });
  };
}
