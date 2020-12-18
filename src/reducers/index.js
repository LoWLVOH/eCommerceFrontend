/**
 * Dependencies
 */
import { combineReducers } from "redux";

/*
  Reducers
 */

import user from "./user";
import product from "./product";
import cart from "./cart";

/**
 * App Reducer
 * @typedef {Function} rootReducer
 */
const rootReducer = combineReducers({
  user,
  product,
  cart,
});

export default rootReducer;
