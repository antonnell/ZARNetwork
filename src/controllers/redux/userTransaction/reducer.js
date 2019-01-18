import { TRANSACTION_DETAIL, _SUCCESS } from '../base/constants';
import { decryptPayload } from '../../utility/decryption';

const defaultState = {
  transactions: [],
};

/**
 * @method getFormattedTxnData : To format result of get transaction api.
 */

const getFormattedTxnData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;
    if (data.status === 200) {
      if (data.message) {
        const transactionData = decryptPayload(data.message);
        if (transactionData.status === 'success' && transactionData.payload) {
          const { payload } = transactionData;
          if (state && state.transactions) {
            const updatedState = Object.assign({}, state, {
              transactions: payload.slice(),
            });
            return updatedState;
          }
        }
      }
    }
  }
  return state;
};

/**
 * @method userTransactionReducer : Reducer for maintianing user transaction details.
 */
const userTransactionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${TRANSACTION_DETAIL}${_SUCCESS}`: {
      const formattedData = getFormattedTxnData(state, action);
      return formattedData;
    }
    default:
      return state;
  }
};

export default userTransactionReducer;
