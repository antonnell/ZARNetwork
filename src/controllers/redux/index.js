import { combineReducers } from 'redux';

import getBalance from './getBalance/reducers';
import userAuthReducer from './auth/reducer';
import errorHandlerReducer from './errorHandler/reducer';
import supportedAccTypeReducer from './types/reducer';

const rootReducer = combineReducers({
  getBalance,
  userAuthReducer,
  errorHandlerReducer,
  supportedAccTypeReducer,
});

export default rootReducer;
