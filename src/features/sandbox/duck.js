import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

const NAMESPACE = "sportomatic-web/sandbox";

export const UPDATE_SIDE_MENU = `${NAMESPACE}/UPDATE_SIDE_MENU`;
export const UPDATE_SPORT = `${NAMESPACE}/UPDATE_SPORT`;
export const TOGGLE_SIDE_NAV = `${NAMESPACE}/TOGGLE_SIDE_NAV`;

// Reducers

export const uiConfigInitialState = {
  sideMenuItemSelected: "overview",
  sportSelected: "all",
  isSideMenuOpen: true
};

export function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_SIDE_MENU:
      return {
        ...state,
        sideMenuItemSelected: action.payload.newSelected
      };
    case UPDATE_SPORT:
      return {
        ...state,
        sportSelected: action.payload.newSelected
      };
    case TOGGLE_SIDE_NAV:
      return {
        ...state,
        isSideMenuOpen: !state.isSideMenuOpen
      };
    default:
      return state;
  }
}

export const sandboxReducer = combineReducers({
  uiConfig: uiConfigReducer
});

// Selectors

const uiConfig = state => state.sandbox.uiConfig;

export const selector = createStructuredSelector({
  uiConfig
});

// Action Creators

export function updateSideMenu(newSelected) {
  return {
    type: UPDATE_SIDE_MENU,
    payload: {
      newSelected
    }
  };
}

export function updateSport(newSelected) {
  return {
    type: UPDATE_SPORT,
    payload: {
      newSelected
    }
  };
}

export function toggleSideNav() {
  return {
    type: TOGGLE_SIDE_NAV
  };
}
