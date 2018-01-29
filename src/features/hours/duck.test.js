import * as imports from "./duck.js";
import { sampleStore } from "../../models/sampleStore";

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
            events: {
              "2017": {
                "10": {
                  "-KxNuraI0AULS_49kAP4": {
                    status: "ACTIVE",
                    teams: {
                      metadata: {
                        name: "U/12 A Athletics Mixed",
                        sport: "Athletics"
                      },
                      status: "ACTIVE"
                    }
                  }
                }
              }
            }
          }
        };
        const newState = hoursReducer(initialState, action);
        expect(newState.loadingStatus.isEventsLoading).toBe(false);
      });
    });
  });

  describe("eventsReducer", () => {
    describe("RECEIVE_EVENTS", () => {
      const { RECEIVE_EVENTS } = imports;
      test("Receives events", () => {
        const action = {
          type: RECEIVE_EVENTS,
          payload: {
            events: {
              "2017": {
                "10": {
                  "-KxNuraI0AULS_49kAP4": {
                    status: "ACTIVE",
                    teams: {
                      metadata: {
                        ageGroup: "12",
                        division: "A",
                        gender: "MIXED",
                        name: "U/12 A Athletics Mixed",
                        sport: "Athletics"
                      },
                      status: "ACTIVE"
                    }
                  }
                }
              }
            }
          }
        };
        const newState = hoursReducer(initialState, action);
        expect(newState.events).toEqual(action.payload.events);
      });
    });
  });
});

describe("Action Creators", () => {
  describe("Synchronous functions", () => {
    describe("updateTab", () => {
      const { updateTab, UPDATE_TAB } = imports;
      let newTab = "IN_PROGRESS";
      test("Returns the correct action", () => {
        const createdAction = updateTab(newTab);
        const expectedAction = {
          type: UPDATE_TAB,
          payload: { newTab }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestStaff", () => {
      const { requestStaff, REQUEST_STAFF } = imports;
      test("Returns the correct action", () => {
        const createdAction = requestStaff();
        const expectedAction = {
          type: REQUEST_STAFF
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("errorLoadingStaff", () => {
      const { errorLoadingStaff, ERROR_LOADING_STAFF } = imports;
      test("Returns the correct action", () => {
        let error = {
          code: "hours/loading_error",
          message: "Error loading staff"
        };
        const createdAction = errorLoadingStaff(error);
        const expectedAction = {
          type: ERROR_LOADING_STAFF,
          payload: { error }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestEvents", () => {
      const { requestEvents, REQUEST_EVENTS } = imports;
      test("Returns the correct action", () => {
        const createdAction = requestEvents();
        const expectedAction = {
          type: REQUEST_EVENTS
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("receiveEvents", () => {
      const { receiveEvents, RECEIVE_EVENTS } = imports;
      test("Returns the correct action", () => {
        let events = {
          "2017": {
            "11": {
              "-KxNuraI0AULS_49kAP4": {
                status: "ACTIVE",
                teams: {
                  "-kIUr56gGRtu_oku6g5RFTf": {
                    metadata: {
                      ageGroup: "12",
                      name: "U/12 A Athletics Mixed",
                      sport: "Athletics"
                    },
                    status: "ACTIVE"
                  }
                }
              }
            }
          }
        };
        const createdAction = receiveEvents(events);
        const expectedAction = {
          type: RECEIVE_EVENTS,
          payload: {
            events
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("errorLoadingEvents", () => {
      const { errorLoadingEvents, ERROR_LOADING_EVENTS } = imports;
      test("Returns the correct action", () => {
        let error = {
          code: "hours/loading_error",
          message: "Error loading events"
        };
        const createdAction = errorLoadingEvents(error);
        const expectedAction = {
          type: ERROR_LOADING_EVENTS,
          payload: { error }
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

    describe("receiveSignIn", () => {
      const { receiveSignIn, RECEIVE_SIGN_IN } = imports;
      test("Returns the correct action", () => {
        const createdAction = receiveSignIn();
        const expectedAction = {
          type: RECEIVE_SIGN_IN
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });
    describe("errorSigningIn", () => {
      const { errorSigningIn, ERROR_SIGNING_IN } = imports;
      test("Returns the correct action", () => {
        let error = {
          code: "hours/signin_error",
          message: "Error loading events"
        };
        const createdAction = errorSigningIn(error);
        const expectedAction = {
          type: ERROR_SIGNING_IN,
          payload: { error }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestSignOut", () => {
      const { requestSignOut, REQUEST_SIGN_OUT } = imports;
      test("Returns the correct action", () => {
        const createdAction = requestSignOut();
        const expectedAction = {
          type: REQUEST_SIGN_OUT
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("receiveSignOut", () => {
      const { receiveSignOut, RECEIVE_SIGN_OUT } = imports;
      test("Returns the correct action", () => {
        const createdAction = receiveSignOut();
        const expectedAction = {
          type: RECEIVE_SIGN_OUT
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("errorSigningOut", () => {
      const { errorSigningOut, ERROR_SIGNING_OUT } = imports;
      test("Returns the correct action", () => {
        let error = {
          code: "hours/signout_error",
          message: "Error loading events"
        };
        const createdAction = errorSigningOut(error);
        const expectedAction = {
          type: ERROR_SIGNING_OUT,
          payload: { error }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestApproveHours", () => {
      const { requestApproveHours, REQUEST_APPROVE_HOURS } = imports;
      test("Returns the correct action", () => {
        const createdAction = requestApproveHours();
        const expectedAction = {
          type: REQUEST_APPROVE_HOURS
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("receiveApproveHours", () => {
      const { receiveApproveHours, RECEIVE_APPROVE_HOURS } = imports;
      test("Returns the correct action", () => {
        const createdAction = receiveApproveHours();
        const expectedAction = {
          type: RECEIVE_APPROVE_HOURS
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("errorApprovingHours", () => {
      const { errorApprovingHours, ERROR_APPROVING_HOURS } = imports;
      test("Returns the correct action", () => {
        let error = {
          code: "hours/approval_error",
          message: "Error loading events"
        };
        const createdAction = errorApprovingHours(error);
        const expectedAction = {
          type: ERROR_APPROVING_HOURS,
          payload: { error }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });
  });
});

// Selector tests
describe("Selector", () => {
  const { selector } = imports;
  test("Selects uiConfig from state", () => {
    const selectedVariable = selector(sampleStore).uiConfig;
    const expectedVariable = sampleStore.institution.hours.uiConfig;
    expect(selectedVariable).toEqual(expectedVariable);
  });
  test("Selects coaches from state", () => {
    const selectedVariable = selector(sampleStore).coaches;
    const expectedVariable = sampleStore.institution.hours.coaches;
    expect(selectedVariable).toEqual(expectedVariable);
  });
  test("Selects loading status from state", () => {
    const selectedVariable = selector(sampleStore).loadingStatus;
    const expectedVariable = sampleStore.institution.hours.loadingStatus;
    expect(selectedVariable).toEqual(expectedVariable);
  });
  test("Selects events from state", () => {
    const selectedVariable = selector(sampleStore).events;
    const expectedVariable = sampleStore.institution.hours.events;
    expect(selectedVariable).toEqual(expectedVariable);
  });
});
