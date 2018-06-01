import { combineReducers } from "redux";
import { coreInterfaceReducer } from "../features/core-interface/duck";
import { dashboardReducer } from "../features/dashboard/duck";
import { peopleReducer } from "../features/people/duck";
import { scheduleReducer } from "../features/schedule/duck";
import { settingsReducer } from "../features/settings/duck";
import { signInReducer } from "../features/sign-in/duck";
import { signUpReducer } from "../features/sign-up/duck";
import { teamsReducer } from "../features/teams/duck";
import { communityReducer } from "../features/community/duck";

export default combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  coreInterface: coreInterfaceReducer,
  dashboard: dashboardReducer,
  people: peopleReducer,
  schedule: scheduleReducer,
  settings: settingsReducer,
  teams: teamsReducer,
  community: communityReducer
});
