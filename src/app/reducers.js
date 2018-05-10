import { combineReducers } from "redux";
import { coreInterfaceReducer } from "../features/core-interface/duck";
import { dashboardReducer } from "../features/dashboard/duck";
import { hoursReducer } from "../features/hours/duck";
import { peopleReducer } from "../features/people/duck";
import { resultsReducer } from "../features/results/duck";
import { scheduleReducer } from "../features/schedule/duck";
import { settingsReducer } from "../features/settings/duck";
import { signInReducer } from "../features/sign-in/duck";
import { signUpReducer } from "../features/sign-up/duck";
import { teamsReducer } from "../features/teams/duck";
import { wagesReducer } from "../features/wages/duck";

export default combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  coreInterface: coreInterfaceReducer,
  dashboard: dashboardReducer,
  hours: hoursReducer,
  results: resultsReducer,
  people: peopleReducer,
  schedule: scheduleReducer,
  settings: settingsReducer,
  teams: teamsReducer,
  wages: wagesReducer
});
