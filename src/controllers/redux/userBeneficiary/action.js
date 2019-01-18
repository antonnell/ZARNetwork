import action from '../base/action';
import * as actions from '../base/constants';

/**
 * ******************************************************************************
 * @method createBeneficiary : Action for adding a new beneficiaries for account api.
 * @param {object} data : Data for adding a new beneficiaries for account.
 * ******************************************************************************
 */
export const createBeneficiary = data =>
  action({
    type: actions.CREATE_BENEFICIARY,
    payload: {
      request: {
        url: actions.beneficiaryUrl,
        method: 'POST',
        data,
        isAuthorised: true,
      },
    },
  });

/**
 * ******************************************************************************
 * @method getBeneficiary : Action for geting beneficiaries for user api.
 * @param {object} data :  Payload for getting beneficiaries for user.
 * ******************************************************************************
 *  If account_uuid is passed in data : Retrieve beneficiaries for given account_uuid,
 *  else if beneficiary_uuid is passed in data : Retrieve beneficiaries for given beneficiary_uuid,
 *  otherwise retrieve all beneficiaries of user.
 *  ******************************************************************************
 */
export const getBeneficiary = data => {
  const accountUuid = data && data.account_uuid ? data.account_uuid : '';
  const beneficiaryUuid = data && data.beneficiary_uuid ? data.beneficiary_uuid : '';
  let url = actions.beneficiaryUrl;
  let actionType = actions.BENEFICIARY_DETAIL;
  if (accountUuid && accountUuid !== '') {
    url = `${actions.userAccountBeneficiaryUrl}/${accountUuid}`;
    actionType = actions.BENEFICIARY_DETAIL_BY_ACC;
  }
  if (beneficiaryUuid && beneficiaryUuid !== '') {
    url = `${actions.uuidBeneficiaryUrl}/${beneficiaryUuid}`;
    actionType = actions.BENEFICIARY_DETAIL_BY_UUID;
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
