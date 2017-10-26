import {
  loadStaff,
  REQUEST_STAFF,
  RECEIVE_STAFF,
  ERROR_LOADING_STAFF
} from "./duck";
import { SportomaticFirebaseAPI } from "../../../api/sportmatic-firebase-api";
import sinon from "sinon";
import "sinon-as-promised";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

let sportomaticFirebaseAPI;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

beforeEach(() => {
  if (sportomaticFirebaseAPI) {
    sportomaticFirebaseAPI.restore();
  }
});

describe("ACTION CREATORS", () => {
  test("loadStaff - should load staff on successful response", () => {
    const store = mockStore({});
    const staff = {
      1: {
        metadata: {
          email: "rowan@sportomaticapp.com",
          name: "Rowan",
          phoneNumber: "(084) 291-0482",
          profilePictureURL: "https://images.com/img.png",
          surname: "Walker-Campbell",
          type: "COACH"
        }
      },
      2: {
        metadata: {
          email: "brett@sportomaticapp.com",
          name: "Brett",
          phoneNumber: "(073) 812-1122",
          profilePictureURL: "https://images.com/img.png",
          surname: "Cook",
          type: "MANAGER"
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
          coaches: {
            1: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL: "https://images.com/img.png",
                surname: "Walker-Campbell",
                type: "COACH"
              }
            }
          },
          managers: {
            2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL: "https://images.com/img.png",
                surname: "Cook",
                type: "MANAGER"
              }
            }
          }
        }
      }
    ];

    sportomaticFirebaseAPI = sinon
      .stub(SportomaticFirebaseAPI, "getPeople")
      .resolves(staff);

    store.dispatch(loadStaff(1)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
  test("loadStaff - should dispatch error response", () => {
    const store = mockStore({});
    const error = {
      code: "500",
      message: "Internal server error"
    };

    const expectedActions = [
      {
        type: REQUEST_STAFF
      },
      {
        type: ERROR_LOADING_STAFF,
        payload: {
          error
        }
      }
    ];

    sportomaticFirebaseAPI = sinon
      .stub(SportomaticFirebaseAPI, "getPeople")
      .rejects(error);

    store.dispatch(loadStaff(1)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
});
