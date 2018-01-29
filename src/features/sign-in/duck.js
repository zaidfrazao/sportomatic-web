import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import { isValidEmail } from "../../utils/validation";
import { UserAlias } from "../../models/aliases";

// Actions

export const REQUEST_SIGN_IN = "sportomatic-web/sign-in/REQUEST_SIGN_IN";
export const RECEIVE_SIGN_IN = "sportomatic-web/sign-in/RECEIVE_SIGN_IN";
export const ERROR_SIGNING_IN = "sportomatic-web/sign-in/ERROR_SIGNING_IN";
export const UPDATE_EMAIL = "sportomatic-web/sign-in/UPDATE_EMAIL";
export const UPDATE_PASSWORD = "sportomatic-web/sign-in/UPDATE_PASSWORD";
const UPDATE_PASSWORD_RESET_EMAIL_ADDRESS =
  "sportomatic-web/sign-in/UPDATE_PASSWORD_RESET_EMAIL_ADDRESS";
export const EMAIL_ERROR_CHECK = "sportomatic-web/sign-in/EMAIL_ERROR_CHECK";
export const PASSWORD_ERROR_CHECK =
  "sportomatic-web/sign-in/PASSWORD_ERROR_CHECK";
export const REQUEST_ACCOUNT_INFO =
  "sportomatic-web/sign-in/REQUEST_ACCOUNT_INFO";
export const RECEIVE_ACCOUNT_INFO =
  "sportomatic-web/sign-in/RECEIVE_ACCOUNT_INFO";
export const ERROR_FETCHING_ACCOUNT_INFO =
  "sportomatic-web/sign-in/ERROR_FETCHING_ACCOUNT_INFO";
export const INIT_USER = "sportomatic-web/config/INIT_USER";
export const OPEN_PASSWORD_RESET_DIALOG =
  "sportomatic-web/sign-in/OPEN_PASSWORD_RESET_DIALOG";
export const CLOSE_PASSWORD_RESET_DIALOG =
  "sportomatic-web/sign-in/CLOSE_PASSWORD_RESET_DIALOG";
export const UPDATE_PASSWORD_RESET_EMAIL =
  "sportomatic-web/sign-in/UPDATE_PASSWORD_RESET_EMAIL";
export const REQUEST_PASSWORD_RESET =
  "sportomatic-web/sign-in/REQUEST_PASSWORD_RESET";
export const RECEIVE_PASSWORD_RESET =
  "sportomatic-web/sign-in/RECEIVE_PASSWORD_RESET";
export const ERROR_RESETTING_PASSWORD =
  "sportomatic-web/sign-in/ERROR_RESETTING_PASSWORD";
const CLOSE_PASSWORD_RESET_SUCCESS_MODAL =
  "sportomatic-web/sign-in/CLOSE_PASSWORD_RESET_SUCCESS_MODAL";
export const CLOSE_NETWORK_FAILURE_MODAL =
  "sportomatic-web/sign-in/CLOSE_NETWORK_FAILURE_MODAL";

// Reducers

export const userInfoInitialState = {
  email: "",
  password: "",
  passwordResetEmail: "",
  isLoggedIn: false,
  type: "",
  status: "ACTIVE"
};

export function userInfoReducer(state = userInfoInitialState, action = {}) {
  switch (action.type) {
    case INIT_USER:
      return {
        ...state,
        email: action.payload.user.email,
        isLoggedIn: action.payload.user.isLoggedIn,
        type: action.payload.user.type
      };
    case RECEIVE_ACCOUNT_INFO:
      return {
        ...state,
        isLoggedIn: true,
        type: action.payload.type,
        status: action.payload.status,
        email: "",
        password: ""
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload.newEmail
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload.newPassword
      };
    case UPDATE_PASSWORD_RESET_EMAIL:
      return {
        ...state,
        passwordResetEmail: action.payload.newEmail
      };
    case OPEN_PASSWORD_RESET_DIALOG:
      return {
        ...state,
        passwordResetEmail: action.payload.initEmail
      };
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isSignInLoading: false,
  isPasswordResetLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
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
    case REQUEST_PASSWORD_RESET:
      return {
        ...state,
        isPasswordResetLoading: true
      };
    case RECEIVE_PASSWORD_RESET:
    case ERROR_RESETTING_PASSWORD:
      return {
        ...state,
        isPasswordResetLoading: false
      };
    default:
      return state;
  }
}

export const errorsInitialState = {
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

function errorsReducer(state = errorsInitialState, action = {}) {
  switch (action.type) {
    case EMAIL_ERROR_CHECK:
      return {
        ...state,
        emailErrors: action.payload
      };
    case PASSWORD_ERROR_CHECK:
      return {
        ...state,
        passwordErrors: action.payload
      };
    case ERROR_SIGNING_IN:
    case ERROR_RESETTING_PASSWORD:
      return action.payload.errors;
    case ERROR_FETCHING_ACCOUNT_INFO:
      return {
        ...state,
        networkErrors: {
          hasError: true,
          message:
            "You have been disconnected from the internet. Please reconnect and try again."
        }
      };
    case RECEIVE_ACCOUNT_INFO:
      return errorsInitialState;
    default:
      return state;
  }
}

export const dialogsInitialState = {
  isPasswordResetDialogOpen: false,
  isPasswordResetSuccessModalOpen: false,
  isNetworkFailureModalOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case OPEN_PASSWORD_RESET_DIALOG:
      return {
        ...state,
        isPasswordResetDialogOpen: true
      };
    case RECEIVE_PASSWORD_RESET:
      return {
        ...state,
        isPasswordResetDialogOpen: false,
        isPasswordResetSuccessModalOpen: true
      };
    case CLOSE_PASSWORD_RESET_DIALOG:
      return {
        ...state,
        isPasswordResetDialogOpen: false
      };
    case ERROR_SIGNING_IN:
    case ERROR_RESETTING_PASSWORD:
      return {
        ...state,
        isNetworkFailureModalOpen: action.payload.errors.networkErrors.hasError
      };

    case ERROR_FETCHING_ACCOUNT_INFO:
      return {
        ...state,
        isNetworkFailureModalOpen: true
      };
    case CLOSE_PASSWORD_RESET_SUCCESS_MODAL:
      return {
        ...state,
        isPasswordResetSuccessModalOpen: false
      };
    case CLOSE_NETWORK_FAILURE_MODAL:
      return {
        ...state,
        isNetworkFailureModalOpen: false
      };
    case RECEIVE_ACCOUNT_INFO:
      return dialogsInitialState;
    default:
      return state;
  }
}

export const signInReducer = combineReducers({
  userInfo: userInfoReducer,
  loadingStatus: loadingStatusReducer,
  errors: errorsReducer,
  dialogs: dialogsReducer
});

// Selectors

const loadingStatus = state => state.signIn.loadingStatus;
const userInfo = state => state.signIn.userInfo;
const errors = state => state.signIn.errors;
const dialogs = state => state.signIn.dialogs;

export const selector = createStructuredSelector({
  loadingStatus,
  userInfo,
  errors,
  dialogs
});

// Action Creators

export function initUser() {
  const user = {
    userID: localStorage.userID || "",
    email: localStorage.email || "",
    isLoggedIn: localStorage.isLoggedIn === "true" || false,
    type: localStorage.type || ""
  };

  return {
    type: INIT_USER,
    payload: {
      user
    }
  };
}

export function openPasswordResetDialog(initEmail: string) {
  return {
    type: OPEN_PASSWORD_RESET_DIALOG,
    payload: {
      initEmail
    }
  };
}

export function closePasswordResetDialog() {
  return {
    type: CLOSE_PASSWORD_RESET_DIALOG
  };
}

export function updateEmail(newEmail: string) {
  return {
    type: UPDATE_EMAIL,
    payload: {
      newEmail
    }
  };
}

export function updatePassword(newPassword: string) {
  return {
    type: UPDATE_PASSWORD,
    payload: {
      newPassword
    }
  };
}

export function updatePasswordResetEmail(newEmail: string) {
  return {
    type: UPDATE_PASSWORD_RESET_EMAIL,
    payload: {
      newEmail
    }
  };
}

export function checkEmail(email: string) {
  let hasError = false;
  let message = "";

  if (email.length === 0) {
    hasError = true;
    message = "Please provide an email address";
  } else if (!isValidEmail(email)) {
    hasError = true;
    message = "This is not a valid email address";
  }

  return {
    type: EMAIL_ERROR_CHECK,
    payload: {
      hasError,
      message
    }
  };
}

export function checkPassword(password: string) {
  let hasError = false;
  let message = "";

  if (password.length === 0) {
    hasError = true;
    message = "Please enter a password";
  } else if (password.length < 6) {
    hasError = true;
    message = "Must be at least 6 characters long";
  }

  return {
    type: PASSWORD_ERROR_CHECK,
    payload: {
      hasError,
      message
    }
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
        dispatch(fetchAccountInfo(user.uid, email));
        dispatch(receiveSignIn());
      })
      .catch(error => {
        dispatch(errorSigningIn(error));
      });
  };
}

export function updatePasswordResetEmailAddress(newEmail: string) {
  return {
    type: UPDATE_PASSWORD_RESET_EMAIL_ADDRESS,
    payload: {
      newEmail
    }
  };
}

export function closePasswordResetSuccessModal() {
  return {
    type: CLOSE_PASSWORD_RESET_SUCCESS_MODAL
  };
}

export function closeNetworkFailureModal() {
  return {
    type: CLOSE_NETWORK_FAILURE_MODAL
  };
}

export function requestPasswordReset() {
  return {
    type: REQUEST_PASSWORD_RESET
  };
}

export function receivePasswordReset() {
  return {
    type: RECEIVE_PASSWORD_RESET
  };
}

export function errorResettingPassword(error: {
  code: string,
  message: string
}) {
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
    },
    otherErrors: {
      hasError: false,
      message: ""
    }
  };

  switch (error.code) {
    case "auth/user-not-found":
      errors = {
        ...errors,
        passwordResetEmailErrors: {
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
        passwordResetEmailErrors: {
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
    type: ERROR_RESETTING_PASSWORD,
    payload: {
      errors
    }
  };
}

export function sendPasswordResetEmail(email: string) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestPasswordReset());

    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch(receivePasswordReset());
      })
      .catch(error => {
        dispatch(errorResettingPassword(error));
      });
  };
}

export function requestAccountInfo() {
  return {
    type: REQUEST_ACCOUNT_INFO
  };
}

export function receiveAccountInfo(
  userID: string,
  email: string,
  type: string,
  status: string,
  accountInfo: UserAlias
) {
  localStorage.setItem("email", email);
  localStorage.setItem("userID", userID);
  localStorage.setItem("type", "ADMIN");
  localStorage.setItem("isLoggedIn", "true");

  return {
    type: RECEIVE_ACCOUNT_INFO,
    payload: {
      type: accountInfo.lastAccessed.accountType,
      status: accountInfo.metadata.status,
      accountInfo
    }
  };
}

export function errorFetchingAccountInfo() {
  return {
    type: ERROR_FETCHING_ACCOUNT_INFO
  };
}

export function fetchAccountInfo(userID: string, email: string) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAccountInfo());
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(userID);

    userRef
      .get()
      .then(userDoc => {
        if (userDoc.exists) {
          const accountInfo = userDoc.data();
          dispatch(
            receiveAccountInfo(
              userID,
              email,
              accountInfo.lastAccessed.accountType,
              accountInfo.metadata.status,
              accountInfo
            )
          );
        } else {
          dispatch(errorFetchingAccountInfo());
        }
      })
      .catch(() => {
        dispatch(errorFetchingAccountInfo());
      });
  };
}
