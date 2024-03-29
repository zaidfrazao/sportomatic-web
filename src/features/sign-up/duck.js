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
export const REQUEST_UPDATE_INVITED_USER = `${NAMESPACE}/REQUEST_UPDATE_INVITED_USER`;
export const RECEIVE_UPDATE_INVITED_USER = `${NAMESPACE}/RECEIVE_UPDATE_INVITED_USER`;
export const ERROR_UPDATING_INVITED_USER = `${NAMESPACE}/ERROR_UPDATING_INVITED_USER`;
export const REQUEST_UPDATE_ACCOUNT = `${NAMESPACE}/REQUEST_UPDATE_ACCOUNT`;
export const RECEIVE_UPDATE_ACCOUNT = `${NAMESPACE}/RECEIVE_UPDATE_ACCOUNT`;
export const ERROR_UPDATING_ACCOUNT = `${NAMESPACE}/ERROR_UPDATING_ACCOUNT`;
export const RESET_STATE = `${NAMESPACE}/RESET_STATE`;
export const REQUEST_USER_INFO = `${NAMESPACE}/REQUEST_USER_INFO`;
export const RECEIVE_USER_INFO = `${NAMESPACE}/RECEIVE_USER_INFO`;
export const ERROR_LOADING_USER_INFO = `${NAMESPACE}/ERROR_LOADING_USER_INFO`;
export const REQUEST_INSTITUTION_NAME = `${NAMESPACE}/REQUEST_INSTITUTION_NAME`;
export const RECEIVE_INSTITUTION_NAME = `${NAMESPACE}/RECEIVE_INSTITUTION_NAME`;
export const ERROR_LOADING_INSTITUTION_NAME = `${NAMESPACE}/ERROR_LOADING_INSTITUTION_NAME`;
export const RESET_USER_ID = `${NAMESPACE}/RESET_USER_ID`;

// Reducers

export const uiConfigInitialState = {
  accountSuccessfullyCreated: false,
  userInfo: {
    info: {
      name: ""
    }
  },
  institutionName: "",
  invalidUserID: false
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
      return uiConfigInitialState;
    case RECEIVE_UPDATE_ACCOUNT:
    case RECEIVE_CREATE_ACCOUNT:
      return {
        ...state,
        accountSuccessfullyCreated: true
      };
    case RECEIVE_USER_INFO:
      return {
        ...state,
        userInfo: action.payload.userInfo
      };
    case RECEIVE_INSTITUTION_NAME:
      return {
        ...state,
        institutionName: action.payload.name
      };
    case ERROR_LOADING_USER_INFO:
      return {
        ...state,
        invalidUserID: true
      };
    case RESET_USER_ID:
      return {
        ...state,
        invalidUserID: false
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isAccountCreationLoading: false,
  isSignInLoading: false,
  isUserInfoLoading: false,
  isInstitutionNameLoading: false
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
    case RECEIVE_SIGN_IN:
    case RECEIVE_ACCOUNT_INFO:
    case ERROR_FETCHING_ACCOUNT_INFO:
    case ERROR_SIGNING_IN:
      return {
        ...state,
        isSignInLoading: false
      };
    case REQUEST_UPDATE_INVITED_USER:
    case REQUEST_CREATE_USER:
      return {
        ...state,
        isAccountCreationLoading: true
      };
    case RECEIVE_UPDATE_ACCOUNT:
    case ERROR_UPDATING_ACCOUNT:
    case ERROR_UPDATING_INVITED_USER:
    case RECEIVE_CREATE_ACCOUNT:
    case ERROR_CREATING_ACCOUNT:
    case ERROR_CREATING_USER:
      return {
        ...state,
        isAccountCreationLoading: false
      };
    case REQUEST_USER_INFO:
      return {
        ...state,
        isUserInfoLoading: true
      };
    case RECEIVE_USER_INFO:
    case ERROR_LOADING_USER_INFO:
      return {
        ...state,
        isUserInfoLoading: false
      };
    case REQUEST_INSTITUTION_NAME:
      return {
        ...state,
        isInstitutionNameLoading: true
      };
    case RECEIVE_INSTITUTION_NAME:
    case ERROR_LOADING_INSTITUTION_NAME:
      return {
        ...state,
        isInstitutionNameLoading: false
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
    case ERROR_UPDATING_INVITED_USER:
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

export function resetUserID() {
  return {
    type: RESET_USER_ID
  };
}

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

export function requestUpdateInvitedUser() {
  return {
    type: REQUEST_UPDATE_INVITED_USER
  };
}

export function receiveUpdateInvitedUser() {
  return {
    type: RECEIVE_UPDATE_INVITED_USER
  };
}

export function errorUpdatingInvitedUser(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_UPDATING_INVITED_USER,
    payload: {
      error
    }
  };
}

export function updateInvitedUser(
  email: string,
  password: string,
  name: string,
  surname: string,
  userID: string
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUpdateInvitedUser());
    const user = firebase.auth().currentUser;

    return user
      .updateEmail(email)
      .then(() => {
        user
          .updatePassword(password)
          .then(() => {
            dispatch(receiveUpdateInvitedUser());
            dispatch(updateAccount(userID, email, name, surname));
          })
          .catch(error => {
            dispatch(errorUpdatingInvitedUser(error));
          });
      })
      .catch(error => {
        dispatch(errorUpdatingInvitedUser(error));
      });
  };
}

export function requestUpdateAccount() {
  return {
    type: REQUEST_UPDATE_ACCOUNT
  };
}

export function receiveUpdateAccount(email: string, userID: string) {
  localStorage.setItem("email", email);
  localStorage.setItem("userID", userID);
  localStorage.setItem("isLoggedIn", "true");

  return {
    type: RECEIVE_UPDATE_ACCOUNT
  };
}

export function errorUpdatingAccount(error: { code: string, message: string }) {
  return {
    type: ERROR_UPDATING_ACCOUNT,
    payload: {
      error
    }
  };
}

export function updateAccount(
  userID: string,
  email: string,
  name: string,
  surname: string
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUpdateAccount());
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
        name: `${name[0]}${surname[0]} Personal`,
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
    batch.update(newUserRef, {
      "completeness.hasPassword": true,
      [`institutions.${userID}`]: {
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
      lastAccessed: {
        role: "ADMIN",
        institutionID: userID
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
        name: `${name[0]}${surname[0]} Personal`,
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
        hasPassword: true,
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

export function requestUserInfo() {
  return {
    type: REQUEST_USER_INFO
  };
}

export function receiveUserInfo(userInfo) {
  return {
    type: RECEIVE_USER_INFO,
    payload: {
      userInfo
    }
  };
}

export function errorLoadingUserInfo() {
  return {
    type: ERROR_LOADING_USER_INFO
  };
}

export function loadUserInfo(userID: string) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestUserInfo());
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(userID);

    userRef
      .get()
      .then(userDoc => {
        if (userDoc.exists) {
          dispatch(receiveUserInfo(userDoc.data()));
          dispatch(loadInstitutionName(userDoc.data().metadata.createdBy));
        } else {
          dispatch(errorLoadingUserInfo());
        }
      })
      .catch(() => {
        dispatch(errorLoadingUserInfo());
      });
  };
}

export function requestInstitutionName() {
  return {
    type: REQUEST_INSTITUTION_NAME
  };
}

export function receiveInstitutionName(name) {
  return {
    type: RECEIVE_INSTITUTION_NAME,
    payload: {
      name
    }
  };
}

export function errorLoadingInstitutionName() {
  return {
    type: ERROR_LOADING_INSTITUTION_NAME
  };
}

export function loadInstitutionName(institutionID: string) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestInstitutionName());
    const institutionRef = firebase
      .firestore()
      .collection("institutions")
      .doc(institutionID);

    institutionRef
      .get()
      .then(doc => {
        if (doc.exists) {
          dispatch(receiveInstitutionName(doc.data().info.name));
        } else {
          dispatch(errorLoadingInstitutionName());
        }
      })
      .catch(() => {
        dispatch(errorLoadingInstitutionName());
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
  let errors = {
    emailErrors: {
      hasError: false,
      message: ""
    },
    passwordErrors: {
      hasError: false,
      message: ""
    },
    passwordResetEmailErrors: {
      hasError: false,
      message: ""
    },
    networkErrors: {
      hasError: false,
      message: ""
    }
  };

  switch (error.code) {
    case "auth/wrong-password":
      errors = {
        ...errors,
        passwordErrors: {
          hasError: true,
          message: "Password entered is incorrect"
        }
      };
      break;
    case "auth/user-not-found":
      errors = {
        ...errors,
        emailErrors: {
          hasError: true,
          message: "No account registered for this email address"
        }
      };
      break;
    case "auth/network-request-failed":
      errors = {
        ...errors,
        networkErrors: {
          hasError: true,
          message:
            "You are currently offline. Please check your internet connection."
        }
      };
      break;
    case "auth/invalid-email":
      errors = {
        ...errors,
        emailErrors: {
          hasError: true,
          message: "This is not a valid email address"
        }
      };
      break;
    default:
      errors = {
        ...errors,
        otherErrors: {
          hasError: true,
          message: error.message
        }
      };
      break;
  }

  return {
    type: ERROR_SIGNING_IN,
    payload: {
      errors
    }
  };
}

export function signIn(email: string, password: string) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestSignIn(email, password));

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(receiveSignIn());
      })
      .catch(error => {
        dispatch(errorSigningIn(error));
      });
  };
}
