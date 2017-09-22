// @flow
import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import rowanPicture from "./images/rowan.jpg";
import brettPicture from "./images/brett.jpg";

// Actions

export const UPDATE_CURRENT_VIEW =
  "sportomatic-web/institution/schedule/UPDATE_CURRENT_VIEW";

// Reducers

export const uiConfigInitialState = {
  isLoading: false,
  currentView: "SCHEDULE"
};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_CURRENT_VIEW:
      return {
        ...state,
        currentView: action.payload.newView
      };
    default:
      return state;
  }
}

export const eventsListInitialState = {
  "2017-8-18": [
    {
      id: "xyz",
      title: "U/16 A Rugby Boys Match",
      eventType: "COMPETITIVE",
      eventTypeName: "Match",
      startTime: 1508328000000,
      endTime: 1508335200000,
      isCanceled: false,
      venue: "Sportomatic Grounds",
      notes:
        "Please remember to fill in and bring your pedo forms to practice.",
      matchInfo: {
        opponents: "Parktown Boys High School",
        homeAway: "Home"
      },
      teams: [
        {
          id: "0",
          name: "U/16 A Rugby Boys Practice",
          sport: "Rugby"
        }
      ],
      managers: [
        {
          id: "0",
          name: "Brett",
          surname: "Cook",
          profilePictureURL: brettPicture,
          phoneNumber: "(073) 812-1122"
        }
      ],
      coaches: [
        {
          name: "Rowan",
          surname: "Walker-Campbell",
          profilePictureURL: rowanPicture,
          phoneNumber: "(084) 291-0482",
          hasFillIn: false,
          wasAbsent: false,
          hours: {
            stage: "APPROVED",
            signInTime: 1508328000000,
            signOutTime: 1508335200000,
            standardMinutes: 120,
            overtimeMinutes: 0,
            startTimeDelta: 0,
            endTimeDelta: 0
          },
          wages: {
            type: "HOURLY",
            standardHourlyRate: 100,
            overtimeHourlyRate: 150,
            standardWage: 200,
            overtimeWage: 0,
            totalWage: 200
          }
        }
      ]
    }
  ]
};

function eventsListReducer(state = eventsListInitialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const scheduleReducer = combineReducers({
  uiConfig: uiConfigReducer,
  eventsList: eventsListReducer
});

// Selectors

const uiConfig = state => state.institution.schedule.uiConfig;
const events = state => state.institution.schedule.eventsList;

export const selector = createStructuredSelector({
  uiConfig,
  events
});

// Action Creators

export function updateView(newView) {
  return {
    type: UPDATE_CURRENT_VIEW,
    payload: {
      newView
    }
  };
}
