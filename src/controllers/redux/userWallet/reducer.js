import { CREATE_WALLET, WALLET_DETAIL, _SUCCESS } from '../base/constants';

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
      if (data.result) {
        const newWalletData = data.result;
        if (newWalletData) {
          if (state && state.wallets) {
            const oldWalletAccounts = state.wallets.slice();
            oldWalletAccounts.push(newWalletData);
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
      if (data.result) {
        const walletData = data.result;
        if (walletData) {
          if (state && state.wallets) {
            const updatedState = Object.assign({}, state, {
              wallets: walletData.slice(),
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
  switch (action.type) {
    case `${CREATE_WALLET}${_SUCCESS}`: {
      const formattedData = getFormattedNewWalletData(state, action);
      return formattedData;
    }
    case `${WALLET_DETAIL}${_SUCCESS}`: {
      const formattedData = getFormattedWalletData(state, action);
      return formattedData;
    }
    default:
      return state;
  }
};

export default userWalletReducer;
