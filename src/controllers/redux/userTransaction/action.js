import action from '../base/action';
import * as actions from '../base/constants';

/**
 * ******************************************************************************
 * @method getTransaction : Action for, get user transactions api.
 * @param {object} data :  Payload for getting transactions details.
 * ******************************************************************************
 *  If transaction_uuid is passed in data : Retrieve transactions for given transaction_uuid,
 *  else if account_uuid is passed in data : Retrieve transactions for given account_uuid,
 *  otherwise retrieve all transactions of user.
 *  ******************************************************************************
 */
export const getTransaction = data => {
  const transactionUuid = data && data.transaction_uuid ? data.transaction_uuid : '';
  const accountUuid = data && data.account_uuid ? data.account_uuid : '';
  let url = actions.transactionUrl;
  let actionType = actions.TRANSACTION_DETAIL;
  if (transactionUuid && transactionUuid !== '') {
    url = `${actions.transactionUrl}/${transactionUuid}`;
    actionType = actions.TRANSACTION_DETAIL_BY_TXN_ID;
  }
  if (accountUuid && accountUuid !== '') {
    url = `${actions.accUuidTransactionUrl}/${accountUuid}`;
    actionType = actions.TRANSACTION_DETAIL_BY_ACC_ID;
  }
  return action({
    type: actionType,
    payload: {
      request: {
        url,
        method: 'GET',
        isAuthorised: true,
      },
    },
  });
};
