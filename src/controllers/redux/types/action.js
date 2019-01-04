/* eslint-disable camelcase */
import action from '../base/action';
import * as actions from '../base/constants';

/**
 * @method supportedAccountType : Action to call api to retrieve the account types supported.
 * @param {object} data : Data for fetching account types.
 *
 *  If type_uuid is passed in data : Retrieve supported account type for given {type_uuid},
 *  otherwise retrieve all supported account types.
 *
 */
// eslint-disable-next-line import/prefer-default-export
export const supportedAccountType = data => {
  const typeUuid = data && data.type_uuid ? data.type_uuid : '';
  let url = actions.supportedAccountTypeUrl;
  if (typeUuid && typeUuid !== '') {
    url = `${actions.supportedAccountTypeUrl}/${typeUuid}`;
  }
  return action({
    type: actions.SUPPORTED_ACCOUNT_TYPE,
    payload: {
      request: {
        url,
        method: 'GET',
        isAuthorised: true,
      },
    },
  });
};
