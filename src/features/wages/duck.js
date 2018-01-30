import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/wages";

export const UPDATE_TAB = `${NAMESPACE}/UPDATE_TAB`;
export const REQUEST_STAFF = `${NAMESPACE}/REQUEST_STAFF`;
export const RECEIVE_STAFF = `${NAMESPACE}/RECEIVE_STAFF`;
export const ERROR_LOADING_STAFF = `${NAMESPACE}/ERROR_LOADING_STAFF`;
export const REQUEST_WAGES_BY_DATE = `${NAMESPACE}/REQUEST_WAGES_BY_DATE`;
export const RECEIVE_WAGES_BY_DATE = `${NAMESPACE}/RECEIVE_WAGES_BY_DATE`;
export const ERROR_LOADING_WAGES_BY_DATE = `${NAMESPACE}/ERROR_LOADING_WAGES_BY_DATE`;
export const REQUEST_WAGES_BY_COACH = `${NAMESPACE}/REQUEST_WAGES_BY_COACH`;
export const RECEIVE_WAGES_BY_COACH = `${NAMESPACE}/RECEIVE_WAGES_BY_COACH`;
export const ERROR_LOADING_WAGES_BY_COACH = `${NAMESPACE}/ERROR_LOADING_WAGES_BY_COACH`;
export const APPLY_FILTERS = `${NAMESPACE}/APPLY_FILTERS`;
export const UPDATE_SEARCH = `${NAMESPACE}/UPDATE_SEARCH`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentTab: "OVERVIEW",
  lastVisible: ""
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return uiConfigInitialState;
    case UPDATE_TAB:
      return {
        ...state,
        currentTab: action.payload.newTab
      };
    case RECEIVE_WAGES_BY_DATE:
      return {
        ...state,
        lastVisible: action.payload.lastVisible
      };
    default:
      return state;
  }
}

function staffReducer(state = {}, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return {};
    case RECEIVE_STAFF:
      return action.payload.staff;
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isStaffLoading: false,
  isWagesByDateLoading: false,
  isWagesByCoachLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return loadingStatusInitialState;
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
    case REQUEST_WAGES_BY_DATE:
      return {
        ...state,
        isWagesByDateLoading: true
      };
    case ERROR_LOADING_WAGES_BY_DATE:
    case RECEIVE_WAGES_BY_DATE:
      return {
        ...state,
        isWagesByDateLoading: false
      };
    case REQUEST_WAGES_BY_COACH:
      return {
        ...state,
        isWagesByCoachLoading: true
      };
    case ERROR_LOADING_WAGES_BY_COACH:
    case RECEIVE_WAGES_BY_COACH:
      return {
        ...state,
        isWagesByCoachLoading: false
      };
    default:
      return state;
  }
}

function wagesByDateReducer(state = {}, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return {};
    case RECEIVE_WAGES_BY_DATE:
      return {
        ...state,
        ...action.payload.wages
      };
    default:
      return state;
  }
}

function wagesByCoachReducer(state = {}, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return {};
    case RECEIVE_WAGES_BY_COACH:
      return action.payload.wages;
    default:
      return state;
  }
}

export const filtersInitialState = {
  sport: "All",
  searchText: ""
};

function filterReducer(state = filtersInitialState, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return filtersInitialState;
    case APPLY_FILTERS:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        searchText: action.payload.searchText
      };
    default:
      return state;
  }
}

export const wagesReducer = combineReducers({
  uiConfig: uiConfigReducer,
  staff: staffReducer,
  loadingStatus: loadingStatusReducer,
  wagesByDate: wagesByDateReducer,
  wagesByCoach: wagesByCoachReducer,
  filters: filterReducer
});

// Selectors

const uiConfig = state => state.wages.uiConfig;
const staff = state => state.wages.staff;
const loadingStatus = state => state.wages.loadingStatus;
const wagesByDate = state => state.wages.wagesByDate;
const wagesByCoach = state => state.wages.wagesByCoach;
const filters = state => state.wages.filters;

export const selector = createStructuredSelector({
  uiConfig,
  staff,
  loadingStatus,
  wagesByDate,
  wagesByCoach,
  filters
});

// Action Creators

export function applyFilters(sport) {
  return {
    type: APPLY_FILTERS,
    payload: {
      sport
    }
  };
}

export function updateSearch(searchText) {
  return {
    type: UPDATE_SEARCH,
    payload: {
      searchText
    }
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
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.status`, "==", "STAFF");

    return staffRef.onSnapshot(querySnapshot => {
      let staff = {};
      querySnapshot.forEach(doc => {
        staff[doc.id] = doc.data();
      });
      dispatch(receiveStaff(staff));
    });
  };
}

export function requestWagesByDate() {
  return {
    type: REQUEST_WAGES_BY_DATE
  };
}

export function receiveWagesByDate(wages, lastVisible) {
  return {
    type: RECEIVE_WAGES_BY_DATE,
    payload: {
      wages,
      lastVisible
    }
  };
}

export function errorLoadingWagesByDate(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_WAGES_BY_DATE,
    payload: {
      error
    }
  };
}

export function loadWagesByDate(institutionID, startAfter = "") {
  return function(dispatch: DispatchAlias) {
    dispatch(requestWagesByDate());

    let wagesRef = {};
    if (startAfter === "") {
      wagesRef = firebase
        .firestore()
        .collection("wages")
        .orderBy("date", "desc")
        .limit(10)
        .where("institutionID", "==", institutionID)
        .where("date", "<", new Date(Date.now()));
    } else {
      wagesRef = firebase
        .firestore()
        .collection("wages")
        .orderBy("date", "desc")
        .startAfter(startAfter)
        .limit(10)
        .where("institutionID", "==", institutionID)
        .where("date", "<", new Date(Date.now()));
    }

    return wagesRef.onSnapshot(querySnapshot => {
      let wages = {};
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.forEach(doc => {
        wages[doc.id] = doc.data();
      });
      dispatch(receiveWagesByDate(wages, lastVisible));
    });
  };
}

export function requestWagesByCoach() {
  return {
    type: REQUEST_WAGES_BY_COACH
  };
}

export function receiveWagesByCoach(wages) {
  return {
    type: RECEIVE_WAGES_BY_COACH,
    payload: {
      wages
    }
  };
}

export function errorLoadingWagesByCoach(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_WAGES_BY_COACH,
    payload: {
      error
    }
  };
}

export function loadWagesByCoach(institutionID, coachID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestWagesByCoach());

    let wagesRef = firebase
      .firestore()
      .collection("wages")
      .orderBy("date", "desc")
      .where("institutionID", "==", institutionID)
      .where("coachID", "==", coachID);

    return wagesRef.onSnapshot(querySnapshot => {
      let wages = {};
      querySnapshot.forEach(doc => {
        wages[doc.id] = doc.data();
      });
      dispatch(receiveWagesByCoach(wages));
    });
  };
}
