import action from '../base/action';
import * as actions from '../base/constants';

/**
 * @method statusType : Action to call api to retrieve the request status type.
 * @param {object} data : Data for fetching status types.
 *
 *  If type UUID is passed in data : Retrieve status type for given UUID,
 *  otherwise retrieve all status types.
 *
 *  data.header  : Contains following :-
 *  -> xKey : sha256(email) of logged in user / registered user.
 *  -> xAccessToken: xAccessToken of logged in user / registered user.
 */
export const statusType = data => {
  const { uuid } = data;
  let url = actions.statusTypeUrl;
  if (uuid && uuid !== '') {
    url = `${actions.statusTypeUrl}/${uuid}`;
  }
  return action({
    type: actions.STATUS_TYPE,
    payload: {
      request: {
        headers: data.header,
        url,
        method: 'GET',
      },
    },
  });
};
