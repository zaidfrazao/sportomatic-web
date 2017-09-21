// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import garyPicture from "./images/gary.jpg";
import rowanPicture from "./images/rowan.jpg";
import brettPicture from "./images/brett.jpg";

// Actions

export const TOGGLE_SIDE_MENU = "sportomatic-web/coach/teams/TOGGLE_SIDE_MENU";

// Reducers

export const uiConfigInitialState = {
  appBarTitle: "Dashboard",
  bottomNavValue: "dashboard",
  isSideMenuOpen: false
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        isSideMenuOpen: !state.isSideMenuOpen
      };
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
  uiConfig: uiConfigReducer,
  teamsList: teamsListReducer
});

// Selectors

const uiConfig = state => state.coach.teams.uiConfig;
const teams = state => state.coach.teams.teamsList;

export const selector = createStructuredSelector({
  uiConfig,
  teams
});

// Action Creators

export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}
