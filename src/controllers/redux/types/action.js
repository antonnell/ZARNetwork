import action from '../base/action';
import * as actions from '../base/constants';

/**
 * @method supportedAccountType : Action to call api to retrieve the account types supported.
 * @param {object} data : Data for fetching account types.
 *
 *  If type UUID is passed in data : Retrieve supported account type for given UUID,
 *  otherwise retrieve all supported account types.
 *
 *  data.header  : Contains following :-
 *  -> xKey : sha256(email) of logged in user / registered user.
 *  -> xAccessToken: xAccessToken of logged in user / registered user.
 */
export const supportedAccountType = data => {
  const { uuid } = data;
  let url = actions.supportedAccountTypeUrl;
  if (uuid && uuid !== '') {
    url = `${actions.supportedAccountTypeUrl}/${uuid}`;
  }
  return action({
    type: actions.SUPPORTED_ACCOUNT_TYPE,
    payload: {
      request: {
        headers: data.header,
        url,
        method: 'GET',
      },
    },
  });
};
