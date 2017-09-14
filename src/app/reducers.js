// @flow
import { combineReducers } from "redux";
import { coreInterfaceReducer } from "../features/core-interface/duck";
import { peopleReducer } from "../features/people/duck";

export default combineReducers({
  coreInterface: coreInterfaceReducer,
  people: peopleReducer
});
