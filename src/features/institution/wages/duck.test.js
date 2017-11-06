import * as imports from "./duck.js";
import { sampleStore } from "../../models/sampleStore";


//Reducer tests
const initialState= {
  uiConfig: imports.uiConfigInitialState,
  coaches: {},
  loadingStatus: loadingStatusInitialState,
  coachWages: {}
};
describe("Reducers", ()=>{
  

  const {loadingStatusReducer} = imports;
  describe("loadingStatusReducer", () => {
    describe("REQUEST_STAFF", ()=>{
      const {REQUEST_STAFF} = imports;
      const action = {
        type:REQUEST_STAFF
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isStaffLoading).ToBeTruthy();
    });
    describe("RECEIVE_STAFF", ()=>{
      const {RECEIVE_STAFF} = imports;
      const action = {
        type:RECEIVE_STAFF
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isStaffLoading).ToBeFalsy();
    });

    describe("ERROR_LOADING_STAFF", ()=>{
      const {ERROR_LOADING_STAFF} = imports;
      const action = {
        type:ERROR_LOADING_STAFF
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isStaffLoading).ToBeFalsy();
    });

    describe("REQUEST_WAGES", ()=>{
      const {REQUEST_WAGES} = imports;
      const action = {
        type:REQUEST_WAGES
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isWagesLoading).ToBeTruthy();
    });

    describe("RECEIVE_WAGES", ()=>{
      const {RECEIVE_WAGES} = imports;
      const action = {
        type:RECEIVE_WAGES
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isWagesLoading).ToBeFalsy();
    });

    describe("ERROR_LOADING_WAGES", ()=>{
      const {ERROR_LOADING_WAGES} = imports;
      const action = {
        type:ERROR_LOADING_WAGES
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.loadingStatus.isWagesLoading).ToBeFalsy();
    });

  });
});
