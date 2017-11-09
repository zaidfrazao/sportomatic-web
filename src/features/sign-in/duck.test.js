import * as imports from "./duck.js";
import { sampleStore } from "../../models/sampleStore";

// Reducer tests
const initialState = {
  userInfo: imports.userInfoInitialState,
  loadingStatus: imports.loadingStatusInitialState
};

describe("Reducers", () => {
  describe("userInfoReducer", () => {
    const { signInReducer } = imports;

    describe("INIT_USER", () => {
      const { INIT_USER } = imports;
      test("Initialises signIn state", () => {
        const action = {
          type: INIT_USER,
          payload: {
            user: {
              email: "user@mail.com",
              isLoggedIn: true,
              type: "Coach"
            }
          }
        };

        const newState = signInReducer(initialState, action);
        expect(newState.userInfo.email).toEqual(action.payload.user.email);
        expect(newState.userInfo.isLoggedIn).toEqual(
          action.payload.user.isLoggedIn
        );
        expect(newState.userInfo.type).toEqual(action.payload.user.type);
      });
    });

    describe("UPDATE_PASSWORD", () => {
      const { UPDATE_PASSWORD } = imports;
      test("Updates password", () => {
        const action = {
          type: UPDATE_PASSWORD,
          payload: {
            newPassword: "ThisisNopAssword"
          }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.userInfo.password).toEqual(action.payload.newPassword);
      });
    });
    describe("OPEN_PASSWORD_RESET_DIALOG", () => {
      const { OPEN_PASSWORD_RESET_DIALOG } = imports;
      test("Opens password reset dialog", () => {
        const action = {
          type: OPEN_PASSWORD_RESET_DIALOG,
          payload: { initEmail: "user@mail.com" }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.userInfo.passwordResetEmail).toEqual(
          action.payload.initEmail
        );
      });
    });

    describe("UPDATE_EMAIL", () => {
      const { UPDATE_EMAIL } = imports;
      test("Update user email", () => {
        const action = {
          type: UPDATE_EMAIL,
          payload: { newEmail: "newuser@mail.com" }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.userInfo.email).toEqual(action.payload.newEmail);
      });
    });

    describe("RECEIVE_ACCOUNT_INFO", () => {
      const { RECEIVE_ACCOUNT_INFO } = imports;
      test("Receives user account info", () => {
        const action = {
          type: RECEIVE_ACCOUNT_INFO,
          payload: {
            type: "coach",
            status: "ACTIVE"
          }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.userInfo.type).toEqual(action.payload.type);
        expect(newState.userInfo.status).toEqual(action.payload.status);
        expect(newState.userInfo.isLoggedIn).toBe(true);
        //why is email being set to "" ?
        expect(newState.userInfo.email).toEqual("");
        expect(newState.userInfo.password).toEqual("");
      });
    });
  });

  describe("loadingStatusReducer", () => {
    const { signInReducer } = imports;
    describe("REQUEST_SIGN_IN", () => {
      const { REQUEST_SIGN_IN } = imports;
      test("Sets isSignInLoading to true", () => {
        const action = { type: REQUEST_SIGN_IN };
        const newState = signInReducer(initialState, action);
        expect(newState.loadingStatus.isSignInLoading).toBe(true);
      });
    });

    describe("RECEIVE_ACCOUNT_INFO", () => {
      const { RECEIVE_ACCOUNT_INFO } = imports;
      test("Sets isSignInLoading to false", () => {
        const action = {
          type: RECEIVE_ACCOUNT_INFO,
          payload: {
            type: "coach",
            status: "ACTIVE"
          }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.loadingStatus.isSignInLoading).toBe(false);
      });
    });

    describe("ERROR_FETCHING_ACCOUNT_INFO", () => {
      const { ERROR_FETCHING_ACCOUNT_INFO } = imports;
      test("Sets isSignInLoading to false", () => {
        const action = { type: ERROR_FETCHING_ACCOUNT_INFO };
        const newState = signInReducer(initialState, action);
        expect(newState.loadingStatus.isSignInLoading).toBe(false);
      });
    });

    describe("ERROR_SIGNING_IN", () => {
      const { ERROR_SIGNING_IN } = imports;
      test("Sets isSignInLoading to false", () => {
        const action = {
          type: ERROR_SIGNING_IN,
          payload: {
            errors: {
              emailErrors: {
                hasError: false,
                message: ""
              },
              networkErrors: {
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
              }
            }
          }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.loadingStatus.isSignInLoading).toBe(false);
      });
    });

    describe("REQUEST_PASSWORD_RESET", () => {
      const { REQUEST_PASSWORD_RESET } = imports;
      test("Sets isPasswordResetLoading to true", () => {
        const action = { type: REQUEST_PASSWORD_RESET };
        const newState = signInReducer(initialState, action);
        expect(newState.loadingStatus.isPasswordResetLoading).toBe(true);
      });
    });

    describe("RECEIVE_PASSWORD_RESET", () => {
      const { RECEIVE_PASSWORD_RESET } = imports;
      test("Sets isPasswordResetLoading to false", () => {
        const action = { type: RECEIVE_PASSWORD_RESET };
        const newState = signInReducer(initialState, action);
        expect(newState.loadingStatus.isPasswordResetLoading).toBe(false);
      });
    });

    describe("ERROR_RESETTING_PASSWORD", () => {
      const { ERROR_RESETTING_PASSWORD } = imports;
      test("Sets isPasswordResetLoading to false", () => {
        const action = {
          type: ERROR_RESETTING_PASSWORD,
          payload: {
            errors: {
              emailErrors: {
                hasError: false,
                message: ""
              },
              networkErrors: {
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
              }
            }
          }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.loadingStatus.isPasswordResetLoading).toBe(false);
      });
    });
  });
  describe("errorsReducer", () => {
    const { signInReducer } = imports;
    describe("EMAIL_ERROR_CHECK", () => {
      const { EMAIL_ERROR_CHECK } = imports;
      test("Checks email errors", () => {
        const action = {
          EMAIL_ERROR_CHECK,
          payload: {
            hasError: false,
            message: ""
          }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.errors.emailErrors).toEqual(action.payload);
      });
    });
    describe("PASSWORD_ERROR_CHECK", () => {
      const { PASSWORD_ERROR_CHECK } = imports;
      test("Checks password error", () => {
        const action = {
          type: PASSWORD_ERROR_CHECK,
          payload: {
            hasError: false,
            message: ""
          }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.errors.passwordErrors).toEqual(action.payload);
      });
    });

    describe("ERROR_SIGNING_IN", () => {
      const { ERROR_SIGNING_IN } = imports;
      test("Checks signin errors", () => {
        const action = {
          type: ERROR_SIGNING_IN,
          payload: {
            emailErrors: {
              hasError: false,
              message: ""
            },
            networkErrors: {
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
            }
          }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.errors).toEqual(action.payload);
      });
    });

    describe("ERROR_FETCHING_ACCOUNT_INFO", () => {
      const { ERROR_FETCHING_ACCOUNT_INFO } = imports;
      test("Checks networkErrors", () => {
        const action = {
          type: ERROR_FETCHING_ACCOUNT_INFO
        };
        const newState = signInReducer(initialState, action);
        expect(newState.errors.networkErrors.hasError).toBe(true);
        expect(newState.errors.networkErrors.message).toEqual(
          "You have been disconnected from the internet. Please reconnect and try again."
        );
      });
    });
  });
  describe("dialogsReducer", () => {
    const { signInReducer } = imports;

    describe("OPEN_PASSWORD_RESET_DIALOG", () => {
      const { OPEN_PASSWORD_RESET_DIALOG } = imports;
      test("Shows password reset dialog", () => {
        const action = {
          type: OPEN_PASSWORD_RESET_DIALOG,
          payload: { initEmail: "user@mail.com" }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.dialogs.isPasswordResetDialogOpen).toBe(true);
      });
    });

    describe("RECEIVE_PASSWORD_RESET", () => {
      const { RECEIVE_PASSWORD_RESET } = imports;
      test("Closes password reset dialog", () => {
        const action = {
          type: RECEIVE_PASSWORD_RESET
        };
        const newState = signInReducer(initialState, action);
        expect(newState.dialogs.isPasswordResetDialogOpen).toBe(false);
      });
      test("Shows password reset success dialog", () => {
        const action = {
          type: RECEIVE_PASSWORD_RESET
        };
        const newState = signInReducer(initialState, action);
        expect(newState.dialogs.isPasswordResetSuccessModalOpen).toBe(true);
      });
    });

    describe("CLOSE_PASSWORD_RESET_DIALOG", () => {
      const { CLOSE_PASSWORD_RESET_DIALOG } = imports;
      test("Closes password reset dialog", () => {
        const action = { type: CLOSE_PASSWORD_RESET_DIALOG };
        const newState = signInReducer(initialState, action);
        expect(newState.dialogs.isPasswordResetDialogOpen).toBe(false);
      });
    });

    describe("ERROR_SIGNING_IN", () => {
      const { ERROR_SIGNING_IN } = imports;
      test("Shows password reset dialog", () => {
        const action = {
          type: ERROR_SIGNING_IN,
          payload: {
            errors: {
              emailErrors: {
                hasError: false,
                message: ""
              },
              networkErrors: {
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
              }
            }
          }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.dialogs.isNetworkFailureModalOpen).toEqual(
          action.payload.errors.networkErrors.hasError
        );
      });
    });

    describe("ERROR_RESETTING_PASSWORD", () => {
      const { ERROR_RESETTING_PASSWORD } = imports;
      test("Shows password reset dialog", () => {
        const action = {
          type: ERROR_RESETTING_PASSWORD,
          payload: {
            errors: {
              networkErrors: {
                hasError: true
              }
            }
          }
        };
        const newState = signInReducer(initialState, action);
        expect(newState.dialogs.isNetworkFailureModalOpen).toEqual(
          action.payload.errors.networkErrors.hasError
        );
      });
    });

    describe("ERROR_FETCHING_ACCOUNT_INFO", () => {
      const { ERROR_FETCHING_ACCOUNT_INFO } = imports;
      test("Shows network failure modal", () => {
        const action = { type: ERROR_FETCHING_ACCOUNT_INFO };
        const newState = signInReducer(initialState, action);
        expect(newState.dialogs.isNetworkFailureModalOpen).toBe(true);
      });
    });

    describe("CLOSE_PASSWORD_RESET_SUCCESS_MODAL", () => {
      const { CLOSE_PASSWORD_RESET_SUCCESS_MODAL } = imports;
      test("Shows network failure modal", () => {
        const action = { type: CLOSE_PASSWORD_RESET_SUCCESS_MODAL };
        const newState = signInReducer(initialState, action);
        expect(newState.dialogs.isPasswordResetSuccessModalOpen).toBe(false);
      });
    });

    describe("CLOSE_NETWORK_FAILURE_MODAL", () => {
      const { CLOSE_NETWORK_FAILURE_MODAL } = imports;
      test("Closes network failure modal", () => {
        const action = { type: CLOSE_NETWORK_FAILURE_MODAL };
        const newState = signInReducer(initialState, action);
        expect(newState.dialogs.isNetworkFailureModalOpen).toBe(false);
      });
    });
  });
});

describe("Action Creators", () => {
  describe("Synchronous functions", () => {
    describe("openPasswordResetDialog", () => {
      const { openPasswordResetDialog, OPEN_PASSWORD_RESET_DIALOG } = imports;
      let initEmail = "user@sportomaticapp.com";
      test("Returns the correct action", () => {
        const createdAction = openPasswordResetDialog(initEmail);
        const expectedAction = {
          type: OPEN_PASSWORD_RESET_DIALOG,
          payload: {
            initEmail
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("closePasswordResetDialog", () => {
      const { closePasswordResetDialog, CLOSE_PASSWORD_RESET_DIALOG } = imports;

      test("Returns the correct action", () => {
        const createdAction = closePasswordResetDialog();
        const expectedAction = {
          type: CLOSE_PASSWORD_RESET_DIALOG
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("updateEmail", () => {
      const { updateEmail, UPDATE_EMAIL } = imports;
      let newEmail = "user@sportomaticapp.com";
      test("Returns the correct action", () => {
        const createdAction = updateEmail(newEmail);
        const expectedAction = {
          type: UPDATE_EMAIL,
          payload: {
            newEmail
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("updatePassword", () => {
      const { updatePassword, UPDATE_PASSWORD } = imports;
      let newPassword = "ThiNotpA##w079";
      test("Returns the correct action", () => {
        const createdAction = updatePassword(newPassword);
        const expectedAction = {
          type: UPDATE_PASSWORD,
          payload: {
            newPassword
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("updatePasswordResetEmail", () => {
      const { updatePasswordResetEmail, UPDATE_PASSWORD_RESET_EMAIL } = imports;
      let newEmail = "info@mail.com";
      test("Returns the correct action", () => {
        const createdAction = updatePasswordResetEmail(newEmail);
        const expectedAction = {
          type: UPDATE_PASSWORD_RESET_EMAIL,
          payload: {
            newEmail
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("checkEmail", () => {
      const { checkEmail, EMAIL_ERROR_CHECK } = imports;

      test("Returns the correct action", () => {
        let newEmail = "info@mail.com";
        const createdAction = checkEmail(newEmail);
        const expectedAction = {
          type: EMAIL_ERROR_CHECK,
          payload: {
            hasError: false,
            message: ""
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
      test("Returns the correct action", () => {
        let newEmail = "";
        const createdAction = checkEmail(newEmail);
        const expectedAction = {
          type: EMAIL_ERROR_CHECK,
          payload: {
            hasError: true,
            message: "Please provide an email address"
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
      test("Returns the correct action", () => {
        let newEmail = "mymail.cc";
        const createdAction = checkEmail(newEmail);
        const expectedAction = {
          type: EMAIL_ERROR_CHECK,
          payload: {
            hasError: true,
            message: "This is not a valid email address"
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });
    describe("checkPassword", () => {
      const { checkPassword, PASSWORD_ERROR_CHECK } = imports;

      test("Returns the correct action", () => {
        let password = "Tioh#542N90C";
        const createdAction = checkPassword(password);
        const expectedAction = {
          type: PASSWORD_ERROR_CHECK,
          payload: {
            hasError: false,
            message: ""
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
      test("Returns the correct action", () => {
        let password = "";
        const createdAction = checkPassword(password);
        const expectedAction = {
          type: PASSWORD_ERROR_CHECK,
          payload: {
            hasError: true,
            message: "Please enter a password"
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
      test("Returns the correct action", () => {
        let password = "word";
        const createdAction = checkPassword(password);
        const expectedAction = {
          type: PASSWORD_ERROR_CHECK,
          payload: {
            hasError: true,
            message: "Must be at least 6 characters long"
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestSignIn", () => {
      const { requestSignIn, REQUEST_SIGN_IN } = imports;

      test("Returns the correct action", () => {
        const createdAction = requestSignIn();
        const expectedAction = {
          type: REQUEST_SIGN_IN
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("closeNetworkFailureModal", () => {
      const { closeNetworkFailureModal, CLOSE_NETWORK_FAILURE_MODAL } = imports;

      test("Returns the correct action", () => {
        const createdAction = closeNetworkFailureModal();
        const expectedAction = {
          type: CLOSE_NETWORK_FAILURE_MODAL
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestPasswordReset", () => {
      const { requestPasswordReset, REQUEST_PASSWORD_RESET } = imports;

      test("Returns the correct action", () => {
        const createdAction = requestPasswordReset();
        const expectedAction = {
          type: REQUEST_PASSWORD_RESET
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("receivePasswordReset", () => {
      const { receivePasswordReset, RECEIVE_PASSWORD_RESET } = imports;

      test("Returns the correct action", () => {
        const createdAction = receivePasswordReset();
        const expectedAction = {
          type: RECEIVE_PASSWORD_RESET
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestAccountInfo", () => {
      const { requestAccountInfo, REQUEST_ACCOUNT_INFO } = imports;

      test("Returns the correct action", () => {
        const createdAction = requestAccountInfo();
        const expectedAction = {
          type: REQUEST_ACCOUNT_INFO
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });
  });
});
