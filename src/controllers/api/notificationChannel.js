/* eslint-disable import/prefer-default-export */
import { dispatch } from '../../store';
import { notificationChannel } from '../redux/notificationChannel/action';

/**
 * ******************************************************************************
 * @method getNotificationChannel : Method for api call, to get notification channels .
 * @param {object} payload : Payload for getting notification channel details.
 *
 * -> For particuler channel UUID type : Payload is {uuid}.
 * -> For all channel : Payload is empty object.
 * ******************************************************************************
 */
export const getNotificationChannel = payload =>
  new Promise((resolve, reject) => {
    dispatch(notificationChannel(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
