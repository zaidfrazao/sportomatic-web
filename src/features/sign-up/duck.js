import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/sign-up";

export const REQUEST_SIGN_IN = `${NAMESPACE}/REQUEST_SIGN_IN`;
export const RECEIVE_SIGN_IN = `${NAMESPACE}/RECEIVE_SIGN_IN`;
export const ERROR_SIGNING_IN = `${NAMESPACE}/ERROR_SIGNING_IN`;
export const REQUEST_ACCOUNT_INFO = `${NAMESPACE}/REQUEST_ACCOUNT_INFO`;
export const RECEIVE_ACCOUNT_INFO = `${NAMESPACE}/RECEIVE_ACCOUNT_INFO`;
export const ERROR_FETCHING_ACCOUNT_INFO = `${NAMESPACE}/ERROR_FETCHING_ACCOUNT_INFO`;
export const REQUEST_CREATE_USER = `${NAMESPACE}/REQUEST_CREATE_USER`;
export const RECEIVE_CREATE_USER = `${NAMESPACE}/RECEIVE_CREATE_USER`;
export const ERROR_CREATING_USER = `${NAMESPACE}/ERROR_CREATING_USER`;
export const REQUEST_CREATE_ACCOUNT = `${NAMESPACE}/REQUEST_CREATE_ACCOUNT`;
export const RECEIVE_CREATE_ACCOUNT = `${NAMESPACE}/RECEIVE_CREATE_ACCOUNT`;
export const ERROR_CREATING_ACCOUNT = `${NAMESPACE}/ERROR_CREATING_ACCOUNT`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;

// Reducers

export const uiConfigInitialState = {
  accountSuccessfullyCreated: false
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
      return uiConfigInitialState;
    case RECEIVE_CREATE_ACCOUNT:
      return {
        ...state,
        accountSuccessfullyCreated: true
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isAccountCreationLoading: false,
  isSignInLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
      return loadingStatusInitialState;
    case REQUEST_SIGN_IN:
      return {
        ...state,
        isSignInLoading: true
      };
    case RECEIVE_ACCOUNT_INFO:
    case ERROR_FETCHING_ACCOUNT_INFO:
    case ERROR_SIGNING_IN:
      return {
        ...state,
        isSignInLoading: false
      };
    case REQUEST_CREATE_USER:
      return {
        ...state,
        isAccountCreationLoading: true
      };
    case RECEIVE_CREATE_ACCOUNT:
    case ERROR_CREATING_ACCOUNT:
    case ERROR_CREATING_USER:
      return {
        ...state,
        isAccountCreationLoading: false
      };
    default:
      return state;
  }
}

export const dialogsInitialState = {
  isAccountExistsModalOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
      return dialogsInitialState;
    case ERROR_CREATING_USER:
      return {
        ...state,
        isAccountExistsModalOpen: true
      };
    default:
      return state;
  }
}

export const signUpReducer = combineReducers({
  dialogs: dialogsReducer,
  loadingStatus: loadingStatusReducer,
  uiConfig: uiConfigReducer
});

// Selectors

const loadingStatus = state => state.signUp.loadingStatus;
const dialogs = state => state.signUp.dialogs;
const uiConfig = state => state.signUp.uiConfig;

export const selector = createStructuredSelector({
  loadingStatus,
  dialogs,
  uiConfig
});

// Action Creators

export function resetState() {
  return {
    type: RESET_STATE
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

export function createUser(
  email: string,
  password: string,
  name: string,
  surname: string
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCreateUser());

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch(createAccount(user.uid, email, name, surname));
      })
      .catch(error => {
        dispatch(errorCreatingUser(error));
      });
  };
}

export function requestCreateAccount() {
  return {
    type: REQUEST_CREATE_ACCOUNT
  };
}

export function receiveCreateAccount(email: string, userID: string) {
  localStorage.setItem("email", email);
  localStorage.setItem("userID", userID);
  localStorage.setItem("isLoggedIn", "true");

  return {
    type: RECEIVE_CREATE_ACCOUNT
  };
}

export function errorCreatingAccount(error: { code: string, message: string }) {
  return {
    type: ERROR_CREATING_ACCOUNT,
    payload: {
      error
    }
  };
}

export function createAccount(
  userID: string,
  email: string,
  name: string,
  surname: string
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCreateAccount());
    const db = firebase.firestore();
    let batch = db.batch();

    const newInstitutionRef = db.collection("institutions").doc(userID);
    batch.set(newInstitutionRef, {
      completeness: {
        hasTeams: false,
        hasPeople: false,
        hasEvents: false,
        hasHours: false,
        hasResults: false,
        hasWages: false
      },
      info: {
        abbreviation: `${name[0]}${surname[0]}`,
        ageGroups: ["Open", 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6],
        divisions: ["1st Team", "2nd Team", "A", "B", "C", "D"],
        emblemURL: "",
        gender: "MIXED",
        name: "Personal",
        phoneNumber: "",
        physicalAddress: "",
        publicEmail: email,
        sports: [
          "Athletics",
          "Cricket",
          "Hockey",
          "Netball",
          "Rugby",
          "Soccer",
          "Swimming",
          "Tennis"
        ],
        type: "Personal"
      },
      metadata: {
        creationDate: new Date(Date.now()),
        status: "ACTIVE"
      },
      paymentDefaults: {
        rates: {
          overtime: 150,
          standard: 100,
          salary: 6000
        },
        maxOvertimeHours: 3,
        payDay: {
          day: 1,
          isEndOfTheMonth: false
        },
        type: "HOURLY"
      },
      permissions: {
        coaches: {
          events: {
            canCancel: false,
            canCreate: false,
            canEdit: false
          },
          results: {
            canApprove: false,
            canEdit: true
          },
          teams: {
            canEdit: false
          }
        },
        managers: {
          events: {
            canCancel: true,
            canCreate: false,
            canEdit: true
          },
          teams: {
            canEdit: false
          },
          wages: {
            canCreate: false,
            canEdit: false,
            canView: false
          }
        }
      }
    });
    const newUserRef = db.collection("users").doc(userID);
    batch.set(newUserRef, {
      completeness: {
        hasName: true,
        hasSurname: true,
        hasEmail: true,
        hasPhoneNumber: false,
        hasProfilePicture: false,
        hasSports: false
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
      },
      info: {
        name,
        surname,
        email,
        phoneNumber: "",
        profilePictureURL: "",
        sports: {
          Unknown: true
        }
      },
      institutions: {
        [userID]: {
          paymentDefaults: {
            rates: {
              overtime: 150,
              standard: 100,
              salary: 6000
            },
            type: "HOURLY"
          },
          roles: {
            admin: "APPROVED",
            coach: "APPROVED",
            manager: "APPROVED"
          },
          status: "STAFF"
        }
      },
      lastAccessed: {
        role: "ADMIN",
        institutionID: userID
      },
      metadata: {
        createdVia: "SIGN_UP",
        creationDate: new Date(Date.now()),
        status: "ACTIVE"
      }
    });

    return batch
      .commit()
      .then(user => {
        dispatch(receiveCreateAccount(email, userID));
      })
      .catch(error => {
        dispatch(errorCreatingAccount(error));
      });
  };
}
