import { combineReducers } from "redux";

import getBalance from "./getBalance/reducers";

const rootReducer = combineReducers({
  getBalance
});

export default rootReducer;
