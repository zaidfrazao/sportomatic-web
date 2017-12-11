import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import _ from "lodash";

// Actions

export const UPDATE_TAB = "sportomatic-web/admin/hours/UPDATE_TAB";
export const REQUEST_STAFF = "sportomatic-web/admin/hours/REQUEST_STAFF";
export const RECEIVE_STAFF = "sportomatic-web/admin/hours/RECEIVE_STAFF";
export const ERROR_LOADING_STAFF =
  "sportomatic-web/admin/hours/ERROR_LOADING_STAFF";
export const REQUEST_EVENTS = "sportomatic-web/admin/hours/REQUEST_EVENTS";
export const RECEIVE_EVENTS = "sportomatic-web/admin/hours/RECEIVE_EVENTS";
export const ERROR_LOADING_EVENTS =
  "sportomatic-web/admin/hours/ERROR_LOADING_EVENTS";
export const REQUEST_SIGN_IN = "sportomatic-web/admin/hours/REQUEST_SIGN_IN";
export const RECEIVE_SIGN_IN = "sportomatic-web/admin/hours/RECEIVE_SIGN_IN";
export const ERROR_SIGNING_IN = "sportomatic-web/admin/hours/ERROR_SIGNING_IN";
export const REQUEST_SIGN_OUT = "sportomatic-web/admin/hours/REQUEST_SIGN_OUT";
export const RECEIVE_SIGN_OUT = "sportomatic-web/admin/hours/RECEIVE_SIGN_OUT";
export const ERROR_SIGNING_OUT =
  "sportomatic-web/admin/hours/ERROR_SIGNING_OUT";
export const REQUEST_APPROVE_HOURS =
  "sportomatic-web/admin/hours/REQUEST_APPROVE_HOURS";
export const RECEIVE_APPROVE_HOURS =
  "sportomatic-web/admin/hours/RECEIVE_APPROVE_HOURS";
export const ERROR_APPROVING_HOURS =
  "sportomatic-web/admin/hours/ERROR_APPROVING_HOURS";

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentTab: "IN_PROGRESS"
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
  isEventsLoading: false
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
    case REQUEST_EVENTS:
      return {
        ...state,
        isEventsLoading: true
      };
    case ERROR_LOADING_EVENTS:
    case RECEIVE_EVENTS:
      return {
        ...state,
        isEventsLoading: false
      };
    default:
      return state;
  }
}

function eventsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.payload.events;
    default:
      return state;
  }
}

export const hoursReducer = combineReducers({
  uiConfig: uiConfigReducer,
  coaches: coachesReducer,
  loadingStatus: loadingStatusReducer,
  events: eventsReducer
});

// Selectors

const uiConfig = state => state.institution.hours.uiConfig;
const coaches = state => state.institution.hours.coaches;
const loadingStatus = state => state.institution.hours.loadingStatus;
const events = state => state.institution.hours.events;

export const selector = createStructuredSelector({
  uiConfig,
  coaches,
  loadingStatus,
  events
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

export function requestEvents() {
  return {
    type: REQUEST_EVENTS
  };
}

export function receiveEvents(events) {
  return {
    type: RECEIVE_EVENTS,
    payload: {
      events
    }
  };
}

export function errorLoadingEvents(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_EVENTS,
    payload: {
      error
    }
  };
}

export function loadEvents(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEvents());
    const eventsRef = firebase
      .database()
      .ref(`institution/${institutionID}/private/events`);

    return eventsRef.on("value", snapshot => {
      const events = snapshot.val();
      if (events === null) {
        dispatch(receiveEvents({}));
      } else {
        dispatch(receiveEvents(events));
      }
    });
  };
}

export function requestSignIn() {
  return {
    type: REQUEST_SIGN_IN
  };
}

export function receiveSignIn() {
  return {
    type: RECEIVE_SIGN_IN
  };
}

export function errorSigningIn(error: { code: string, message: string }) {
  return {
    type: ERROR_SIGNING_IN,
    payload: {
      error
    }
  };
}

export function signIn(institutionID, eventInfo, coachID, signInTime) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSignIn());

    const { year, month, eventID, startTime } = eventInfo;

    const signInTimeDelta =
      (new Date(
        2017,
        1,
        1,
        signInTime.slice(0, 2),
        signInTime.slice(3, 5)
      ).getTime() -
        new Date(
          2017,
          1,
          1,
          startTime.slice(0, 2),
          startTime.slice(3, 5)
        ).getTime()) /
      1000 /
      60;

    let updates = {};
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/signInTime`
    ] = signInTime;
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/signInTimeDelta`
    ] = signInTimeDelta;
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/status`
    ] =
      "AWAITING_SIGN_OUT";

    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => dispatch(receiveSignIn()))
      .catch(error => dispatch(errorSigningIn(error)));
  };
}

export function requestSignOut() {
  return {
    type: REQUEST_SIGN_OUT
  };
}

export function receiveSignOut() {
  return {
    type: RECEIVE_SIGN_OUT
  };
}

export function errorSigningOut(error: { code: string, message: string }) {
  return {
    type: ERROR_SIGNING_OUT,
    payload: {
      error
    }
  };
}

export function signOut(institutionID, eventInfo, coachID, signOutTime) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSignIn());

    const { year, month, eventID, endTime } = eventInfo;

    const signOutTimeDelta =
      (new Date(
        2017,
        1,
        1,
        signOutTime.slice(0, 2),
        signOutTime.slice(3, 5)
      ).getTime() -
        new Date(
          2017,
          1,
          1,
          endTime.slice(0, 2),
          endTime.slice(3, 5)
        ).getTime()) /
      1000 /
      60;

    let updates = {};
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/signOutTime`
    ] = signOutTime;
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/status`
    ] =
      "AWAITING_APPROVAL";
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/signOutTimeDelta`
    ] = signOutTimeDelta;

    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => dispatch(receiveSignOut()))
      .catch(error => dispatch(errorSigningOut(error)));
  };
}

export function requestApproveHours() {
  return {
    type: REQUEST_APPROVE_HOURS
  };
}

export function receiveApproveHours() {
  return {
    type: RECEIVE_APPROVE_HOURS
  };
}

export function errorApprovingHours(error: { code: string, message: string }) {
  return {
    type: ERROR_APPROVING_HOURS,
    payload: {
      error
    }
  };
}

export function approveHours(institutionID, eventInfo, coachID, wageInfo) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestApproveHours());

    const {
      signInTime,
      signOutTime,
      standardHourlyRate,
      overtimeHourlyRate
    } = wageInfo;
    const {
      year,
      month,
      eventID,
      startTime,
      endTime,
      date,
      eventTitle
    } = eventInfo;

    const signInTimeValue = new Date(
      2017,
      1,
      1,
      signInTime.slice(0, 2),
      signInTime.slice(3, 5)
    ).getTime();
    const signOutTimeValue = new Date(
      2017,
      1,
      1,
      signOutTime.slice(0, 2),
      signOutTime.slice(3, 5)
    ).getTime();
    const scheduledStartTimeValue = new Date(
      2017,
      1,
      1,
      startTime.slice(0, 2),
      startTime.slice(3, 5)
    ).getTime();
    const scheduledEndTimeValue = new Date(
      2017,
      1,
      1,
      endTime.slice(0, 2),
      endTime.slice(3, 5)
    ).getTime();

    let standardHoursStartTime = signInTimeValue;
    let standardHoursEndTime = signOutTimeValue;
    const overtimeHoursStartTime = scheduledEndTimeValue;
    const overtimeHoursEndTime = signOutTimeValue;
    let standardTimeWorked = 0;
    let extraTimeWorked = 0;
    let workedOvertime = false;

    if (signInTimeValue < scheduledStartTimeValue) {
      standardHoursStartTime = scheduledStartTimeValue;
    }
    if (signOutTimeValue > scheduledEndTimeValue) {
      standardHoursEndTime = scheduledEndTimeValue;
      workedOvertime = true;
    }
    if (workedOvertime) {
      extraTimeWorked = overtimeHoursEndTime - overtimeHoursStartTime;
    }
    standardTimeWorked = standardHoursEndTime - standardHoursStartTime;

    let standardHoursWorked = Math.floor(standardTimeWorked / 1000 / 60 / 60);
    const leftoverStandardMinutesWorked =
      (standardTimeWorked - standardHoursWorked * 1000 * 60 * 60) / 1000 / 60;
    let overTimeHoursWorked = Math.floor(extraTimeWorked / 1000 / 60 / 60);
    const leftoverOvertimeMinutesWorked =
      (extraTimeWorked - overTimeHoursWorked * 1000 * 60 * 60) / 1000 / 60;

    if (leftoverStandardMinutesWorked > 20) {
      standardHoursWorked += 1;
    }
    if (leftoverOvertimeMinutesWorked > 20) {
      overTimeHoursWorked += 1;
    }

    const wage =
      standardHoursWorked * standardHourlyRate +
      overTimeHoursWorked * overtimeHourlyRate;

    const newWage = {
      type: "HOURLY",
      date: date,
      title: eventTitle,
      hours: {
        standard: standardHoursWorked,
        overtime: overTimeHoursWorked
      },
      rates: {
        stardard: standardHourlyRate,
        overtime: overtimeHourlyRate
      },
      wage
    };

    let updates = {};
    updates[
      `institution/${institutionID}/private/events/${year}/${month}/${eventID}/coaches/${coachID}/hours/status`
    ] =
      "APPROVED";
    updates[
      `institution/${institutionID}/private/wages/${coachID}/${year}/${month}/${eventID}`
    ] = newWage;

    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => dispatch(receiveApproveHours()))
      .catch(error => dispatch(errorApprovingHours(error)));
  };
}
