// @flow
import { combineReducers } from "redux";

import { coreInterfaceReducer } from "../features/core-interface/duck";
import { dashboardReducer } from "../features/dashboard/duck";
import { peopleReducer } from "../features/people/duck";
import { scheduleReducer } from "../features/schedule/duck";
import { settingsReducer } from "../features/settings/duck";
import { teamsReducer } from "../features/teams/duck";
import { wagesReducer } from "../features/wages/duck";

import { coreInterfaceReducer as coachCoreInterface } from "../features/coach/core-interface/duck";
import { dashboardReducer as coachDashboard } from "../features/coach/dashboard/duck";
import { peopleReducer as coachPeople } from "../features/coach/people/duck";
import { scheduleReducer as coachSchedule } from "../features/coach/schedule/duck";
import { settingsReducer as coachSettings } from "../features/coach/settings/duck";
import { teamsReducer as coachTeams } from "../features/coach/teams/duck";
import { wagesReducer as coachWages } from "../features/coach/wages/duck";

const coach = combineReducers({
  coreInterface: coachCoreInterface,
  dashboard: coachDashboard,
  people: coachPeople,
  schedule: coachSchedule,
  settings: coachSettings,
  teams: coachTeams,
  wages: coachWages
});

export default combineReducers({
  coreInterface: coreInterfaceReducer,
  dashboard: dashboardReducer,
  people: peopleReducer,
  schedule: scheduleReducer,
  settings: settingsReducer,
  teams: teamsReducer,
  wages: wagesReducer,
  coach
});
