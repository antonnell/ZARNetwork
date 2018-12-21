import { CREATE_WALLET, WALLET_DETAIL, _SUCCESS } from '../base/constants';
import { decryptPayload } from '../../utility/decryption';

const defaultState = {
  wallets: [],
};

/**
 * @method getFormattedNewWalletData : To format result of create wallet account api.
 */

const getFormattedNewWalletData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;
    if (data.status === 200) {
      if (data.message) {
        const newWalletData = decryptPayload(data.message);
        if (newWalletData.status === 'success' && newWalletData.payload) {
          const { payload } = newWalletData;
          if (state && state.wallets) {
            const oldWalletAccounts = state.wallets.slice();
            oldWalletAccounts.push(payload);
            const updatedState = Object.assign({}, state, {
              wallets: oldWalletAccounts,
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
 * @method getFormattedWalletData : To format result of get wallet account api.
 */

const getFormattedWalletData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;
    if (data.status === 200) {
      if (data.message) {
        const walletData = decryptPayload(data.message);
        if (walletData.status === 'success' && walletData.payload) {
          const { payload } = walletData;
          if (state && state.wallets) {
            const updatedState = Object.assign({}, state, {
              wallets: payload.slice(),
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
 * @method userWalletReducer : Reducer for maintianing user wallet details.
 */
const userWalletReducer = (state = defaultState, action) => {
  console.log('userWalletReducer state : ', state);

  switch (action.type) {
    case `${CREATE_WALLET}${_SUCCESS}`: {
      const formattedData = getFormattedNewWalletData(state, action);
      console.log('CREATE_WALLET formattedData : ', formattedData);
      return formattedData;
    }
    case `${WALLET_DETAIL}${_SUCCESS}`: {
      const formattedData = getFormattedWalletData(state, action);
      console.log('WALLET_DETAIL formattedData : ', formattedData);
      return formattedData;
    }
    default:
      return state;
  }
};

export default userWalletReducer;
