// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";
import _ from "lodash";
import garyPicture from "./images/gary.jpg";
import rowanPicture from "./images/rowan.jpg";
import brettPicture from "./images/brett.jpg";

// Actions

export const OPEN_ADD_TEAM_DIALOG =
  "sportomatic-web/institution/teams/OPEN_ADD_TEAM_DIALOG";
export const CLOSE_ADD_TEAM_DIALOG =
  "sportomatic-web/institution/teams/CLOSE_ADD_TEAM_DIALOG";
export const REQUEST_STAFF = "sportomatic-web/institution/teams/REQUEST_STAFF";
export const RECEIVE_STAFF = "sportomatic-web/institution/teams/RECEIVE_STAFF";
export const ERROR_LOADING_STAFF =
  "sportomatic-web/institution/teams/ERROR_LOADING_STAFF";
export const REQUEST_OPTIONS =
  "sportomatic-web/institution/teams/REQUEST_OPTIONS";
export const RECEIVE_OPTIONS =
  "sportomatic-web/institution/teams/RECEIVE_OPTIONS";
export const ERROR_LOADING_OPTIONS =
  "sportomatic-web/institution/teams/ERROR_LOADING_OPTIONS";
export const REQUEST_ADD_TEAM =
  "sportomatic-web/institution/teams/REQUEST_ADD_TEAM";
export const RECEIVE_ADD_TEAM =
  "sportomatic-web/institution/teams/RECEIVE_ADD_TEAM";
export const ERROR_ADDING_TEAM =
  "sportomatic-web/institution/teams/ERROR_ADDING_TEAM";
// Reducers

export const dialogsInitialState = {
  isAddTeamDialogOpen: false,
  isErrorAddingTeamAlertOpen: false
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case OPEN_ADD_TEAM_DIALOG:
      return {
        ...state,
        isAddTeamDialogOpen: true
      };
    case RECEIVE_ADD_TEAM:
    case CLOSE_ADD_TEAM_DIALOG:
      return {
        ...state,
        isAddTeamDialogOpen: false
      };
    case ERROR_ADDING_TEAM:
      return {
        ...state,
        isAddTeamDialogOpen: false,
        isErrorAddingTeamAlertOpen: true
      };
    default:
      return state;
  }
}

export const optionsInitialState = {
  ageGroups: { "12": "U/12" },
  divisions: { A: "A" },
  sports: { "-Kcb7s4Qhl4H4W0sTxA-": "Athletics" },
  genderType: "MIXED"
};

function optionsReducer(state = optionsInitialState, action = {}) {
  switch (action.type) {
    case RECEIVE_OPTIONS:
      return action.payload;
    default:
      return state;
  }
}

export const loadingStatusInitialState = {
  isAddTeamDialogLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case REQUEST_ADD_TEAM:
    case REQUEST_OPTIONS:
    case REQUEST_STAFF:
      return {
        ...state,
        isAddTeamDialogLoading: true
      };
    case ERROR_ADDING_TEAM:
    case RECEIVE_ADD_TEAM:
    case ERROR_LOADING_OPTIONS:
    case RECEIVE_OPTIONS:
    case ERROR_LOADING_STAFF:
    case RECEIVE_STAFF:
      return {
        ...state,
        isAddTeamDialogLoading: false
      };
    default:
      return state;
  }
}

function coachesReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_STAFF:
      return action.payload.coaches;
    default:
      return state;
  }
}

function managersReducer(state = {}, action = {}) {
  switch (action.type) {
    case RECEIVE_STAFF:
      return action.payload.managers;
    default:
      return state;
  }
}

export const teamsListInitialState = [
  {
    name: "Open 1st Team Swimming Girls",
    sport: "Swimming",
    ageGroup: "Open",
    division: "1st Team",
    gender: "Girls",
    coaches: [],
    managers: [
      {
        name: "Brett",
        surname: "Cook",
        type: "Manager",
        profilePictureURL: brettPicture
      }
    ]
  },
  {
    name: "U/16 A Rugby Boys",
    sport: "Rugby",
    ageGroup: "U/16",
    division: "A",
    gender: "Boys",
    coaches: [
      {
        name: "Rowan",
        surname: "Walker-Campbell",
        type: "Coach",
        profilePictureURL: rowanPicture
      }
    ],
    managers: [
      {
        name: "Brett",
        surname: "Cook",
        type: "Manager",
        profilePictureURL: brettPicture
      }
    ]
  },
  {
    name: "U/12 A Cricket Boys",
    sport: "Cricket",
    ageGroup: "U/12",
    division: "A",
    gender: "Boys",
    coaches: [],
    managers: [
      {
        name: "Gary",
        surname: "Kirstin",
        type: "Manager",
        profilePictureURL: garyPicture
      }
    ]
  },
  {
    name: "U/12 B Cricket Boys",
    sport: "Cricket",
    ageGroup: "U/12",
    division: "B",
    gender: "Boys",
    coaches: [],
    managers: [
      {
        name: "Gary",
        surname: "Kirstin",
        type: "Manager",
        profilePictureURL: garyPicture
      }
    ]
  },
  {
    name: "U/13 A Cricket Boys",
    sport: "Cricket",
    ageGroup: "U/13",
    division: "A",
    gender: "Boys",
    coaches: [],
    managers: [
      {
        name: "Gary",
        surname: "Kirstin",
        type: "Manager",
        profilePictureURL: garyPicture
      }
    ]
  },
  {
    name: "U/13 B Cricket Boys",
    sport: "Cricket",
    ageGroup: "U/13",
    division: "B",
    gender: "Boys",
    coaches: [],
    managers: [
      {
        name: "Gary",
        surname: "Kirstin",
        type: "Manager",
        profilePictureURL: garyPicture
      }
    ]
  }
];

function teamsListReducer(state = teamsListInitialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const teamsReducer = combineReducers({
  dialogs: dialogsReducer,
  teamsList: teamsListReducer,
  options: optionsReducer,
  coaches: coachesReducer,
  managers: managersReducer,
  loadingStatus: loadingStatusReducer
});

// Selectors

const dialogs = state => state.institution.teams.dialogs;
const teams = state => state.institution.teams.teamsList;
const options = state => state.institution.teams.options;
const coaches = state => state.institution.teams.coaches;
const managers = state => state.institution.teams.managers;
const loadingStatus = state => state.institution.teams.loadingStatus;

export const selector = createStructuredSelector({
  dialogs,
  teams,
  options,
  coaches,
  managers,
  loadingStatus
});

// Action Creators

export function openAddTeamDialog() {
  return {
    type: OPEN_ADD_TEAM_DIALOG
  };
}

export function closeAddTeamDialog() {
  return {
    type: CLOSE_ADD_TEAM_DIALOG
  };
}

export function requestStaff() {
  return {
    type: REQUEST_STAFF
  };
}

export function receiveStaff(staff) {
  const managers = _.fromPairs(
    _.toPairs(staff).filter(
      keyValuePairs => keyValuePairs[1].metadata.type === "MANAGER"
    )
  );
  const coaches = _.fromPairs(
    _.toPairs(staff).filter(
      keyValuePairs => keyValuePairs[1].metadata.type === "COACH"
    )
  );
  return {
    type: RECEIVE_STAFF,
    payload: {
      managers,
      coaches
    }
  };
}

export function errorLoadingStaff(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_STAFF,
    payload: {
      error
    }
  };
}

export function loadStaff(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestStaff());
    const staffRef = firebase
      .database()
      .ref(`institution/${institutionID}/private/staff`);

    return staffRef.on("value", snapshot => {
      const staff = snapshot.val();
      if (staff === null) {
        dispatch(receiveStaff({}));
      } else {
        dispatch(receiveStaff(staff));
      }
    });
  };
}

export function requestOptions() {
  return {
    type: REQUEST_OPTIONS
  };
}

export function receiveOptions(institutionInfo) {
  const ageGroups = _.fromPairs(
    institutionInfo.metadata.ageGroups.map(ageGroup => {
      if (typeof ageGroup === "number") {
        return [ageGroup, `U/${ageGroup}`];
      } else {
        return [ageGroup, ageGroup];
      }
    })
  );
  const divisions = _.fromPairs(
    institutionInfo.metadata.divisions.map(division => [division, division])
  );
  const sports = _.fromPairs(
    _.toPairs(institutionInfo.sportsOffered).map(keyValuePair => [
      keyValuePair[0],
      keyValuePair[1].name
    ])
  );
  const genderType = institutionInfo.metadata.gender;

  return {
    type: RECEIVE_OPTIONS,
    payload: {
      ageGroups,
      divisions,
      sports,
      genderType
    }
  };
}

export function errorLoadingOptions(error: { code: string, message: string }) {
  return {
    type: ERROR_LOADING_OPTIONS,
    payload: {
      error
    }
  };
}

export function loadOptions(institutionID) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestOptions());
    const institutionInfoRef = firebase
      .database()
      .ref(`institution/${institutionID}/public`);

    return institutionInfoRef.on("value", snapshot => {
      const institutionInfo = snapshot.val();
      dispatch(receiveOptions(institutionInfo));
    });
  };
}

export function requestAddTeam() {
  return {
    type: REQUEST_ADD_TEAM
  };
}

export function receiveAddTeam() {
  return {
    type: RECEIVE_ADD_TEAM
  };
}

export function errorAddingTeam(error: { code: string, message: string }) {
  return {
    type: ERROR_ADDING_TEAM,
    payload: {
      error
    }
  };
}

export function addTeam(institutionID, teamInfo, managers, coaches) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAddTeam());
    const newTeamRef = firebase
      .database()
      .ref(`institution/${institutionID}/private/teams`)
      .push();

    return newTeamRef
      .set({
        status: "ACTIVE",
        metadata: { ...teamInfo },
        coaches,
        managers
      })
      .then(() => dispatch(receiveAddTeam()))
      .catch(error => dispatch(errorAddingTeam(error)));
  };
}
