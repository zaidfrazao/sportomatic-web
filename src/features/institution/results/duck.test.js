// @flow
import * as imports from "./duck.js";
import { sampleStore } from "../../../models/sampleStore";

// Reducer tests
const initialState = {
  uiConfig: imports.uiConfigInitialState,
  loadingStatus: imports.loadingStatusInitialState,
  teams: {},
  events: {}
};

describe("Reducers", () => {
  const { resultsReducer } = imports;

  describe("uiConfigReducer", () => {
    describe("UPDATE_TAB", () => {
      const { UPDATE_TAB } = imports;
      test("New tab updates the current tab shown", () => {
        const action = {
          type: UPDATE_TAB,
          payload: {
            newTab: "HISTORY"
          }
        };
        const newState = resultsReducer(initialState, action);
        expect(newState.uiConfig.currentTab).toEqual(action.payload.newTab);
      });
    });
  });

  describe("teamsReducer", () => {
    describe("RECEIVE_TEAMS", () => {
      const { RECEIVE_TEAMS } = imports;
      const teams = {
        "0": {
          coaches: {},
          managers: {},
          metadata: {
            ageGroup: "12",
            division: "A",
            gender: "MIXED",
            name: "U/12 A Athletics Mixed",
            sport: "Athletics"
          },
          status: "ACTIVE"
        }
      };
      const action = {
        type: RECEIVE_TEAMS,
        payload: {
          teams
        }
      };
      const newState = resultsReducer(initialState, action);
      test("Updates the teams reducer with the new teams", () => {
        expect(newState.teams).toEqual(teams);
      });
    });
  });

  describe("loadingStatusReducer", () => {
    describe("REQUEST_TEAMS", () => {
      const { REQUEST_TEAMS } = imports;
      test("Sets the teams loading flag to true", () => {
        const action = {
          type: REQUEST_TEAMS
        };
        const newState = resultsReducer(initialState, action);
        expect(newState.loadingStatus.isTeamsLoading).toBe(true);
      });
    });

    describe("RECEIVE_TEAMS", () => {
      const { RECEIVE_TEAMS } = imports;
      test("Sets the teams loading flag to false", () => {
        const action = {
          type: RECEIVE_TEAMS,
          payload: {
            teams: "placeholder"
          }
        };
        const newState = resultsReducer(initialState, action);
        expect(newState.loadingStatus.isTeamsLoading).toBe(false);
      });
    });

    describe("ERROR_LOADING_TEAMS", () => {
      const { ERROR_LOADING_TEAMS } = imports;
      test("Sets the teams loading flag to false", () => {
        const action = {
          type: ERROR_LOADING_TEAMS,
          payload: {
            teams: "placeholder"
          }
        };
        const newState = resultsReducer(initialState, action);
        expect(newState.loadingStatus.isTeamsLoading).toBe(false);
      });
    });

    describe("REQUEST_EVENTS", () => {
      const { REQUEST_EVENTS } = imports;
      test("Sets the events loading flag to true", () => {
        const action = {
          type: REQUEST_EVENTS
        };
        const newState = resultsReducer(initialState, action);
        expect(newState.loadingStatus.isEventsLoading).toBe(true);
      });
    });

    describe("RECEIVE_EVENTS", () => {
      const { RECEIVE_EVENTS } = imports;
      test("Sets the events loading flag to false", () => {
        const action = {
          type: RECEIVE_EVENTS,
          payload: {
            events: "placeholder"
          }
        };
        const newState = resultsReducer(initialState, action);
        expect(newState.loadingStatus.isEventsLoading).toBe(false);
      });
    });

    describe("ERROR_LOADING_EVENTS", () => {
      const { ERROR_LOADING_EVENTS } = imports;
      test("Sets the teams loading flag to false", () => {
        const action = {
          type: ERROR_LOADING_EVENTS,
          payload: {
            teams: "placeholder"
          }
        };
        const newState = resultsReducer(initialState, action);
        expect(newState.loadingStatus.isEventsLoading).toBe(false);
      });
    });
  });

  describe("eventsReducer", () => {
    describe("RECEIVE_EVENTS", () => {
      const { RECEIVE_EVENTS } = imports;
      const events = {
        eventID: "eventInfo"
      };
      const action = {
        type: RECEIVE_EVENTS,
        payload: {
          events
        }
      };
      const newState = resultsReducer(initialState, action);
      test("Updates the events reducer with the new events", () => {
        expect(newState.events).toEqual(events);
      });
    });
  });
});

// Selector tests
describe("Selector", () => {
  const { selector } = imports;
  test("Selects UI config from state", () => {
    const selectedVariable = selector(sampleStore).uiConfig;
    const expectedVariable = sampleStore.institution.results.uiConfig;
    expect(selectedVariable).toEqual(expectedVariable);
  });
  test("Selects teams from state", () => {
    const selectedVariable = selector(sampleStore).teams;
    const expectedVariable = sampleStore.institution.results.teams;
    expect(selectedVariable).toEqual(expectedVariable);
  });
  test("Selects loading statuses from state", () => {
    const selectedVariable = selector(sampleStore).loadingStatus;
    const expectedVariable = sampleStore.institution.results.loadingStatus;
    expect(selectedVariable).toEqual(expectedVariable);
  });
  test("Selects events from state", () => {
    const selectedVariable = selector(sampleStore).events;
    const expectedVariable = sampleStore.institution.results.events;
    expect(selectedVariable).toEqual(expectedVariable);
  });
});

// Action creator tests
describe("Action Creators", () => {
  describe("Synchonous functions", () => {
    describe("updateTab", () => {
      const { updateTab, UPDATE_TAB } = imports;
      test("Returns the correct action", () => {
        const createdAction = updateTab("HISTORY");
        const expectedAction = {
          type: UPDATE_TAB,
          payload: {
            newTab: "HISTORY"
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestTeams", () => {
      const { requestTeams, REQUEST_TEAMS } = imports;
      test("Returns the correct action", () => {
        const createdAction = requestTeams();
        const expectedAction = {
          type: REQUEST_TEAMS
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("receiveTeams", () => {
      const { receiveTeams, RECEIVE_TEAMS } = imports;
      test("Returns the correct action", () => {
        const teams = {
          teamID: "teamInfo"
        };
        const createdAction = receiveTeams(teams);
        const expectedAction = {
          type: RECEIVE_TEAMS,
          payload: {
            teams
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("errorLoadingTeams", () => {
      const { errorLoadingTeams, ERROR_LOADING_TEAMS } = imports;
      test("Returns the correct action", () => {
        const error = {
          code: "404",
          message: "Page not found"
        };
        const createdAction = errorLoadingTeams(error);
        const expectedAction = {
          type: ERROR_LOADING_TEAMS,
          payload: {
            error
          }
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
        const events = {
          eventID: "eventInfo"
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
        const error = {
          code: "404",
          message: "Page not found"
        };
        const createdAction = errorLoadingEvents(error);
        const expectedAction = {
          type: ERROR_LOADING_EVENTS,
          payload: {
            error
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });
  });
  describe("Asynchonous functions", () => {
    // Placeholders at the moment
    describe("loadTeams", () => {
      const { loadTeams } = imports;
      test("Exists", () => {
        expect(loadTeams()).toBeDefined();
      });
    });
    describe("loadEvents", () => {
      const { loadEvents } = imports;
      test("Exists", () => {
        expect(loadEvents()).toBeDefined();
      });
    });
  });
});
