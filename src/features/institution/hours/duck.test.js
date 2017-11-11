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
});
