// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import rowanPicture from "./images/rowan.jpg";
import brettPicture from "./images/brett.jpg";

// Actions

export const UPDATE_TAB = "sportomatic-web/manager/hours/UPDATE_TAB";

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentTab: "IN_PROGRESS"
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_TAB:
      return {
        ...state,
        currentTab: action.payload.newTab
      };
    default:
      return state;
  }
}

export const awaitingApprovalInitialState = [
  {
    id: "0",
    eventTitle: "U/16 Boys A Rugby Practice",
    date: 1508328000000,
    coaches: [
      {
        name: "Rowan Walker-Campbell",
        profilePictureURL: rowanPicture,
        stage: "AWAITING_APPROVAL",
        signInTime: "14:04",
        signOutTime: "15:43"
      },
      {
        name: "Brett Cook",
        profilePictureURL: brettPicture,
        stage: "AWAITING_SIGN_OUT",
        signInTime: "14:04",
        signOutTime: "15:43"
      }
    ]
  },
  {
    id: "1",
    eventTitle: "U/16 Boys A Rugby Match",
    date: 1508328000000,
    coaches: [
      {
        name: "Rowan Walker-Campbell",
        profilePictureURL: rowanPicture,
        stage: "AWAITING_SIGN_IN"
      }
    ]
  }
];

function awaitingApprovalReducer(
  state = awaitingApprovalInitialState,
  action = {}
) {
  switch (action.type) {
    default:
      return state;
  }
}

export const inProgressInitialState = {
  id: "1",
  stage: "AWAITING_SIGN_OUT",
  eventTitle: "U/16 A Rugby Boys Match",
  eventType: "COMPETITIVE",
  eventTypeName: "Match",
  startTime: 1508328000000,
  endTime: 1508335200000,
  venue: "Sportomatic Grounds",
  notes: "Please remember to fill in and bring your pedo forms to practice.",
  matchInfo: {
    opponents: "Parktown Boys High School",
    homeAway: "Home"
  },
  coaches: [
    {
      name: "Rowan Walker-Campbell",
      profilePictureURL: rowanPicture,
      stage: "AWAITING_APPROVAL",
      signInTime: "14:04",
      signOutTime: "15:43"
    },
    {
      name: "Brett Cook",
      profilePictureURL: brettPicture,
      stage: "AWAITING_SIGN_OUT",
      signInTime: "14:04",
      signOutTime: "15:43"
    }
  ]
};

function inProgressReducer(state = inProgressInitialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const hoursReducer = combineReducers({
  uiConfig: uiConfigReducer,
  awaitingApproval: awaitingApprovalReducer,
  inProgress: inProgressReducer
});

// Selectors

const uiConfig = state => state.manager.hours.uiConfig;
const awaitingApproval = state => state.manager.hours.awaitingApproval;
const inProgress = state => state.manager.hours.inProgress;

export const selector = createStructuredSelector({
  uiConfig,
  awaitingApproval,
  inProgress
});

// Action Creators

export function updateTab(newTab) {
  return {
    type: UPDATE_TAB,
    payload: {
      newTab
    }
  };
}
