/**
 * Dependencies
 */
import { combineReducers } from "redux";

/*
  Reducers
 */

import user from "./user";

/**
 * App Reducer
 * @typedef {Function} rootReducer
 */
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
