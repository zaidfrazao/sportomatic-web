import { SportomaticFirebaseAPI } from "../../api/sportmatic-firebase-api";
import sinon from "sinon";
import "sinon-as-promised";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  loadStaff,
  RECEIVE_STAFF,
  REQUEST_STAFF,
  ERROR_LOADING_STAFF
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
  const institutionId = 1;
  test("loadStaff - should load staff on successful response", () => {
    const store = mockStore({});
    const expectedActions = [REQUEST_STAFF, RECEIVE_STAFF];

    const people = [
      {
        metadata: {
          email: "test@smtp.co.za",
          name: "test",
          surname: "user",
          phoneNumber: "011 000 0000",
          profilePictureURL: "https://www.test.com/123.png"
        },
        paymentDefaults: {
          maxOvertimeHours: 3,
          overtimeHourlyRate: 100,
          standardHourlyRate: 150,
          type: "HOURLY"
        },
        preferredSports: {
          "1": "Athletics"
        }
      }
    ];

    sportomaticFirebaseApiStub = sinon
      .stub(SportomaticFirebaseAPI, "getPeople")
      .resolves(people);

    return store.dispatch(loadStaff(institutionId)).then(() => {
      const actualActions = store.getActions().map(action => action.type);
      expect(actualActions).toEqual(expectedActions);
    });
  });

  test("loadStaff - should dispatch error action on failure response", () => {
    const expectedActions = [REQUEST_STAFF, ERROR_LOADING_STAFF];
    const error = { code: 500, message: "Internal Server error" };
    const store = mockStore({});

    sportomaticFirebaseApiStub = sinon
      .stub(SportomaticFirebaseAPI, "getPeople")
      .rejects(error);

    return store.dispatch(loadStaff(institutionId)).then(() => {
      const actualActions = store.getActions().map(action => action.type);
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
