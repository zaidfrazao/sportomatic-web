// @flow
import { combineReducers } from "redux";
import { coreInterfaceReducer } from "../features/core-interface/duck";
import { dashboardReducer } from "../features/dashboard/duck";
import { peopleReducer } from "../features/people/duck";
import { scheduleReducer } from "../features/schedule/duck";
import { settingsReducer } from "../features/settings/duck";
import { teamsReducer } from "../features/teams/duck";

export default combineReducers({
  coreInterface: coreInterfaceReducer,
  dashboard: dashboardReducer,
  people: peopleReducer,
  schedule: scheduleReducer,
  settings: settingsReducer,
  teams: teamsReducer
});
