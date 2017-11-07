
import * as imports from "./duck.js";
import { sampleStore } from "../../../models/sampleStore";

const initialState = {
  uiConfig: imports.uiConfigInitialState,
  loadingStatus: imports.loadingStatusInitialState,
  teams: {},
  events: {}
};

describe("Reducers", ()=>{
  describe("scheduleReducer", ()=>{
    const {scheduleReducer} = imports;
    describe("uiConfigReducer", ()=>{

      describe("UPDATE_CURRENT_VIEW", ()=>{
        const {UPDATE_CURRENT_VIEW} = imports;
        test("Updates current view", ()=>{
            const action = {
              type:UPDATE_CURRENT_VIEW,
              payload:{
                newView:"Schedule"
              }
             };
            const newState = new scheduleReducer(initialState, action);
            expect(newState.uiConfig.currentView).toEqual(action.payload.newView)
        });
      });

      describe("OPEN_EVENT_ERROR_ALERT", ()=>{
        const {OPEN_EVENT_ERROR_ALERT} = imports;
        test("Shows event error alert", ()=>{
            const action = {
              type:OPEN_EVENT_ERROR_ALERT,
              payload:{
                newView:"Schedule"
              }
             };
            const newState = new scheduleReducer(initialState, action);
            expect(newState.uiConfig.errorType).toEqual(action.payload.errorType);
        });
      });

      describe("ERROR_ADDING_EVENT", ()=>{
        const {ERROR_ADDING_EVENT} = imports;
        test("Shows error adding event  alert", ()=>{
            const action = {
              type:ERROR_ADDING_EVENT
             };
            const newState = new scheduleReducer(initialState, action);
            expect(newState.uiConfig.errorType).toEqual("LOADING");
        });
      });

      describe("OPEN_CANCEL_EVENT_ALERT", ()=>{
        const {OPEN_CANCEL_EVENT_ALERT} = imports;
        test("Shows cancel event alert", ()=>{
            const action = {
              type:OPEN_CANCEL_EVENT_ALERT,
              payload:{showCancelEvent:true}
             };
            const newState = new scheduleReducer(initialState, action);
            expect(newState.uiConfig.selectedEventInfo).toEqual(action.payload);
        });
      });

      describe("OPEN_CANCEL_EVENT_ALERT", ()=>{
        const {OPEN_CANCEL_EVENT_ALERT} = imports;
        test("Shows cancel event alert", ()=>{
            const action = {
              type:OPEN_CANCEL_EVENT_ALERT,
              payload:{showCancelEvent:true}
             };
            const newState = new scheduleReducer(initialState, action);
            expect(newState.uiConfig.selectedEventInfo).toEqual(action.payload);
        });
      });

    });
  });
});
