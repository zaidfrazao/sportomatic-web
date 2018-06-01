import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/community";

export const OPEN_REMOVE_SPORT_DIALOG = `${NAMESPACE}/OPEN_REMOVE_SPORT_DIALOG`;
export const CLOSE_REMOVE_SPORT_DIALOG = `${NAMESPACE}/CLOSE_REMOVE_SPORT_DIALOG`;
export const RESET_COMMUNITY_STATE = `${NAMESPACE}/RESET_COMMUNITY_STATE`;
export const REQUEST_REMOVE_SPORT = `${NAMESPACE}/REQUEST_REMOVE_SPORT`;
export const RECEIVE_REMOVE_SPORT = `${NAMESPACE}/RECEIVE_REMOVE_SPORT`;
export const ERROR_REMOVING_SPORT = `${NAMESPACE}/ERROR_REMOVING_SPORT`;

export const SIGN_OUT = "sportomatic-web/core-interface/SIGN_OUT";

// Reducers

export const uiConfigInitialState = {};

function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case RESET_COMMUNITY_STATE:
    case SIGN_OUT:
      return uiConfigInitialState;
    default:
      return state;
  }
}

export const dialogsInitialState = {
  removeSportDialog: {
    isOpen: false,
    sport: ""
  }
};

function dialogsReducer(state = dialogsInitialState, action = {}) {
  switch (action.type) {
    case RESET_COMMUNITY_STATE:
    case SIGN_OUT:
      return dialogsInitialState;
    case OPEN_REMOVE_SPORT_DIALOG:
      return {
        ...state,
        removeSportDialog: {
          isOpen: true,
          sport: action.payload.sport
        }
      };
    case CLOSE_REMOVE_SPORT_DIALOG:
      return {
        ...state,
        removeSportDialog: {
          isOpen: false,
          sport: ""
        }
      };
    default:
      return state;
  }
}

export const communityReducer = combineReducers({
  uiConfig: uiConfigReducer,
  dialogs: dialogsReducer
});

// Selectors

const uiConfig = state => state.community.uiConfig;
const dialogs = state => state.community.dialogs;

export const selector = createStructuredSelector({
  uiConfig,
  dialogs
});

// Action Creators

export function resetState() {
  return {
    type: RESET_COMMUNITY_STATE
  };
}

export function openRemovSportDialog(sport) {
  return {
    type: OPEN_REMOVE_SPORT_DIALOG,
    payload: {
      sport
    }
  };
}

export function closeRemovSportDialog() {
  return {
    type: CLOSE_REMOVE_SPORT_DIALOG
  };
}

export function requestRemoveSport() {
  return {
    type: REQUEST_REMOVE_SPORT
  };
}

export function receiveRemoveSport() {
  return {
    type: RECEIVE_REMOVE_SPORT
  };
}

export function errorRemovingSport(error: { code: string, message: string }) {
  return {
    type: ERROR_REMOVING_SPORT,
    payload: {
      error
    }
  };
}

export function removeSport(communityID, sports) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestRemoveSport());
    const db = firebase.firestore();
    const communityRef = db.collection("institutions").doc(communityID);

    return communityRef
      .update({
        "info.sports": sports
      })
      .then(() => {
        dispatch(receiveRemoveSport());
      })
      .catch(error => {
        dispatch(errorRemovingSport(error));
      });
  };
}
