import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";
import firebase from "firebase";

// Actions

const NAMESPACE = "sportomatic-web/community";

export const OPEN_REMOVE_SPORT_DIALOG = `${NAMESPACE}/OPEN_REMOVE_SPORT_DIALOG`;
export const CLOSE_REMOVE_SPORT_DIALOG = `${NAMESPACE}/CLOSE_REMOVE_SPORT_DIALOG`;
export const OPEN_ADD_SPORT_DIALOG = `${NAMESPACE}/OPEN_ADD_SPORT_DIALOG`;
export const CLOSE_ADD_SPORT_DIALOG = `${NAMESPACE}/CLOSE_ADD_SPORT_DIALOG`;
export const RESET_COMMUNITY_STATE = `${NAMESPACE}/RESET_COMMUNITY_STATE`;
export const REQUEST_REMOVE_SPORT = `${NAMESPACE}/REQUEST_REMOVE_SPORT`;
export const RECEIVE_REMOVE_SPORT = `${NAMESPACE}/RECEIVE_REMOVE_SPORT`;
export const ERROR_REMOVING_SPORT = `${NAMESPACE}/ERROR_REMOVING_SPORT`;
export const REQUEST_ADD_SPORT = `${NAMESPACE}/REQUEST_ADD_SPORT`;
export const RECEIVE_ADD_SPORT = `${NAMESPACE}/RECEIVE_ADD_SPORT`;
export const ERROR_ADDING_SPORT = `${NAMESPACE}/ERROR_ADDING_SPORT`;
export const REQUEST_EDIT_COMMUNITY_INFO = `${NAMESPACE}/REQUEST_EDIT_COMMUNITY_INFO`;
export const RECEIVE_EDIT_COMMUNITY_INFO = `${NAMESPACE}/RECEIVE_EDIT_COMMUNITY_INFO`;
export const ERROR_EDITING_COMMUNITY_INFO = `${NAMESPACE}/ERROR_EDITING_COMMUNITY_INFO`;

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
  addSportDialog: {
    isOpen: false,
    sport: ""
  },
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
    case OPEN_ADD_SPORT_DIALOG:
      return {
        ...state,
        addSportDialog: {
          isOpen: true
        }
      };
    case CLOSE_ADD_SPORT_DIALOG:
      return {
        ...state,
        addSportDialog: {
          isOpen: false
        }
      };
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

export const loadingStatusInitialState = {
  isAddSportLoading: false
};

function loadingStatusReducer(state = loadingStatusInitialState, action = {}) {
  switch (action.type) {
    case SIGN_OUT:
      return loadingStatusInitialState;
    case REQUEST_ADD_SPORT:
      return {
        ...state,
        isAddSportLoading: true
      };
    case RECEIVE_ADD_SPORT:
    case ERROR_ADDING_SPORT:
      return {
        ...state,
        isAddSportLoading: false
      };
    default:
      return state;
  }
}

export const communityReducer = combineReducers({
  uiConfig: uiConfigReducer,
  dialogs: dialogsReducer,
  loadingStatus: loadingStatusReducer
});

// Selectors

const uiConfig = state => state.community.uiConfig;
const dialogs = state => state.community.dialogs;
const loadingStatus = state => state.community.loadingStatus;

export const selector = createStructuredSelector({
  uiConfig,
  dialogs,
  loadingStatus
});

// Action Creators

export function resetState() {
  return {
    type: RESET_COMMUNITY_STATE
  };
}

export function openRemoveSportDialog(sport) {
  return {
    type: OPEN_REMOVE_SPORT_DIALOG,
    payload: {
      sport
    }
  };
}

export function closeRemoveSportDialog() {
  return {
    type: CLOSE_REMOVE_SPORT_DIALOG
  };
}

export function openAddSportDialog() {
  return {
    type: OPEN_ADD_SPORT_DIALOG
  };
}

export function closeAddSportDialog() {
  return {
    type: CLOSE_ADD_SPORT_DIALOG
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

export function requestAddSport() {
  return {
    type: REQUEST_ADD_SPORT
  };
}

export function receiveAddSport() {
  return {
    type: RECEIVE_ADD_SPORT
  };
}

export function errorAddingSport(error: { code: string, message: string }) {
  return {
    type: ERROR_ADDING_SPORT,
    payload: {
      error
    }
  };
}

export function addSport(communityID, sportInfo) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestAddSport());

    const sports = [
      ...sportInfo.establishedSports,
      {
        info: sportInfo.info,
        ageGroups: sportInfo.ageGroups,
        divisions: sportInfo.divisions
      }
    ];
    const db = firebase.firestore();
    const communityRef = db.collection("institutions").doc(communityID);

    return communityRef
      .update({
        "info.sports": sports
      })
      .then(() => {
        dispatch(receiveAddSport());
      })
      .catch(error => {
        dispatch(errorAddingSport(error));
      });
  };
}

export function requestEditCommunityInfo() {
  return {
    type: REQUEST_EDIT_COMMUNITY_INFO
  };
}

export function receiveEditCommunityInfo() {
  return {
    type: RECEIVE_EDIT_COMMUNITY_INFO
  };
}

export function errorEditingCommunityInfo(error: {
  code: string,
  message: string
}) {
  return {
    type: ERROR_EDITING_COMMUNITY_INFO,
    payload: {
      error
    }
  };
}

export function editCommunityInfo(
  communityID,
  blob,
  gender,
  name,
  abbreviation,
  phoneNumber,
  physicalAddress,
  publicEmail
) {
  return function(dispatch: DispatchAlias) {
    dispatch(requestEditCommunityInfo());

    const db = firebase.firestore();
    const communityRef = db.collection("institutions").doc(communityID);
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `institutions/${communityID}/emblem.jpeg`
    );

    return newImageRef
      .put(blob)
      .then(snapshot => {
        return communityRef
          .update({
            "info.gender": gender,
            "info.name": name,
            "info.abbreviation": abbreviation,
            "info.phoneNumber": phoneNumber,
            "info.physicalAddress": physicalAddress,
            "info.publicEmail": publicEmail,
            "info.emblemURL": snapshot.downloadURL
          })
          .then(() => {
            dispatch(receiveEditCommunityInfo());
          })
          .catch(error => {
            dispatch(errorEditingCommunityInfo(error));
          });
      })
      .catch(error => {
        dispatch(errorEditingCommunityInfo(error));
      });
  };
}
