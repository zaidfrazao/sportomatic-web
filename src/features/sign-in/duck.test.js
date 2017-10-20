import * as imports from "./duck.js";
import { sampleStore } from "../../models/sampleStore";

// Reducer tests
const initialState = {
  userInfo: imports.userInfoInitialState,
  loadingStatus: imports.loadingStatusInitialState
};

describe("Reducers", () => {
  describe("signInReducer", () => {
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
});
