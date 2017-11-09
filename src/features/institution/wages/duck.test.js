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
  const {coachesReducer} = imports;
  describe("coachesReducer", () => {
    describe("RECEIVE_STAFF", ()=>{
      const {RECEIVE_STAFF} = imports;
      const action = {
        type:RECEIVE_STAFF,
        payload:{
          coaches:{}
        }
      };
      const newState = wagesReducer(initialState, action);
      expect(newState.uiConfig.coaches).toEqual(action.payload.coaches);
    });

  });

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

  const {coachWagesReducer} = imports;
  describe("coachWagesReducer", ()=>{
      describe("RECEIVE_WAGES", ()=>{
          const {RECEIVE_WAGES} =imports;
          const action = {
            type:RECEIVE_WAGES,
            payload:{wages:{}}
          };

          const newState= wagesReducer(initialState, action);
          expect(newState).toEqual(action.payload.wages);
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
        var coaches = [];
        const createdAction = receiveStaff(coaches);
        const expectedAction = {
          type: RECEIVE_STAFF,
          payload:{
            coaches
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("errorLoadingStaff", () => {
      const { errorLoadingStaff, ERROR_LOADING_STAFF } = imports;
      test("Returns the correct action", () => {
        var error = { code: "ERROR_LOADING", message: "Failed to load"};
        const createdAction = errorLoadingStaff(error);
        const expectedAction = {
          type: ERROR_LOADING_STAFF,
          payload:{
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
        var wages = {
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
          payload:{
            wages
          }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

  });
});

