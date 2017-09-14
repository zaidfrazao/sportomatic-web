// @flow
import { combineReducers } from "redux";
import { coreInterfaceReducer } from "../features/core-interface/duck";

export default combineReducers({
  coreInterface: coreInterfaceReducer
});
