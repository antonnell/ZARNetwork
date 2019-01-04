import action from '../base/action';
import * as actions from '../base/constants';

/**
 * ******************************************************************************
 * @method createWallet : Action for create new wallet account api.
 * @param {object} data : Data for creating new wallet account.
 * ******************************************************************************
 */
export const createWallet = data =>
  action({
    type: actions.CREATE_WALLET,
    payload: {
      request: {
        url: actions.walletUrl,
        method: 'POST',
        data,
        isAuthorised: true,
      },
    },
  });

/**
 * ******************************************************************************
 * @method getWallet : Action for get user wallet accounts api.
 * @param {object} data :  Payload for getting wallet account details.
 * ******************************************************************************
 *  If type_uuid is passed in data : Retrieve wallet accounts for given type_uuid,
 *  else if account_uuid is passed in data : Retrieve wallet accounts for given account_uuid,
 *  otherwise retrieve all wallet accounts of user.
 *  ******************************************************************************
 */
export const getWallet = data => {
  const typeUuid = data && data.type_uuid ? data.type_uuid : '';
  const accountUuid = data && data.account_uuid ? data.account_uuid : '';
  let url = actions.walletUrl;
  let actionType = actions.WALLET_DETAIL;
  if (typeUuid && typeUuid !== '') {
    url = `${actions.userTypeWalletUrl}/${typeUuid}`;
    actionType = actions.WALLET_DETAIL_BY_TYPE;
  }
  if (accountUuid && accountUuid !== '') {
    url = `${actions.userAccIdWalletUrl}/${accountUuid}`;
    actionType = actions.WALLET_DETAIL_BY_ACC_ID;
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
