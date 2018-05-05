import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/sign-up";

export const UPDATE_STEP = `${NAMESPACE}/UPDATE_STEP`;
export const UPDATE_EMAIL = `${NAMESPACE}/UPDATE_EMAIL`;
export const UPDATE_FIRST_NAME = `${NAMESPACE}/UPDATE_FIRST_NAME`;
export const UPDATE_LAST_NAME = `${NAMESPACE}/UPDATE_LAST_NAME`;
export const UPDATE_COMMUNITY_TYPE = `${NAMESPACE}/UPDATE_COMMUNITY_TYPE`;
export const UPDATE_SUB_TYPE = `${NAMESPACE}/UPDATE_SUB_TYPE`;
export const UPDATE_OTHER_TYPE = `${NAMESPACE}/UPDATE_OTHER_TYPE`;
export const UPDATE_COMMUNITY_NAME = `${NAMESPACE}/UPDATE_COMMUNITY_NAME`;
export const UPDATE_ABBREVIATION = `${NAMESPACE}/UPDATE_ABBREVIATION`;
export const UPDATE_ATHLETE_GENDER = `${NAMESPACE}/UPDATE_ATHLETE_GENDER`;
export const UPDATE_PASSWORD = `${NAMESPACE}/UPDATE_PASSWORD`;
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
export const RESET_USER_ID = `${NAMESPACE}/RESET_USER_ID`;

// Reducers

export const uiConfigInitialState = {
  currentStep: "email-entry",
  accountSuccessfullyCreated: false,
  invitedUserID: "",
  isJoining: false,
  invalidUserID: false
};

export function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_STEP:
      return {
        ...state,
        currentStep: action.payload.newStep
      };
    case RESET_STATE:
      return uiConfigInitialState;
    case RECEIVE_UPDATE_ACCOUNT:
    case RECEIVE_CREATE_ACCOUNT:
      return {
        ...state,
        accountSuccessfullyCreated: true
      };
    case REQUEST_USER_INFO:
      return {
        ...state,
        invitedUserID: action.payload.userID,
        isJoining: true
      };
    case ERROR_SIGNING_IN:
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

export const formInfoInitialState = {
  email: "",
  firstName: "",
  lastName: "",
  communityType: "",
  subType: "",
  otherType: "",
  communityName: "",
  abbreviation: "",
  athleteGender: "",
  password: "",
  tempPassword: ""
};

export function formInfoReducer(state = formInfoInitialState, action = {}) {
  switch (action.type) {
    case RECEIVE_USER_INFO:
      return {
        ...state,
        email: action.payload.userInfo.info.email,
        firstName: action.payload.userInfo.info.name,
        lastName: action.payload.userInfo.info.surname,
        tempPassword: action.payload.userInfo.metadata.tempPassword
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload.newEmail
      };
    case UPDATE_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload.newFirstName
      };
    case UPDATE_LAST_NAME:
      return {
        ...state,
        lastName: action.payload.newLastName
      };
    case UPDATE_COMMUNITY_TYPE:
      return {
        ...state,
        communityType: action.payload.newCommunityType
      };
    case UPDATE_SUB_TYPE:
      return {
        ...state,
        subType: action.payload.newSubType
      };
    case UPDATE_OTHER_TYPE:
      return {
        ...state,
        otherType: action.payload.newOtherType
      };
    case UPDATE_COMMUNITY_NAME:
      return {
        ...state,
        communityName: action.payload.newCommunityName
      };
    case UPDATE_ABBREVIATION:
      return {
        ...state,
        abbreviation: action.payload.newAbbreviation
      };
    case UPDATE_ATHLETE_GENDER:
      return {
        ...state,
        athleteGender: action.payload.newAthleteGender
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload.newPassword
      };
    case RESET_STATE:
      return formInfoInitialState;
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
    default:
      return state;
  }
}

export const signUp2Reducer = combineReducers({
  uiConfig: uiConfigReducer,
  formInfo: formInfoReducer,
  loadingStatus: loadingStatusReducer
});

// Selectors

const uiConfig = state => state.signUp2.uiConfig;
const formInfo = state => state.signUp2.formInfo;
const loadingStatus = state => state.signUp2.loadingStatus;

export const selector = createStructuredSelector({
  uiConfig,
  formInfo,
  loadingStatus
});

// Action Creators

export function updateStep(newStep) {
  return {
    type: UPDATE_STEP,
    payload: {
      newStep
    }
  };
}

export function updateEmail(newEmail) {
  return {
    type: UPDATE_EMAIL,
    payload: {
      newEmail
    }
  };
}

export function updateFirstName(newFirstName) {
  return {
    type: UPDATE_FIRST_NAME,
    payload: {
      newFirstName
    }
  };
}

export function updateLastName(newLastName) {
  return {
    type: UPDATE_LAST_NAME,
    payload: {
      newLastName
    }
  };
}

export function updateCommunityType(newCommunityType) {
  return {
    type: UPDATE_COMMUNITY_TYPE,
    payload: {
      newCommunityType
    }
  };
}

export function updateSubType(newSubType) {
  return {
    type: UPDATE_SUB_TYPE,
    payload: {
      newSubType
    }
  };
}

export function updateOtherType(newOtherType) {
  return {
    type: UPDATE_OTHER_TYPE,
    payload: {
      newOtherType
    }
  };
}

export function updateCommunityName(newCommunityName) {
  return {
    type: UPDATE_COMMUNITY_NAME,
    payload: {
      newCommunityName
    }
  };
}

export function updateAbbreviation(newAbbreviation) {
  return {
    type: UPDATE_ABBREVIATION,
    payload: {
      newAbbreviation
    }
  };
}

export function updateAthleteGender(newAthleteGender) {
  return {
    type: UPDATE_ATHLETE_GENDER,
    payload: {
      newAthleteGender
    }
  };
}

export function updatePassword(newPassword) {
  return {
    type: UPDATE_PASSWORD,
    payload: {
      newPassword
    }
  };
}

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
  surname: string,
  communityInfo: {
    type: string,
    subType: string,
    otherType: string,
    name: string,
    abbreviation: string,
    athleteGender: string
  }
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCreateUser());

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch(createAccount(user.uid, email, name, surname, communityInfo));
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
      }
    });

    return batch
      .commit()
      .then(user => {
        dispatch(receiveUpdateAccount(email, userID));
      })
      .catch(error => {
        dispatch(errorUpdatingAccount(error));
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
  surname: string,
  communityInfo: {
    type: string,
    subType: string,
    otherType: string,
    name: string,
    abbreviation: string,
    athleteGender: string
  }
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestCreateAccount());
    const db = firebase.firestore();
    let batch = db.batch();

    let subType = communityInfo.subType;
    if (subType === "") {
      subType = communityInfo.otherType;
    }

    let ageGroups = [];
    switch (subType) {
      case "Primary School":
      case "Preparatory School":
        ageGroups = ["Open", 13, 12, 11, 10, 9, 8, 7, 6];
        break;
      case "High School":
        ageGroups = ["Open", 19, 18, 17, 16, 15, 14, 13];
        break;
      case "College":
      case "U/18's":
        ageGroups = ["Open", 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6];
        break;
      case "University":
      case "Adults":
        ageGroups = ["Open", "Seniors", "Juniors", 24, 23, 22, 21, 20, 19, 18];
        break;
      default:
        ageGroups = ["Open", "Seniors", "Juniors"];
        break;
    }

    const newInstitutionRef = db.collection("institutions").doc();
    const newInstitutionID = newInstitutionRef._key.path.segments[1];

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
        ageGroups,
        subType,
        abbreviation: communityInfo.abbreviation,
        gender: communityInfo.athleteGender,
        name: communityInfo.name,
        type: communityInfo.type,
        divisions: ["1st Team", "2nd Team", "A", "B", "C", "D"],
        emblemURL: "",
        phoneNumber: "",
        physicalAddress: "",
        publicEmail: "",
        sports: [
          "Athletics",
          "Cricket",
          "Hockey",
          "Netball",
          "Rugby",
          "Soccer",
          "Swimming",
          "Tennis"
        ]
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
        hasPassword: true,
        hasPhoneNumber: false,
        hasProfilePicture: false,
        hasSports: false
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
        [newInstitutionID]: {
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
        institutionID: newInstitutionID
      },
      metadata: {
        createdVia: "SIGN_UP",
        creationDate: new Date(Date.now()),
        status: "ACTIVE"
      },
      tutorialStatus: {
        lessons: {
          dashboard: "NOT_STARTED",
          hours: "NOT_STARTED",
          people: "NOT_STARTED",
          results: "NOT_STARTED",
          schedule: "NOT_STARTED",
          teams: "NOT_STARTED",
          wages: "NOT_STARTED"
        }
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

export function requestUserInfo(userID) {
  return {
    type: REQUEST_USER_INFO,
    payload: {
      userID
    }
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
    dispatch(requestUserInfo(userID));
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(userID);

    userRef
      .get()
      .then(userDoc => {
        if (userDoc.exists) {
          dispatch(receiveUserInfo(userDoc.data()));
        } else {
          dispatch(errorLoadingUserInfo());
        }
      })
      .catch(() => {
        dispatch(errorLoadingUserInfo());
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
