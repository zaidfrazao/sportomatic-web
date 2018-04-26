import { combineReducers } from "redux";
import { createStructuredSelector } from "reselect";

// Actions

const NAMESPACE = "sportomatic-web/sign-up";

export const UPDATE_STEP = `${NAMESPACE}/UPDATE_STEP`;
export const UPDATE_EMAIL = `${NAMESPACE}/UPDATE_EMAIL`;
export const UPDATE_FIRST_NAME = `${NAMESPACE}/UPDATE_FIRST_NAME`;
export const UPDATE_LAST_NAME = `${NAMESPACE}/UPDATE_LAST_NAME`;
export const UPDATE_COMMUNITY_TYPE = `${NAMESPACE}/UPDATE_COMMUNITY_TYPE`;
export const UPDATE_SUB_TYPE = `${NAMESPACE}/UPDATE_SUB_TYPE`;
export const UPDATE_OTHER_TYPE = `${NAMESPACE}/UPDATE_OTHER_TYPE`;
export const UPDATE_COMMUNITY_NAME = `${NAMESPACE}/UPDATE_COMMUNITY_NAME`;
export const UPDATE_ABBREVIATION = `${NAMESPACE}/UPDATE_ABBREVIATION`;
export const UPDATE_ATHLETE_GENDER = `${NAMESPACE}/UPDATE_ATHLETE_GENDER`;
export const UPDATE_PASSWORD = `${NAMESPACE}/UPDATE_PASSWORD`;

// Reducers

export const uiConfigInitialState = {
  currentStep: "email-entry"
};

export function uiConfigReducer(state = uiConfigInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_STEP:
      return {
        ...state,
        currentStep: action.payload.newStep
      };
    default:
      return state;
  }
}

export const formInfoInitialState = {
  email: "",
  firstName: "",
  lastName: "",
  communityType: "",
  subType: "",
  otherType: "",
  communityName: "",
  abbreviation: "",
  athleteGender: "",
  password: ""
};

export function formInfoReducer(state = formInfoInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload.newEmail
      };
    case UPDATE_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload.newFirstName
      };
    case UPDATE_LAST_NAME:
      return {
        ...state,
        lastName: action.payload.newLastName
      };
    case UPDATE_COMMUNITY_TYPE:
      return {
        ...state,
        communityType: action.payload.newCommunityType
      };
    case UPDATE_SUB_TYPE:
      return {
        ...state,
        subType: action.payload.newSubType
      };
    case UPDATE_OTHER_TYPE:
      return {
        ...state,
        otherType: action.payload.newOtherType
      };
    case UPDATE_COMMUNITY_NAME:
      return {
        ...state,
        communityName: action.payload.newCommunityName
      };
    case UPDATE_ABBREVIATION:
      return {
        ...state,
        abbreviation: action.payload.newAbbreviation
      };
    case UPDATE_ATHLETE_GENDER:
      return {
        ...state,
        athleteGender: action.payload.newAthleteGender
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload.newPassword
      };
    default:
      return state;
  }
}

export const signUp2Reducer = combineReducers({
  uiConfig: uiConfigReducer,
  formInfo: formInfoReducer
});

// Selectors

const uiConfig = state => state.signUp2.uiConfig;
const formInfo = state => state.signUp2.formInfo;

export const selector = createStructuredSelector({
  uiConfig,
  formInfo
});

// Action Creators

export function updateStep(newStep) {
  return {
    type: UPDATE_STEP,
    payload: {
      newStep
    }
  };
}

export function updateEmail(newEmail) {
  return {
    type: UPDATE_EMAIL,
    payload: {
      newEmail
    }
  };
}

export function updateFirstName(newFirstName) {
  return {
    type: UPDATE_FIRST_NAME,
    payload: {
      newFirstName
    }
  };
}

export function updateLastName(newLastName) {
  return {
    type: UPDATE_LAST_NAME,
    payload: {
      newLastName
    }
  };
}

export function updateCommunityType(newCommunityType) {
  return {
    type: UPDATE_COMMUNITY_TYPE,
    payload: {
      newCommunityType
    }
  };
}

export function updateSubType(newSubType) {
  return {
    type: UPDATE_SUB_TYPE,
    payload: {
      newSubType
    }
  };
}

export function updateOtherType(newOtherType) {
  return {
    type: UPDATE_OTHER_TYPE,
    payload: {
      newOtherType
    }
  };
}

export function updateCommunityName(newCommunityName) {
  return {
    type: UPDATE_COMMUNITY_NAME,
    payload: {
      newCommunityName
    }
  };
}

export function updateAbbreviation(newAbbreviation) {
  return {
    type: UPDATE_ABBREVIATION,
    payload: {
      newAbbreviation
    }
  };
}

export function updateAthleteGender(newAthleteGender) {
  return {
    type: UPDATE_ATHLETE_GENDER,
    payload: {
      newAthleteGender
    }
  };
}

export function updatePassword(newPassword) {
  return {
    type: UPDATE_PASSWORD,
    payload: {
      newPassword
    }
  };
}
