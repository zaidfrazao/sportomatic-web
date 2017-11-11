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

  describe("loadingStatusReducer", () => {
    describe("REQUEST_STAFF", () => {
      const { REQUEST_STAFF } = imports;
      test("Sets loading to true", () => {
        const action = {
          type: REQUEST_STAFF
        };
        const newState = hoursReducer(initialState, action);
        expect(newState.loadingStatus.isStaffLoading).toBe(true);
      });
    });
    describe("ERROR_LOADING_STAFF", () => {
      const { ERROR_LOADING_STAFF } = imports;
      test("Sets loading to false", () => {
        const action = {
          type: ERROR_LOADING_STAFF
        };
        const newState = hoursReducer(initialState, action);
        expect(newState.loadingStatus.isStaffLoading).toBe(false);
      });
    });
    describe("RECEIVE_STAFF", () => {
      const { RECEIVE_STAFF } = imports;
      test("Sets loading to false", () => {
        const action = {
          type: RECEIVE_STAFF,
          payload: {
            coaches: {}
          }
        };
        const newState = hoursReducer(initialState, action);
        expect(newState.loadingStatus.isStaffLoading).toBe(false);
      });
    });

    describe("REQUEST_EVENTS", () => {
      const { REQUEST_EVENTS } = imports;
      test("Sets isEventsLoading to true", () => {
        const action = {
          type: REQUEST_EVENTS
        };
        const newState = hoursReducer(initialState, action);
        expect(newState.loadingStatus.isEventsLoading).toBe(true);
      });
    });

    describe("ERROR_LOADING_EVENTS", () => {
      const { ERROR_LOADING_EVENTS } = imports;
      test("Sets isEventsLoading to false", () => {
        const action = {
          type: ERROR_LOADING_EVENTS
        };
        const newState = hoursReducer(initialState, action);
        expect(newState.loadingStatus.isEventsLoading).toBe(false);
      });
    });

    describe("RECEIVE_EVENTS", () => {
      const { RECEIVE_EVENTS } = imports;
      test("Sets isEventsLoading to false", () => {
        const action = {
          type: RECEIVE_EVENTS,
          payload: {
            events: {}
          }
        };
        const newState = hoursReducer(initialState, action);
        expect(newState.loadingStatus.isEventsLoading).toBe(false);
      });
    });
  });
});
