// @flow
import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../app/reducers.js";

// Create store
export function getStore() {
  // Add middleware
  let middleware = [thunk];
  if (process.env.NODE_ENV !== "production") {
    const logger = createLogger();
    middleware.push(logger);
  }

  // Allow Redux Dev Tools to be used
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
}
