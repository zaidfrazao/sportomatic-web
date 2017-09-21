// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import garyPicture from "./images/gary.jpg";
import rowanPicture from "./images/rowan.jpg";
import brettPicture from "./images/brett.jpg";

// Actions

export const TOGGLE_SIDE_MENU = "sportomatic-web/coach/people/TOGGLE_SIDE_MENU";

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

export const peopleListInitialState = [
  {
    name: "Brett",
    surname: "Cook",
    type: "Manager",
    profilePictureURL: brettPicture,
    email: "brett@sportomaticapp.com",
    phoneNumber: "(073) 812-1122",
    sports: ["Cricket", "Rugby", "Swimming"],
    teams: [
      {
        name: "U/16 A Rugby Boys",
        sport: "Rugby"
      },
      {
        name: "Open 1st Team Swimming Girls",
        sport: "Swimming"
      }
    ]
  },
  {
    name: "Rowan",
    surname: "Walker-Campbell",
    type: "Coach",
    profilePictureURL: rowanPicture,
    email: "rowan@sportomaticapp.com",
    phoneNumber: "(084) 291-0482",
    sports: ["Cricket", "Rugby", "Soccer"],
    teams: [
      {
        name: "U/16 A Rugby Boys",
        sport: "Rugby"
      }
    ],
    paymentDetails: {
      standardHourlyRate: 150,
      overtimeHourlyRate: 200
    }
  },
  {
    name: "Gary",
    surname: "Kirstin",
    type: "Manager",
    profilePictureURL: garyPicture,
    email: "gary@garykirstina.com",
    phoneNumber: "(071) 221-7462",
    sports: ["Cricket"],
    teams: [
      {
        name: "U/12 A Cricket Boys",
        sport: "Cricket"
      },
      {
        name: "U/12 B Cricket Boys",
        sport: "Cricket"
      },
      {
        name: "U/13 A Cricket Boys",
        sport: "Cricket"
      },
      {
        name: "U/13 B Cricket Boys",
        sport: "Cricket"
      }
    ]
  }
];

function peopleListReducer(state = peopleListInitialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const peopleReducer = combineReducers({
  uiConfig: uiConfigReducer,
  peopleList: peopleListReducer
});

// Selectors

const uiConfig = state => state.coach.people.uiConfig;
const people = state => state.coach.people.peopleList;

export const selector = createStructuredSelector({
  uiConfig,
  people
});

// Action Creators

export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}
