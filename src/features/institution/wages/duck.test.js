import * as imports from "./duck.js";
import { sampleStore } from "../../../models/sampleStore";

//Reducer tests
const initialState = {
  uiConfig: imports.uiConfigInitialState,
  coaches: {},
  loadingStatus: imports.loadingStatusInitialState,
  coachWages: {}
};
describe("Reducers", () => {
  const { wagesReducer } = imports;
  describe("coachesReducer", () => {
    describe("RECEIVE_STAFF", () => {
      const { RECEIVE_STAFF } = imports;
      const action = {
        type: RECEIVE_STAFF,
        payload: {
          coaches: {
            m8N5l8Ajo4eYKEREzMd99OMABnt2: {
              name: "Jonathan",
              surname: "Cele"
            }
          }
        }
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.coaches).toEqual(action.payload.coaches);
    });
  });

  describe("loadingStatusReducer", () => {
    describe("REQUEST_STAFF", () => {
      const { REQUEST_STAFF } = imports;
      const action = {
        type: REQUEST_STAFF
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isStaffLoading).toBe(true);
    });
    describe("RECEIVE_STAFF", () => {
      const { RECEIVE_STAFF } = imports;
      const action = {
        type: RECEIVE_STAFF,
        payload: {
          coaches: {
            m8N5l8Ajo4eYKEREzMd99OMABnt2: {
              name: "Jonathan",
              surname: "Cele"
            }
          }
        }
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isStaffLoading).toBe(false);
    });

    describe("ERROR_LOADING_STAFF", () => {
      const { ERROR_LOADING_STAFF } = imports;
      const action = {
        type: ERROR_LOADING_STAFF
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isStaffLoading).toBe(false);
    });

    describe("REQUEST_WAGES", () => {
      const { REQUEST_WAGES } = imports;
      const action = {
        type: REQUEST_WAGES
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isWagesLoading).toBe(true);
    });

    describe("RECEIVE_WAGES", () => {
      const { RECEIVE_WAGES } = imports;
      const action = {
        type: RECEIVE_WAGES,
        payload: {
          wages: {
            "2017": {
              "10": {
                "-KxNuraI0AULS_49kAP4": {
                  date: "2017-10-26",
                  hours: {
                    overtime: 0,
                    standard: 2
                  },
                  rates: {
                    overtime: 100,
                    stardard: 150
                  },
                  title: "U/12 A Athletics Mixed Match",
                  type: "HOURLY",
                  wage: 300
                }
              }
            }
          }
        }
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isWagesLoading).toBe(false);
    });

    describe("ERROR_LOADING_WAGES", () => {
      const { ERROR_LOADING_WAGES } = imports;
      const action = {
        type: ERROR_LOADING_WAGES
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isWagesLoading).toBe(false);
    });
  });

  describe("coachWagesReducer", () => {
    describe("RECEIVE_WAGES", () => {
      const { RECEIVE_WAGES } = imports;
      const action = {
        type: RECEIVE_WAGES,
        payload: {
          wages: {
            coachWages: {
              "2017": {
                "10": {
                  "-KxNuraI0AULS_49kAP4": {
                    date: "2017-10-26",
                    hours: {
                      overtime: 0,
                      standard: 2
                    },
                    rates: {
                      overtime: 100,
                      stardard: 150
                    },
                    title: "U/12 A Athletics Mixed Match",
                    type: "HOURLY",
                    wage: 300
                  }
                }
              }
            },
            coaches: {
              m8N5l8Ajo4eYKEREzMd99OMABnt2: {
                name: "John",
                surname: "Doe"
              }
            },
            loadingStatus: { isStaffLoading: false, isWagesLoading: false },
            uiConfig: { isLoading: false }
          }
        }
      };

      const newState = wagesReducer(initialState, action);
      expect(newState.coachWages).toEqual(action.payload.wages);
    });
  });
});

//Action creator tests
describe("Action Creators", () => {
  describe("Synchonous functions", () => {
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

    describe("receiveStaff", () => {
      const { receiveStaff, RECEIVE_STAFF } = imports;
      test("Returns the correct action", () => {
        var coaches = {};
        const createdAction = receiveStaff(coaches);
        const expectedAction = {
          type: RECEIVE_STAFF,
          payload: {
            coaches
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("errorLoadingStaff", () => {
      const { errorLoadingStaff, ERROR_LOADING_STAFF } = imports;
      test("Returns the correct action", () => {
        var error = { code: "ERROR_LOADING", message: "Failed to load" };
        const createdAction = errorLoadingStaff(error);
        const expectedAction = {
          type: ERROR_LOADING_STAFF,
          payload: {
            error
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestWages", () => {
      const { requestWages, REQUEST_WAGES } = imports;
      test("Returns the correct action", () => {
        const createdAction = requestWages();
        const expectedAction = {
          type: REQUEST_WAGES
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("receiveWages", () => {
      const { receiveWages, RECEIVE_WAGES } = imports;
      test("Returns the correct action", () => {
        let wages = {
          date: "2017-10-26",
          hours: {
            overtime: 0,
            standard: 3
          },
          title: "U/15 C Athletics Girls Practice",
          type: "HOURLY",
          wage: 450
        };
        const createdAction = receiveWages(wages);
        const expectedAction = {
          type: RECEIVE_WAGES,
          payload: {
            wages
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("errorLoadingWages", () => {
      const { errorLoadingWages, ERROR_LOADING_WAGES } = imports;
      test("Returns the correct action", () => {
        let error = { code: "ERROR", message: "Error loading wages" };
        const createdAction = errorLoadingWages(error);
        const expectedAction = {
          type: ERROR_LOADING_WAGES,
          payload: {
            error
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestWages", () => {
      const { requestWages, REQUEST_WAGES } = imports;
      test("Returns the correct action", () => {
        const createdAction = requestWages();
        const expectedAction = {
          type: REQUEST_WAGES
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });
  });
});

// Selector tests
describe("Selector", () => {
  const { selector } = imports;
  test("Selects UI config from state", () => {
    const selectedVariable = selector(sampleStore).uiConfig;
    const expectedVariable = sampleStore.institution.wages.uiConfig;
    expect(selectedVariable).toEqual(expectedVariable);
  });
  test("Selects coaches from state", () => {
    const selectedVariable = selector(sampleStore).coaches;
    const expectedVariable = sampleStore.institution.wages.coaches;
    expect(selectedVariable).toEqual(expectedVariable);
  });
  test("Selects loading statuses from state", () => {
    const selectedVariable = selector(sampleStore).loadingStatus;
    const expectedVariable = sampleStore.institution.wages.loadingStatus;
    expect(selectedVariable).toEqual(expectedVariable);
  });
  test("Selects coachWages from state", () => {
    const selectedVariable = selector(sampleStore).coachWages;
    const expectedVariable = sampleStore.institution.wages.coachWages;
    expect(selectedVariable).toEqual(expectedVariable);
  });
});