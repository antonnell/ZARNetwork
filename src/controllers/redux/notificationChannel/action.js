/* eslint-disable import/prefer-default-export */
import action from '../base/action';
import * as actions from '../base/constants';

/**
 * ******************************************************************************
 * @method notificationChannel : Action for get payment notification channel api.
 * @param {object} data :  Payload for getting payment notification channel details.
 * ******************************************************************************
 *  If channel uuid is passed in data : Retrieve details for given uuid,
 *  otherwise retrieve notification channels of user.
 *  ******************************************************************************
 */
export const notificationChannel = data => {
  const uuid = data && data.uuid ? data.uuid : '';

  let url = actions.notificationChannelUrl;
  let actionType = actions.NOTIFICATION_CHANNEL;

  if (uuid && uuid !== '') {
    url = `${actions.notificationChannelUrl}/${uuid}`;
    actionType = actions.NOTIFICATION_CHANNEL_BY_ID;
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
