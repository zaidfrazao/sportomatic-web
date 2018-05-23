import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import "firebase/functions";
import { TeamAlias } from "../../models/aliases";

// Actions

const NAMESPACE = "sportomatic-web/people";

export const REQUEST_STAFF = `${NAMESPACE}/REQUEST_STAFF`;
export const RECEIVE_STAFF = `${NAMESPACE}/RECEIVE_STAFF`;
export const REQUEST_ADMIN = `${NAMESPACE}/REQUEST_ADMIN`;
export const RECEIVE_ADMIN = `${NAMESPACE}/RECEIVE_ADMIN`;
export const REQUEST_TEAMS = `${NAMESPACE}/REQUEST_TEAMS`;
export const RECEIVE_TEAMS = `${NAMESPACE}/RECEIVE_TEAMS`;
export const APPLY_FILTERS = `${NAMESPACE}/APPLY_FILTERS`;
export const OPEN_INVITE_PERSON_MODAL = `${NAMESPACE}/OPEN_INVITE_PERSON_MODAL`;
export const CLOSE_INVITE_PERSON_MODAL = `${NAMESPACE}/CLOSE_INVITE_PERSON_MODAL`;
export const OPEN_POST_INVITE_MODAL = `${NAMESPACE}/OPEN_POST_INVITE_MODAL`;
export const CLOSE_POST_INVITE_MODAL = `${NAMESPACE}/CLOSE_POST_INVITE_MODAL`;
export const REQUEST_INVITEE = `${NAMESPACE}/REQUEST_INVITEE`;
export const RECEIVE_INVITEE = `${NAMESPACE}/RECEIVE_INVITEE`;
export const ERROR_FETCHING_INVITEE_INFO = `${NAMESPACE}/ERROR_FETCHING_INVITEE_INFO`;
export const REQUEST_CREATE_USER = `${NAMESPACE}/REQUEST_CREATE_USER`;
export const RECEIVE_CREATE_USER = `${NAMESPACE}/RECEIVE_CREATE_USER`;
export const ERROR_CREATING_USER = `${NAMESPACE}/ERROR_CREATING_USER`;
export const REQUEST_INVITE_PERSON = `${NAMESPACE}/REQUEST_INVITE_PERSON`;
export const RECEIVE_INVITE_PERSON = `${NAMESPACE}/RECEIVE_INVITE_PERSON`;
export const ERROR_INVITING_PERSON = `${NAMESPACE}/ERROR_INVITING_PERSON`;
export const REQUEST_EVENTS_BY_COACH = `${NAMESPACE}/REQUEST_EVENTS_BY_COACH`;
export const RECEIVE_EVENTS_BY_COACH = `${NAMESPACE}/RECEIVE_EVENTS_BY_COACH`;
export const ERROR_LOADING_EVENTS_BY_COACH = `${NAMESPACE}/ERROR_LOADING_EVENTS_BY_COACH`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;
export const REQUEST_RESEND_INVITE = `${NAMESPACE}/REQUEST_RESEND_INVITE`;
export const RECEIVE_RESEND_INVITE = `${NAMESPACE}/RECEIVE_RESEND_INVITE`;
export const ERROR_RESENDING_INVITE = `${NAMESPACE}/ERROR_RESENDING_INVITE`;
export const CLOSE_RESEND_INVITE_ALERT = `${NAMESPACE}/CLOSE_RESEND_INVITE_ALERT`;
export const REQUEST_WAGES_BY_COACH = `${NAMESPACE}/REQUEST_WAGES_BY_COACH`;
export const RECEIVE_WAGES_BY_COACH = `${NAMESPACE}/RECEIVE_WAGES_BY_COACH`;
export const ERROR_LOADING_WAGES_BY_COACH = `${NAMESPACE}/ERROR_LOADING_WAGES_BY_COACH`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {
  currentTab: "STAFF",
  inviteeID: "",
  inviteeInfo: {},
  resendInfo: {
    id: "",
    name: ""
  }
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return uiConfigInitialState;
    case RECEIVE_INVITEE:
      return {
        ...state,
        inviteeID: action.payload.id,
        inviteeInfo: action.payload.info
      };
    case REQUEST_RESEND_INVITE:
      return {
        ...state,
        resendInfo: {
          id: action.payload.id,
          name: action.payload.name
        }
      };
    default:
      return state;
  }
}

export const filtersInitialState = {
  sport: "All",
  type: "All",
  searchText: ""
};

function filterReducer(state = filtersInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return filtersInitialState;
    case APPLY_FILTERS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export const dialogsInitialState = {
  isInvitePersonModalOpen: false,
  isResendInviteAlertOpen: false,
  postInviteAlert: {
    heading: "",
    message: "",
    isOpen: false
  }
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return dialogsInitialState;
    case OPEN_POST_INVITE_MODAL:
      return {
        ...state,
        postInviteAlert: {
          heading: action.payload.heading,
          message: action.payload.message,
          isOpen: true
        }
      };
    case CLOSE_POST_INVITE_MODAL:
      return {
        ...state,
        postInviteAlert: {
          heading: "",
          message: "",
          isOpen: false
        }
      };
    case OPEN_INVITE_PERSON_MODAL:
      return {
        ...state,
        isInvitePersonModalOpen: true
      };
    case RECEIVE_INVITE_PERSON:
    case ERROR_INVITING_PERSON:
    case RECEIVE_CREATE_USER:
    case ERROR_CREATING_USER:
    case CLOSE_INVITE_PERSON_MODAL:
      return {
        ...state,
        isInvitePersonModalOpen: false
      };
    case RECEIVE_RESEND_INVITE:
    case ERROR_RESENDING_INVITE:
      return {
        ...state,
        isResendInviteAlertOpen: true
      };
    case CLOSE_RESEND_INVITE_ALERT:
      return {
        ...state,
        isResendInviteAlertOpen: false
      };
    default:
      return state;
  }
}

function usersReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return {};
    case RECEIVE_ADMIN:
    case RECEIVE_STAFF:
      return {
        ...state,
        ...action.payload.people
      };
    default:
      return state;
  }
}

function teamsReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_TEAMS:
    case SIGN_OUT:
      return {};
    case RECEIVE_TEAMS:
      return action.payload.teams;
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isStaffLoading: false,
  isTeamsLoading: false,
  isInviteeInfoLoading: false,
  isCreateUserLoading: false,
  isInviteUserLoading: false,
  isEventsByCoachLoading: false,
  isResendInviteLoading: false,
  isWagesByCoachLoading: false
};

function loadingStatusListReducer(
  state = loadingStatusInitialState,
  action = {}
) {
  switch (action.type) {
    case RESET_STATE:
    case SIGN_OUT:
      return loadingStatusInitialState;
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
    case REQUEST_STAFF:
      return {
        ...state,
        isStaffLoading: true
      };
    case RECEIVE_STAFF:
      return {
        ...state,
        isStaffLoading: false
      };
    case REQUEST_TEAMS:
      return {
        ...state,
        isTeamsLoading: true
      };
    case RECEIVE_TEAMS:
      return {
        ...state,
        isTeamsLoading: false
      };
    case REQUEST_INVITEE:
      return {
        ...state,
        isInviteeInfoLoading: true
      };
    case RECEIVE_INVITEE:
    case ERROR_FETCHING_INVITEE_INFO:
      return {
        ...state,
        isInviteeInfoLoading: false
      };
    case REQUEST_INVITE_PERSON:
      return {
        ...state,
        isInviteUserLoading: true
      };
    case RECEIVE_INVITE_PERSON:
    case ERROR_INVITING_PERSON:
      return {
        ...state,
        isInviteUserLoading: false
      };
    case REQUEST_CREATE_USER:
      return {
        ...state,
        isCreateUserLoading: true
      };
    case RECEIVE_CREATE_USER:
    case ERROR_CREATING_USER:
      return {
        ...state,
        isCreateUserLoading: false
      };
    case REQUEST_EVENTS_BY_COACH:
      return {
        ...state,
        isEventsByCoachLoading: true
      };
    case RECEIVE_EVENTS_BY_COACH:
    case ERROR_LOADING_EVENTS_BY_COACH:
      return {
        ...state,
        isEventsByCoachLoading: false
      };
    case REQUEST_RESEND_INVITE:
      return {
        ...state,
        isResendInviteLoading: true
      };
    case RECEIVE_RESEND_INVITE:
    case ERROR_RESENDING_INVITE:
      return {
        ...state,
        isResendInviteLoading: false
      };
    default:
      return state;
  }
}

function eventsByCoachReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_EVENTS_BY_COACH:
    case SIGN_OUT:
      return {};
    case RECEIVE_EVENTS_BY_COACH:
      return action.payload.events;
    default:
      return state;
  }
}

function wagesByCoachReducer(state = {}, action = {}) {
  switch (action.type) {
    case RESET_STATE:
    case REQUEST_WAGES_BY_COACH:
    case SIGN_OUT:
      return {};
    case RECEIVE_WAGES_BY_COACH:
      return action.payload.wages;
    default:
      return state;
  }
}

export const peopleReducer = combineReducers({
  uiConfig: uiConfigReducer,
  users: usersReducer,
  dialogs: dialogsReducer,
  loadingStatus: loadingStatusListReducer,
  wagesByCoach: wagesByCoachReducer,
  teams: teamsReducer,
  filters: filterReducer,
  eventsByCoach: eventsByCoachReducer
});

// Selectors

const uiConfig = state => state.people.uiConfig;
const users = state => state.people.users;
const teams = state => state.people.teams;
const dialogs = state => state.people.dialogs;
const loadingStatus = state => state.people.loadingStatus;
const filters = state => state.people.filters;
const eventsByCoach = state => state.people.eventsByCoach;
const wagesByCoach = state => state.people.wagesByCoach;

export const selector = createStructuredSelector({
  uiConfig,
  users,
  dialogs,
  loadingStatus,
  teams,
  filters,
  eventsByCoach,
  wagesByCoach
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function applyFilters(sport, type) {
  return {
    type: APPLY_FILTERS,
    payload: {
      sport,
      type
    }
  };
}

export function closeResendInviteAlert() {
  return {
    type: CLOSE_RESEND_INVITE_ALERT
  };
}

export function openInvitePersonModal() {
  return {
    type: OPEN_INVITE_PERSON_MODAL
  };
}

export function closeInvitePersonModal() {
  return {
    type: CLOSE_INVITE_PERSON_MODAL
  };
}

export function openPostInviteAlert(heading, message) {
  return {
    type: OPEN_POST_INVITE_MODAL,
    payload: {
      heading,
      message
    }
  };
}

export function closePostInviteAlert() {
  return {
    type: CLOSE_POST_INVITE_MODAL
  };
}

export function requestAdmins() {
  return {
    type: REQUEST_ADMIN
  };
}

export function receiveAdmins(people) {
  return {
    type: RECEIVE_ADMIN,
    payload: {
      people
    }
  };
}

export function loadAdmins(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAdmins());

    const adminRef = firebase
      .firestore()
      .collection("users")
      .where(`institutions.${institutionID}.status`, "==", "ADMIN");

    return adminRef.onSnapshot(querySnapshot => {
      let admins = {};
      querySnapshot.forEach(doc => {
        admins[doc.id] = doc.data();
      });
      dispatch(receiveAdmins(admins));
    });
  };
}

export function requestStaff() {
  return {
    type: REQUEST_STAFF
  };
}

export function receiveStaff(people) {
  return {
    type: RECEIVE_STAFF,
    payload: {
      people
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

export function requestTeams() {
  return {
    type: REQUEST_TEAMS
  };
}

export function receiveTeams(teams: Array<TeamAlias>) {
  return {
    type: RECEIVE_TEAMS,
    payload: {
      teams
    }
  };
}

export function loadTeams(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestTeams());

    const teamsRef = firebase
      .firestore()
      .collection("teams")
      .where("institutionID", "==", institutionID);

    return teamsRef.onSnapshot(querySnapshot => {
      let teams = {};
      querySnapshot.forEach(doc => {
        teams[doc.id] = doc.data();
      });
      dispatch(receiveTeams(teams));
    });
  };
}

export function requestInvitee() {
  return {
    type: REQUEST_INVITEE
  };
}

export function receiveInvitee(id, info) {
  return {
    type: RECEIVE_INVITEE,
    payload: {
      id,
      info
    }
  };
}

export function errorFetchingInviteeInfo(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_FETCHING_INVITEE_INFO,
    payload: {
      error
    }
  };
}

export function fetchInviteeInfo(
  type,
  firstName,
  lastName,
  email,
  institutionID,
  creatorID
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestInvitee());

    const inviteeRef = firebase
      .firestore()
      .collection("users")
      .where("info.email", "==", email);

    return inviteeRef
      .get()
      .then(querySnapshot => {
        let info = {};
        let id = "";
        querySnapshot.forEach(doc => {
          id = doc.id;
          info = doc.data();
        });
        dispatch(receiveInvitee(id, info));

        if (
          info.institutions[institutionID] &&
          info.institutions[institutionID].status !== "REMOVED"
        ) {
          dispatch(
            openPostInviteAlert(
              "Already in Community",
              `${firstName} ${lastName} is already a member of your community.`
            )
          );
        } else {
          dispatch(invitePerson(id, institutionID, type, firstName, lastName));
        }
      })
      .catch(error => {
        dispatch(errorFetchingInviteeInfo(error));
        dispatch(
          createUser(email, firstName, lastName, type, creatorID, institutionID)
        );
      });
  };
}

export function requestCreateUser() {
  return {
    type: REQUEST_CREATE_USER
  };
}

export function receiveCreateUser() {
  return {
    type: RECEIVE_CREATE_USER
  };
}

export function errorCreatingUser(error: { code: string, message: string }) {
  return {
    type: ERROR_CREATING_USER,
    payload: {
      error
    }
  };
}

export function generateRandomPassword(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function createUser(
  email,
  firstName,
  lastName,
  type,
  creatorID,
  institutionID
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCreateUser());
    const db = firebase.firestore();

    const randomisedPassword = generateRandomPassword(10);

    const userInfo = {
      completeness: {
        hasName: true,
        hasPassword: false,
        hasSurname: true,
        hasEmail: true,
        hasPhoneNumber: false,
        hasProfilePicture: false,
        hasSports: false
      },
      info: {
        email,
        name: firstName,
        surname: lastName,
        phoneNumber: "",
        profilePictureURL: "",
        sports: {}
      },
      institutions: {
        [institutionID]: {
          roles: {
            admin: type === "ADMIN" ? "APPROVED" : "N/A",
            coach: "N/A",
            manager: "N/A"
          },
          status: type
        }
      },
      lastAccessed: {
        accountType: "ADMIN",
        institutionID
      },
      metadata: {
        creationDate: new Date(Date.now()),
        createdVia: "INVITE",
        createdByInstitution: institutionID,
        createdByUser: creatorID,
        status: "INACTIVE",
        tempPassword: randomisedPassword
      },
      tutorialStatus: {
        lessons: {
          dashboard: "NOT_STARTED",
          schedule: "NOT_STARTED",
          hours: "NOT_STARTED",
          results: "NOT_STARTED",
          wages: "NOT_STARTED",
          people: "NOT_STARTED",
          teams: "NOT_STARTED"
        }
      }
    };

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, randomisedPassword)
      .then(user => {
        db
          .collection("users")
          .doc(user.uid)
          .set(userInfo)
          .then(() => {
            dispatch(receiveCreateUser());
            dispatch(
              openPostInviteAlert(
                "Person Invited",
                `${firstName} ${lastName} was invited to your community.`
              )
            );
          })
          .catch(error => {
            dispatch(errorCreatingUser(error));
            dispatch(
              openPostInviteAlert(
                "Error Occured",
                `An unknown error occurred while trying to invite ${firstName} ${lastName}.`
              )
            );
          });
      })
      .catch(error => {
        dispatch(errorCreatingUser(error));
        dispatch(
          openPostInviteAlert(
            "Error Occured",
            `An unknown error occurred while trying to invite ${firstName} ${lastName}.`
          )
        );
      });
  };
}

export function requestInvitePerson() {
  return {
    type: REQUEST_INVITE_PERSON
  };
}

export function receiveInvitePerson() {
  return {
    type: RECEIVE_INVITE_PERSON
  };
}

export function errorInvitingPerson(error: { code: string, message: string }) {
  return {
    type: ERROR_INVITING_PERSON,
    payload: {
      error
    }
  };
}

export function invitePerson(userID, institutionID, type, firstName, lastName) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestInvitePerson());
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(userID);

    return userRef
      .update({
        [`institutions.${institutionID}`]: {
          roles: {
            admin: type === "ADMIN" ? "APPROVED" : "N/A",
            coach: "N/A",
            manager: "N/A"
          },
          status: type
        }
      })
      .then(() => {
        dispatch(receiveInvitePerson());
        dispatch(
          openPostInviteAlert(
            "Person Invited",
            `${firstName} ${lastName} was invited to your community.`
          )
        );
      })
      .catch(error => {
        dispatch(errorInvitingPerson(error));
        dispatch(
          openPostInviteAlert(
            "Error Occured",
            `An unknown error occurred while trying to invite ${firstName} ${lastName}.`
          )
        );
      });
  };
}

export function requestEventsByCoach() {
  return {
    type: REQUEST_EVENTS_BY_COACH
  };
}

export function receiveEventsByCoach(events) {
  return {
    type: RECEIVE_EVENTS_BY_COACH,
    payload: {
      events
    }
  };
}

export function errorLoadingEventsByCoach(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_LOADING_EVENTS_BY_COACH,
    payload: {
      error
    }
  };
}

export function loadEventsByCoach(institutionID, coachID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEventsByCoach());

    let eventsRef = firebase
      .firestore()
      .collection("events")
      .where("institutionID", "==", institutionID)
      .where(`coaches.${coachID}.status`, "==", "ACTIVE");

    return eventsRef.onSnapshot(querySnapshot => {
      let events = {};
      querySnapshot.forEach(doc => {
        events[doc.id] = doc.data();
      });
      dispatch(receiveEventsByCoach(events));
    });
  };
}

export function requestResendInvite(id, name) {
  return {
    type: REQUEST_RESEND_INVITE,
    payload: {
      id,
      name
    }
  };
}

export function receiveResendInvite() {
  return {
    type: RECEIVE_RESEND_INVITE
  };
}

export function errorResendingInvite(error: { code: string, message: string }) {
  return {
    type: ERROR_RESENDING_INVITE,
    payload: {
      error
    }
  };
}

export function resendInvite(
  inviteeName,
  inviteeID,
  inviteeEmail,
  inviterName,
  communityName
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestResendInvite(inviteeID, inviteeName));

    const sendInvite = firebase.functions().httpsCallable("resendInviteEmail");

    return sendInvite({
      inviteeName,
      inviteeID,
      inviteeEmail,
      inviterName,
      communityName
    })
      .then(result => {
        dispatch(receiveResendInvite());
      })
      .catch(error => {
        dispatch(errorResendingInvite(error));
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
