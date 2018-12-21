/* eslint-disable camelcase */
import action from '../base/action';
import * as actions from '../base/constants';

/**
 * @method statusType : Action to call api to retrieve the request status type.
 * @param {object} data : Data for fetching status types.
 *
 *  If status_uuid is passed in data : Retrieve status type for given status_uuid,
 *  otherwise retrieve all status types.
 *
 */
export const statusType = data => {
  const statusUuid = data && data.status_uuid ? data.status_uuid : '';
  let url = actions.statusTypeUrl;
  if (statusUuid && statusUuid !== '') {
    url = `${actions.statusTypeUrl}/${statusUuid}`;
  }
  return action({
    type: actions.STATUS_TYPE,
    payload: {
      request: {
        url,
        method: 'GET',
        isAuthorised: true,
      },
    },
  });
};
