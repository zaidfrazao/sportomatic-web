// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import garyPicture from "./images/gary.jpg";
import rowanPicture from "./images/rowan.jpg";
import brettPicture from "./images/brett.jpg";

// Actions

export const OPEN_ADD_TEAM_DIALOG =
  "sportomatic-web/institution/teams/OPEN_ADD_TEAM_DIALOG";
export const CLOSE_ADD_TEAM_DIALOG =
  "sportomatic-web/institution/teams/CLOSE_ADD_TEAM_DIALOG";

// Reducers

export const dialogsInitialState = {
  isAddTeamDialogOpen: true
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case OPEN_ADD_TEAM_DIALOG:
      return {
        ...state,
        isAddTeamDialogOpen: true
      };
    case CLOSE_ADD_TEAM_DIALOG:
      return {
        ...state,
        isAddTeamDialogOpen: false
      };
    default:
      return state;
  }
}

export const optionsInitialState = {
  ageGroups: {
    "12": "U/12",
    "13": "U/13",
    "18": "U/18"
  },
  divisions: {
    A: "A",
    B: "B",
    C: "C",
    "1st": "1st Team"
  },
  sports: {
    x: "Athletics",
    y: "Swimming",
    z: "Squash"
  },
  genderType: "MIXED"
};

function optionsReducer(state = optionsInitialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const coachesInitialState = {
  a: {
    name: "Rowan Walker-Campbell",
    sports: ["x", "y"]
  },
  b: {
    name: "Zaid Frazao",
    sports: ["x"]
  }
};

function coachesReducer(state = coachesInitialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const managersInitialState = {
  c: {
    name: "Brett Cook",
    sports: ["y"]
  }
};

function managersReducer(state = managersInitialState, action = {}) {
  switch (action.type) {
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
  managers: managersReducer
});

// Selectors

const dialogs = state => state.institution.teams.dialogs;
const teams = state => state.institution.teams.teamsList;
const options = state => state.institution.teams.options;
const coaches = state => state.institution.teams.coaches;
const managers = state => state.institution.teams.managers;

export const selector = createStructuredSelector({
  dialogs,
  teams,
  options,
  coaches,
  managers
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
