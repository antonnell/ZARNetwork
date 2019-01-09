import { combineReducers } from 'redux';

import userAuthReducer from './auth/reducer';
import errorHandlerReducer from './errorHandler/reducer';
import supportedAccTypeReducer from './types/reducer';
import statusTypeReducer from './statusType/reducer';
import userWalletReducer from './userWallet/reducer';
import userBeneficiaryReducer from './userBeneficiary/reducer';
import userTransactionReducer from './userTransaction/reducer';
import payRequestReducer from './paymentRequest/reducer';

const rootReducer = combineReducers({
  userAuthReducer,
  errorHandlerReducer,
  supportedAccTypeReducer,
  statusTypeReducer,
  userWalletReducer,
  userBeneficiaryReducer,
  userTransactionReducer,
  payRequestReducer,
});

export default rootReducer;
