import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/admin/dashboard";

export const TOGGLE_SIDE_MENU = `${NAMESPACE}/TOGGLE_SIDE_MENU`;

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

export const dashboardReducer = combineReducers({
  uiConfig: uiConfigReducer
});

// Selectors

const uiConfig = state => state.institution.dashboard.uiConfig;

export const selector = createStructuredSelector({
  uiConfig
});

// Action Creators

export function toggleSideMenu() {
  return {
    type: TOGGLE_SIDE_MENU
  };
}

export function createInstitution(info) {
  return function(dispatch: DispatchAlias) {
    const db = firebase.firestore();

    return db.collection("institutions").add(info);
  };
}
