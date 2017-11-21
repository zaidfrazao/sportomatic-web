import { SportomaticFirebaseAPI } from "../../../api/sportmatic-firebase-api";
import sinon from "sinon";
import "sinon-as-promised";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  loadStaff,
  loadCoachWages,
  RECEIVE_STAFF,
  REQUEST_STAFF,
  ERROR_LOADING_STAFF,
  REQUEST_WAGES,
  RECEIVE_WAGES,
  ERROR_LOADING_WAGES
} from "./duck";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

let sportomaticFirebaseApiStub;

beforeEach(() => {
  if (sportomaticFirebaseApiStub) {
    sportomaticFirebaseApiStub.restore();
  }
});

describe("ACTION CREATORS", () => {
  const institutionID = 1;
  const coachID = 1;
  test("loadStaff - should load staff on successful response", () => {
    const store = mockStore({});
    const coaches = {
      1: {
        metadata: {
          email: "testn@sportomaticapp.com",
          name: "test",
          phoneNumber: "(084) 291-0482",
          profilePictureURL: "https://someurl.com/image.png",
          surname: "user",
          type: "COACH"
        },
        paymentDefaults: {
          maxOvertimeHours: 3,
          overtimeHourlyRate: 100,
          standardHourlyRate: 150,
          type: "HOURLY"
        },
        preferredSports: {
          1: "Athletics"
        }
      }
    };
    const expectedActions = [
      {
        type: REQUEST_STAFF
      },
      {
        type: RECEIVE_STAFF,
        payload: {
          coaches: coaches
        }
      }
    ];

    sportomaticFirebaseApiStub = sinon
      .stub(SportomaticFirebaseAPI, "getPeople")
      .resolves(coaches);

    return store.dispatch(loadStaff(institutionID)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  test("loadStaff - should dispatch error action on failure response", () => {
    const error = { code: 500, message: "Internal Server error" };
    const expectedActions = [
      {
        type: REQUEST_STAFF
      },
      {
        type: ERROR_LOADING_STAFF,
        payload: {
          error: error
        }
      }
    ];
    const store = mockStore({});

    sportomaticFirebaseApiStub = sinon
      .stub(SportomaticFirebaseAPI, "getPeople")
      .rejects(error);

    return store.dispatch(loadStaff(institutionID)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  test("loadWages - should load staff on successful response", () => {
    const store = mockStore({});
    const wages = {
      standardHourlyRate: 150,
      overtimeHourlyRate: 100,
      overtimeWage: 2,
      totalWage: 1200
    };
    const expectedActions = [
      {
        type: REQUEST_WAGES
      },
      {
        type: RECEIVE_WAGES,
        payload: {
          wages: wages
        }
      }
    ];

    sportomaticFirebaseApiStub = sinon
      .stub(SportomaticFirebaseAPI, "getCoachWages")
      .resolves(wages);

    return store.dispatch(loadCoachWages(institutionID, coachID)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  test("loadWages - should dispatch error action on failure response", () => {
    const error = { code: 500, message: "Internal Server Error" };
    const expectedActions = [
      {
        type: REQUEST_WAGES
      },
      {
        type: ERROR_LOADING_WAGES,
        payload: {
          error: error
        }
      }
    ];

    const store = mockStore({});

    sportomaticFirebaseApiStub = sinon
      .stub(SportomaticFirebaseAPI, "getCoachWages")
      .rejects(error);

    return store.dispatch(loadCoachWages(institutionID, coachID)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
