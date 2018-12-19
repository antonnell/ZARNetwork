import { combineReducers } from 'redux';

import getBalance from './getBalance/reducers';
import userAuthReducer from './auth/reducer';
import errorHandlerReducer from './errorHandler/reducer';

const rootReducer = combineReducers({
  getBalance,
  userAuthReducer,
  errorHandlerReducer,
});

export default rootReducer;
