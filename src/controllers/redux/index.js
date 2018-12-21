import { combineReducers } from 'redux';

import getBalance from './getBalance/reducers';
import userAuthReducer from './auth/reducer';
import errorHandlerReducer from './errorHandler/reducer';
import supportedAccTypeReducer from './types/reducer';
import statusTypeReducer from './statusType/reducer';
import userWalletReducer from './userWallet/reducer';

const rootReducer = combineReducers({
  getBalance,
  userAuthReducer,
  errorHandlerReducer,
  supportedAccTypeReducer,
  statusTypeReducer,
  userWalletReducer,
});

export default rootReducer;
