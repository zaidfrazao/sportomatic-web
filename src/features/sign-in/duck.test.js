import * as imports from "./duck.js";
import { sampleStore } from "../../models/sampleStore";

// Reducer tests
const initialState = {
  userInfo: imports.userInfoInitialState,
  loadingStatus: imports.loadingStatusInitialState
};

describe("Reducers", () => {
  describe("userInfoReducer", () => {
    const { userInfoReducer } = imports;
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

        const newState = new userInfoReducer(initialState, action);
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
        const newState = new userInfoReducer(initialState, action);
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
        const newState = new userInfoReducer(initialState, action);
        expect(newState.userInfo.passwordResetEmail).toEqual(
          action.payload.initEmail
        );
      });
    });
  });
});
