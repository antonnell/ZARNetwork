import { dispatch } from '../../store';
import { createBeneficiary, getBeneficiary } from '../redux/userBeneficiary/action';
// import { encrypt } from '../utility/encryption';
// import { BENEFICIARY_TYPE } from '../redux/base/constants';

/**
 * ****************************************************************************************
 * @method setNewBeneficiary : Method for api call, to add a new beneficiaries for account.
 * @param {object} payload : Payload for adding a new beneficiaries for account.
 * 
 *  payload contains following :-
 *  -> account_uuid {string} : UUID of the account to add the beneficiary to.
 *  -> name {string} : Name of the beneficiary account.
 *  -> number {string} : Account number of beneficiary.
 *  -> their_reference {string} : Reference that will appear on beneficiary statement.
 * ****************************************************************************************
 * @method encrypt : To encrypt the payload sent to create beneficiary.
 * @param payload : Data to be encrypted.
 * @param WALLET_TYPE : Data type to be encrypted i.e for beneficiaries .
 * ****************************************************************************************

 */
export const setNewBeneficiary = payload =>
  new Promise((resolve, reject) => {
    dispatch(createBeneficiary(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
    // encrypt(payload, BENEFICIARY_TYPE)
    //   .then(data => {
    //     if (data.data) {
    //       dispatch(createBeneficiary(data.data))
    //         .then(result => resolve(result))
    //         .catch(err => reject(err));
    //     } else {
    //       reject(new Error(data.error));
    //     }
    //   })
    //   .catch(err => reject(err));
  });

/**
 * *************************************************************************************
 * @method getBeneficiaryDetail : Method for api call, to get all beneficiaries for user.
 * *************************************************************************************
 */
export const getBeneficiaryDetail = payload =>
  new Promise((resolve, reject) => {
    dispatch(getBeneficiary(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
