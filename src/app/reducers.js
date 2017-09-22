// @flow
import { combineReducers } from "redux";

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

import { coreInterfaceReducer as institutionCoreInterface } from "../features/institution/core-interface/duck";
import { dashboardReducer as institutionDashboard } from "../features/institution/dashboard/duck";
import { hoursReducer as institutionHours } from "../features/institution/hours/duck";
import { peopleReducer as institutionPeople } from "../features/institution/people/duck";
import { scheduleReducer as institutionSchedule } from "../features/institution/schedule/duck";
import { settingsReducer as institutionSettings } from "../features/institution/settings/duck";
import { teamsReducer as institutionTeams } from "../features/institution/teams/duck";

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

const institution = combineReducers({
  coreInterface: institutionCoreInterface,
  dashboard: institutionDashboard,
  hours: institutionHours,
  people: institutionPeople,
  schedule: institutionSchedule,
  settings: institutionSettings,
  teams: institutionTeams
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
  signIn: signInReducer,
  coach,
  institution,
  manager
});
