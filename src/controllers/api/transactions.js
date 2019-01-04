/* eslint-disable import/prefer-default-export */
import { dispatch } from '../../store';
import { getTransaction } from '../redux/userTransaction/action';

/**
 * ******************************************************************************
 * @method getTransactionDetail : Method for api call, to get transactions for user.
 * @param {object} payload : Payload for getting data.
 *
 *  If transaction_uuid is passed in data : Retrieve transactions for given transaction_uuid,
 *  else if account_uuid is passed in data : Retrieve transactions for given account_uuid,
 *  otherwise retrieve all transactions of user.
 * ******************************************************************************
 */
export const getTransactionDetail = payload =>
  new Promise((resolve, reject) => {
    dispatch(getTransaction(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
