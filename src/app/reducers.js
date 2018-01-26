import { combineReducers } from "redux";

import { signInReducer } from "../features/sign-in/duck";

import { coreInterfaceReducer as institutionCoreInterface } from "../features/institution/core-interface/duck";
import { dashboardReducer as institutionDashboard } from "../features/institution/dashboard/duck";
import { hoursReducer as institutionHours } from "../features/institution/hours/duck";
import { resultsReducer as institutionResults } from "../features/institution/results/duck";
import { peopleReducer as institutionPeople } from "../features/institution/people/duck";
import { scheduleReducer as institutionSchedule } from "../features/institution/schedule/duck";
import { settingsReducer as institutionSettings } from "../features/institution/settings/duck";
import { teamsReducer as institutionTeams } from "../features/institution/teams/duck";
import { wagesReducer as institutionWages } from "../features/institution/wages/duck";

const institution = combineReducers({
  coreInterface: institutionCoreInterface,
  dashboard: institutionDashboard,
  hours: institutionHours,
  results: institutionResults,
  people: institutionPeople,
  schedule: institutionSchedule,
  settings: institutionSettings,
  teams: institutionTeams,
  wages: institutionWages
});

export default combineReducers({
  signIn: signInReducer,
  institution
});
