import { dispatch } from '../../store';
import { createWallet, getWallet } from '../redux/userWallet/action';
// import { encrypt } from '../utility/encryption';
// import { WALLET_TYPE } from '../redux/base/constants';

/**
 * ******************************************************************************
 * @method setNewWallet : Method for api call, to create new wallet account.
 * @param {object} payload : Payload for creating wallet account.
 * 
 *  payload contains following :-
 *  -> description {string} : Name given to the account
 *  -> type_uuid {string} : Type of account, from types api
 * ******************************************************************************
 * @method encrypt : To encrypt the payload sent to create wallet account.
 * @param payload : Data to be encrypted.
 * @param WALLET_TYPE : Data type to be encrypted i.e for accounts.
 * ******************************************************************************

 */
export const setNewWallet = payload =>
  new Promise((resolve, reject) => {
    dispatch(createWallet(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
    // encrypt(payload, WALLET_TYPE)
    //   .then(data => {
    //     if (data.data) {
    //       dispatch(createWallet(data.data))
    //         .then(result => resolve(result))
    //         .catch(err => reject(err));
    //     } else {
    //       reject(new Error(data.error));
    //     }
    //   })
    //   .catch(err => reject(err));
  });

/**
 * ******************************************************************************
 * @method getWalletDetail : Method for api call, to get user's wallet accounts.
 * ******************************************************************************
 */
export const getWalletDetail = payload =>
  new Promise((resolve, reject) => {
    dispatch(getWallet(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
