// @flow
import { combineReducers } from "redux";

import { coreInterfaceReducer } from "../features/core-interface/duck";
import { dashboardReducer } from "../features/dashboard/duck";
import { peopleReducer } from "../features/people/duck";
import { scheduleReducer } from "../features/schedule/duck";
import { settingsReducer } from "../features/settings/duck";
import { teamsReducer } from "../features/teams/duck";
import { wagesReducer } from "../features/wages/duck";

import { signInReducer } from "../features/sign-in/duck";

import { coreInterfaceReducer as coachCoreInterface } from "../features/coach/core-interface/duck";
import { dashboardReducer as coachDashboard } from "../features/coach/dashboard/duck";
import { hoursReducer as coachHours } from "../features/coach/hours/duck";
import { peopleReducer as coachPeople } from "../features/coach/people/duck";
import { scheduleReducer as coachSchedule } from "../features/coach/schedule/duck";
import { settingsReducer as coachSettings } from "../features/coach/settings/duck";
import { teamsReducer as coachTeams } from "../features/coach/teams/duck";
import { wagesReducer as coachWages } from "../features/coach/wages/duck";

import { coreInterfaceReducer as managerCoreInterface } from "../features/manager/core-interface/duck";
import { dashboardReducer as managerDashboard } from "../features/manager/dashboard/duck";
import { hoursReducer as managerHours } from "../features/manager/hours/duck";
import { peopleReducer as managerPeople } from "../features/manager/people/duck";
import { scheduleReducer as managerSchedule } from "../features/manager/schedule/duck";
import { settingsReducer as managerSettings } from "../features/manager/settings/duck";
import { teamsReducer as managerTeams } from "../features/manager/teams/duck";

const coach = combineReducers({
  coreInterface: coachCoreInterface,
  dashboard: coachDashboard,
  hours: coachHours,
  people: coachPeople,
  schedule: coachSchedule,
  settings: coachSettings,
  teams: coachTeams,
  wages: coachWages
});

const manager = combineReducers({
  coreInterface: managerCoreInterface,
  dashboard: managerDashboard,
  hours: managerHours,
  people: managerPeople,
  schedule: managerSchedule,
  settings: managerSettings,
  teams: managerTeams
});

export default combineReducers({
  coreInterface: coreInterfaceReducer,
  dashboard: dashboardReducer,
  people: peopleReducer,
  schedule: scheduleReducer,
  settings: settingsReducer,
  teams: teamsReducer,
  wages: wagesReducer,
  signIn: signInReducer,
  coach,
  manager
});
