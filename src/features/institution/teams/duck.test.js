import {
  loadStaff,
  loadTeams,
  loadOptions,
  addTeam,
  REQUEST_STAFF,
  RECEIVE_STAFF,
  ERROR_LOADING_STAFF,
  RECEIVE_TEAMS,
  REQUEST_TEAMS,
  ERROR_LOADING_TEAMS,
  REQUEST_OPTIONS,
  RECEIVE_OPTIONS,
  ERROR_LOADING_OPTIONS,
  REQUEST_ADD_TEAM,
  RECEIVE_ADD_TEAM
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
            1: staff[1]
          },
          managers: {
            2: staff[2]
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
  test("loadTeams - should load teams on successful response", () => {
    const store = mockStore({});
    const teams = {
      1: {
        coaches: {
          1: {
            metadata: {
              email: "test@smtp.co.za",
              name: "Test",
              surname: "User",
              phoneNumber: "011 329 3290",
              profilePictureURL: "http://someurl.com/img.png",
              type: "COACH"
            }
          }
        },
        managers: {
          1: {
            metadata: {
              email: "test@smtp.co.za",
              name: "Test",
              phoneNumber: "082 438 2901",
              surname: "User",
              type: "MANAGER"
            }
          }
        },
        metadata: {
          ageGroup: 12,
          division: "A",
          gender: "MIXED",
          name: "U/12 A Athletics Mixed",
          sport: "Athletics"
        },
        status: "ACTIVE"
      }
    };
    const expectedActions = [
      {
        type: REQUEST_TEAMS
      },
      {
        type: RECEIVE_TEAMS,
        payload: {
          teams
        }
      }
    ];

    sportomaticFirebaseAPI = sinon
      .stub(SportomaticFirebaseAPI, "getTeams")
      .resolves(teams);

    store.dispatch(loadTeams(1)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
  test("loadTeams - should dispatch error response", () => {
    const store = mockStore({});
    const error = {
      code: 500,
      error: "Internal Server Error"
    };

    const expectedActions = [
      {
        type: REQUEST_TEAMS
      },
      {
        type: ERROR_LOADING_TEAMS,
        payload: {
          error
        }
      }
    ];

    sportomaticFirebaseAPI = sinon
      .stub(SportomaticFirebaseAPI, "getTeams")
      .rejects(error);

    store.dispatch(loadTeams(1)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
  test("loadOptions - should load all options on successful response", () => {
    const store = mockStore({});
    const institution = {
      metadata: {
        abbreviation: "SA",
        ageGroups: [12, 13, 14, 15, 16, 17, "Open"],
        divisions: ["A", "B", "C", "D", "1st Team"],
        gender: "MIXED"
      },
      sportsOffered: {
        1: {
          name: "Athletics",
          nonCompetitiveEventTypes: ["Practice", "Training"]
        }
      }
    };
    const expectedActions = [
      {
        type: REQUEST_OPTIONS
      },
      {
        type: RECEIVE_OPTIONS,
        payload: {
          ageGroups: {
            "12": "U/12",
            "13": "U/13",
            "14": "U/14",
            "15": "U/15",
            "16": "U/16",
            "17": "U/17",
            Open: "Open"
          },
          divisions: {
            A: "A",
            B: "B",
            C: "C",
            D: "D",
            "1st Team": "1st Team"
          },
          sports: {
            1: "Athletics"
          },
          genderType: "MIXED"
        }
      }
    ];

    sportomaticFirebaseAPI = sinon
      .stub(SportomaticFirebaseAPI, "getTeamOptions")
      .resolves(institution);

    store.dispatch(loadOptions(1)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
  test("loadOptions - should dispatch error response", () => {
    const store = mockStore({});
    const error = {
      code: 500,
      message: "Internal Server Error"
    };

    const expectedActions = [
      {
        type: REQUEST_OPTIONS
      },
      {
        type: ERROR_LOADING_OPTIONS,
        payload: {
          error
        }
      }
    ];

    sportomaticFirebaseAPI = sinon
      .stub(SportomaticFirebaseAPI, "getTeamOptions")
      .rejects(error);
    store.dispatch(loadOptions(1)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  test("addTeam - should create new team", () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: REQUEST_ADD_TEAM
      },
      {
        type: RECEIVE_ADD_TEAM
      }
    ];

    const institutionID = 1;
    const teamInfo = {
      ageGroup: "U/16",
      division: "A",
      gender: "Male",
      sport: "Athletics",
      name: "U/16 Athletics Male"
    };
    const managers = {
      1: {
        metadata: {
          email: "test@smtp.co.za",
          name: "Test",
          phoneNumber: "082 438 2901",
          surname: "User",
          type: "MANAGER"
        }
      }
    };
    const coaches = {
      1: {
        metadata: {
          email: "test@smtp.co.za",
          name: "Test",
          surname: "User",
          phoneNumber: "011 329 3290",
          profilePictureURL: "http://someurl.com/img.png",
          type: "COACH"
        }
      }
    };

    sinon.stub(SportomaticFirebaseAPI, "getNewTeamID").resolves(1);

    sportomaticFirebaseAPI = sinon
      .stub(SportomaticFirebaseAPI, "addTeam")
      .resolves();

    store
      .dispatch(addTeam(institutionID, teamInfo, managers, coaches))
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
      });
  });
});
