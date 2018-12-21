import { combineReducers } from 'redux';

import getBalance from './getBalance/reducers';
import userAuthReducer from './auth/reducer';
import errorHandlerReducer from './errorHandler/reducer';
import supportedAccTypeReducer from './types/reducer';
import statusTypeReducer from './statusType/reducer';
import userWalletReducer from './userWallet/reducer';
import userBeneficiaryReducer from './userBeneficiary/reducer';
import userTransactionReducer from './userTransaction/reducer';

const rootReducer = combineReducers({
  getBalance,
  userAuthReducer,
  errorHandlerReducer,
  supportedAccTypeReducer,
  statusTypeReducer,
  userWalletReducer,
  userBeneficiaryReducer,
  userTransactionReducer,
});

export default rootReducer;
