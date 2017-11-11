import * as imports from "./duck.js";

const initialState = {
  uiConfig: imports.uiConfigInitialState,
  coaches: {},
  loadingStatus: imports.loadingStatusInitialState,
  events: {}
};

describe("Reducers", () => {
  const { hoursReducer } = imports;
  describe("uiConfigReducer", () => {
    describe("UPDATE_TAB", () => {
      const { UPDATE_TAB } = imports;
      test("Updates current tab", () => {
        const action = {
          type: UPDATE_TAB,
          payload: {
            newTab: "STAFF"
          }
        };
        const newState = hoursReducer(initialState, action);
        expect(newState.uiConfig.currentTab).toEqual(action.payload.newTab);
      });
    });
  });

  describe("coachesReducer", () => {
    describe("RECEIVE_STAFF", () => {
      const { RECEIVE_STAFF } = imports;
      test("Receives coaches", () => {
        const action = {
          type: RECEIVE_STAFF,
          payload: {
            coaches: {
              Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell"
              }
            }
          }
        };
        const newState = hoursReducer(initialState, action);
        expect(newState.coaches).toEqual(action.payload.coaches);
      });
    });
  });
});
